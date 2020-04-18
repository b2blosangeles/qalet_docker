<template>
    <div class="db_list_class">DB list</div>
    <component-a  postTitle="good news">component-a</component-a>
</template>
 
<script>
module.exports = {
    props: ["postTitle"],
    data: function() {
        return {
        }
    },
    components : {
        componentA : globalComponents.componentA
    }
}
</script>
<style>
.db_list_class {
  //  background-color: green;
}
</style>
