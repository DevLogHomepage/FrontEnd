<template>
    <nav>
        <router-link to="/">HOME</router-link>
        <router-link to="/tech">TECH</router-link>
        <router-link to="/project">PROJECT</router-link>
        <router-link to="/about">ABOUT</router-link>
    </nav>
    <router-view :theme="this.theme"/>
    <ThemeControl :theme="this.theme" @testing="setTheme" />

    <!-- <div></div> -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ThemeControl from './components/ThemeControl.vue'

export default defineComponent({
    name: 'App',
    components: { 
        ThemeControl
    },
    setup() {
        let theme = ref<boolean>(false);


        return {
        theme
        }
    },
    data() {
        return {
            main: 'main'
        }
    },
    mounted() {
        let matched = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.setTheme(matched)
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
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    display:table;
    width:100%;
    height: 100%;
    overflow-y: hidden;
}
@media (min-width: 700px){
    nav {
        padding: 30px 0;
        display:flex;
        justify-content: center;
    }
}
@media (max-width: 700px){
    nav {
        width:0;
        height:0;
        overflow: hidden;
        opacity: 0;
        /* display:none; */
    }
}


.dark a {
    color: #fff;
}

.light a {
    color: #000;
}
nav a {
    font-weight: bold;
    font-size: 30px;
    text-decoration:none;
    margin: 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 150px;
    text-align: center;
}


nav a.router-link-exact-active {
    /* font-size: 2.5em;
    font-weight: bold;
    pointer-events: none; */

    font-size:2.5em;
}

nav a:not(.router-link-exact-active):hover{
    transition: all 0.3s ease-in-out;
    color: #fb0;
}

main{
    height:100%;
    display: table-row;
}

footer{
    height: 100px;
    display: table-row;
}

#helper{
    color:#878787;
}
</style>
