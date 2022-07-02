<template>
    <div class="tech" :class="[theme ? 'dark' : 'light']">
        <h1>This is an tech page</h1>
        <PageLocater />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import PageLocater from '@/components/PageLocator.vue'
import * as rest from '@core-rest/github'

export default defineComponent({
    name: 'TechView',
    setup(){
        // const date = new Date();
        // let currentMonth = new Date(date.getFullYear(),date.getMonth(),1);
        // let nextMonth = new Date(date.getFullYear(),date.getMonth() + 1,1);
        // let difference  = nextMonth.getTime() - currentMonth.getTime();
        // const dayCount = Math.ceil(difference / (1000 * 3600 * 24));
    },
    components:{
        PageLocater
    },
    props :{
        theme: {
            required: true,
            type : Boolean as PropType<boolean>,

        }
    },
    async mounted() {
        const path ="tech"

        const response = await rest.getPostName({owner:'dennis0324',repo:'blogPost',path:path});
        console.log(response)
    }
});



</script>


<style scoped>
    .dark .tech{
        color:#fff;
    }
</style>