<template>
    <div class="helloA">Hello A {{postTitle}}</div>
</template>
 
<script>
module.exports = {
    props: ["postTitle"],
    data: function() {
        return {
            who: "world"
        }
    }
}
</script>
<style>
.helloA {
    background-color: pink;
}
</style>
