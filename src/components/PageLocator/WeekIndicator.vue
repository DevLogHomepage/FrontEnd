<template>
        <div id="current-week">
            <div id="current-day">

            </div>
        </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
    height:8px;
    width:100%;
    position: absolute;
    top:calc(v-bind(pageDay) * 8px);
    transition: all 0.5s ease-in-out;
}

#current-week{
    background-color: rgba(255,187,0,.2);
    height:56px;
    width: 72px;
    top:calc(v-bind(pageWeek) * 8px * 7);
    position: absolute;
    transition: all 0.5s ease-in-out;
}
</style>
