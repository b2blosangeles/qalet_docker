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
    },
    methods : {
        loadItems(id) {
           this.spinnerTrigger = true;
           if (!this.config.postData) {
                this.$http.get(this.config.uri).then(function (response) {
                    this.result.items = response.body.results;
                    this.spinnerTrigger = false;
                    me.config.id = 0;
                }).catch((err) => {
                  console.log(err)
                });
             } else {    
                this.$http.post(this.config.uri, this.config.postData).then(function (response) {
                    this.result.items = response.body.results;
                    this.spinnerTrigger = false;
                    me.config.id = 0;
                }).catch((err) => {
                  console.log(err)
                });
            } 
        }
    }
}
</script>
