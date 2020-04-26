<template>
   <span>
        hello friend {{title}}
        <pop-up ref="popUp1" v-bind:config=""></pop-up>
        <button type="button" class="btn btn-success"  v-on:click="callPopUp()">Pop Up</button>
   </span>
</template>
 
<script>
module.exports = {
    props: ['title'],
    data: function() {  
        return { 
        }
    },
    components : {
         popUp      : commModule.popUp
    },
    methods : {
        callPopUp() {
           this.$refs.popUp1.setPopupStatus(true);
        }
    }
}
</script>
<style>

</style>
