<template>
<div class="flex-horizontal pagination-container">
    <button @click="decreaseNumber"></button>
    <input :value="currentPage + 1" type="text" id="currentPage"/>
    <div id="pagination-slash"></div>
    <div>{{totalPage}}</div>
    <button @click="increaseNumber"></button>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: "PaginationVue",
    props:{
        totalPage:{
            required:true,
            type:Number
        },
        currentPage:{
            required:true,
            type:Number
        }
    },
    emits:[
        "increaseNumber",
        "decreaseNumber"
    ],
    setup(){
        const pageIndicator = ref<HTMLElement>()
        return{
            pageIndicator
        }
    },
    data: function () {
        return {
            positions: {
                clientX: 0,
                clientY: 0,
                movementX: 0,
                movementY: 0
            },
            test:'testing',
            totalLength:'400px',
            offset:0,
            page:0,
            snapLength:0
        }
    },
    mounted(){
        this.pageIndicator = document.getElementById("drag-indicator") as HTMLElement
        this.snapLength = parseInt(this.totalLength.replace('px','')) / (this.totalPage - 1)
    },
    methods:{

        snapPosition(){
            this.offset = this.offset - this.positions.movementX;
            if(this.offset > this.page * this.snapLength + this.snapLength / 2 && this.page < this.totalPage){
                this.page++;
                this.increasePage();
                (this.pageIndicator as HTMLElement).style.left = this.page * this.snapLength + 'px';
            }
            if(this.offset < this.page * (this.snapLength - 1) - this.snapLength / 2 && this.page >= 1){
                this.page--;
                this.decreasePage();
                (this.pageIndicator as HTMLElement).style.left = this.page * this.snapLength + 'px';
            }
            this.test = (this.page + 1) + ''
        },
        setPos(page:number,snapLength:number){
            (this.pageIndicator as HTMLElement).style.left = page * snapLength + 'px';
        },
        increaseNumber(){
            this.page++;
            this.increasePage();
            // (this.pageIndicator as HTMLElement).style.left = this.page * this.snapLength + 'px';
        },
        decreaseNumber(){
            this.page--;
            this.decreasePage();
            // (this.pageIndicator as HTMLElement).style.left = this.page * this.snapLength + 'px';
        },
        increasePage(){
            this.$emit("increaseNumber",this.page)
        },
        decreasePage(){
            this.$emit("decreaseNumber",this.page)
        }

    }
})
</script>

<style scoped>
#currentPage{
    width:10px;
    border:none;
    background-color: transparent;
    font-size: 20px;
}

.dark #currentPage{
    color:#fff;
}

.light #currentPage{
    color:#000;
}
#drag-container{
    position: relative;
    width:v-bind(totalLength);
    height:1px;
    background-color: #fff;
    top: 50%;
    transform: translateY(50%);
    margin:0 20px;
}

#drag-indicator{
    position: absolute;
    bottom:0;
    left:0;
    width:14px;
    height:14px;
    background-color: #fff;
    transform: translate(-50%,50%);
    border-radius: 50%;
}



#drag-indicator::after{
    position: absolute;
    bottom:20px;
    /* left:0; */
    width:30px;
    height:20px;
    content: attr(contenttext) "";
    transform: translate(calc(-50% + 7px),-50%);
    background-color: #161616;
    text-align: center;
    border-radius: 2px;
    padding:5px;
}


#drag-indicator.press::after{
    opacity: 1;
    transition: all 0.5s ease-in-out;
}

#drag-indicator::after{
    opacity: 0;
    transition: all 0.5s ease-in-out;
}

#pagination-slash{
    width:2px;
    height:20px;
    transform: rotate(30deg);
    background-color: #fb0;
    margin: 0px 15px;
}

.pagination-container{
    margin:15px;
    justify-content: center;
}
</style>
