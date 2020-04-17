<template>
    <div class="hello">Hello {{postTitle}}</div>
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
.hello {
    background-color: #ffe;
}
</style>
