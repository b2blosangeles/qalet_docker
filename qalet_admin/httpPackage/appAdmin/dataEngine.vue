<template>
    <span>
        test-->--{{config.url}}--==-test-dataEngine
    </span>
</template>
 
<script>
module.exports = {
    props: ["config"],
    data: {
    },
    created ()  {
        console.log(this.showConfig());
     //   this.params.niu.rr = "==mounted==";
    },
    methods : {
        showConfig () {
           return (typeof this.config == 'undefined') ? '-- created --' :  this.config.url;
        }
    }
}
</script>
