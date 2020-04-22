<template>
    <span>
        <message-section-a postTitle="niu bi"></message-section-a>
        <h3>QALET Databases</h3>
         <overlay_spin_cover><div class="section-spinner" v-if="spinner"></div>Loading ...</overlay_spin_cover>
         <table class="table" v-if="currentAction==''">
            <thead>
              <tr>
                <th>DB Name</th>
                <th>ip address</th>
                <th>Port</th>
                <th>Gateway:Port</th>
                <th><button type="button" class="btn btn-warning"  v-on:click="setAction('new')"><i class="icon-plus-sign-alt"></i> Add</button></th>
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
          <div v-if="currentAction!=''">
            <button type="button" class="btn btn-warning"  v-on:click="setAction('')"><i class="icon-plus-sign-alt"></i> Cancel</button>
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
    components : {
        messageSectionA : QALETCOMM.componentA 
    },
    created()  {
        this.loadItems();
        console.log("==created==a");
    },
    mounted ()  {
        console.log("==mounted==a");
    },
    methods : {
        setAction(v) {
            this.currentAction = v;
        },
        loadItems() {
            this.spinner = true;
            this.$http.post('/api', {code: 'dbs'}).then(response => {
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
