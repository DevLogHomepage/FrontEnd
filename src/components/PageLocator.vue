<template>
    <div id="pagelocater">
        <div id="GithubStream">
            <div v-for="i in 60" :key="i" class="githubstream-div"></div>
        </div>
        <div id="MainStream">
            <div v-for="i in 60" :key="i" class="mainstream-div"></div>
        </div>
        <div id="BlogPostStream">
            <div v-for="i in 60" :key="i" class="blogpoststream-div"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name:"PageLocater",
    setup() {
        
        return{
            
        }
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