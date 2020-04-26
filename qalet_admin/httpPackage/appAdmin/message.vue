<template>
   <span>
        hello friend {{title}}  
        <pop-up ref="popUp1" dynamicPlugin="dynamicPluginA()"></pop-up>
        <button type="button" class="btn btn-success"  v-on:click="activePopUp()">Pop Up</button>
   </span>
</template>
 
<script>
module.exports = {
    props: ['title'],
    data: function() {  
        return {
           dynamicPlugin : appAdmin.inputForm
        }
    },
    components : {},
    methods : {
        dynamicPluginA() {
           return appAdmin.inputForm
        },
        activePopUp() {
           this.$refs.popUp1.activePopUp();
        }
    }
}
</script>
<style>

</style>
