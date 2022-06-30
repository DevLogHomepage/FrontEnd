<template>
    <div v-if="loading"></div>
    <div v-else id="GithubStream">
        <div v-for="i in githubData.weeks" :key="i" class="githubstream-div"> 
            <div v-for="j in i.contributionDays" :key="j.Date" >
                <CircleIndicatorVue :date="j.date" :contributionLevel="j.contributionLevel" :type="0"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { computed } from '@vue/reactivity'
import gql from 'graphql-tag'
import CircleIndicatorVue from './CircleIndicator.vue'

export default defineComponent({
    components:{
        CircleIndicatorVue
    },
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
            fromDate: new Date(today.getFullYear(),today.getMonth() - 2,today.getDate()).toISOString()
        });
        let githubData = computed(() => result.value.user.contributionsCollection.contributionCalendar ?? [])

        watchEffect(() => {
            if(result.value !== undefined){
                console.log(githubData)
            }
        })

        return{
            githubData,
            loading
        }
        
    },
    data() {
        return{
            today: new Date()
        }
    }
})

</script>

<style scoped>
#GithubStream{
    display:flex;
    flex-direction: column;
}
</style>
