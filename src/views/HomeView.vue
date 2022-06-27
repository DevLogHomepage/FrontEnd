<template>
  <div :class="['app',theme ? 'dark' : 'light']">
    <LogoDiv />
    <ThemeControl :theme="this.theme" @testing="setTheme" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LogoDiv from '../components/LogoDiv.vue';
import ThemeControl from '../components/ThemeControl.vue'

export default defineComponent({
  name: 'App',
  components: { 
    LogoDiv,
    ThemeControl
   },
  setup() {
    let theme = ref<boolean>(false);
    return {
      theme
    }
  },
  mounted() {
    let matched = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setTheme(matched)
  },
  data() {
    return{
      name: 'Link'
    }
  },
  methods: {
    setTheme(theme:boolean){
      this.theme = theme;
      if(this.theme){
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      }
      else{
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
      console.log(theme);
    }
  }
});
</script>

<style>

</style>
