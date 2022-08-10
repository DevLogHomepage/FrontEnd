import { BlogPostData, SearchItem } from "@/utils/Types";

/**
 * 기본 CurrentContent 클래스가 사용하는 타입 정의입니다.
 */
 export interface CurrentContentInterface {
    push: (weekBlogPost: BlogPostData[]) => void;
    getdata: () => BlogPostData[][];
    setSearch:(search:BlogPostData[]) => void;
    getSearch:() => BlogPostData[];
    clearSeach:() => void;
}

export default class CurrentContents implements CurrentContentInterface{
    private data:BlogPostData[][] = [];
    private search:BlogPostData[] = [];

    push(weekBlogPost:BlogPostData[]){
        this.data.push(weekBlogPost)
    }
    
    getdata(){
        return this.data
    }

    setSearch(search:BlogPostData[]){
        this.search = search
    }

    getSearch(){
        return this.search
    }

    get(){
        if(this.search.length > 0)
            return [this.search]
        else
            return this.data
    }

    clearSeach(){
        this.search = []
    }

}