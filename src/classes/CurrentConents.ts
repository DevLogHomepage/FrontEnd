import { BlogPostData } from "@/utils/Types";

export default class CurrentContents{
    private data:BlogPostData[][] = [];

    push(weekBlogPost:BlogPostData[]){
        this.data.push(weekBlogPost)
    }
    
    get(){
        return this.data
    }
}