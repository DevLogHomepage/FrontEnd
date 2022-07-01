<template>
    <div id="pagelocater">
        <GithubStream/>
        <div id="MainStream">
            <div v-for="i in 60" :key="i" class="mainstream-div"></div>
        </div>
        <BlogPostStream/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import GithubStream from './PageLocator/GithubStream.vue'
import BlogPostStream from './PageLocator/BlogPostStream.vue'

export default defineComponent({
    name: "PageLocater",
    data() {
        return {
            contribute: ""
        };
    },
    components: { 
        GithubStream,
        BlogPostStream
    },

})
</script>

<style scoped>
#pagelocater{
    display:flex;
    
}
#GithubStream{
    display:flex;
    flex-direction: column;
    
}
#MainStream{
    display:flex;
    flex-direction: column;
}

#MainStream .mainstream-div{
    width:6px;
    height:6px;
    border-radius: 50%;
    background:#fff;
    margin: 1px;
    
}
#BlogPostStream{
    display:flex;
    flex-direction: column;
}

#BlogPostStream .blogpoststream-div{
    width:6px;
    height:6px;
    border-radius: 50%;
    background:#fff;
    margin: 1px;
    
}


</style>