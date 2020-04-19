<template>
    <span>
        <h3>QALET Databases</h3>
         <table class="table">
            <thead>
              <tr>
                <th>DB Name</th>
                <th>ip - address</th>
                <th>Port</th>
                <th>Gateway:Port</th>
                <th><a href="/addMySQLDB"><button type="button" class="btn btn-warning"><i class="icon-plus-sign-alt"></i> Add</button></a></th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="item in items">
                    <td>{{item.serverName}}</td>
                    <td>{{item.gitHub}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
          </table>
     </span>
</template>
 
<script>
module.exports = {
    props: ["postTitle"],
    data: function() {  
        return {
            items : []
        }
    },
    components : {
        messageSectionA : QALETCOMM.componentA 
    },
    created()  {
        this.loadItems();
    },
    mounted : {
        loadItems() {
            this.$http.get('/api').then(response => {
               // this.items = response.body;
                console.log(response.body);
            }, response => {
                console.log('--error---');
            });
        }
    }
}


</script>
<style>
.db_list_class {
    background-color : lightgreen
}
</style>
