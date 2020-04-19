<template>
    <span>
        <h3>QALET Databases</h3>
        <!--div class="db_list_class">DB list 22</div-->
         <table class="table">
            <thead>
              <tr>
                <th>DB Name</th>
                <th>ip address</th>
                <th>Port</th>
                <th>Gateway:Port</th>
                <th><a href="/addMySQLDB"><button type="button" class="btn btn-warning"><i class="icon-plus-sign-alt"></i> Add</button></a></th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
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
