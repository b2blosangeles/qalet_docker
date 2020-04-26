<template>
   <span>
        hello friend {{title}}
        <pop-up ref="popUp1" v-bind:config="dynamicPopup"></pop-up>
        <button type="button" class="btn btn-success"  v-on:click="activePopUp()">Pop Up</button>
   </span>
</template>
 
<script>
module.exports = {
    props: ['title'],
    data: function() {  
        return { 
           config : {
               dynamicPopup : commModule.popUp
           }
        }
    },
    components : {},
    methods : {
        dynamicPopupA () {
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
