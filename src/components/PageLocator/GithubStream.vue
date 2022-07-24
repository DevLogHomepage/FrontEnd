<template>
<Transition name="fade">
    <div v-if="githubDataMonth.length <= 0"></div>
    <div v-else id="GithubStream">
        <TransitionGroup name="fade">
            <div v-for="(i,index) in displayMonth()" :key="index"  class="githubstream-div">
                <div v-for="(week,indexWeek) in i" :key="indexWeek" class="week">
                    <div v-for="(day,indexDay) in week.contributionDays.slice().reverse()"  :key="indexDay" :class="['day',day.date]">
                        <CircleIndicatorVue :date="day.date" :contributionLevel="day.contributionLevel" :type="0"/>
                    </div>
                </div>
            </div>
        </TransitionGroup>
    </div>
</Transition>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref } from '@vue/reactivity'
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
            type:String
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
        async updateIndicator(){
            this.githubDataMonth = []
            const response = await axios.get(`http://localhost:3000/githubContirbutions/?startingDate=${this.startingDate}`)
            console.log(response)
            const githubResponse = response.data.data as githubContributionResponse 
            if(response !== undefined){
                
                const githubMonths = githubResponse.user.contributionsCollection.contributionCalendar.months.slice().reverse()
                const githubWeeks = githubResponse.user.contributionsCollection.contributionCalendar.weeks.slice().reverse()

                this.githubDataMonth = githubMonths;
                this.githubDataWeek = githubWeeks;
            }
        }
    },
    watch:{
        async startingDate(newValue,oleValue){
            await this.updateIndicator()
        }
    },
    mounted(){
        this.updateIndicator()
    }
})

</script>

<style scoped>
.fade-enter-from{
    opacity: 0;
}

.fade-enter-to{
    opacity: 1;
}

.fade-enter-active{
    transition: all 0.3s ease-in-out;
}

.fade-leave-from{
    opacity: 1;
}

.fade-leave-to{
    opacity: 0;
}

.fade-enter-active{
    transition: all 0.3s ease-in-out;
}

#GithubStream{
    display:flex;
    flex-direction: column;
    width:32px;
}
</style>
