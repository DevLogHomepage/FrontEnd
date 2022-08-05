import { GITHUB_TOKEN } from '@/../config'
import { BlogPostDataMonth, BlogPostDataYear, BlogStreamData, FileContentsResponse, FolderResponse,PostTile } from '@/Type' 

import { BlogPostData, CommitDatas, CommitResponse } from '@/Type'
import { returnGetBlogCommitQuery, returnNode } from './query'


/**
 * 깃허브에서 포스트 이름과 디렉토리를 가지고 옵니다.
 * 
 * @param content `owner`: 사용자, `repo`: 레포지토리, `path`: 특정 파일 디렉토리
 * @param path 가지고올 파일 이름
 * @returns HTMLElement 형식의 `string` 배열입니다.
 */
 export async function getPostTitles(content:{owner:string,repo:string,path:string}) : Promise<BlogPostData[]>{
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


    return blogPostDatas
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
        if(node.updatedat.localeCompare(toDate.toISOString()) !== 1){
            return filteredPostDatas
        }
        if(fromDate.toISOString().localeCompare(node.updatedat) !== 1){
            return filteredPostDatas
        }
        /** 스택이 아닌 큐로 사용하기 위함 */
        filteredPostDatas.splice(0,0,node)
        
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
            console.log('깃허브로 부터 응답 받을 수 없음')
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
 * @param content 깃허브의 기본 정보를 넣는 변수입니다.
 * @returns json 형식으로 파일을 반환합니다.
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

/**
 * 받아온 2달의 데이터에서 1주일치로 나누어 주며 `map`형식으로 반환합니다.
 * 
 * @param blogPostDatas 깃허브에서 받아온 전체 블로그 글입니다.
 * @param page 현재 블로그가 표시하고 있는 페이지 위치입니다.
 * @returns 각 년,월로 분류 된 배열로 출력합니다.
 */
export function returnBlogMap(blogPostDatas:BlogPostData[]) {
    const TODAY = new Date(Date.now())
    const pastDay = new Date(TODAY.getFullYear(),TODAY.getMonth(),TODAY.getDate() - 6).getDay()
    const returnValue:BlogStreamData[] =  []

    for(const blogPostData of blogPostDatas){

        const weekday = new Date(blogPostData.updatedat)

        const subtract = (8 + (weekday.getDay() - pastDay)) % 8
        // const add = (8 + (currentDay - weekday.getDay())) & 8

        
        const startDate = new Date(weekday);
        startDate.setDate(weekday.getDate() - subtract);

        const index = checkWeekExist(returnValue,startDate);
        if(index === -1){
            const splitDate = startDate.toISOString().split('T')
            const temp:BlogStreamData = {
                month:`${splitDate[0]}`,
                backdate:`${splitDate[1]}`,
                blogPosts:[]
            } as BlogStreamData
            returnValue.push(temp)
            returnValue[returnValue.length - 1].blogPosts.push(blogPostData)
        }
        else{
            returnValue[index].blogPosts.push(blogPostData)
        }
        
    }

    return returnValue
}



/**
 * 현재 `map`에 특정 날짜가 있는지 확인합니다.
 * 
 * @param checkMap 포함된 날짜 시작지점과 `BlogPostData`를 포함한 `map`입니다.
 * @param date 찾고자 하는 날짜를 입력합니다.
 * @returns 있는지 없는지 확인하고 배열을 반환합니다.
 */
export function checkWeekExist(blogStreamData:BlogStreamData[],date:Date){
    return blogStreamData.findIndex((item,i) => {
        if(item.month === date.toISOString().split('T')[0]){
            return i;
        }
    })
}


export function displayIndicator(blogPostDatas:Map<string,BlogPostData[]>){
    const blogPostDataYears:BlogPostDataYear[] = []
    const TODAY = new Date();
    for(const node of blogPostDatas.values()){
        for(const blogPostData of node){
            const postedDate = new Date(blogPostData.updatedat)
            const year = postedDate.getFullYear();
            const tempBlogPostDataYear:BlogPostDataYear = {
                year:year,
                data:[...Array(12)].map((_,index) => { return {month:index,data:[] as BlogPostData[]} as BlogPostDataMonth})
            } as BlogPostDataYear

            if(!isYearExist(blogPostDataYears,blogPostData)){
                blogPostDataYears.push(tempBlogPostDataYear)
            }

            const blogPostDataMonths =  blogPostDataYears[TODAY.getFullYear() - year].data
            blogPostDataMonths[postedDate.getMonth()].data.push(blogPostData)
        }
    }

    return blogPostDataYears
}

/**
 * 
 * @param blogPostDataYears 
 * @param blogPostData 
 * @returns 
 */
 export function isYearExist(blogPostDataYears:BlogPostDataYear[],blogPostData:BlogPostData){
    const result = blogPostDataYears.filter(element => element.year === parseInt(blogPostData.updatedat))
    return result.length >= 1
}