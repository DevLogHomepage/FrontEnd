<template>
    <main>
        <div id="home" :class="[theme ? 'dark' : 'light']">
            <LogoDiv :typePage="home"/>
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
    /** 컴포넌트 이름의 정의입니다. */
    name: 'HomeView',
    /** 컴포넌트 기본 정의 부분 */
    components: { 
        LogoDiv,
    },
    /** 이 VIEW가 사용하는 데이터를 정의하는 함수입니다. */
    data(){
        return {
            home:'home'
        }
    },
    /** 기본 properity의 정의 */
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
