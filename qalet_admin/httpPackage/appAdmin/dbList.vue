<template>
    <div class="db_list_class">DB list</div>
    <!--message-section-a  postTitle="good news">component-a</message-section-a-->
</template>
 
<script>
module.exports = {
    props: ["postTitle"],
    data: function() {
        return {
        }
    },
    components : {
        messageSectionA : globalComponents.componentA
    }
}
</script>
<style>
.db_list_class {
}
</style>
