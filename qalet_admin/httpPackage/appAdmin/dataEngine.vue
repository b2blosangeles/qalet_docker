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
            if (typeof this.config == 'undefined') return  '-- created --' 
            else return this.config.url;
        }
    }
}
</script>
