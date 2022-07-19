<template>
    <div v-if="blogPostStreamData.length <= 0">t</div>
    <div v-else id="BlogPost">
        <div v-for="i in blogPostStreamData" :class="i.date" :key="i.date" class="githubstream-div"> 
            <CircleIndicatorVue :type="1" :postType="i.type"/>
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
    /** 컴포넌트 시작 설정 부분입니다. */
    setup(){
        const blogPostStreamData = ref<BlogPostStreamData[]>([])
        return{
            blogPostStreamData
        }
    },
    /** 컴포넌트 기본 정의 부분 */
    components:{
        CircleIndicatorVue
    },
    /** 기본 properity의 정의 */
    props:{
        BlogPostData:{
            required:true,
            type:Array as PropType<BlogPostData[]>,
        },
        startingDate:{
            require:true,
            type:Date
        }
    },
    /** 변수를 지속적으로 확인하는 함수를 선언하는 부분입니다. */
    watch:{
        /**
         * BlogPostData가 들어오면 circleIndicator가 사용할 수 있도록 만들어주는 `watch`함수입니다.
         * 
         * @param newBlog 변경된 사항이 있으면 들어오는 매개변수입니다.
         */
        BlogPostData(newBlog){
            /** proxy{} 없애주는 작업입니다. */
            const PostChanged = JSON.parse(JSON.stringify(newBlog))

            const date = this.startingDate as Date;
            let tempDate = new Date(date.getFullYear(),date.getMonth(),date.getDate());
            const startingDate = new Date(tempDate.getFullYear(),tempDate.getMonth() - 2,tempDate.getDate())

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
            this.blogPostStreamData = blogPostStreamDatas
        }
    },
})

</script>

<style scoped>

</style>
