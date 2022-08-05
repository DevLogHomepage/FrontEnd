<template>
        <div id="current-week">
            <div id="current-day">

            </div>
        </div>
</template>

<script lang="ts">
import { BlogPostStreamData } from '@/utils/Types'
import { defineComponent, PropType, ref } from 'vue'


export default defineComponent({
    setup(){
        const pageWeek = ref<number>(0);
        const pageDay = ref<number>(0);
        return{
            pageWeek,
            pageDay
        }
    },
    data(){
        return{
            height:8
        }
    },
    props:{
        currentDay:{
            required:true,
            type:String
        },
        postStreamData:{
            required:true,
            type:Array as PropType<BlogPostStreamData[][]>
        },
        dayCount:{
            required:true,
            type:Number
        }
    },
    watch:{
        currentDay:{
            handler:function(){
                this.setPageWeekDate(this.postStreamData,this.currentDay)
            },
            deep:true
        },
        pageWeek(){
            console.log('tesitng',this.pageWeek)
            if(this.pageWeek == 8){
                this.height = this.dayCount % 7;

                console.log(this.height)
            }
            else{
                this.height = 8
            }
        },
    },
    methods:{
        setPageWeekDate(data:BlogPostStreamData[][],date:string){
            for(const weekIndex in data){
                for(const dayIndex in data[weekIndex]){
                    if(data[weekIndex][dayIndex].date === date){
                        this.pageWeek = parseInt(weekIndex);
                        this.pageDay = parseInt(dayIndex);
                    }
                }
            }
        },
    }
})
</script>

<style scoped>
.weekIndicator-enter-active {
  transition: all 1s ease;
}
.weekIndicator-leave-active {
  transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.weekIndicator-enter-from
/* .slide-fade-leave-active for <2.1.8 */ {
  opacity: 1;
}

.weekIndicator-enter-to
/* .slide-fade-leave-active for <2.1.8 */ {
  opacity: 0;
}
.weekIndicator-leave-from{
    opacity: 0;
}
.weekIndicator-leave-to{
    opacity: 1;
}

#current-day{
    background-color: rgba(255,187,0,.5);
    height:calc(v-bind(height) * 1px);
    width:100%;
    position: absolute;
    top:calc(v-bind(pageDay) * 8px);
    transition: all 0.5s ease-in-out;
}

#current-week{
    background-color: rgba(255,187,0,.2);
    height:calc(v-bind(height) * 7px);
    width: 72px;
    top:calc(v-bind(pageWeek) * 8px * 7);
    position: absolute;
    transition: all 0.5s ease-in-out;
}
</style>
