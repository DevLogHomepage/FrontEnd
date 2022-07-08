<template>
    <div id="pagelocater">
        <div id="pageContainer">
            <div id="current-week">
                <div id="current-day">

                </div>
            </div>
            <div id="pagelocater-indicator">
                <GithubStream/>
                <div id="MainStream">
                    <div v-for="i in 60" :key="i" class="mainstream-div"></div>
                </div>
                <BlogPostStream/>
            </div>
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

#current-day{
    background-color: rgba(255,187,0,.5);
    height:8px;
    width:100%;
}

#current-week{
    background-color: rgba(255,187,0,.2);
    height:56px;
    width: 72px;
    position: absolute;
}

#pagelocater{
    display:flex;
    margin: 0 50px;
    padding: 0 50px;
    flex-direction: column;
    align-items: center; 
    border-right: solid 1px #707070;
}

#pageContainer{
    margin: 0 50px;
    padding: 0 50px;
    position: relative;
    overflow: hidden;
    width:72px;
    
}
.date-indicator{
    margin:5px 0;
}
#pagelocater-indicator{
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