<template>
    <div class="db_list_class">DB list 2</div>
    <message-section-a  postTitle="good news">component-a</message-section-a>
    <div class="db_list_class">DB list 3</div>
</template>
 
<script>
module.exports = {
    props: ["postTitle"],
    data: function() {
        return {
        }
    },
    components : {
        messageSectionA : QALETCOMM.componentA
    }
}
</script>
<style>
.db_list_class {
}
</style>
