<template>
    <div v-if="true"></div>
    <div>
        t
    </div>
    <!-- <div v-else id="GithubStream">
        <div v-for="i in githubData.weeks" :key="i" class="githubstream-div"> 
            <div v-for="j in i.contributionDays" :key="j.Date" >
                <CircleIndicatorVue :date="j.date" :contributionLevel="j.contributionLevel" :type="0"/>
            </div>
        </div>
    </div> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { getTesting } from '@core-graphQL/github'

export default defineComponent({
    components:{
        // CircleIndicatorVue
    },
    setup(){
        // const {result} = getTesting()
        // console.log("testing" ,result)
        // let githubData = computed(() => result.value.repository.object.entries ?? [])
        // githubData.value
        // console.log(githubData)
        // watchEffect(() => {
        //     if(result.value !== undefined){
        //         console.log(githubData)
        //     }
        // })

        // return{
        //     githubData,
        //     loading
        // }
        
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
