import { BlogPostData, SearchItem } from "@/utils/Types";

/**
 * 기본 CurrentContent 클래스가 사용하는 타입 정의입니다.
 */
 export interface CurrentContentInterface {
    push: (weekBlogPost: BlogPostData[]) => void;
    get: () => BlogPostData[][];
    setSearchValue: (searchItem: SearchItem[]) => void;
    getSearchValue: () => SearchItem[];
}

export default class CurrentContents implements CurrentContentInterface{
    private data:BlogPostData[][] = [];
    private search:SearchItem[] = [];

    push(weekBlogPost:BlogPostData[]){
        this.data.push(weekBlogPost)
    }
    
    get(){
        return this.data
    }

    setSearchValue(searchItem:SearchItem[]){
        this.search = searchItem
    }

    getSearchValue(){
        return this.search
    }
}