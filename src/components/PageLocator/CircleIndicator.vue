<template>
    <div v-if="type === GITHUB" id="CircleIndicator-container">
        <div v-if="level == 0" class="githubLevel-0"></div>
        <div v-else v-for="i in level" :class="'githubLevel-'+i" :key="i"></div>
    </div>
    <div v-else id="CircleIndicator-container">

    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
    name:'CircleIndicator',
    setup(){
        const level = ref<number>(0);
        return {
            level
        }
    },
    data(){
        return{
            GITHUB: 0,
            BLOG: 1
        }
    },
    created(){
        if(this.contributionLevel === 'NONE') 
            this.level = 0
        else if(this.contributionLevel === 'FIRST_QUARTILE')
            this.level = 1
        else if(this.contributionLevel === 'SECOND_QUARTILE')
            this.level = 2
        else if(this.contributionLevel === 'THIRD_QUARTILE')
            this.level = 3
        else if(this.contributionLevel === 'FOUTRH_QUARTILE')
            this.level = 4
    },
    props:{
        date:{
            required: true,
            type: String as PropType<string | undefined>
        },
        contributionLevel:{
            required: true,
            type: String as PropType<string | undefined>
        },
        type:{
            required: true,
            type: Number
        }
    },

})
</script>

<style scoped>
#CircleIndicator-container{
    display:flex;
    flex-direction:row-reverse;
}

.githubLevel-0{
    width:6px;
    height:6px;
    margin:1px;
}
.githubLevel-1,
.githubLevel-2,
.githubLevel-3,
.githubLevel-4{
    width:6px;
    height:6px;
    margin:1px;
    border-radius: 50%;
}

.githubLevel-1{
    background-color:#0e4429;
}
.githubLevel-2{
    background-color:#006d32;
}

.githubLevel-3{
    background-color:#26a641;
}
.githubLevel-4{
    background-color:#39d353;
}
</style>
