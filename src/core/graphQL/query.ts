
/**
 * 깃허브의 파일들의 이름을 가지고 와서 문자열노드를 변환해줍니다.
 * 
 * @param fileName 깃허브 블로그 포스트 저장이름
 * @param filePath 깃허브 블로그 포스트 디렉토리
 * @returns query 일부의 형식으로 node가 반환됩니다.
 */
export function returnNode(fileName:string,filePath:string):string{
    return `${fileName} : history(path: "${filePath}") {
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
}

export function returnGetBlogCommitQuery(nodes:string[]):string{
    let commits = ''
    for(const node of nodes){
        commits+=node
    }
    const query = `query RepoFiles($own:String!,$repo:String!){
        repository(owner: $own, name: $repo) {
          commitsData:object(expression: "main") {
            ... on Commit {
              ${commits}
            
          }
          
        }
      }
    }
    `

    return query
}

export function returnGetBlogContentQuery(){
    const query = 
    `query RepoFiles($own:String!,$repo:String!){
        repository(owner: $own, name: $repo) {
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
    }
    `
    return query
}
