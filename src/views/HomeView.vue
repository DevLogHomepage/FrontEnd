<template>
    <main>
        <div id="home" :class="[theme ? 'dark' : 'light']">
            <LogoDiv :typePage="this.home"/>
        </div>
    </main>
    <footer>
        <div id="helper">select index to look around</div>
    </footer>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import LogoDiv from '../components/LogoDiv.vue';

export default defineComponent({
    name: 'HomeView',
    components: { 
        LogoDiv,
    },
    data(){
        return {
            home:'home'
        }
    },
    props :{
        theme: {
            required: true,
            type : Boolean as PropType<boolean>,

        }
    },
});
</script>

<style>
#home {
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
#LogoDiv{
    user-select: none;
    font-size: 40px;
    font-weight: bold;
}
</style>
