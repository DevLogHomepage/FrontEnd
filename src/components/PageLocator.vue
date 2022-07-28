<template>
    <div id="pagelocater">
        <div id="pageContainer">
            <WeekIndicator :pageWeek="pageWeek" :pageDay="pageDay"/>
            <div id="pagelocater-indicator">
                <GithubStream :startingDate="Today"/>
                <div id="MainStream">
                    <div v-for="i in 62" :key="i" :class="['mainstream-div',(i < circleCount) ? 'on' : 'off']"></div>
                </div>
                <BlogPostStream :startingDate="Today" :blogPostStreamData="blogPostStreamData" :ready="ready"/>
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
import { defineComponent, PropType, ref } from 'vue'

import GithubStream from './PageLocator/GithubStream.vue'
import BlogPostStream from './PageLocator/BlogPostStream.vue'
import WeekIndicator from './PageLocator/WeekIndicator.vue'
import { BlogPostData,  BlogPostStreamData } from '@/utils/Types';

import * as blog from '@/core/blog'

export default defineComponent({
    /** 컴포넌트 이름의 정의입니다. */
    name: "PageLocater",
    /** 컴포넌트 시작 설정 부분입니다. */
    /** 현재 달과 지난 달의 총 일수를 구합니다. */
    setup(){
        const BlogStreamIndicatorData = ref<BlogPostData[]>([]);
        const tempDate = new Date()
        const Today = ref<string>(blog.getFrontDate(tempDate));
        const tempMonth = new Date(tempDate.getFullYear(),tempDate.getMonth() - 2,tempDate.getDate())
        let difference  = tempDate.getTime() - tempMonth.getTime();
        const dayCount = Math.ceil(difference / (1000 * 3600 * 24));
        const circleCount = ref<number>(dayCount);

        /** ref 관련 선언 */
        const pageWeek = ref<number>(0);
        const pageDay = ref<number>(0);
        const blogPostStreamData = ref<BlogPostStreamData[][]>([])
        return{
            Today,
            circleCount,
            BlogStreamIndicatorData,
            pageWeek,
            pageDay,
            blogPostStreamData
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
        watchingPostIndex: {
            type:Number,
            default:0
        },
        page:{
            type:Number
        },
        currentDate: {
            type:String
        },
        ready:{
            required:true,
            type:Boolean
        },
        blogPostDataMap:{
            required:true,
            type:Object as PropType<Map<string, BlogPostData[]>>
        },
        currentContents:{
            required:true,
            type:Array as PropType<BlogPostData[]>
        }
    },
    watch:{
        currentContents(newValue,oldValue){
            this.setPageWeekDate(this.blogPostStreamData)
        },
        currentDate(){
            this.blogPostStreamData = this.setBlogStreamIndiData(this.setBlogIndicaterData(this.blogPostDataMap))
        },
    },
    methods:{
        setPageWeekDate(date:BlogPostStreamData[][]){
            const compareDate = this.currentContents[this.watchingPostIndex].updatedat.split('T')[0]
            for(const weekIndex in date){
                for(const dayIndex in date[weekIndex]){
                    if(date[weekIndex][dayIndex].date === compareDate){
                        this.pageWeek = parseInt(weekIndex);
                        this.pageDay = parseInt(dayIndex);
                    }
                }
            }
        },

        /**
         * 좌측에 목차를 만들어주기 위해서 일주일별로 저장되는 `map`입니다.
         * 
         * @param blogPostDataMap 일주일을 시작하는 날짜와 그안에 들어가있는 포스트 배열을 저장해줍니다.
         */
        setBlogIndicaterData(blogPostDataMap:Map<string, BlogPostData[]>):BlogPostData[]{
            const arr = [...blogPostDataMap.entries()].filter(([date,_]) => {
                const firstMonth = new Date(this.currentDate as string)
                const secondMonth = new Date(firstMonth)
                const currentDate = new Date(date)
                secondMonth.setMonth(secondMonth.getMonth() - 1)
                if(currentDate.getTime() >= secondMonth.getTime() || currentDate.getTime() <= firstMonth.getTime()){
                    return true
                }
                return false
            })

            const returnValue:BlogPostData[] = []
            for(const [node,blogPostData] of arr){
                for(const e of blogPostData)
                returnValue.push(e)
            }
            return returnValue
        },

        // 일부 받아온 데이터를 2달치를 채운 희소행렬 방식으로 바꿔어줍니다.
        setBlogStreamIndiData(blogPostData:BlogPostData[]){
            const PostChanged = JSON.parse(JSON.stringify(blogPostData))

            const date = new Date(this.currentDate as string);
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

        }
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