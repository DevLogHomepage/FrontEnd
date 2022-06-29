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
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

export default defineComponent({
    name:"PageLocater",
    setup() {
        console.log("testing")

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
            }
            `;

        console.log(new Date(`April 1 ${new Date().getFullYear() - 1} 23:59:59 GMT-00:00`))
        const { result } = useQuery(QUERY,{
            userName: 'dennis0324',
            toDate: new Date(`April 29 ${new Date().getFullYear()} 23:59:59 GMT-00:00`).toISOString(),
            fromDate: new Date(`April 1 ${new Date().getFullYear()} 23:59:59 GMT-00:00`).toISOString()
        })
        console.log(result.value)
        return{
            
        }
    },
    data(){
        return{
            contribute: ''
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