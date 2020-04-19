<template>
    <span>
        <h3>QALET Virtual Hosts</h3>
         <table class="table">
            <thead>
              <tr>
                <th>DB Name</th>
                <th>ip address</th>
                <th>Port</th>
                <th>Gateway:Port</th>
                <th><button type="button" class="btn btn-warning"  v-on:click="setModule('new')"><i class="icon-plus-sign-alt"></i> Add</button></th>
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
            currentModule : '',
            items : []
        }
    },
    components : {},
    created()  {
        this.loadItems();
        console.log("==created==");
    },
    mounted ()  {
        console.log("==mounted==");
    },
    methods : {
        setModule(v) {
            this.currentModule = v;
        }
        loadItems() {
            this.$http.get('/api/vhosts').then(response => {
               this.items = response.body.results;
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
