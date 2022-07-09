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
import { defineComponent, watchEffect } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { computed, ref } from '@vue/reactivity'
import gql from 'graphql-tag'
import CircleIndicatorVue from './CircleIndicator.vue'
import { ContributionDays,ContributionMonths,ContributionWeeks} from '@/Type'
/**
 * GithubStream의 정의 부분입니다.
 */
export default defineComponent({
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
    /** 컴포넌트를 실행할 때 정의하는 부분입니다. */
    setup(){
        const today = new Date()
        const QUERY = gql`
            query testing($userName:String!, $toDate:DateTime, $fromDate: DateTime) { 
                user(login: $userName) {
                    contributionsCollection(from: $fromDate, to: $toDate) {
                        contributionCalendar {
                            totalContributions
                            weeks {
                                contributionDays {
                                weekday
                                date 
                                contributionCount 
                                color
                                contributionLevel
                                }
                            }
                            months  {
                                name
                                year
                                firstDay
                                totalWeeks  
                            }
                        }
                    }
                }
            }`;
        const { result,loading } = useQuery(QUERY, {
            userName: "dennis0324",
            toDate: new Date(today.getFullYear(),today.getMonth(),today.getDate()).toISOString(),
            fromDate: new Date(today.getFullYear(),today.getMonth(),today.getDate() - 59).toISOString()
        });
        let githubData = computed(() => result.value.user.contributionsCollection.contributionCalendar ?? [])
        let githubDataWeek = computed(() => githubData.value.weeks.slice().reverse() ?? [])
        let githubDataMonth = computed(() => githubData.value.months.slice().reverse() ?? [])


        watchEffect(() => {
            if(result.value !== undefined){
                console.log()
            }
        })

        return{
            githubData,
            githubDataWeek,
            githubDataMonth,
            loading,

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
