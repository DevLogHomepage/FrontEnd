import { BlogPostData, BlogStreamData } from "@/utils/Types";
import * as blog from '@/core/blog'
import { toRaw } from "vue";

export default class BlogPostDataClass{
    private title:BlogStreamData[] = []

    /**
     * blogPostData에 데이터를 저장하는 메소드입니다.
     * 
     * @param data 블로그 스트림데이터를 받아옵니다.
     */
    setMap(data:BlogStreamData[]){
        this.title = data;
    }

    /**
     * 
     */
    setContent(){
        console.log()
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

        const testing = this.title.reduce((resultArray:BlogStreamData[], item, index) => { 
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

}