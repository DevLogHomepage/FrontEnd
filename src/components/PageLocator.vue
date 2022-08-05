<template>
    <div id="pagelocater">
        <div id="pageContainer">
            <WeekIndicator :currentDay="watchingDate" :postStreamData="postStreamData"/>
            <div id="pagelocater-indicator">
                <GithubStream :startingDate="datas.date"/>
                <div id="MainStream">
                    <div v-for="i in 62" :key="i" :class="['mainstream-div',(i < datas.circleCount) ? 'on' : 'off']"></div>
                </div>
                <BlogPostStream :postStreamData="postStreamData"/>
            </div>
        </div>
        <div class="date-indicator">Recent Post: {}</div>
        <div class="date-indicator">Post in a Row : {}</div>
        <div id="pagelocater-helper">
            <div class="flex-horizontal">
                <div class="mainstream-div blogType-1 pagelocater-conatainer">
                </div>
                <div>
                    updated
                </div>
            </div>
            <div class="flex-horizontal">
                <div class="mainstream-div blogType-0 pagelocater-conatainer">
                </div>
                <div>
                    created
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent, Prop, PropType, ref, watch } from 'vue'

import GithubStream from './PageLocator/GithubStream.vue'
import BlogPostStream from './PageLocator/BlogPostStream.vue'
import WeekIndicator from './PageLocator/WeekIndicator.vue'
import { BlogPostData,  BlogPostStreamData, Page, Post, WeekIndicater } from '@/utils/Types';

import * as blog from '@/core/blog'
import BlogPostDataClass, { BlogPostDataIneterface } from '@/classes/BlogPostData';

export interface Data{
    date:string,
    circleCount:number,
    blogPost:BlogPostData[]
}


export default defineComponent({
    /** 컴포넌트 이름의 정의입니다. */
    name: "PageLocater",
    /** 컴포넌트 시작 설정 부분입니다. */
    /** 현재 달과 지난 달의 총 일수를 구합니다. */
    setup(){
        const datas = ref<Data>({date:'',circleCount:0,blogPost:[]})
        const weekIndicater = ref<WeekIndicater>({day:0,week:0})
        const postStreamData = ref<BlogPostStreamData[][]>([])
        const watchingDate = ref<string>('')
        return{
            datas,
            weekIndicater,
            postStreamData,
            watchingDate
        }
    },
    data() {
        return {
            contribute: "",
            perChunk:7
        };
    },
    components: { 
        GithubStream,
        BlogPostStream,
        WeekIndicator
    },
    props:{
        //watchingPage, blogpostdata
        blogPostData:{
            type:Object as PropType<BlogPostDataIneterface>,
            default: new BlogPostDataClass()
        },

        page:{
            required:true,
            type:Object as PropType<Page>
        },

        post:{
            required:true,
            type:Object as PropType<Post>
        },
    },
    watch:{
        page:{
            handler:function(){
                const temp = this.blogPostData.splitMonth()[this.page.watching]
                if(temp){
                    this.datas.date = temp.month
                    this.postStreamData = this.blogPostData.getBlogStreamIndiData(temp.month,this.page.watching)
                    this.setMonthIndicater()
                }
            },
            deep:true
        },
        post:{
            handler:function(){
                const temp = this.blogPostData.splitMonth()[this.page.watching]
                this.watchingDate = blog.getFrontDate(new Date(temp.blogPosts[this.post.watching].updatedat))
            },
            deep:true
        }
    },
    methods:{
        setMonthIndicater(){
            const tempDate = new Date(this.datas.date)
            const tempMonth = new Date(tempDate.getFullYear(),tempDate.getMonth() - 2,tempDate.getDate())
            let difference  = tempDate.getTime() - tempMonth.getTime();
            const dayCount = Math.ceil(difference / (1000 * 3600 * 24));
            this.datas.circleCount = dayCount
        },
        setBlogStreamIndiData(blogPostData:BlogPostData[]){
            const PostChanged = blogPostData

            const date = new Date(this.datas.date as string);
            let tempDate = new Date(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds());
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

        },
    }

})
</script>

<style scoped>

#pagelocater{
    display:flex;

    flex-direction: column;
    align-items: center; 
}

#pageContainer{

    position: relative;
    overflow: hidden;
    width:72px;
    
}
.date-indicator{
    margin:5px 0;
}
#pagelocater-indicator{
    display:flex;
}
#GithubStream{
    display:flex;
    flex-direction: column;
    
}
#MainStream{
    display:flex;
    flex-direction: column;
}

.mainstream-div{
    width:6px;
    height:6px;
    border-radius: 50%;
    margin: 1px;
}


.dark #MainStream .mainstream-div.on{
    background-color:#fff;
}
.dark #MainStream .mainstream-div.off{
    background-color:rgba(255, 255, 255, 0.3);
}


.light #MainStream .mainstream-div.on{
    background-color:#2b2b2b;
}
.light #MainStream .mainstream-div.off{
    background-color:rgba(43, 43, 43, 0.3);
}
#BlogPostStream{
    display:flex;
    flex-direction: column;
}

#BlogPostStream .blogpoststream-div{
    width:6px;
    height:6px;
    border-radius: 50%;
    background:#fff;
    margin: 1px;
    
}

#pagelocater-helper{
    margin:15px 0;
    background-color:#202020;
    border-radius: 10px;
    width:100%;
}

.pagelocater-conatainer{
    margin:15px;
}

.blogType-1 {
    background-color: rgb(255, 180, 180);
}

.blogType-0{
    background-color: rgb(180, 255, 211);
}
</style>