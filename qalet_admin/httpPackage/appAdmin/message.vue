<template>
   <span>
        hello friend {{title}}
        <pop-up popupStatus="true"></pop-up>
        <button type="button" class="btn btn-success"  v-on:click="setPopUp()">Pop Up</button>
   </span>
</template>
 
<script>
module.exports = {
    props: ['title'],
    data: function() {  
        return { 
            popUpOn : false
        }
    },
    components : {
         popUp      : commModule.popUp
    },
    methods : {
        setPopUp() {
        
            this.popUpOn = true
        }
    }
}
</script>
<style>

</style>
