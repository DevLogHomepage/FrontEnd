<template>
    <div id="current-week">
        <div id="current-day">

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    props:{
        pageWeek:{
            type:Number
        },
        pageDay:{
            type:Number
        }
    }
})
</script>

<style scoped>
#current-day{
    background-color: rgba(255,187,0,.5);
    height:8px;
    width:100%;
    position: absolute;
    top:calc(v-bind(pageDay) * 8px)
}

#current-week{
    background-color: rgba(255,187,0,.2);
    height:56px;
    width: 72px;
    top:calc(v-bind(pageWeek) * 8px * 7);
    position: absolute;
}
</style>
