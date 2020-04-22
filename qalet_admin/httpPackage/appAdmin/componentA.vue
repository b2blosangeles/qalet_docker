<template>
    <div class="helloA">Hello {{postTitle}}
        <div class="section-spinner"></div>
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
