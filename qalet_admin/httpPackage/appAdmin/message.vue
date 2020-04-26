<template>
    <span>
        hello friend {{title}}
        <pop-up v-if="popUpOn==ture"></pop-up>
        <button type="button" class="btn btn-success"  v-on:click="popUp()">Pop Up</button>
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
    method : {
        popUp() {
            popUpOn = true
        }
    }
}
</script>
<style>

</style>
