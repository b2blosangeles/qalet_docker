<template>
    <div class="helloB">Hello {{postTitle}}</div>
</template>
 
<script>
module.exports = {
    props: ["postTitle"],
    data: function() {
        return {
            who: 'world'
        }
    }
}
</script>
<style>
.helloB {
    background-color: green;
}
</style>
