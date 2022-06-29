<template>
    <div id="LogoDiv" class="logo">
        <div :class="['logo-pic',{'home' : isHome}]">
            <div class="morseCode">
                <div v-for="(string, index) in morseTag[0]" :key = "index" :class="string"></div>
            </div>
            <div class="morseCode">
                <div v-for="(string, index) in morseTag[1]" :key = "index" :class="string"></div>
            </div>
        </div>
        <div>
            FOXSTAR DEVLOG
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
    setup() {
        /**
         * 모스 사진 넣기 사용합니다.
         */
        const morseCode:number[][] = [[0,0,1,0,1,1,1,1,0,0,1,0,0,0,1,0,1,0,1,0],[1,0,0,0,0,0,0,1,0,1,0,0,1,1,1,1,1,0]];
        let morseTag:string[][] = []
        for(const [index,tags] of morseCode.entries()){
            let tagString:string[] = [];
            for(const [indexj,tag] of tags.entries()){
                let tagStr = ''
                if(index == 0 && indexj == 0){
                    tagStr += 'logo-color-static ';
                }
                if (tag == 1){
                    tagStr += 'long'
                }
                else{
                    tagStr += 'short'
                }
                tagString.push(tagStr)
            }
            morseTag.push(tagString);
        }
        const isHome = ref<boolean>(false);
        console.log("tesgin")
        return {
            morseTag : morseTag,
            isHome
        }
    },
    props :{
        typePage: {
            required: true,
            type : String as PropType<string>,
        }
    },
    methods : {
        setHome(value:boolean) {
            this.isHome = value
        }
    },
    mounted() {
        if(this.typePage === 'home'){
            this.setHome(true)
        }
    }

})
</script>

<style scoped>
    /* 로고(아이패드 및 컴퓨터) */  
    @media (min-width : 1000px) {
        .logo{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display:flex;

        }
    }
    /* 로고(핸드폰) */
    @media (max-width: 999px) {
        .logo{
            display:block;
        }
    }

    @media (max-width: 600px){
        .logo-pic:not(.home) {
            display:none !important;
        }
    }

    /* 로고 글씨 css입니다. */
    .dark .logo{
        font-size: 40px;
        font-weight: bold;
        color: #fff;

    }

    /* 로고 글씨 css입니다. */
    .logo{
        font-size: 40px;
        font-weight: bold;
    }
    
    /* 바코드를 윗줄 아랫줄로 구별합니다. */
    .logo-pic{
        display: flex;
        flex-direction: column;
    }

    /* 모스 코드 바코드를 일렬로 만들어줍니다. */
    .morseCode {
        display: inline-flex;
        padding:9px;
    }

    /* 색깔이 바뀌지 않는 부분입니다. */
    .logo-color-static{
        background-color: #fb0;
    }

    /* 로고 바코드의 긴 박스를 표시하는 구간입니다. */
    .long{
        margin-right:5px;
        width: 18px;
        height: 7px;
        border-radius: 2px;
    }

    /* 긴 박스의 다크모드 색상입니다. */
    .dark .long:not(.logo-color-static){
        background-color: #fff;
    }

    /* 긴 박스의 라이트모드 색상입니다. */
    .light .long:not(.logo-color-static){
        background-color: #000;
    }

    /* 로고 바코드의 짧은 박스를 표시하는 구간입니다. */
    .short{
        margin-right:5px;
        width:7px;
        height:7px;
        border-radius: 2px;
    }

    /* 짧은 박스의 다크모드 색상입니다. */
    .dark .short:not(.logo-color-static){
        background-color: #fff;
    }

    /* 짧은 박스의 라이트모드 색상입니다. */
    .light .short:not(.logo-color-static) {
        background-color: #000;
    }
</style>
