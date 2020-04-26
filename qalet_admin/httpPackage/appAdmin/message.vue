<template>
   <span>
        hello friend {{title}}
        <pop-up ref="popUp1" v-bind:dynamicPlugin="dynamicPlugin"></pop-up>
        <button type="button" class="btn btn-success"  v-on:click="activePopUp()">Pop Up</button>
   </span>
</template>
 
<script>
module.exports = {
    props: ['title'],
    data: function() {  
        return {
           dynamicPopup : appAdmin.inputForm,
           config : {
               dynamicPopup : appAdmin.inputForm
           }
        }
    },
    components : {dynamicPlugin : appAdmin.inputForm },
    methods : {
        activePopUp() {
           this.$refs.popUp1.activePopUp();
        }
    }
}
</script>
<style>

</style>
