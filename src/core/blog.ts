
import { BlogPostData, BlogPostDataBasicInfo, BlogPostDataYear, BlogStreamData, SearchItem, SearchResult } from '@/utils/Types';
import * as github from '@/core/github'
import {marked} from 'marked';
import hljs from 'highlight.js'
import axios from 'axios';
import { domain } from '@/config';

/**
 * 깃허브에 올라가 있는 블로그 타이틀을 받아옵니다.
 * 
 * @param content 블로그 포스트 배열을 통한 타이틀 배열 매개변수입니다.
 * @returns 제목 배열을 통한 블로그 포스트 내용을 반환합니다.
 */
export async function getBlogTitles(content:BlogPostDataBasicInfo){
    const response = await axios.get(`http://${domain}:3000/getPostTitles/?owner=${content.owner}&repo=${content.repo}&path=${content.path}`)
    return github.returnBlogMap(response.data)
    // return response
}


/**
 * 특정 배열에 대해서 블로그 포스트 내용을 받아옵니다.
 * 
 * @param content 데이터를 받아오기위한 기본 데이터 매개변수입니다.
 * @param postPage 블로그 포스트 배열을 통한 타이틀 배열 매개변수입니다.
 * @returns 제목 배열을 통한 블로그 포스트 내용을 반환합니다.
 */
export async function getCurrentPage(content:BlogPostDataBasicInfo,postPage:BlogPostData[] | SearchItem[]){
    
    const blogPostDatas:BlogPostData[] = []
    if(postPage === undefined){
        return []
    }
    /** 현재 반환 받은 값을 모두 포스팅으로 표시하는 부분입니다. */
    for(const i of postPage){
        // console.log(i)
        const blogPostData:BlogPostData = {} as BlogPostData
        // const temp = await github.getContent({owner:'dennis0324',repo:'blogPost',path:`${content.path}/${i.name}.md`})
        const response = await axios.get(`http://${domain}:3000/getContent/?owner=${content.owner}&repo=${content.repo}&path=${content.path}&name=${i.name.replace('.md','')}`)
        const contentStr =  response.data
        console.log(contentStr[28])

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
        blogPostData.titleData = getPostJson("---\n{","}\n---",contentStr)
        blogPostData.content =  marked.parse(getPostContent("---\n{","}\n---",contentStr))
        blogPostData.createdat = i.createdat.split('T')[0]
        blogPostData.updatedat = i.updatedat.split('T')[0]

        //TODO 이거 함수 따로 하나 만들어서 제작하기
        blogPostDatas.push(blogPostData)
    }

    return blogPostDatas
}

// export async function getSearchPage(content:BlogPostDataBasicInfo,searchItems:SearchItem[]) {
//     for(const serachItem of searchItems){

//     }
// } 

export function displayIndicator(blogPostDataYears:BlogPostDataYear[],currentDate:Date){
    const Today = new Date();
    let funcResult:BlogPostData[] = [];

    const firstMonth = blogPostDataYears[Today.getFullYear() - currentDate.getFullYear()].data[currentDate.getMonth()].data
    funcResult = funcResult.concat(firstMonth)
    
    return funcResult
}

/**
 * 특정 문자열을 입력하면 `prefix`와 `surfix`으로 사이 간격을 구해 json화 시켜줍니다.
 * 
 * @param prefix 시작하는 특정 문자열 배열을 입력하는 매개변수입니다.
 * @param surfix 끝나는 특정 문자열 배열을 입력하는 매개변수입니다.
 * @param content 깃허브에서 받아온 포스트 글을 넣어ㅏ줍니다.
 * @returns json 형식으로 각종 정보를 정리해줍니다.
 */
export function getPostJson(prefix:string,surfix:string,content:string){
    const startingPoint:number = content.indexOf(prefix) as number;
    const endingPoint:number = content.indexOf(surfix) as number;

    const title = content?.slice(startingPoint ,endingPoint + "---\n{".length + 1)
    const postData:string = title.slice(prefix.length - 1,title.length - surfix.length).replace(/\n/g,"")
    return JSON.parse(postData)
}

/**
 * 태그, 업데이트날짜, 생성날짜, 제목 등 정보가 들어가 있는 데이터를 제외하고 나머지 내용을 받아올 때 사용합니다.
 * 
 * @param prefix 특정 프리셋을 찾을 수 있도록 합니다.
 * @param surfix 특정 프리셋을 찾을 수 있도록 하는 매개변수입니다.
 * @param content 찾고자 하는 프리셋이 있는 문자열 매개변수입니다.
 * @returns 특정 프리셋을 통해 찾은 것을 제외하고 남은 포스트 문자열을 반환합니다.
 */
export function getPostContent(prefix:string,surfix:string,content:string){
    const startingPoint:number = content.indexOf(prefix) as number;
    const endingPoint:number = content.indexOf(surfix) as number;

    const title = content?.slice(startingPoint ,endingPoint + "---\n{".length + 1)
    content = content?.replace(title as string,"")
    return content
}

/**
 * 그 블로그 게시글에 관련된 내용을 받아옵니다.
 * 
 * @param blogPostDataMap 현재 깃허브에 있는 블로그 게시글이 정리된 배열입니다.
 * @param page 표시하고자 하는 페이지를 넣는 매개변수입니다.
 * @returns 특정 날짜의 배열을 반환합니다.
 */
export function getPageInfo(blogPostDataMap:BlogStreamData[],page:number){

    return blogPostDataMap[page]
}

/**
 * 현 날짜가 특정 월에 들어가 있는 확인해주는 함수입니다.
 * 
 * @param date 현 날짜를 기입하는 매개변수입니다
 * @returns 날짜를 반환합니다.
 */
export function returnIncludeMonth(date:Date){
    const TODAY = new Date()
    const CURRENT = new Date()
    const PAST = new Date()
    PAST.setMonth(PAST.getMonth() - 2)
    let count = 0;

    while(date.getTime() > CURRENT.getTime() || date.getTime() < PAST.getTime()){
        count++;
        CURRENT.setMonth(CURRENT.getMonth() - 2)
        PAST.setMonth(PAST.getMonth() - 2)
    }
    TODAY.setMonth(TODAY.getMonth() - count * 2)
    return TODAY
}

/**
 * 현 날짜에서 T를 기준으로 앞의 시간만 문자열로 반환합니다.
 * @param date 시간을 기입합니다.
 * @returns `string`형식으로 반홥합니다.
 */
export function getFrontDate(date:Date){
    return date.toISOString().split('T')[0]
}

/**
 * 현 날짜에서 T를 기준으로 뒤의 시간만 문자열로 반환합니다.
 * @param date 시간을 기입합니다.
 * @returns `string`형식으로 반홥합니다.
 */
export function getBackDate(date:Date){
    return date.toISOString().split('T')[1]
}

/**
 * 현재 페이지와 현재 포스트의 인덱스를 반환합니다.
 * 
 * @param blogPostDatas 블로그가 표시할 수 있는 모든 포스트의 배열을 넣는 매개변수입니다.
 * @param watchingIndex 현재 사용자가 보고 있는 블로그 포스트 인덱스입니다.
 * @returns 배열 형식으로 `[현재 보고 있는 페이지, 페이지에서 몇번쨰 글]`의 형식으로 반환합니다.
 */
export function getPageIndex(blogPostDatas:BlogStreamData[],watchingIndex:number){
    let temp = 0;
    let index = 0;
    for(const node of blogPostDatas){
        if(temp + node.blogPosts.length <= watchingIndex){
            temp += node.blogPosts.length
            index += 1
        }
    }
    return [index,watchingIndex - temp];
}


export async function searchPost(content:BlogPostDataBasicInfo,searchText:string){
    const response = await axios.get(`http://${domain}:3000/searchPost/?owner=${content.owner}&repo=${content.repo}&path=${content.path}&title=${searchText}`)
    console.log(response)
    const temp = (response.data as SearchResult).items.filter(node =>{
        console.log(node.path.replace(`/${node.name}`,''))
        if(node.path.replace(`/${node.name}`,'') === content.path){
            return true
        }
        return false
    })
    console.log("temp",temp)
    // Object.values(response.data.items).map(e => e.path.)
    // return github.returnBlogMap(response.data)
    return temp
}

// export function isTag(){

// }