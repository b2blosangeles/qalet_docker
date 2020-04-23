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
                this.config.id = 0;
               // this.result.respId = newVal;
                this.loadItems();
            }
          }
    },
    data: function() {  
        return {
            spinnerTrigger : false,
            result : {}
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
        loadItems() {
           this.spinnerTrigger = true;
            this.$http.post('/api', {code: 'vhosts'}).then(response => {
               this.spinnerTrigger = false;
               this.result = 'response.body.results';
                console.log('--this.result--->');
                console.log(this.result);
            }, response => {
                this.spinnerTrigger = false;    
                console.log('--error---');
            });
        }
    }
}
</script>
