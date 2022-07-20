<template>
    <div id="pagelocater">
        <div id="pageContainer">
            <WeekIndicator :pageWeek="1" :pageDay="2"/>
            <div id="pagelocater-indicator">
                <GithubStream :startingDate="Today"/>
                <div id="MainStream">
                    <div v-for="i in 62" :key="i" :class="['mainstream-div',(i < circleCount) ? 'on' : 'off']"></div>
                </div>
                <BlogPostStream :startingDate="Today" :BlogPostData="BlogPostData"/>
            </div>
        </div>

        <div class="date-indicator">Recent Post: {}</div>
        <div class="date-indicator">Post in a Row : {}</div>
    </div>

</template>

<script lang="ts">
import { defineComponent, Prop, PropType, ref } from 'vue'

import GithubStream from './PageLocator/GithubStream.vue'
import BlogPostStream from './PageLocator/BlogPostStream.vue'
import WeekIndicator from './PageLocator/WeekIndicator.vue'
import { BlogPostData, BlogPostDataYear } from '@/utils/Types';

import * as blog from '@/core/blog'

export default defineComponent({
    /** 컴포넌트 이름의 정의입니다. */
    name: "PageLocater",
    /** 컴포넌트 시작 설정 부분입니다. */
    /** 현재 달과 지난 달의 총 일수를 구합니다. */
    setup(){
        const Today = new Date()
        const tempMonth = new Date(Today.getFullYear(),Today.getMonth() - 2,Today.getDate())
        let difference  = Today.getTime() - tempMonth.getTime();
        const dayCount = Math.ceil(difference / (1000 * 3600 * 24));
        console.log(dayCount)
        const circleCount = ref<number>(dayCount);
        return{
            Today,
            circleCount
        }
    },
    data() {
        return {
            contribute: ""
        };
    },
    components: { 
        GithubStream,
        BlogPostStream,
        WeekIndicator
    },
    props:{
        BlogPostData:{
            required:true,
            type:Array as PropType<BlogPostData[]>
        },
        BlogPostDataYear:{
            required:true,
            type:Array as PropType<BlogPostDataYear[]>
        },
        currentDate:{
            require:true,
            type:Date
        }
    },
    watch:{
        currentDate(newValue:Date){
            if(this.BlogPostDataYear !== undefined){
                this.updateIndicator()
            }
            // const secondMonth = this.BlogPostDataYear[TODAY.getFullYear() - secondDate.getFullYear()].data[secondDate.getMonth()].data

            // firstMonth = firstMonth.concat(secondMonth)
            // console.log(firstMonth)
        },
        BlogPostDataYear(newValue:BlogPostDataYear[]){
            if(this.BlogPostDataYear !== undefined){
                this.updateIndicator()
            }
        }
    },
    methods:{
        updateIndicator(){
            if(this.BlogPostDataYear.length <= 0){
                return
            }
            console.log("testing",this.BlogPostDataYear)
            const TODAY = new Date()
            const currentDate = this.currentDate as Date
            console.log(currentDate)
            let secondDate = new Date(currentDate)
            secondDate.setMonth(currentDate.getMonth() - 1)


            let firstMonth = this.BlogPostDataYear[TODAY.getFullYear() - currentDate.getFullYear()].data[currentDate.getMonth()].data
            console.log(firstMonth)
            const secondMonth = this.BlogPostDataYear[TODAY.getFullYear() - secondDate.getFullYear()].data[secondDate.getMonth()].data
            console.log(secondMonth)

            this.Today = blog.returnIncludeMonth(currentDate)
            console.log(this.Today)
        }
    }

})
</script>

<style scoped>


#pagelocater{
    display:flex;
    margin: 0 50px;
    padding: 0 50px;
    flex-direction: column;
    align-items: center; 
    border-right: solid 1px #707070;
}

#pageContainer{
    margin: 0 50px;
    padding: 0 50px;
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

#MainStream .mainstream-div{
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


</style>