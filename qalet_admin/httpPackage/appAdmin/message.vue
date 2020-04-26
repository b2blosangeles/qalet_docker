<template>
   
        hello friend {{title}}
        <pop-up v-if="popUpOn"></pop-up>
        <button type="button" class="btn btn-success"  v-on:click="setPopUp()">Pop Up</button>
  
</template>
 
<script>
module.exports = {
    props: ['title'],
    data: function() {  
        return { 
            popUpOn : false
        }
    },
    methods : {
        setPopUp() {
            popUpOn = true
        }
    }
}
</script>
<style>

</style>
