<template>
    <span>
        test-->--{{config.url}}--==-test-dataEngine
    </span>
</template>
 
<script>
module.exports = {
    props: ["config"],
    watch: { 
      	config: function(newVal, oldVal) { // watch it
          console.log('==chnaged===');
          console.log(newVal);
          console.log(oldVal);
          console.log('---------');
        }
    },
    data: {
    },
    created ()  {
        console.log(this.showConfig());
     //   this.params.niu.rr = "==mounted==";
    },
    methods : {
        showConfig () {
           if (typeof config == 'undefined') return '-- created --';  
           else config.url;
        }
    }
}
</script>
