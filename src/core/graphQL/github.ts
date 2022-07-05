/* eslint-disable */
import { GITHUB_TOKEN } from '@/../config'
import { getPostName } from "@core-rest/github"


import { useQuery } from '@vue/apollo-composable'
import { BlogPostData, CommitDatas, CommitResponse, ContentFile, ContentNode } from '@/Type'
import gql from 'graphql-tag'
import {marked} from 'marked';
import hljs from 'highlight.js'

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



export async function getPostUpdate(content:{owner:string,repo:string,path:string},path:string) : Promise<BlogPostData[]>{
    const fileDate = await getPostName({owner:content.owner,repo:content.repo,path:content.path})
    
    let commits = ``

    fileDate.forEach((value,key) => {
      const putData = value.name.replace(".md","") + `: history(path: "`+value.path+`") {
        edges {
          node { 
            committedDate 
            oid
            author
            {  
              email
            }
          } 
        }
      }
      `
      commits = commits.concat(putData)
    })
    
    const query = `query RepoFiles($own:String!,$repo:String!){
        repository(owner: $own, name: $repo) {
          commitsData:object(expression: "main") {
            ... on Commit {
              `+commits+`
            
          }
          
        }
        content: object(expression: "HEAD:") {
          ... on Tree {
            entries {
              name
              type
              object {
                ... on Blob {
                  byteSize
                }
                ... on Tree {
                  entries {
                    name
                    type
                    object {
                      ... on Blob {
                        byteSize
                        text
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
    `

    marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function(code, lang) {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          console.log(language)
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

    const branch = 'main'
    const endpoint = "https://api.github.com/graphql"
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
    let blogPostDatas:BlogPostData[] = []
    const postData = commitData.data.repository.content.entries.find(n => n.name == path) as ContentNode
    Object.entries<CommitDatas>(commitData.data.repository.commitsData).forEach((key,index) => {
        
        let blogPostData:BlogPostData = {} as BlogPostData
        const dateArr:string[] = []
        key[1].edges.forEach(value => {
            dateArr.push(value.node.committedDate)
        })
        blogPostData.name = key[0]
        blogPostData.createdat = dateArr[dateArr.length - 1]
        blogPostData.updatedat = dateArr[0]
        const entries = Object.values<ContentFile>(postData.object.entries).find(n => n.name.split(".")[0] === key[0])
        blogPostData.content = marked.parse(entries?.object.text as string)
        blogPostDatas.push(blogPostData)
    })
    
    blogPostDatas.sort((a,b) => b.updatedat.localeCompare(a.updatedat))
    console.log(blogPostDatas)



    // marked()
    return blogPostDatas
        

}