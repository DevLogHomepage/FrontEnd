import { GITHUB_TOKEN } from '@/../config'
import { FileContentsResponse, FolderResponse,PostTile } from '@/Type' 

import { BlogPostData, CommitDatas, CommitResponse } from '@/Type'
import {marked} from 'marked';
import { getQuery, returnGetBlogCommitQuery, returnNode } from './query'


/**
 * 깃허브에서 포스트를 가지고 옵니다.
 * 
 * @param content `owner`: 사용자, `repo`: 레포지토리, `path`: 특정 파일 디렉토리
 * @param path 가지고올 파일 이름
 * @returns HTMLElement 형식의 `string` 배열입니다.
 */
 export async function getPostUpdate(content:{owner:string,repo:string,path:string}) : Promise<BlogPostData[]>{
    /** 깃허브에서 파일 이름을 가지고 옵니다. */
    // const query = await getQuery({owner:content.owner,repo:content.repo,path:content.path})
    const fileDate = await getPostName({owner:content.owner,repo:content.repo,path:content.path})

    /** 커밋 기록을 가지고 오는 형식을 만들어주는 틀입니다. */
    const nodes:string[] = []
    fileDate.forEach(value => {
        const temp = returnNode(value.name.replace(".md",""),value.path)

        nodes.push(temp)
    })
    
    /** 글을 가지고 올 때 사용하는 query입니다. */
    const query = returnGetBlogCommitQuery(nodes)



    const queryValue = {"own":"dennis0324","repo":"blogPost"}
    

    /** github gql api  */
    const endpoint = "https://api.github.com/graphql"

    /** 깃허브 gql를 이용해서 받아온 데이터입니다. */
    const commitDatas = await fetch(endpoint,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':`bearer ${GITHUB_TOKEN}`
          },
          body:JSON.stringify({
            query:query,
            variables: queryValue
          })
        })

    const commitData:CommitResponse = await commitDatas.json() as CommitResponse

    const blogPostDatas:BlogPostData[] = []
    // const postData = commitData.data.repository.content.entries.find(n => n.name == path) as ContentNode
    Object.entries<CommitDatas>(commitData.data.repository.commitsData).forEach(key => {
        const blogPostData:BlogPostData = {} as BlogPostData

        const dateArr:string[] = []

        key[1].edges.forEach(value => {
            dateArr.push(value.node.committedDate)
        })
        blogPostData.name = key[0]
        blogPostData.createdat = dateArr[dateArr.length - 1]
        blogPostData.updatedat = dateArr[0]
        blogPostDatas.push(blogPostData)
    })
    blogPostDatas.sort((a,b) => b.updatedat.localeCompare(a.updatedat))
    const TODAY = new Date()
    const testg = getBetweenDate(
        new Date(TODAY.getFullYear(),TODAY.getMonth(),TODAY.getDate()),
        new Date(TODAY.getFullYear(),TODAY.getMonth(),TODAY.getDate() -60),
        blogPostDatas
    )

    console.log(testg)

    return testg
}



/**
 * 특정 범위에 있는 블로그 포스트를 찾기 위한 함수입니다.
 * 
 * @param fromDate 찾고자하는 블로그 포스트의 시작 범위
 * @param toDate 찾고자하는 블로그 포스트의 끝 범위
 * @param blogPostDatas 전체 블로그 포스트의 업데이트 날짜 배열
 */
export function getBetweenDate(fromDate:Date,toDate:Date,blogPostDatas:BlogPostData[]){
    const filteredPostDatas:BlogPostData[] = []
    for(const node of blogPostDatas){
        console.log(toDate.toISOString(),node.updatedat)
        // 이렇게 비교하면 될듯
        console.log(node.updatedat.localeCompare(toDate.toISOString()))
        console.log(fromDate.toISOString().localeCompare(node.updatedat))
        if(node.updatedat.localeCompare(toDate.toISOString()) !== 1){
            return filteredPostDatas
        }
        if(fromDate.toISOString().localeCompare(node.updatedat) !== 1){
            return filteredPostDatas
        }
        filteredPostDatas.push(node)
        
    }
    return filteredPostDatas
}

/** rest api를 담당하는 부분입니다. */

/**
 * fetch를 사용하기 위해 반환하는 request를 받는 함수입니다.
 * 
 * @param relativeUrl 데이터를 받아오는 특정 url를 기입합니다.
 * @returns 인터넷에서 사용하기 위한 request를 반환합니다.
 */
export function githubRequest(relativeUrl: string) {
    const init = {} as RequestInit
    init.mode = 'cors';
    init.cache = 'no-cache'; // force conditional request
    const request = new Request('https://api.github.com/' + relativeUrl,{method: "GET" ,cache:'no-cache',mode:'cors'});
    request.headers.set('Accept', 'application/vnd.github.v3+json');
    request.headers.set('Authorization', `token ${GITHUB_TOKEN}`);
    return request
}

/**
 * `request`를 사용하여 결과를 받아옵니다.
 * 
 * @param request 깃허브 `request`를 넣는 매개변수입니다.
 * @returns `request`를 사용하여 fetch 받아온 결과값을 보여줍니다.
 */
export function githubFetch(request: Request): Promise<Response> {
    return fetch(request).then(response => {
        if (response.status === 401) {
            console.log()
        }
        if (response.status === 403) {
            response.json().then(data => {
                if (data.message === 'Resource not accessible by integration') {
                    window.dispatchEvent(new CustomEvent('not-installed'));
        }
    });
    }

    if (request.method === 'GET'
            && [401, 403].indexOf(response.status) !== -1
            && request.headers.has('Authorization')
        ) {
        request.headers.delete('Authorization');
            return githubFetch(request);
        }
        return response;
    });
}

export function decodeBase64UTF8(encoded: string) {
    encoded = encoded.replace(/\s/g, '');
    return decodeURIComponent(atob(encoded).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''))
}

/**
 * 현재 깃허브에 올라가있는 블로그를 불러옵니다.
 * 
 * @param content `owner`,`repo`,`path`으로 구성된 dictonary 입니다.
 * @returns `{name,path}`으로 구성된 dictionary를 반환합니다.
 */
export async function getPostName(content:{owner:string,repo:string,path:string}){
    const branch = 'main'
    const request = githubRequest(`repos/${content.owner}/${content.repo}/contents/${content.path}?ref=main`)
    const response = await githubFetch(request)

    if (response.status === 404) {
        throw new Error(`Repo "${content.owner}/${content.repo}" does not have a file named "${content.path}" in the "${branch}" branch.`);
    }
    if (!response.ok) {
        throw new Error(`Error fetching ${content.path}.`);
    }
    const file = await response.json() as FolderResponse[] | string
    const arr:FolderResponse[] = file as FolderResponse[]
    const PostTile:PostTile[] = []
    for(const i of arr){
        const temp = {
            name: i.name,
            path: i.path
        }
        PostTile.push(temp)
    }
    return PostTile
}

/**
 * 깃허브 포스트에서 데이터를 가지고 옵니다.
 * 
 * @param content 
 * @returns 
 */
export async function getContent(content:{owner:string,repo:string,path:string}):Promise<FileContentsResponse>{
    const branch = 'main'
    const request = githubRequest(`repos/${content.owner}/${content.repo}/contents/${content.path}?ref=main`)
    const response = await githubFetch(request)
    if (response.status === 404) {
        throw new Error(`Repo "${content.owner}/${content.repo}" does not have a file named "${content.path}" in the "${branch}" branch.`);
    }
    if (!response.ok) {
        throw new Error(`Error fetching ${content.path}.`);
    }
    const file = await response.json() as FileContentsResponse

    return file
}

