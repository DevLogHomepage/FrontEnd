<template>
<div class="flex-horizontal">
    <button></button>
    <div ref="draggableContainer" id="drag-container">
        <div :contenttext="test" id="drag-indicator" @mousedown="dragMouseDown"></div>
    </div>
    <button></button>
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
            page:0
        }
    },
    mounted(){
        this.pageIndicator = document.getElementById("drag-indicator") as HTMLElement
        this.offset = (this.pageIndicator as HTMLElement).offsetLeft
    },
    methods:{
        dragMouseDown: function (event:MouseEvent) {
            console.log("testing")
            event.preventDefault()
        // // get the mouse cursor position at startup:
            this.positions.clientX = event.clientX
            // console.log(this.positions)
            document.onmousemove = this.elementDrag
            document.onmouseup = this.closeDragElement
            this.pageIndicator?.classList.toggle("press")
        },
        elementDrag: function (event:MouseEvent) {
            event.preventDefault()
            this.positions.movementX = this.positions.clientX - event.clientX
            this.positions.clientX = event.clientX;
            this.snapPosition()
            // console.log(this.positions.clientX)
            // console.log(this.positions.movementX);
            // console.log((this.pageIndicator as HTMLElement).offsetLeft);
            
            // set the element's new position:
            // (this.pageIndicator as HTMLElement).style.left = ((this.pageIndicator as HTMLElement).offsetLeft - this.positions.movementX) + 'px';
        },
        closeDragElement () {
            document.onmouseup = null
            document.onmousemove = null
            this.pageIndicator?.classList.toggle("press")

        },
        snapPosition(){
            const snapLength = parseInt(this.totalLength.replace('px','')) / this.totalPage
            // console.log(snapLength);
            this.offset = this.offset - this.positions.movementX;
            console.log(this.page * snapLength + snapLength / 2 )
            if(this.offset > this.page * snapLength + snapLength / 2 ){
                this.page++;
                (this.pageIndicator as HTMLElement).style.left = this.page * snapLength + 'px';
            }
            if(this.offset < this.page * (snapLength - 1) - snapLength / 2 ){
                this.page--;
                (this.pageIndicator as HTMLElement).style.left = this.page * snapLength + 'px';
            }
            this.test = this.page + ''
        }
    }
})
</script>

<style scoped>

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
    border-radius: 2px;

}


#drag-indicator.press::after{
    opacity: 1;
    transition: all 0.5s ease-in-out;
}

#drag-indicator::after{
    opacity: 0;
    transition: all 0.5s ease-in-out;
}
</style>
