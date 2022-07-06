<template>
    <div id="pagelocater">
        <div id="pagelocater-indicator">
            <GithubStream/>
            <div id="MainStream">
                <div v-for="i in 60" :key="i" class="mainstream-div"></div>
            </div>
        <BlogPostStream/>
        </div>
        <div class="date-indicator">Recent Post: {}</div>
        <div class="date-indicator">Post in a Row : {}</div>
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
    margin: 0 50px;
    padding: 0 50px;
    flex-direction: column;
    align-items: center; 
}

.date-indicator{
    margin:5px 0;
}
#pagelocater-indicator{
    display:flex;
    margin: 0 50px;
    padding: 0 50px;
    border-right: solid 1px #707070;
    
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
    margin: 1px;
}
.dark #MainStream .mainstream-div{

    background-color:#fff;
    
}
.light #MainStream .mainstream-div{
    background-color:#2B2B2B;
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