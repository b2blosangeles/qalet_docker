<template>
    <span>
        <spinner v-bind:trigger="spinnerTrigger" v-bind:cfg="spinnerConfig"></spinner>
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
        return {
            spinnerTrigger  : false,
            spinnerConfig   : {
                localSpinner    : (this.config.localSpinner) ? this.config.localSpinner : false,
                spinner         : (this.config.spinner) ? this.config.spinner : false 
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
