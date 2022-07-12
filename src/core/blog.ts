
import { BlogPostData, blogPostDataBasicInfo } from '@/utils/Types';
import * as github from '@/core/github'
import {marked} from 'marked';
import hljs from 'highlight.js'

export async function getBlogPost(content:blogPostDataBasicInfo,page:number){
    const blogPostDatas:BlogPostData[] = []
    const response = await github.getPostUpdate({owner:'dennis0324',repo:'blogPost',path:content.path});
    for(const i of response){
        const blogPostData:BlogPostData = {} as BlogPostData
        const temp = await github.getContent({owner:'dennis0324',repo:'blogPost',path:`${content.path}/${i.name}.md`})
        const contentStr =  github.decodeBase64UTF8(temp.content)
        

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
        // console.log(getPostContent("---\n{","}\n---",contentStr))
        blogPostData.createdat = i.createdat
        blogPostData.updatedat = i.updatedat

        //TODO 이거 함수 따로 하나 만들어서 제작하기
        blogPostDatas.push(blogPostData)
    }

    return blogPostDatas
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

export function getPostContent(prefix:string,surfix:string,content:string){
    const startingPoint:number = content.indexOf(prefix) as number;
    const endingPoint:number = content.indexOf(surfix) as number;

    const title = content?.slice(startingPoint ,endingPoint + "---\n{".length + 1)
    content = content?.replace(title as string,"")
    return content
}


