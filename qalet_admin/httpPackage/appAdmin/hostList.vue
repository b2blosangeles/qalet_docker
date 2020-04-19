<template>
    <span>
        <h3>QALET Virtual Hosts</h3>
         <table class="table" v-if="currentAction==''">
            <thead>
              <tr>
                <th>DB Name</th>
                <th>ip address</th>
                <th>Port</th>
                <th>Gateway:Port</th>
                <th><button type="button" class="btn btn-warning"  v-on:click="currentAction('new')"><i class="icon-plus-sign-alt"></i> Add</button></th>
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
          <div v-if="currentModule!='list'">
            <button type="button" class="btn btn-warning"  v-on:click="currentAction('')"><i class="icon-plus-sign-alt"></i> Cancel</button>
          </div>
     </span>
</template>
 
<script>
module.exports = {
    props: ["postTitle"],
    data: function() {  
        return {
            currentAction : '',
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
        setAction(v) {
            this.currentAction = v;
        },
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
