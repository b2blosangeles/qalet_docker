<template>
    <spinner v-bind:['trigger']="spinnerTrigger"></spinner>
    <span>
        test-->--{{config.url}}--==-test-dataEngine
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
    },
    components : {
        spinner : QALETCOMM.spinner,
        dataEngine : QALETCOMM.dataEngine
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
