<template>
    <span>
        test--==>--{{config.url}}--=C-C=-test-dataEngine
        <spinner v-bind:['trigger']="spinnerTrigger"></spinner>
    </span>
</template>
 
<script>
module.exports = {
    props: ["config", "id", "result"],
    watch: { 
      	id: function(newVal, oldVal) { 
            if (newVal) {
                console.log('==chnaged===>');
                console.log(newVal);
                console.log(oldVal);
                console.log('<---------');
                this.config.id = 0;
                this.result.respId = newVal;
                this.loadItems();
            }
        }
    },
    data: {
        spinnerTrigger : false
    },
    components : {
        spinner : QALETCOMM.spinner,
        dataEngine : QALETCOMM.dataEngine
    },
    created ()  {
        this.spinnerTrigger = false;
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
            alert(12);
            this.$http.post('/api', {code: 'vhosts'}).then(response => {
               this.spinnerTrigger = false;
               this.items = response.body.results;
                console.log(response.body);
            }, response => {
                this.spinnerTrigger = false;    
                console.log('--error---');
            });
        }
    }
}
</script>
