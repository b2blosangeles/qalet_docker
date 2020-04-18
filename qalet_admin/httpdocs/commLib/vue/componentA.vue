<template>
    <div class="hellob">Hello A {{postTitle}}</div>
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
.hellob {
    background-color: pink;
}
</style>
