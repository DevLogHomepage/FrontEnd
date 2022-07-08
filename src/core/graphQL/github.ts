/* eslint-disable */
import { GITHUB_TOKEN } from '@/../config'
import { getPostName } from "@core-rest/github"


import { useQuery } from '@vue/apollo-composable'
import { BlogPostData, CommitDatas, CommitResponse, ContentFile, ContentNode } from '@/Type'
import gql from 'graphql-tag'
import {marked} from 'marked';
import hljs from 'highlight.js'
import prism from "prismjs";
import { returnGetBlogCommitQuery, returnNode } from './query'


export function getTesting(){
    const QUERY = gql`
    query RepoFiles($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
            object(expression: "HEAD:") {
            # Top-level.
            ... on Tree {
                    entries {
                    name
                    type
                    object {
                        ... on Blob {
                            byteSize
                        }
                        # One level down.
                        ... on Tree {
                            entries {
                                name
                                type
                                object {
                                    ... on Blob {
                                        byteSize
                                    }
                                }
                            }
                        }
                    }
                    }
                }
            }
        }
    }
        `;
    const { result,loading } = useQuery(QUERY, {
        owner: "dennis0324",
        name:'blogPost'
    });

    return { result,loading }
}


/**
 * 깃허브에서 포스트를 가지고 옵니다.
 * 
 * @param content `owner`: 사용자, `repo`: 레포지토리, `path`: 특정 파일 디렉토리
 * @param path 가지고올 파일 이름
 * @returns HTMLElement 형식의 `string` 배열입니다.
 */
export async function getPostUpdate(content:{owner:string,repo:string,path:string},path:string) : Promise<BlogPostData[]>{
    /** 깃허브에서 파일 이름을 가지고 옵니다. */
    const fileDate = await getPostName({owner:content.owner,repo:content.repo,path:content.path})
    

    /** 커밋 기록을 가지고 오는 형식을 만들어주는 틀입니다. */
    let nodes:string[] = []
    fileDate.forEach((value,key) => {
        const temp = returnNode(value.name.replace(".md",""),value.path)

        nodes.push(temp)
    })
    
    /** 글을 가지고 올 때 사용하는 query입니다. */
    const query = returnGetBlogCommitQuery(nodes)

    /** 가지고 온 파일을 md를 HTML string 형식으로 바꿔줍니다. */
    marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        },
        langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
    });

    const queryValue = {"own":"dennis0324","repo":"blogPost"}
      
    /**  */
    const branch = 'main'

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
    console.log(commitData)
    let blogPostDatas:BlogPostData[] = []
    // const postData = commitData.data.repository.content.entries.find(n => n.name == path) as ContentNode
    const commitDates = Object.entries<CommitDatas>(commitData.data.repository.commitsData).forEach((key,index) => {
        let blogPostData:BlogPostData = {} as BlogPostData

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
    console.log(blogPostDatas)
    const TODAY = new Date()
    getBetweenDate(
        new Date(TODAY.getFullYear(),TODAY.getMonth(),TODAY.getDate()),
        new Date(TODAY.getFullYear(),TODAY.getMonth(),TODAY.getDate() -7),
        blogPostDatas
        )
    // Object.entries<CommitDatas>(commitData.data.repository.commitsData).forEach((key,index) => {
        
    //     let blogPostData:BlogPostData = {} as BlogPostData
    //     const dateArr:string[] = []
    //     key[1].edges.forEach(value => {
    //         dateArr.push(value.node.committedDate)
    //     })

    //     blogPostData.name = key[0]
    //     blogPostData.createdat = dateArr[dateArr.length - 1]
    //     blogPostData.updatedat = dateArr[0]

    //     const entries = Object.values<ContentFile>(postData.object.entries).find(n => n.name.split(".")[0] === key[0])
    //     let content = entries?.object.text

    //     const startingPoint:number = entries?.object.text.indexOf("---\n{") as number;
    //     const endingPoint:number = entries?.object.text.indexOf("}\n---") as number;

    //     const title = content?.slice(startingPoint ,endingPoint + "---\n{".length + 1)
    //     content = content?.replace(title as string,"")

    //     const titleData = getPostJson("---\n{","---\n}",title as string)
    //     blogPostData.titleData = titleData
    //     blogPostData.content = marked.parse(content as string)
    //     blogPostDatas.push(blogPostData)
    // })
    
    

    return blogPostDatas
        

}


export function getPostJson(prefix:string,surfix:string,content:string){
    const postData:string = content.slice(prefix.length - 1,content.length - surfix.length).replace(/\n/g,"")
    return JSON.parse(postData)
}


export function getBetweenDate(fromDate:Date,toDate:Date,blogPostDatas:BlogPostData[]){
    let filteredPostDatas:BlogPostData[] = []
    for(const node of blogPostDatas){
        console.log(toDate.toISOString(),node.updatedat)
        // 이렇게 비교하면 될듯
        console.log(node.updatedat.localeCompare(toDate.toISOString()))
        console.log(fromDate.toISOString().localeCompare(node.updatedat))
        if(node.updatedat.localeCompare(toDate.toISOString()) !== 1){
            continue
        }
        if(fromDate.toISOString().localeCompare(node.updatedat) !== 1){
            continue
        }
        filteredPostDatas.push(node)
        
    }
    console.log(filteredPostDatas)
}