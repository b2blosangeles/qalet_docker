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
        var inSection, spinner, noCover;
        if (typeof this.config === 'undefined' || typeof this.config.spinner === 'undefined') {
            inSection = false;
            spinner = false; 
            noCover = true;
        } else {
            inSection = this.config.spinner.inSection;
            noCover = this.config.spinner.noCover;
            spinner = true;      
        }
        return {
            spinnerTrigger  : false,
            spinnerConfig   : {
                inSection   : inSection,
                spinner     : spinner,
                noCover     : noCover
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
         /*
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
           */
        }
    }}

</script>
