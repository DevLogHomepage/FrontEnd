<template>
    <div v-if="blogPostStreamData.length <= 0">t</div>
    <div v-else id="BlogPost">
        <div v-for="i in blogPostStreamData" :key="i.date" class="githubstream-div"> 
            <CircleIndicatorVue :type="1" :postType="i.type"/>
        </div>
    </div>
</template>

<script lang="ts">
import { BlogPostData, BlogPostStreamData } from '@/utils/Types'
import { defineComponent, PropType, ref } from 'vue'
import CircleIndicatorVue from './CircleIndicator.vue'

// import { getTesting } from '@core-graphQL/github'


/**
 * BlogPostStream 정의 부분입니다.
 */
export default defineComponent({
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
    watch:{
        BlogPostData(newBlog,oldBlog){
            console.log("starting")
            let tempDate = this.startingDate;
            const startingDate = new Date(tempDate!.getFullYear(),tempDate!.getMonth(),tempDate!.getDate()-59)

            const blogPostStreamDatas:BlogPostStreamData[] = []
            while(startingDate!.toISOString().split('T')[0] !== tempDate!.toISOString().split('T')[0]){
                // console.log(startingDate,tempDate)
                const blogPostStreamData:BlogPostStreamData = {} as BlogPostStreamData

                const a = tempDate!.toISOString().split('T')[0]
                blogPostStreamData.type = []
                for(const node of newBlog){
                    if(a === node.createdat){
                        blogPostStreamData.type.push(0)
                    }
                    else if(a === node.updatedat){
                        blogPostStreamData.type.push(1)
                    }
                }
                blogPostStreamData.date = a;
                tempDate?.setDate(tempDate?.getDate() - 1);
                blogPostStreamDatas.push(blogPostStreamData)
            }

            console.log("testing",blogPostStreamDatas)
            this.blogPostStreamData = blogPostStreamDatas
        }
    },
    // async mounted() {
    //     const owner = "dennis0324"
    //     const repo = "blogPost"
    //     const path ="tech/a.md"
    //     const branch ="main"
    //     const html = false
    //     const request = this.githubRequest(`repos/${owner}/${repo}/contents/${path}?ref=main`)
    //     const GITHUB_ENCODING__HTML = 'application/vnd.github.VERSION.html'

    //     // const oldRequest = new Request('https://github.com/mdn/content/issues/12959',
    //     // { headers: { 'From': 'webmaster@example.org'}});
    //     // console.log(oldRequest); // "webmaster@example.org"
    //     const testing = this.githubFetch(request).then<FileContentsResponse | string>(response => {
    //         if (response.status === 404) {
    //         throw new Error(`Repo "${owner}/${repo}" does not have a file named "${path}" in the "${branch}" branch.`);
    //         }
    //         if (!response.ok) {
    //         throw new Error(`Error fetching ${path}.`);
    //         }
    //         return html ? response.text() : response.json();
    //     }).then(file => {
    //         console.log(file)
    //         if (html) {
    //         return file;
    //         }
    //         const { content } = file as FileContentsResponse;
    //         const decoded = this.decodeBase64UTF8(content);
    //         console.log(decoded)
    //         return JSON.parse(decoded);
    //     });

    //     console.log(testing)
    // }
})

</script>

<style scoped>

</style>
