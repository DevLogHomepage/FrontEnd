<template>
    <div class="search-container">
          <!-- <v-select 
            :options="optionArray" 
            label="title"
            v-model="selected"
        ></v-select> -->
        <div id="back-container">
            <button v-if="currentContents.getSearch().length > 0 " id="back-btn" @click="backBtn">뒤로가기</button>
        </div>
        <div class="search">
            <input class="search-textInput" type="text" v-model="searchKeyWord"/>
            <span class="border"></span>
            <button class="search-button" @click="search">search</button>
        </div>
    </div>
</template>

<script lang="ts">
import BlogPostDataClass, { BlogPostDataIneterface } from '@/classes/BlogPostData';
import axios from 'axios';
import { defineComponent, PropType, ref, toRaw } from 'vue'
import * as blog from '@/core/blog'
import CurrentContents, { CurrentContentInterface } from '@/classes/CurrentConents';
import { Post } from '@/utils/Types';


export interface optionArray{
    title:string
}

export default defineComponent({
    setup(){
        const searchKeyWord = ref<string>('');
        return{
            searchKeyWord
        }
    },
    data(){
        return{
            selected:{
                title:"title"
            },
            optionArray: [
                { title: "title" },
                { title: "tag" },
            ] as optionArray[],
            basicBlogInfo: {owner:'dennis0324',repo:'blogPost',path:'tech'},
    }
        
    },
    watch:{
        selected:{
            handler:function(){
                if(this.selected !== null){
                    console.log(this.selected.title)
                }
            }
        }
    },

    methods:{
        async search(){
            console.log(this.selected.title,this.searchKeyWord)
            if(toRaw(this.selected) === null)
                return
            if(this.searchKeyWord === '')
                return
            const result = await blog.searchPost(this.basicBlogInfo,this.searchKeyWord)
            this.blogPostData.setSearchValue(result)
        },
        
        backBtn(){
            this.currentContents.clearSeach()
            this.blogPostData.clearSearch()
            this.post.container!.scrollTop = 0
            this.searchKeyWord = ''
        }
    },

    props:{
        blogPostData:{
            required:true,
            type:Object as PropType<BlogPostDataIneterface>
        },
        currentContents:{
            required:true,
            type:Object as PropType<CurrentContentInterface>
        },
        post:{
            required:true,
            type:Object as PropType<Post>
        }
    }
})
</script>

<style scoped>
    #back-container{
        height:30px;
    }
    .search-container  {
    --vs-controls-color: #ffbb00;
    --vs-border-color: transparent;

    --vs-dropdown-bg: #202020;
    --vs-dropdown-color: #fb0;
    --vs-dropdown-option-color: #ffffff;

    --vs-selected-bg: #2b2b2b;
    --vs-selected-color: #fff;

    --vs-search-input-color: #eeeeee;

    --vs-dropdown-option--active-bg: #2b2b2b;
    --vs-dropdown-option--active-color: #fb0;
    }

    .light .search-container{
        --vs-controls-color: #000;
        --vs-border-color: transparent;

        --vs-dropdown-bg: #ccc;
        --vs-dropdown-color: #fb0;
        --vs-dropdown-option-color: #000;

        --vs-selected-bg: rgb(189, 188, 188);
        --vs-selected-color: #fff;

        --vs-search-input-color: #eeeeee;

        --vs-dropdown-option--active-bg: #2b2b2b;
        --vs-dropdown-option--active-color: #fff;
    }

    .v-select {
        width:40%;
    }

    .search-container.vs--open {
    --vs-border-color: #fb0;
    }

    .selectBox {
    position: relative;
    width: 70px;
    border-radius: 4px;
    }
    .selectBox .select {
    width: inherit;
    height: inherit;
    background: transparent;
    border: 0 none;
    outline: 0 none;
    padding: 0 5px;
    position: relative;
    z-index: 3; 
    }
    .selectBox .select option {
    
    padding: 0;
    font-size: 16px;
    }

    .dark .selectBox .select option{
        background-color: #2b2b2b;
        color:#fff;
    }

    .light .selectBox .select option{
        background-color: #fff;
        color:#000
    }
    .selectBox .icoArrow {
    position: absolute; 
    top: 0; 
    right: 0; 
    z-index: 1; 
    width: 15px; 
    height: inherit;
    border-left: 2px solid lightcoral;
    display: flex;
    justify-content: center;
    align-items: center;
    }

    .selectBox .icoArrow img {
    width: 50%;
    transition: .3s;
    }

    .dark #membership{
        color:#fff;
    }
    .light #membership{
        color:#000;
    }
    
    .search-container{
        margin: 10px;
    }
    .category{
        background-color: transparent;
    }
    .search{
        border-radius: 5px;
        border: 1px solid transparent;
        transition: all 0.5s ease-in-out;
        display:flex;
        align-items: center;
        height: 30px;
    }

    .dark .search{
        background-color: #363636;
    }

    .light .search{
        background-color: #cccccc;
    }
    input[type=text]{
        border: 1px solid transparent;
        outline: none;
        padding-left: 10px;
        background-color: transparent;
        margin: 10px;

    }

    .search button{
        background-color: transparent;
        border: 0;
        color: #fff;
        height:100%;
        border-radius: 5px;
    }
    .search button:active{
        background-color: #2b2b2b; 
    }
    .search:focus-within{
        transition: all 0.5s ease-in-out;
        border: 1px solid #ffbb00;
        border-radius: 5px;
    }

    .search .border{
        border: 1px solid #ffbb00;
        content: '';
        line-height: 20px;
        height:20px;
        vertical-align: middle;
    }
</style>
