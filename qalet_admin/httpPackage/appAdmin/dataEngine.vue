<template>
    <span>
        <spinner v-bind:trigger="spinnerTrigger"></spinner>
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
            spinnerTrigger : false
        }
    },
    components : {
        spinner : QALETCOMM.spinner
    },
    created ()  {
        console.log(this.showConfig());
        this.config.id = 0;
    },
    methods : {
        showConfig () {
           if (typeof config == 'undefined') return '-- created --';  
           else config.url;
        },
        loadItems(id) {
           this.spinnerTrigger = true;
           var me = this;
            this.$http.post('/api', {code: 'vhosts'}). then(function (response) {
                this.result.items = response.body.results;
                me.result.respId = id;
                this.spinnerTrigger = false;
                me.config.id = 0;
            }).catch((err) => {
              console.log(err)
            });
        }
    }
}
</script>
