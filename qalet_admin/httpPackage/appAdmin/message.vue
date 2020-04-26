<template>
   <span>
        hello friend {{title}}
        <pop-up popUpOn="popUpOn"></pop-up>
        <button type="button" class="btn btn-success"  v-on:click="setPopUp(true)">Pop Up</button>
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
        setPopUp(v) {
            alert(v);
            this.popUpOn = v
        }
    }
}
</script>
<style>

</style>
