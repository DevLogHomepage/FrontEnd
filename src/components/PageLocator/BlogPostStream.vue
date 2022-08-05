<template>
    <div v-if="postStreamData.length <= 0"></div>
    <div v-else id="BlogPost">
        <div v-for="(i,index) in postStreamData" class="blogstream-div-week" :key="index"> 
            <div v-for="j in i" :class="j.date" :key="j.date" class="blogstream-div blog" >
                <CircleIndicatorVue :type="1" :postType="j.type"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { BlogPostData, BlogPostStreamData } from '@/utils/Types'
import { defineComponent, PropType, ref } from 'vue'
import CircleIndicatorVue from './CircleIndicator.vue'


export interface Data{
    currentDate:string,
    blogPostData:BlogPostData[]
}

/**
 * BlogPostStream 정의 부분입니다.
 */
export default defineComponent({
    /** 컴포넌트 이름의 정의입니다. */
    name:"BlogPostStream",
    /** 컴포넌트 기본 정의 부분 */
    components:{
        CircleIndicatorVue
    },
    /** 기본 properity의 정의 */
    props:{
        postStreamData:{
            required:true,
            type:Array as PropType<BlogPostStreamData[][]>
        }
    },
    data(){
        return{
            perChunk:7
        }
    },
})

</script>

<style scoped>

</style>
