
<template>
    <main>
        <div id="tech" class="tech" :class="[theme ? 'dark' : 'light']">
            <div class="tech-container">

                <div class="left-sidebar">
                    <SearchBox/>
                    <PageLocater :datas="{
                        blogPostDataYear:monthlyTitle,
                        watchingPostIndex:watchingPostIndex}" 
                        :page="page" :ready="ready" :currentDate="currentDate" :blogPostDataMap="(blogPostDataMap)" :currentContents="currentContents"/>
                </div>
                <div v-if="currentContents!.length <= 0" class="loading">
                    로딩중입니다.
                </div>
                <div v-else>
                    <div  class="posts" @scroll="handleScroll">
                        <div  v-for="node in currentContents" :key="node.name" class="blogPost" v-on:load="addSections">
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
                            <div class="blog-title">{{node.titleData.title}}</div>
                            <div v-html="node.content"></div>
                            <div>{{node.titleData.tags}}</div>
                        </div>
                    </div>
                </div>
                <div >
                    <button @click="decreaseNumber"></button>
                    {{page + 1}}/{{totalPage}}
                    <button @click="increaseNumber"></button>
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
import { BlogPostData, BlogPostDataBasicInfo, BlogPostDataYear, BlogPostStreamData, TypeTime } from '@/utils/Types';
import PageLocater from '@/components/PageLocator.vue'
import * as blog from '@/core/blog'
import LogoDiv from '@/components/LogoDiv.vue';
import * as github from '@/core/github';
import SearchBox from '../components/SearchBox.vue';

/**
 * TechView의 정의 부분입니다.
 */
export default defineComponent({
    /** 컴포넌트 이름의 정의입니다. */
    name: 'TechView',
    /** 컴포넌트 시작 설정 부분입니다. */
    setup(){
        const TODAY = new Date()
        /** 월마다 나눈 블로그 포스트 배열입니다. */
        const monthlyTitle = ref<BlogPostDataYear[]>([]);

        const totalPage = ref<number>(0)
        const postSections = ref<HTMLElement[]>([])
        const posts = ref<HTMLElement>()
        const watchingPostIndex = ref<number>(0);
        
        /** 본 사이트가 로딩을 완료하기 위해 정보의 다운이 끝났을 경우 사용하는 boolean 변수 */
        const ready = ref<boolean>(false);


        const blogPostDataMap = ref<Map<string, BlogPostData[]>>(new Map());

        const currentDate = ref<string>('');
        const blogStreamIndiData = ref<BlogPostStreamData[][]>([]);
        const currentContents = ref<BlogPostData[]>([]);
        return {
            blogPostDataMap,
            currentContents,
            currentDate,
            monthlyTitle,
            totalPage,
            postSections,
            posts,
            watchingPostIndex,
            ready,


            blogStreamIndiData
        }
    },
    /** 컴포넌트 기본 정의 부분 */
    components:{
    PageLocater,
    LogoDiv,
    SearchBox
},
    /** 기본 properity의 정의 */
    props :{
        theme: {
            required: true,
            type : Boolean as PropType<boolean>,
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
            page,
            perChunk:7,
            basicBlogInfo: {owner:'dennis0324',repo:'blogPost',path:'tech'}
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

            this.postSections.forEach((section,index) => {
                const htmlElement = section as HTMLElement
                let top = (this.posts as HTMLElement).scrollTop;
                let offset = htmlElement.offsetTop - 150;
                let height = htmlElement.offsetHeight;


                if (top >= offset && top < offset + height){
                    this.watchingPostIndex = index
                }
            })
        },
        increaseNumber(){
            if(this.page < this.totalPage - 1)
                this.page++

        },
        decreaseNumber(){
            if(this.page > 0)
                this.page--
        },
        addSections(){
            const sections = document.querySelectorAll(".blogPost");
            const posts = document.querySelector(".posts")
            this.postSections = [...sections.values()] as HTMLElement[]
            this.posts = posts as HTMLElement 
        },
        async setBlogPost(){

            /** 받아온 데이터를 1주일 단위로 분해해서 반환받습니다. */
            this.blogPostDataMap = await blog.getBlogPost(this.basicBlogInfo);
            const [date,titles] = blog.getPageInfo(this.blogPostDataMap,this.page)
            this.setTotalPage(this.blogPostDataMap)
            this.setCurrentDate(date)
            this.setCurrentContents(titles)
            this.ready = true
        },
        /**
         * 매달로 쪼개진 배열 만들어서 저장합니다. 
         * 
         * @param titles 블로그 포스트 내용을 받아오기 위해 받아온 포스트 기본 정보입니다.
         */
        async setCurrentContents(titles:BlogPostData[]){
            console.log("titles",titles)
            this.currentContents = await blog.getCurrentPage(this.basicBlogInfo,titles)
        },
        /**
         * 블로그 좌측에 인디게이터를 띄우기 위해서 사용하는 함수입니다.
         * 
         * @param blogPostDataMap 날짜와 그 주에 해당하는 블로그 포스트가 저장된 변수를 매겨변수로 받습니다.
         */
        // setCurrentContents(blogPostDataMap:Map<string, BlogPostData[]>){
        //     console.log("blogPostDataMap",blogPostDataMap)

        //     this.monthlyTitle = github.displayIndicator(blogPostDataMap)
        //     // this.setBlogIndicaterData(blogPostDataMap)

        //     console.log("monthlyTitle",this.monthlyTitle)
        // },
        /**
         * 현재의 날짜를 설정해줍니다.
         * @param date `ISOstring의 형식으로 `T`의 앞부분을 string 값으로 받습니다.
         */
        setCurrentDate(date:string){
            const startOfWeek = blog.returnIncludeMonth(new Date(date))
            console.log(blog.getFrontDate(startOfWeek))
            this.currentDate = blog.getFrontDate(startOfWeek)
        },
        /**
         * 블로그의 전체 페이지를 설정합니다.
         * 
         * @param blogPostDataMap 날짜와 그 주에 해당하는 블로그 포스트가 저장된 변수를 매겨변수로 받습니다.
         */
        setTotalPage(blogPostDataMap:Map<string, BlogPostData[]>){
            this.totalPage = [...blogPostDataMap.values()].length
        },
        

    },
    /** 컴포넌트 생성시에 실행되는 함수입니다. */
    async mounted() {
        this.setBlogPost()
        // const TODAY = new Date()
        // this.currentDate = blog.getFrontDate(TODAY)
        // this.setBlogIndicaterData()
    },
    watch:{
        page(){
            this.setBlogPost()
        },
        currentPage(){
            this.$nextTick(() => {
                this.addSections();
            });
        }
    }
})
</script>

<style scoped>
    
    .blog-title{
        font-size: 45px;
    }
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
        object-fit: cover;
        max-width: 45vw;
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

    .left-sidebar{
        display: flex;
        flex-direction: column;
        margin: 0 50px;
        padding: 0 100px;
        border-right: solid 1px #707070;

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