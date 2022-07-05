<template>
    <div class="tech" :class="[theme ? 'dark' : 'light']">
        <h1>This is an tech page</h1>
        <div v-if="response!.length <= 0">
            블로그가 없습니다.
        </div>
        <div v-else v-for="node in response" :key="node.name" class="blogPost">
            <div v-html="node.content"></div>
        </div>
        <PageLocater />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import PageLocater from '@/components/PageLocator.vue'
import * as grapqhl from '@core-graphQL/github'
import { BlogPostData } from '@/utils/Types';
import hljs from 'highlight.js'

export default defineComponent({
    name: 'TechView',
    setup(){
        const response = ref<BlogPostData[]>([]);
        return {
            response
        }
        // const date = new Date();
        // let currentMonth = new Date(date.getFullYear(),date.getMonth(),1);
        // let nextMonth = new Date(date.getFullYear(),date.getMonth() + 1,1);
        // let difference  = nextMonth.getTime() - currentMonth.getTime();
        // const dayCount = Math.ceil(difference / (1000 * 3600 * 24));
    },
    components:{
        PageLocater
    },
    props :{
        theme: {
            required: true,
            type : Boolean as PropType<boolean>,

        }
    },
    async mounted() {
        const path ="tech"
        this.response = await grapqhl.getPostUpdate({owner:'dennis0324',repo:'blogPost',path:path},'tech');
    }
});



</script>


<style scoped>
    .dark .tech{
        color:#fff;
    }

    .blogPost{
        margin:50px;
    }


    .blogPost >>> pre code{
        text-align: left !important;
        border-radius: 5px;
        padding:10px;

    }

    .blogPost >>> pre{
        text-align: left !important;
        border-radius: 5px;
        background-color: #222222;
    }
</style>