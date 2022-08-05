import { BlogPostData, BlogPostStreamData, BlogStreamData } from "@/utils/Types";
import * as blog from '@/core/blog'
import { toRaw } from "vue";

export interface BlogPostDataIneterface {
    setMap: (data: BlogStreamData[]) => void;
    splitWeek: () => BlogStreamData[];
    splitMonth: () => BlogStreamData[];
    getBlogStreamIndiData: (currentDate: string, page: number) => BlogPostStreamData[][];
}

export default class BlogPostDataClass implements BlogPostDataIneterface{
    private title:BlogStreamData[]
    private perChunk:number

    constructor(){
        this.title = [] as BlogStreamData[]
        this.perChunk = 7;
    }

    /**
     * blogPostData에 데이터를 저장하는 메소드입니다.
     * 
     * @param data 블로그 스트림데이터를 받아옵니다.
     */
    setMap(data:BlogStreamData[]){
        this.title = data;
    }
    /**
     * 각 그 주의 시작 날이 적힌 날짜를 받을 수 있습니다.
     * 
     * @returns 주 단위로 끊긴 배열이 반환됩니다.
     */
    splitWeek(){
        return this.title;
    }

    /**
     * 월 단위로 끊긴 배열이 반환됩니다.
     * 
     * @returns `BlogStreamData`의 형식으로 반환합니다.
     */
    splitMonth(){
        let compare = "";

        const testing = this.title.reduce((resultArray:BlogStreamData[], item, _) => { 
            const temp:BlogStreamData = {
                month:'',
                backdate:'',
                blogPosts:[] as BlogPostData[]
            } as BlogStreamData

            const tempDate = new Date(item.month + 'T' + item.backdate)
            const startingDate = blog.returnIncludeMonth(tempDate)
            if(blog.getFrontDate(startingDate) !== compare){
                resultArray.push(temp)
            }
            resultArray[resultArray.length - 1].backdate = blog.getBackDate(startingDate)
            resultArray[resultArray.length - 1].month = blog.getFrontDate(startingDate)
            
            Array.prototype.push.apply(resultArray[resultArray.length - 1].blogPosts,toRaw(item.blogPosts))

            compare = blog.getFrontDate(startingDate) 
            return resultArray
        }, [])


        return testing
    }

    /**
     * 블로그 좌측에 들어가는 포스트를 기입하기 위해서 7일분으로 나누어 분배하여 반환하는 메소드입니다.
     * 
     * @param currentDate 현재 내가 보고 있는 포스트의 날짜
     * @param page 현재 보고있는 페이지를 기입합니다.
     * @returns `BlogPostStreamData[][]`의 형식으로 반환합니다.
     */
    getBlogStreamIndiData(currentDate:string,page:number){
        const PostChanged = this.splitMonth()[page].blogPosts

        const date = new Date(currentDate);
        const tempDate = new Date(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds());
        const startingDate = new Date(tempDate.getFullYear(),tempDate.getMonth() - 2,tempDate.getDate(),date.getHours(),date.getMinutes(),date.getSeconds())

        const blogPostStreamDatas:BlogPostStreamData[] = []
        while(startingDate.toISOString().split('T')[0] !== tempDate.toISOString().split('T')[0]){
            /** 저장하기 위한 임시 변수 생성 */
            const blogPostStreamData:BlogPostStreamData = {} as BlogPostStreamData

            /** 현재 루프 돌아가고 있는 date 앞 날짜만 가지고 오기 */
            const a = tempDate.toISOString().split('T')[0]

            blogPostStreamData.type = []

            /** 현재 가지고 있는 모든 포스트 확인해보기 */
            for(const node of PostChanged){
                if(a === node.createdat.split('T')[0]){
                    blogPostStreamData.type.push(0)
                }
                else if(a === node.updatedat.split('T')[0]){
                    blogPostStreamData.type.push(1)
                }
            }
            blogPostStreamData.date = a;
            tempDate?.setDate(tempDate?.getDate() - 1);
            blogPostStreamDatas.push(blogPostStreamData)
        }
        return blogPostStreamDatas.reduce((resultArray:BlogPostStreamData[][], item, index) => { 
            const chunkIndex = Math.floor(index/this.perChunk)
            if(!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = [] // start a new chunk
            }

            resultArray[chunkIndex].push(item)

            return resultArray
        }, [])

    }

}