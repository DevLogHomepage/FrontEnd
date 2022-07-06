<template>
    <main>
        <div id="tech" class="tech" :class="[theme ? 'dark' : 'light']">
            <div class="tech-container">
                <PageLocater />
                <div class="posts">
                    <div v-if="response!.length <= 0">
                        로딩중입니다.
                    </div>
                    <div v-else v-for="node in response" :key="node.name" class="blogPost">
                        <div class="blogPost-container">
                            <div class="blogPost-create">
                                <div class="blogPost-create-title">제작한 날짜</div>
                                <div class="blogPost-create-content">{{node.createdat}}</div>
                            </div>
                            <div class="blogPost-update">
                                <div class="blogPost-create-title">업데이트 날짜</div>
                                <div class="blogPost-create-content">{{node.updatedat}}</div>
                            </div>
                        </div>
                        <div class="blogPost-title">{{node.titleData.title}}</div>
                        <div v-html="node.content"></div>
                        <div>{{node.titleData.tags}}</div>
                    </div>
                </div>

            </div>

        </div>
    </main>
    <footer>
        <div id="footer">
            <LogoDiv />
        </div>
    </footer>

</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { BlogPostData } from '@/utils/Types';
import PageLocater from '@/components/PageLocator.vue'
import * as grapqhl from '@core-graphQL/github'
import LogoDiv from '@/components/LogoDiv.vue';

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
        PageLocater,
        LogoDiv
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

    /** 블로그 포스트 기본 정보 관련 css */
    .blogPost-container{
        display: flex;
    }
    
    /** 블로그 포스트 제목 관련 css */
    .blogPost-title{
        font-size: 40px;
    }
    .blogPost-update{
        margin:10px;
    }
    .blogPost-create{
        margin:10px;
    }

    .dark .blogPost-create-title{
        color:#479CDC;
    }
    .dark .blogPost-create-content{
        color:#fff;
        font-size: 25px;
    }

    .light .blogPost-create-title{
        color:#878787;
        font-size: 15px;
    }
    .light .blogPost-create-content{
        color:#000000;
        font-size: 25px;

    }

    /* 스크롤바 설정*/
    .posts::-webkit-scrollbar{
        width: 6px;
    }

    /* 스크롤바 막대 설정*/
    .posts::-webkit-scrollbar-thumb{
        height: 17%;
        background-color: rgba(255,255,255,1);
        /* 스크롤바 둥글게 설정    */
        border-radius: 10px;    
    }

    /* 스크롤바 뒷 배경 설정*/
    .posts::-webkit-scrollbar-track{
        background-color: rgba(0,0,0,0);
    }


    /** tech view 페이지 조정 */

    #tech{
        height:100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    /** 블로그 사진 크기 조정 */
    .posts >>> img{
        width:45vw;
    }

    /** 블로그 개시글 관련 css */
    .blogPost{
        margin:50px 0;
        padding: 70px 0;
        border-bottom: solid 1px #707070;
    }


    /** 테크 내용이 들어갈 컨테이너입니다. */
    .tech-container{
        display:flex;
    }

    /** 블로그 포스팅 */
    .posts{
        height:80vh;
        width:50vw;
        overflow-y: scroll;
        padding: 10px;
        
    }
    /** 블로그 코드 블럭 css */
    .blogPost >>> pre code{
        text-align: left !important;
        border-radius: 5px;
        background-color: transparent;
    }
    /** 블로그 코드 블럭 */
    .blogPost >>> pre{
        text-align: left !important;
        border-radius: 5px;
        padding: 10px;
        background-clip: border-box;
    }

    .light .blogPost >>> pre{
        background-color: #878787;

    }
    
    .dark .blogPost >>> pre{
        background-color: #222222;
    }

    #footer{
        width:100%;
        height:100%;
        display:flex;
        align-items: center;
    }

    #LogoDiv{
        margin-left:2vw;

    }
</style>