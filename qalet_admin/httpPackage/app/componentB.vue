<template>
    <div class="hellob">Hello B {{postTitle}}</div>
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
    background-color: lightgreen;
}
</style>
