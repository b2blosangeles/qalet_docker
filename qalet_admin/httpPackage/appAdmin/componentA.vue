<template>
    <div class="helloA spinner">Hello {{postTitle}}
        <div class="spinner"></div>
    </div>
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
.helloA {
    background-color: pink;
}
</style>
