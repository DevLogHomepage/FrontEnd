<template>
    <div v-if="blogPostStreamData.length <= 0">t</div>
    <div v-else id="BlogPost">
        <div v-for="(i,index) in blogPostStreamData" class="blogstream-div-week" :key="index"> 
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
        blogPostStreamData:{
            required:true,
            type:Array as PropType<BlogPostStreamData[][]>
        },
        ready:{
            required:true,
            type:Boolean
        }
    },
})

</script>

<style scoped>

</style>
