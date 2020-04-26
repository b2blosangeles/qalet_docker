<template>
   <span>
        hello friend {{title}}
        <pop-up popUpOn="true"></pop-up>
        <button type="button" class="btn btn-success"  v-on:click="setPopUp()">Pop Up</button>
   </span>
</template>
 
<script>
module.exports = {
    props: ['title'],
    data: function() {  
        return { 
            popUpOn : true
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
