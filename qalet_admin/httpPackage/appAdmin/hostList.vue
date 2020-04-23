<template>
    <span>
        <h3>QALET Virtual Hosts</h3>

        <data-engine  v-bind:config="dataEngineConfig"  v-bind:id="dataEngineConfig.id" v-bind:result="resultData"></data-engine>
        <hr/>
        <button type="button" class="btn btn-warning"  v-on:click="dataEngineConfig.id = new Date().getTime()">Call Engine</button>
        --{{dataEngineConfig}}--==={{resultData}}=>>==
        <hr/>
        <!--spinner v-bind:['trigger']="spinnerTrigger"></spinner-->
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
                <tr v-for="item in resultData">
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
            return true;
            /*
            this.spinnerTrigger = true;
            this.$http.post('/api', {code: 'vhosts'}).then(response => {
               this.spinnerTrigger = false;
               this.items = response.body.results;
                console.log(response.body);
            }, response => {
                this.spinnerTrigger = false;    
                console.log('--error---');
            });
            */
        }
    }
}


</script>
<style>
.db_list_class {
    background-color : lightgreen
}
</style>
