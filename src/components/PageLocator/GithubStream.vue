<template>
    <div v-if="loading"></div>
    <div v-else id="GithubStream">
        <div v-for="(i,index) in displayMonth()" :key="index"  class="githubstream-div">
            <div v-for="(week,indexWeek) in i" :key="indexWeek" class="week">
                <div v-for="(day,indexDay) in week.contributionDays.slice().reverse()"  :key="indexDay" :class="['day',day.date]">
                    <CircleIndicatorVue :date="day.date" :contributionLevel="day.contributionLevel" :type="0"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, watch, watchEffect } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { computed, ref } from '@vue/reactivity'
import gql from 'graphql-tag'
import CircleIndicatorVue from './CircleIndicator.vue'
import { ContributionMonths,ContributionWeeks, githubContributionResponse} from '@/Type'
import axios from 'axios'

/**
 * GithubStream의 정의 부분입니다.
 */
export default defineComponent({
    /** 컴포넌트 이름의 정의입니다. */
    name:"GithubStream",
    /** 사용할 컴포넌트를 정의하는 부분입니다. */
    components:{
        CircleIndicatorVue
    },
    /** 사용할 데이터를 정의하는 부분입니다. */
    data(){
        return{
            start: 0
        }
    },
    /** 
     * 컴포넌트를 실행할 때 정의하는 부분입니다. 
     * 
     * 깃허브에서 모든 contirbutionCalendar를 가지고 와서 사용하기 쉬운 방식으로 바꿔서 값을 넣어줍니다.
     */
    setup(){
        const temp = ref<githubContributionResponse>();
        const githubDataWeek = ref<ContributionWeeks[]>([]);
        const githubDataMonth = ref<ContributionMonths[]>([]);
        const loading = ref<boolean>();
        return{
            temp,
            githubDataWeek,
            githubDataMonth,
            loading,

        }
        
    },
    /** 기본 properity의 정의 */
    props:{
        startingDate:{
            required:true,
            type:Date
        }
    },
    /** 컴포넌트에서 사용할 메소드를 정의하는 부분입니다. */
    methods: {
        /**
         * 
         */
        displayMonth: function(){
            let startNum = 0;
            let endsNum = 0;
            let result:ContributionWeeks[][] = []
            for(let i of this.githubDataMonth as ContributionMonths[]){
                endsNum += i.totalWeeks
                result.push(this.githubDataWeek.slice(startNum,endsNum))
                startNum = endsNum;
            }
            return result
        },
    },
    watch:{
        async startingDate(){
            const response = await axios.get(`http://localhost:3000/githubContirbutions/?startingDate=${this.startingDate}`)
            const githubResponse = response.data.data as githubContributionResponse 
            if(response !== undefined){
                
                const githubMonths = githubResponse.user.contributionsCollection.contributionCalendar.months.slice().reverse()
                const githubWeeks = githubResponse.user.contributionsCollection.contributionCalendar.weeks.slice().reverse()

                this.githubDataMonth = githubMonths;
                this.githubDataWeek = githubWeeks;
            }
        }
    }
})

</script>

<style scoped>
#GithubStream{
    display:flex;
    flex-direction: column;
    width:32px;
}
</style>
