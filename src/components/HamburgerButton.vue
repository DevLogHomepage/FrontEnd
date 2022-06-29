<template>
    <div class="hamburger-container">
        <div :class="['menu','btn11',{'open':open}]" @click="setClick" data-menu="11">
            <div class="icon-left"></div>
            <div class="icon-right"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'HamburgerButton',
    setup() {
        let open = ref<boolean>(false);
        return {
            open
        }
    },
    methods:{
        setClick(){
            this.open = !this.open
        }
    }
})
</script>

<style scoped>
@media (max-width: 700px) {
    .hamburger-container{
        display:block;
    }
}
@media (min-width: 700px) {
       .hamburger-container{
        display:none;
    } 
}

.hamburger-container {
  position: relative;
  width:60px;
  margin: 15px;
}

.btn11 {
  width: 30px;
  height: 30px;
  transition-duration: 0.5s;
}

.light .icon-left,
.light .icon-left:before,
.light .icon-left:after,
.light .icon-right,
.light .icon-right:before,
.light .icon-right:after{
    background-color: #212121;
}

.dark .icon-left,
.dark .icon-left:before,
.dark .icon-left:after,
.dark .icon-right,
.dark .icon-right:before,
.dark .icon-right:after{
    background-color: #fff;
}

.btn11 .icon-left {
  transition-duration: 0.5s;
  position: absolute;
  height: 4px;
  width: 15px;
  top: 15px;
  
}
.btn11 .icon-left:before {
  transition-duration: 0.5s;
  position: absolute;
  width: 15px;
  height: 4px;
  content: "";
  top: -10px;
  left: 0px;
}
.btn11 .icon-left:after {
  transition-duration: 0.5s;
  position: absolute;
  width: 15px;
  height: 4px;
  content: "";
  top: 10px;
  left: 0px;
}
.btn11 .icon-left:hover {
  cursor: pointer;
}

.btn11 .icon-right {
  transition-duration: 0.5s;
  position: absolute;
  height: 4px;
  width: 15px;
  top: 15px;
  left: 15px;
}

.btn11 .icon-right:before {
  transition-duration: 0.5s;
  position: absolute;
  width: 15px;
  height: 4px;
  content: "";
  top: -10px;
  left:0px;
}
.btn11 .icon-right:after {
  transition-duration: 0.5s;
  position: absolute;
  width: 15px;
  height: 4px;
  content: "";
  top: 10px;
  left:0px;
}
.btn11.open .icon-left {
  transition-duration: 0.5s;
  background: transparent;
}
.btn11.open .icon-left:before {
  transform: rotateZ(45deg) scaleX(1.4) translate(2px, 2px);
}
.btn11.open .icon-left:after {
  transform: rotateZ(-45deg) scaleX(1.4) translate(2px, -2px);
}
.btn11.open .icon-right {
  transition-duration: 0.5s;
  background: transparent;
}
.btn11.open .icon-right:before {
  transform: rotateZ(-45deg) scaleX(1.4) translate(-2px, 2px);
}
.btn11.open .icon-right:after {
  transform: rotateZ(45deg) scaleX(1.4) translate(-2px, -2px);
}
.btn11:hover {
  cursor: pointer;
}


</style>