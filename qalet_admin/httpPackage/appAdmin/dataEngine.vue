<template>
    <span>
        <spinner v-bind:trigger="spinnerTrigger" v-bind:config="spinnerConfig"></spinner>
    </span>
</template>
 
<script>
module.exports = {
    obj  : this,
    props: ["config", "id", "result"],
    watch: { 
      	id: function(newVal, oldVal) { 
            if (newVal) {
                this.loadItems(newVal);
            }
          }
    },          
    data: function() {
        var localSpinner = (!this.config || !this.config.localSpinner) ? false : this.config.localSpinner,
        spinner = (!this.config || !this.config.spinner) ? this.config.spinner : false;
        return {
            spinnerTrigger  : false,
            spinnerConfig   : {
                localSpinner    : localSpinner,
                spinner         : spinner
            }
        }
    },
    components : {
        spinner : QALETCOMM.spinner
    },
    created ()  {
    },
    methods : {
        loadItems(id) {
           
           var me = this;
           me.spinnerTrigger = true;
         
           if (!me.config.postData) {
                me.$http.get(me.config.uri).then(function (response) {
                    me.result.items = response.body.results;
                    me.spinnerTrigger = false;
                    me.config.id = 0;
                }).catch((err) => {
                  console.log(err)
                });
             } else {    
                me.$http.post(me.config.uri, me.config.postData).then(function (response) {
                    me.result.items = response.body.results;
                    me.spinnerTrigger = false;
                    me.config.id = 0;
                }).catch((err) => {
                  console.log(err)
                });
            } 
 
        }
    }
}
</script>
