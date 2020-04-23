<template>
    <span>
        test-->--{{config.url}}--==-test-dataEngine
    </span>
</template>
 
<script>
module.exports = {
    props: ["config", "id"],
    watch: { 
      	id: function(newVal, oldVal) { 
          console.log('==chnaged===>');
          console.log(newVal);
          console.log(oldVal);
          console.log('<---------');
          this.config.id = 0;
        }
    },
    data: {
    },
    created ()  {
        console.log(this.showConfig());
        this.config.id = 0;
    },
    methods : {
        showConfig () {
           if (typeof config == 'undefined') return '-- created --';  
           else config.url;
        }
    }
}
</script>
