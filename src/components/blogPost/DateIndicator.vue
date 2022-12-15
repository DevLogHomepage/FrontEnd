<template>
    <div id="DateIndicator_Vue">
        <!-- 깃허브 활동 개수 -->
        <div id="section-github">
            <CircleIndicatorVue :contribution-level="level" :type="0"/>
        </div>
        <!-- 현재 날짜 -->
        <div id="section-date" class="center">
            <div v-if="date == -1" class="date date-deactived"/>
            <div v-else class="date date-actived center">
                {{date}}
            </div>
        </div>
        <!-- 블로그 포스팅 개수 -->
        <div>
            <span>
                {{blogPostCount}}
            </span>
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CircleIndicatorVue from '../common/CircleIndicator.vue';

export default defineComponent({
    components:{
        CircleIndicatorVue
    },
    props:{
        date:{
            required:true,
            type : Number,
            default: -1
        },
        level:{
            required:true,
            type: String,
            default:''
        },
        blogPostCount:{
            type:Number
        }
    },
})
</script>

<style scoped>
@media(min-width:1000px){
    #DateIndicator_Vue{
        display:flex;
    }
    #section-date{
        width:35px;
        height:35px;
    }
    #section-github{
        height:35px;
        margin:0 5px 0 5px;
        display:flex;
        align-items: center;
    }
    .date{
        background: #202020;
        font-size:20px;
        font-weight: bold;
        color:white;
        display:flex;
        
    /* width: */
    }

    .date-actived{
        width:35px;
        height:35px;
        border-radius: 30%;
    }
    .date-deactived{
        background: black;
        width:25px;
        height:25px;
        border-radius: 50%;
    }
}
</style>
