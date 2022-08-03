
<!-- 
    페이지 만들때 처음부터 그냥 2개로 쪼개서 표시
 -->
<template>
    <main>
        <div id="tech" class="tech" :class="[theme ? 'dark' : 'light']">
            <div class="tech-container">

                <div class="left-sidebar">
                    <SearchBox/>
                    <!-- <PageLocater 
                        :blogPostDataMap="blogPostDataMap" 
                        :data="{
                            currentDate:currentDate,
                            watchingPage:watchingPage,
                            currentContents:currentContents
                        }"
                        /> -->
                </div>
                <div class="post-container">
                    <div v-if="currentContents.get().length <= 0" class="loading posts">
                        <img src="@/assets/loading-dark.gif" alt="" >
                    </div>
                    <div v-else class="posts" @scroll="handleScroll">
                        <div v-for="(nodeTemp,index) in currentContents.get()" :key="index">
                            <div  v-for="node in nodeTemp" :key="node.name" class="blogPost countPost" v-on:load="addSections">
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
                                <div class="divider"></div>
                                <div id="blog-footer">
                                    <div id="blog-footer-title">tag</div> 
                                    <div id="tag-container">
                                        <div v-for="(i,index) in node.titleData.tags" :key="index" id="tag">{{i}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div v-if="!(page.current==page.total -1) " id="infinite-loading" class="flex-horizontal countPost" ><img src="@/assets/loading-dark.gif" alt="" ></div>
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
import * as blog from '@/core/blog'
import LogoDiv from '@/components/LogoDiv.vue';
import SearchBox from '../components/SearchBox.vue';
import BlogPostDataClass from '@/classes/BlogPostData';
import CurrentContents from '@/classes/CurrentConents'

export interface Page{
    loading:number,
    current:number,
    total:number,
    watching:number
}

export interface Post{
    sections:HTMLElement[],
    container:HTMLElement | undefined,
    yPos:number,
    index:number
}

/**
 * TechView의 정의 부분입니다.
 */
export default defineComponent({
    /** 컴포넌트 이름의 정의입니다. */
    name: 'TechView',
    /** 컴포넌트 시작 설정 부분입니다. */
    setup(){
        /** 로딩 후에 생성되는 htmlElement 관리 refer입니다. */
        //post 섹션
        const currentDate = ref<string>('');

        const post = ref<Post>({sections:[],container:undefined,yPos:0,index:0});

        /**  */
        const page = ref<Page>({loading:0,current:0,total:0,watching:0} as Page)

        const blogPostData = ref<BlogPostDataClass>(new BlogPostDataClass());

        // const blogStreamIndiData = ref<BlogPostStreamData[][]>([]);
        const currentContents = ref<CurrentContents>(new CurrentContents());
        return {
            blogPostData,
            currentContents,

            page,

            post,

            currentDate,
        }
    },
    /** 컴포넌트 기본 정의 부분 */
    components:{
    // PageLocater,
        LogoDiv,
        SearchBox,
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
        
        return {
            perChunk:7,
            basicBlogInfo: {owner:'dennis0324',repo:'blogPost',path:'tech'},
        }
    },
    /** VIEW가 사용하는 메소드를 정의하는 부분입니다. */
    methods:{
        /**
         * 
         */
        async settingTechView(){
            /** 받아온 데이터를 1주일 단위로 분해해서 반환받습니다. */
            const tempTitle = await blog.getBlogTitles(this.basicBlogInfo);
            this.blogPostData.setMap(tempTitle)
            console.log(this.blogPostData.splitWeek())
            const data = blog.getPageInfo(this.blogPostData.splitWeek(),this.page.loading)
            this.getCurrentPage(data.blogPosts)
            this.setTotalPage()
            this.blogPostData.splitMonth()
            if(this.page.current !== this.page.loading)
                this.page.current++;
        },

        /**
         * 매달로 쪼개진 배열 만들어서 저장합니다. 
         * 
         * @param titles 블로그 포스트 내용을 받아오기 위해 받아온 포스트 기본 정보입니다.
         */
        async getCurrentPage(titles:BlogPostData[]){
            const temp = await blog.getCurrentPage(this.basicBlogInfo,titles)
            console.log("contentTemp",temp)
            this.currentContents.push(temp)
            
            this.$nextTick(() => {
                this.addSections();
            });
        },

        /**
         * 스크롤 이벤트를 헨들링해주는 함수입니다.
         * 
         * @param event 스크롤 이벤트가 들어오는 매개변수입니다.
         */
        handleScroll(event:Event){
            this.post.yPos = (event.target as HTMLElement).scrollTop

            this.post.sections.forEach((section,index) => {
                const htmlElement = section as HTMLElement
                let top = (this.post.container as HTMLElement).scrollTop;
                let offset = htmlElement.offsetTop - 150;
                let height = htmlElement.offsetHeight;

                if (top >= offset && top < offset + height){
                    this.post.index = index
                }
                console.log(this.post.index)
            })

            let bottom = (this.post.container as HTMLElement).scrollHeight - (this.post.container as HTMLElement).clientHeight - (this.post.yPos as number)

            if(bottom == 0){
                if(this.page.loading === this.page.current){
                    
                    if(this.page.current < this.page.total - 1){
                        console.log("bottom")
                        this.page.loading++
                        this.settingTechView()
                    }
                }
            }
        },

        /**
         * 섹션이 나오면 감지후 추가해줍니다.
         */
        addSections(){
            const sections = document.querySelectorAll(".countPost");
            const posts = document.querySelector(".posts")
            this.post.sections = [...sections.values()] as HTMLElement[]
            this.post.container = posts as HTMLElement 

        },

        /**
         * 현재의 날짜를 설정해줍니다.
         * @param date `ISOstring의 형식으로 `T`의 앞부분을 string 값으로 받습니다.
         */
        setCurrentDate(date:string){
            const startOfWeek = blog.returnIncludeMonth(new Date(date))
            this.currentDate = blog.getFrontDate(startOfWeek)
        },

        /**
         * 블로그의 전체 페이지를 설정합니다.
         * 
         * @param blogPostDataMap 날짜와 그 주에 해당하는 블로그 포스트가 저장된 변수를 매겨변수로 받습니다.
         */
        setTotalPage(){
            this.page.total = this.blogPostData.splitWeek().length
        },

    },
    /** 컴포넌트 생성시에 실행되는 함수입니다. */
    async mounted() {
        this.settingTechView()
    },
    watch:{
        /**
         * 현재 포스트 내용이 바뀌면 실행됩니다.
         */
        currentContents:{
            handler: function() {
                this.$nextTick(() => {
                    this.addSections();
                });
            },
            deep: true
        },
        /** 
         * 현재 `post`와 관련된 내용이 변경될 경우 수정합니다.
         */
        post:{
            handler:function(){
                this.page.watching = blog.getPageIndex(this.blogPostData.splitMonth(),this.post.index)
            },
            deep:true
        }
    }
})
</script>

<style scoped>
    .divider{
        margin:20px 0;
        width:100%;
        height:1px;
    }

    .dark .divider{
        background-color: #707070;
    }

    .light .divider{
        background-color: #000000;
    }
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

    .post-container{
        height:100%;
    }
    /** 블로그 포스팅 */
    .posts{
        height:75vh;
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

    #tag-container{
        display:flex;
    }

    .dark #tag{
        margin:5px;
        background-color: #fff;
        color:#000000;
        padding:5px;
        border-radius: 2px;
    }

    #blog-footer-title{
        padding:5px;
        font-size: 20px;
    }

    #pagination{
        height: 5vh;
        display:flex;
        align-items: center;
        justify-content: center;
    }

    #infinite-loading{
        justify-content: center;
    }
    #infinite-loading img{
        width:200px;
    }
</style>