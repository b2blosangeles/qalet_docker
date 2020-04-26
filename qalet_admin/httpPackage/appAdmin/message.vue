<template>
    <span>
        hello friend {{title}}
        <pop-up v-if="popUpOn"></pop-up>
        <button type="button" class="btn btn-warning"  v-on:click="popUp()"><i class="icon-plus-sign-alt"></i> Cancel</button>
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
