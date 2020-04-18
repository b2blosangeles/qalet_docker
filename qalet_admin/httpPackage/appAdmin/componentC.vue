<template>
    <div class="helloc">Hello {{postTitle}}</div>
</template>
 
<script>
module.exports = {
    props: ['postTitle'],
    data: function() {
        return {
            who: 'world'
        }
    }
}
</script>
<style>
.helloc {
    background-color: lightblue;
}
</style>
