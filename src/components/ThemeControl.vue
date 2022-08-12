<template>
    <div id="Theme">
        <div class="container">
            <input type="checkbox" @change="setChange" id="ThemeInput" name="ThemeInput">
            <label for="ThemeInput">
                <div  class="svg-container light">
                    <svg xmlns="http://www.w3.org/2000/svg" width = 30px height = 30px id="light" viewBox="0 0 221.86 221.86"><defs></defs><title>light</title><circle class="cls-1" cx="110.93" cy="110.93" r="46.75"/><circle class="cls-1" cx="110.76" cy="17.42" r="17.42"/><circle class="cls-1" cx="176.93" cy="44.69" r="17.42"/><circle class="cls-1" cx="204.44" cy="110.76" r="17.42"/><circle class="cls-1" cx="177.17" cy="176.93" r="17.42"/><circle class="cls-1" cx="111.1" cy="204.44" r="17.42"/><circle class="cls-1" cx="44.93" cy="177.17" r="17.42"/><circle class="cls-1" cx="17.42" cy="111.1" r="17.42"/><circle class="cls-1" cx="44.69" cy="44.93" r="17.42"/></svg>
                </div>
                <div class="svg-container dark">
                    <svg xmlns="http://www.w3.org/2000/svg" width = 30px height = 30px id="dark" viewBox="0 0 234.85 234.85"><defs></defs><title>dark</title><path class="cls-2" d="M251,160.25A118,118,0,0,1,134.12,26.05,118,118,0,1,0,267.2,159.13,118.77,118.77,0,0,1,251,160.25Z" transform="translate(-32.36 -26.05)"/></svg>
                </div>
            </label>
        </div> 
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props :{
        theme: {
            required: true,
            type : Boolean as PropType<boolean>,

        },
    },
    emits:[
        'testing'
    ],
    methods : {
        /**
         * 
         */
        setChange() {
            this.$emit('testing',!this.theme)
        },
        /**
         * 
         */
        setState() {
            let checkbox:HTMLInputElement = document.getElementById("ThemeInput") as HTMLInputElement;
            checkbox.checked = true
        }
    },
    mounted() {
        this.setState()
    }
})
</script>

<style scoped>
:root{
    --svg-size: 30px
}
.cls-1{
    fill:#f5b616;
}
.cls-2{
    fill:#fff;
}

#Theme{
    width:30px;
    height:50px;
    position: fixed;
    right: 50px;
    bottom: 10px;
    
}

@media(min-width:600px){
    #Theme{
        right: 50px;
        bottom: 10px; 
    }
}

@media(max-width:600px){
    #Theme{
        right:10px;
        bottom: -10px;
    }
}
#ThemeInput{
    display: none;
}

.container {
    position: relative !important;
    overflow: hidden;
}

.svg-container{
    width:30px;
    height:50px;
}

input[id="ThemeInput"] + label{
    display:inline-block;
    width: 30px;
    height: 50px;
    cursor: pointer;

}

.svg-container.dark{
    position: absolute;
    top:50px;
    transition: all 0.2s ease-in-out;
    left: 0px;
    opacity: 0;
}

.svg-container.light{
    position: absolute;
    top: 0px;
    transition: all 0.2s ease-in-out 0.2s;
    opacity: 1;
}

input[id="ThemeInput"]:checked + label .svg-container.dark{
    top: 0;
    transition: all opacity 0.2s ease-in-out 0.2s;
    opacity: 1;
    /* display: block; */

}

input[id="ThemeInput"]:checked + label .svg-container.light{
    top: 50px;
    transition: all 0.2s ease-in-out;
    opacity: 0;
    /* display: none; */

}

</style>
