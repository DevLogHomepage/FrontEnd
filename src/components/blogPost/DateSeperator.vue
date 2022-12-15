<template>
    <div id="DateSeperator_Vue">
        <div v-for="(nodeTemp,index) in posts" :key="index">
            <div v-for="(node,blogPostindex) in nodeTemp" :key="blogPostindex">
                <DateIndicatorVue :date="(Number(node.updatedat.split('-')[2]) as number)"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { BlogPostData } from '@/utils/Types';
import { defineComponent, PropType } from 'vue'
import DateIndicatorVue from './DateIndicator.vue';
export default defineComponent({
    components:{
        DateIndicatorVue
    },
    props:{
        posts:{
            required:true,
            type: Object as PropType<BlogPostData[][]>
        }
    },
    watch:{
        posts(){
            console.log(this.posts);
        }
    },
    mounted(){
        
        console.log(this.posts[0][0].updatedat.split('-')[2])
    }
    // setup() {

    // }
})
</script>

<style scoped>

@media (min-width : 1000px) {
        .logo{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display:flex;

        }
    }
/* 로고(핸드폰) */
@media (max-width: 999px) {
    .logo{
        display:block;
    }
}

@media (max-width: 600px){
    .logo-pic:not(.home) {
        display:none !important;
    }
}

#DateSeperator_Vue{

}
</style>
