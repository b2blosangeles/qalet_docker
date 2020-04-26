<template>
   <span>
        hello friend {{title}}
        <pop-up v-if="popUpOn" ref="ppp"></pop-up>
        <button type="button" class="btn btn-success"  v-on:click="setPopUp(true)">Pop Up</button>
        <button type="button" class="btn btn-warning"  v-on:click="callPopUp()">callSub</button>
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
        setPopUp(v) {
            this.popUpOn = v;
            this.$refs.ppp.fromParent();
        },
        callPopUp(v) {
           this.$refs.ppp.fromParent()
        }
    }
}
</script>
<style>

</style>
