
<template>
    <main>
        <div id="tech" class="tech" :class="[theme ? 'dark' : 'light']">
            <div class="tech-container">
                <div class="left-sidebar">
                    <PageLocater :BlogPostData="currentPage" :BlogPostDataYear="currentIndicator" :currentDate="currentDate"/>
                </div>
                <div class="posts" @scroll="handleScroll">
                    <div v-if="currentPage!.length <= 0" class="loading">
                        로딩중입니다.
                    </div>
                    <div v-else v-for="node in currentPage" :key="node.name" class="blogPost">
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
                        <div v-html="node.content"></div>
                    </div>
                    <div>
                        <button></button>
                        {{page + 1}}
                        <button></button>
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
import { BlogPostData, BlogPostDataBasicInfo, BlogPostDataYear } from '@/utils/Types';
import PageLocater from '@/components/PageLocator.vue'
import * as blog from '@/core/blog'
import LogoDiv from '@/components/LogoDiv.vue';
import * as github from '@/core/github';

/**
 * TechView의 정의 부분입니다.
 */
export default defineComponent({
    /** 컴포넌트 이름의 정의입니다. */
    name: 'TechView',
    /** 컴포넌트 시작 설정 부분입니다. */
    setup(){
        const currentPage = ref<BlogPostData[]>([]);
        const currentIndicator = ref<BlogPostDataYear[]>([]);

        const blogPostDataMap = ref<Map<string, BlogPostData[]>>();
        const currentDate = ref<Date>(new Date());
        return {
            blogPostDataMap,
            currentPage,
            currentDate,
            currentIndicator
        }
    },
    /** 컴포넌트 기본 정의 부분 */
    components:{
        PageLocater,
        LogoDiv
    },
    /** 기본 properity의 정의 */
    props :{
        theme: {
            required: true,
            type : Boolean as PropType<boolean>,
        }
    },
    /** VIEW가 사용하는 메소드를 정의하는 부분입니다. */
    methods:{
        /**
         * 스크롤 이벤트를 헨들링해주는 함수입니다.
         * 
         * @param event 스크롤 이벤트가 들어오는 매개변수입니다.
         */
        handleScroll(event:Event){
            this.yPosition = (event.target as HTMLElement).scrollTop
            if((event.target as HTMLElement).scrollTop <= 0){
                console.log()
            }
        }
    },
    /** 이 VIEW가 사용하는 데이터를 정의하는 함수입니다. */
    data(){
        const blogPost = ref<Element>();
        const yPosition = ref<number>();
        const page = ref<number>(0);
        return {
            blogPost,
            yPosition,
            page
        }
    },
    /** 컴포넌트 생성시에 실행되는 함수입니다. */
    async mounted() {
        const basicBlogInfo:BlogPostDataBasicInfo = {owner:'dennis0324',repo:'blogPost',path:'tech'}

        /** 받아온 데이터를 1주일 단위로 분해해서 반환받습니다. */
        this.blogPostDataMap = await blog.getBlogPost(basicBlogInfo);
        console.log(this.blogPostDataMap)
        /** 받아온 데이터를 토대로 현재 페이지에서 포스트를 받아옵니다. */
        const receiveData = blog.getPageInfo(this.blogPostDataMap,this.page)

        /** proxy{} 형태를 일반 배열로 변경해줍니다. */
        const titles =  JSON.parse(JSON.stringify(receiveData[1]))
        this.currentDate = new Date(`${receiveData[0]}`) as Date

        /** 포스트 이름을 받아온 후, 포스트 content를 받아옵니다. */
        this.currentPage = await blog.getCurrentPage(basicBlogInfo,titles)

        this.currentIndicator = github.displayIndicator(this.blogPostDataMap)
        console.log(this.currentIndicator)
        // blog.displayIndicator(this.blogPostDataYears,this.currentDate)
        // this.currentPage = blog.getCurrentPage(this.page,this.BlogPostDataYears)

        
    }
})
</script>

<style scoped>
/** 블로그 포스트 기본 정보 관련 css */
    .blogPost-container{
        display: flex;
    }
    
    /** 블로그 포스트 제목 관련 css */
    .blogPost-title{
        font-size: 40px;
    }
    /** 블로그 포스트 업데이트 날짜 관련 css입니다. */
    .blogPost-update{
        margin:10px;
    }
    /** 블로그 포스트 생성 날짜 관련 css입니다. */
    .blogPost-create{
        margin:10px;
    }
    /** 다크모드에서의 `블로그 생성 날짜` 글씨 관련 css입니다. */
    .dark .blogPost-create-title{
        color:#479CDC;
    }
    /** 다크모드에서의 `블로그 생성 날짜 숫자` 관련 css입니다. */
    .dark .blogPost-create-content{
        color:#fff;
        font-size: 25px;
    }
    /** 라이트모드에서의 `블로그 생성 날짜` 글씨 관련 css입니다. */
    .light .blogPost-create-title{
        color:#878787;
        font-size: 15px;
    }
    /** 라이트모드에서의 `블로그 생성 날짜 숫자` 관련 css입니다. */
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
        margin: 0 50px;
    }

    /** 블로그 사진 크기 조정 */
    .posts:deep(img){
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
        overflow-x: hidden;
    }
    /** 블로그 코드 블럭 css */
    .blogPost:deep(pre code) {
        text-align: left !important;
        border-radius: 5px;
        background-color: transparent;
    }
    /** 블로그 코드 블럭 */
    .blogPost:deep(pre){
        text-align: left !important;
        border-radius: 5px;
        padding: 10px;
        background-clip: border-box;
    }
    /** 라이트 모드에서의 블로그 포스트 코드 블럭 관련 css입니다. */
    .light .blogPost:deep(pre){
        background-color: #878787;

    }
    /** 다크 모드에서의 블로그포스트 코드 블럭 관련 css입니다. */
    .dark .blogPost:deep(pre){
        background-color: #222222;
    }
    /** footer관련 css입니다. */
    #footer{
        width:100%;
        height:100%;
        display:flex;
        align-items: center;
    }
    /** 로고 관련 div에 관련된 css입니다. */
    #LogoDiv{
        margin-left:2vw;

    }
</style>