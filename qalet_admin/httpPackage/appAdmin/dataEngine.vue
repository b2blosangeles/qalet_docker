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
                this.result.respId = newVal;
                
                 this.result.items = [{serverName: "www.shusiou.winAPOSTb", serverAlias: "shusiou.win"}, {serverName: "www.shusiou.winAPOSTa", serverAlias: "shusiou.win"}];
                this.loadItems(this);
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
        loadItems(o) {
           this.spinnerTrigger = true;
           var me = this;
           me.result.respId = '676767';
           
            this.$http.post('/api', {code: 'vhosts'}). then(function (response) {
                me.result.respId = '8888888';
                console.log(this.result);
                this.spinnerTrigger = false;
            }).catch((err) => {
              console.log(err)
            });
           /*
           me.$http.post('/api', {code: 'vhosts'}).then(
            
                (function(me) {
                    return response => {
                   me.spinnerTrigger = false;
                  
                   me.result.respId = '12345';
                   
                    o.result.respId = '8888888';
                    
                   console.log(me.result);
                  // for (var i=0; i < response.body.results.length; i++) {
                  //         this.result.items.push(response.body.results[i]);
                  // }
                //   this.result.items = [1, 2];
                    console.log('--this.result--->');
                   // console.log(response.body.results);
                }})(me)
            
            , response => {
                this.spinnerTrigger = false;    
                console.log('--error---');
            });
            */
        }
    }
}
</script>
