<template>
    <span>
        <h3>QALET Databases</h3>
        <div class="db_list_class">DB list 22</div>
     </span>
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
    background-color : lightgreen
}
</style>
