<template>
    <div v-if="type === GITHUB" id="CircleIndicator-container">
        <div v-if="level == 0" class="githubLevel-0"></div>
        <div v-else v-for="i in level" :class="'githubLevel-'+i" :key="i"></div>
    </div>
    <div v-else id="CircleIndicator-container">
        <div v-if="typeLevel.length === 0" class="blogType-2"></div>
        <div v-else v-for="i in typeLevel" :class="'blogType-'+i" :key="i"></div>
    </div>
</template>

<script lang="ts">
import { propsToAttrMap } from '@vue/shared';
import { defineComponent, PropType, ref } from 'vue'

/**
 * CircleIndicator를 정의하는 부분입니다.
 */
export default defineComponent({
    /** 컴포너늩의 이름을 정의하는 부분입니다. */
    name:'CircleIndicator',
    /** 컴포넌트를 초기화시 실행하는 부분입니다. */
    setup(){
        /** 블로그 깃허브 contribution에 사용하는 레벨입니다. */
        const level = ref<number>(0);
        const typeLevel = ref<number[]>([]);
        return {
            level,
            typeLevel
        }
    },
    /** 데이터를 사용할 경우 필요한 데이터를 정의하는 부분입니다. */
    data(){
        return{
            GITHUB: 0,
            BLOG: 1
        }
    },
    /** 컴포넌트 생성시에 실행되는 부분입니다. */
    created(){
        if(this.type === 0){
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
        }
        else{
            this.typeLevel = this.postType!
        }

    },
    /** 컴포넌트가 생성시에 필요한 properity를 정의하는 부분입니다. */
    props:{
        date:{
            type: String as PropType<string | undefined>
        },
        contributionLevel:{
            type: String as PropType<string | undefined>
        },
        type:{
            required: true,
            type: Number
        },
        postType:{
            type:Array as PropType<number[]>
        }
    },

})
</script>

<style scoped>

/** 깃허브 혹은 블로그 원형 인디케이터를 정의하는 css입니다. */
#CircleIndicator-container{
    display:flex;
    flex-direction:row-reverse;
}
/** 깃허브 0단계 표시 관련 css입니다. */
.githubLevel-0{
    width:6px;
    height:6px;
    margin:1px;
}
/** 깃허브 1,2,3,4,단계 표시 관련 css입니다. */
.githubLevel-1,
.githubLevel-2,
.githubLevel-3,
.githubLevel-4{
    width:6px;
    height:6px;
    margin:1px;
    border-radius: 50%;
}


.blogType-0,
.blogType-1,
.blogType-2
{
    width:6px;
    height:6px;
    margin:1px; 
    border-radius: 50%; 
}
.blogType-0{
    background-color: rgb(180, 255, 211);
}

.blogType-1{
    background-color: rgb(255, 180, 180);
}

/** 깃허브 1단계 색 관련 css입니다. */
.githubLevel-1{
    background-color:#0e4429;
}

/** 깃허브 2단계 색 관련 css입니다. */
.githubLevel-2{
    background-color:#006d32;
}

/** 깃허브 3단계 색 관련 css입니다. */
.githubLevel-3{
    background-color:#26a641;
}

/** 깃허브 4단계 색 관련 css입니다. */
.githubLevel-4{
    background-color:#39d353;
}
</style>
