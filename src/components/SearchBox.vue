<template>
    <div class="search-container">
        <div class="selectBox">
            <select name="membership" id="membership" class="select">
                <option value="bronze">title</option>
                <option value="silver" selected>tag</option>
            </select>
        </div>
        <div class="search">
            <input class="search-textInput" type="text"/>
            <span class="border"></span>
            <button class="search-button">search</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

})
</script>

<style scoped>
    #membership{
        background-color: transparent;
        border: 0;
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
        background-color: #363636;
        border-radius: 5px;
        border: 1px solid transparent;
        transition: all 0.5s ease-in-out;
        display:flex;
        align-items: center;
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
