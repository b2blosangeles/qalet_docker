<template>
    <span>
        <h3>QALET Virtual Hosts</h3>

        <data-engine  v-bind:config="dataEngineConfig"  v-bind:id="dataEngineConfig.id" v-bind:result="resultData"></data-engine>
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
                <tr v-for="item in resultData.items">
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
            items : [],
            dataEngineConfig : {
                id  : 0,
                url : '/api'
            },
            resultData : {}
        }
    },
    components : {
        dataEngine : QALETCOMM.dataEngine
    },
    created()  {
    },
    mounted ()  {
        var me = this;
        setTimeout(function() {
            me.loadData();
        }); 
    },
    methods : {
        setAction(v) {
            this.currentAction = v;
        },
        loadData() {
            this.dataEngineConfig.id = new Date().getTime();
        }
    }
}
</script>
<style>
.db_list_class {
    background-color : lightgreen
}
</style>
