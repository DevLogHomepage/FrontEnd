//TODO: 블로그 포스트 데이터 파일 저장 방식을 수정할 필요가 있음
//TODO: 캘린더 포스트 불러오는 방식을 1주일 분량을 불러오는게 아니라 1달치로 변경
import { BlogPostData, BlogPostStreamData, BlogStreamData, SearchItem } from "@/utils/Types";
import * as blog from '@/core/blog'
import { toRaw } from "vue";

/**
 * 기본 blogPostData 클래스가 사용하는 타입 정의입니다.
 */
export interface BlogPostDataIneterface {
    setArray: (data: BlogPostData[]) => void;
    split: (chunkSize:number) => BlogPostData[][]
    // splitWeek: () => BlogStreamData[];
    // splitMonth: () => BlogStreamData[];
    // getBlogStreamIndiData: (currentDate: string, page: number) => BlogPostStreamData[][];
    // setSearchValue: (searchItem: SearchItem[]) => void;
    // getSearchValue: () => SearchItem[];
    // clearSearch: () => void
}

export default class BlogPostDataClass implements BlogPostDataIneterface{
    private title:BlogPostData[]
    private perChunk:number
    private searchData:SearchItem[]

    constructor(){
        this.title = [] as BlogPostData[]
        this.perChunk = 7;
        this.searchData = [] as SearchItem[]
    }

    /**
     * blogPostData에 데이터를 저장하는 메소드입니다.
     * 
     * @param data 블로그 스트림데이터를 받아옵니다.
     */
    setArray(data:BlogPostData[]){
        this.title = data;
    }


    /**
     * 1차원 포스트 제목 정보(BlogPostData)를 2차원으로 출력해준다.
     * 
     * @param content BlogPostData
     * @param chunkSize 나눌 사이즈를 명시한다.
     * @returns 2차원 데이터를 출력한다.
     */
    split(chunkSize:number):BlogPostData[][]{
        const result = this.title.reduce((resultArray:BlogPostData[][], item, index) => { 
            const chunkIndex = Math.floor(index/chunkSize)

            if(!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = [] // start a new chunk
            }

            resultArray[chunkIndex].push(item)

            return resultArray
            }, [])
        return result
    }

    // getArray()
    /**
     * 각 그 주의 시작 날이 적힌 날짜를 받을 수 있습니다.
     * 
     * @returns 주 단위로 끊긴 배열이 반환됩니다.
     */
    // splitWeek(){
    //     return this.title;
    // }

    /**
     * 월 단위로 끊긴 배열이 반환됩니다.
     * 
     * @returns `BlogStreamData`의 형식으로 반환합니다.
     */
    // splitMonth(){
    //     let compare = "";

    //     const testing = this.title.reduce((resultArray:BlogStreamData[], item) => { 
    //         const temp:BlogStreamData = {
    //             month:'',
    //             backdate:'',
    //             blogPosts:[] as BlogPostData[]
    //         } as BlogStreamData

    //         const tempDate = new Date(item.month + 'T' + item.backdate)
    //         const startingDate = blog.returnIncludeMonth(tempDate)
    //         if(blog.getFrontDate(startingDate) !== compare){
    //             resultArray.push(temp)
    //         }
    //         resultArray[resultArray.length - 1].backdate = blog.getBackDate(startingDate)
    //         resultArray[resultArray.length - 1].month = blog.getFrontDate(startingDate)
            
    //         Array.prototype.push.apply(resultArray[resultArray.length - 1].blogPosts,toRaw(item.blogPosts))

    //         compare = blog.getFrontDate(startingDate) 
    //         return resultArray
    //     }, [])


    //     return testing
    // }

    /**
     * 블로그 좌측에 들어가는 포스트를 기입하기 위해서 7일분으로 나누어 분배하여 반환하는 메소드입니다.
     * 
     * @param currentDate 현재 내가 보고 있는 포스트의 날짜
     * @param page 현재 보고있는 페이지를 기입합니다.
     * @returns `BlogPostStreamData[][]`의 형식으로 반환합니다.
     */
    // getBlogStreamIndiData(currentDate:string,page:number){
    //     const PostChanged = this.splitMonth()[page].blogPosts

    //     const date = new Date(currentDate);
    //     const tempDate = new Date(date);
    //     const startingDate = new Date();
    //     startingDate.setMonth(date.getMonth() - 2);

    //     const blogPostStreamDatas:BlogPostStreamData[] = []
    //     while(startingDate.toISOString().split('T')[0] !== tempDate.toISOString().split('T')[0]){
    //         /** 저장하기 위한 임시 변수 생성 */
    //         const blogPostStreamData:BlogPostStreamData = {} as BlogPostStreamData

    //         /** 현재 루프 돌아가고 있는 date 앞 날짜만 가지고 오기 */
    //         const a = tempDate.toISOString().split('T')[0]

    //         blogPostStreamData.type = []

    //         /** 현재 가지고 있는 모든 포스트 확인해보기 */
    //         for(const node of PostChanged){
    //             if(a === node.createdat.split('T')[0]){
    //                 blogPostStreamData.type.push(0)
    //             }
    //             else if(a === node.updatedat.split('T')[0]){
    //                 blogPostStreamData.type.push(1)
    //             }
    //         }
    //         blogPostStreamData.date = a;
    //         tempDate?.setDate(tempDate?.getDate() - 1);
    //         blogPostStreamDatas.push(blogPostStreamData)
    //     }
    //     return blogPostStreamDatas.reduce((resultArray:BlogPostStreamData[][], item, index) => { 
    //         const chunkIndex = Math.floor(index/this.perChunk)
    //         if(!resultArray[chunkIndex]) {
    //             resultArray[chunkIndex] = [] // start a new chunk
    //         }

    //         resultArray[chunkIndex].push(item)

    //         return resultArray
    //     }, [])

    // }

    // setSearchValue(searchItem:SearchItem[]){
    //     const saveArr:SearchItem[] = Array(searchItem.length) as SearchItem[]
    //     const indexArr = searchItem.map(item => {
    //         const index = this.findIndex(item)
    //         console.log(index)
    //         if(index !== null){
    //             console.log(this.title[index[0]].blogPosts[index[1]].createdat)
    //             item.createdat = this.title[index[0]].blogPosts[index[1]].createdat
    //             item.updatedat = this.title[index[0]].blogPosts[index[1]].updatedat
    //             return item
    //         }
    //     })
    //     console.log(indexArr)
    //     this.searchData = indexArr as SearchItem[]
    // }

    // private findIndex(item: SearchItem){
    //     for(const [i,node] of this.title.entries()){
    //         for(const [j,post] of node.blogPosts.entries()){
    //             if(post.name === item.name.replace('.md','')){
    //                 return [i,j]
    //             }
    //         }
    //     }
    //     return null
    // }

    getSearchValue(){
        return this.searchData
    }

    clearSearch(){
        this.searchData = []
    }

}