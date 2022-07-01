<template>
    <div class="tech" :class="[theme ? 'dark' : 'light']">
        <h1>This is an tech page</h1>
        <PageLocater />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import PageLocater from '@/components/PageLocator.vue'
import { GITHUB_TOKEN } from '@/../config'
import { RequestInit, PostTile, FolderResponse } from '@/Type'

export default defineComponent({
    name: 'TechView',
    setup(){
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
    methods: {
        githubRequest(relativeUrl: string) {
            let init = {} as RequestInit
            init.mode = 'cors';
            init.cache = 'no-cache'; // force conditional request
            const request = new Request('https://api.github.com/' + relativeUrl,{cache:'no-cache',mode:'cors'});
            request.headers.set('Accept', 'application/vnd.github.v3+json');
            request.headers.set('Authorization', `token ${GITHUB_TOKEN}`);
        return request;
        },
        githubFetch(request: Request): Promise<Response> {
            return fetch(request).then(response => {
                if (response.status === 401) {
                    console.log()
                }
                if (response.status === 403) {
                    response.json().then(data => {
                        if (data.message === 'Resource not accessible by integration') {
                            window.dispatchEvent(new CustomEvent('not-installed'));
                }
            });
            }

            // processRateLimit(response);

            if (request.method === 'GET'
                    && [401, 403].indexOf(response.status) !== -1
                    && request.headers.has('Authorization')
                ) {
                request.headers.delete('Authorization');
                    return this.githubFetch(request);
                }
                return response;
            });
        
        },
        decodeBase64UTF8(encoded: string) {
            encoded = encoded.replace(/\s/g, '');
            return decodeURIComponent(atob(encoded));
        }
    },
    async mounted() {
        const owner = "dennis0324"
        const repo = "blogPost"
        const path ="tech"
        const branch ="main"
        const request = this.githubRequest(`repos/${owner}/${repo}/contents/${path}?ref=main`)

        // const oldRequest = new Request('https://github.com/mdn/content/issues/12959',
        // { headers: { 'From': 'webmaster@example.org'}});
        // console.log(oldRequest); // "webmaster@example.org"
        const testing = await this.githubFetch(request)
        if (testing.status === 404) {
        throw new Error(`Repo "${owner}/${repo}" does not have a file named "${path}" in the "${branch}" branch.`);
        }
        if (!testing.ok) {
        throw new Error(`Error fetching ${path}.`);
        }
        let file = await testing.json() as FolderResponse[] | string
        let arr:FolderResponse[] = file as FolderResponse[]
        let PostTile:PostTile[] = []
        for(const i of arr){
            const temp = {
                name: i.name,
                path: i.path
            }
            PostTile.push(temp)
        }
        console.log(PostTile)
    }
});



</script>


<style scoped>
    .dark .tech{
        color:#fff;
    }
</style>