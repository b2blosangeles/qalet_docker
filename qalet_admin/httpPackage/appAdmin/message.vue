<template>
   <span>
        hello friend {{title}}  
        <pop-up ref="popUp1" v-bind:config="popUpConfig()"></pop-up>
        <alert ref="alert1" v-bind:config="alertConfig()"></alert>
        <button type="button" class="btn btn-success m-2"  v-on:click="activePopUp('')">Form</button>
        <button type="button" class="btn btn-warning m-2"  v-on:click="activePopUp('A')">Form A</button>
        <button type="button" class="btn btn-success m-2"  v-on:click="activeAlert()">Alert</button>
   </span>
</template>
 
<script>
module.exports = {
    props: ['title'],
    data: function() {  
        return {
            formCode : ''
        }
    },
    components : [ commModule.popUp, commModule.alert ],
    methods : {
        popUpConfig() {
           let v = {
               noCloseIcon    : false,
               dynamicPlugin  :  appAdmin.inputForm
           };
           if (this.formCode === 'A') {
               v.noCloseIcon = true;
               v.dynamicPlugin = appAdmin.inputFormA;
           } else {
               v.dynamicPlugin = appAdmin.inputForm;
           }
           return v
        },
        activePopUp(code) {
           this.formCode = code;
           this.$refs.popUp1.activePopUp();
        },
        /* ---- */
        alertConfig() {
           let v = {
               noCloseIcon    : false
           };
           return v
        },
        activeAlert(code) {
           this.$refs.alert1.activeAlert();
        }      
        
    }
}
</script>
<style>

</style>
