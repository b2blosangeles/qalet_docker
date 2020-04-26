<template>
   <span>
        hello friend {{title}}
        <pop-up ref="popUp1" v-bind:dynamicPopup=""></pop-up>
        <button type="button" class="btn btn-success"  v-on:click="activePopUp()">Pop Up</button>
   </span>
</template>
 
<script>
module.exports = {
    props: ['title'],
    data: function() {  
        return { 
        //   popupConfig : {inputForm : appAdmin.inputForm}
        }
    },
    components : {},
    methods : {
        dynamicPopup () {
            return commModule.popUp
        },
        activePopUp() {
           this.$refs.popUp1.activePopUp();
        }
    }
}
</script>
<style>

</style>
