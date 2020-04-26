<template>
   <span>
        hello friend {{title}}
        <pop-up ref="popUp1"></pop-up>
        <button type="button" class="btn btn-success"  v-on:click="setPopUp(true)">Pop Up</button>
        <button type="button" class="btn btn-warning"  v-on:click="callPopUp()">callSub</button>
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
        callPopUp(v) {
           this.$refs[popUp1].fromParent()
        }
    }
}
</script>
<style>

</style>
