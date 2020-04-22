<template>
    <span>
        test-->--{{config}}--==-test-dataEngine
    </span>
</template>
 
<script>
module.exports = {
    props: ["config"],
    data: {
    },
    created ()  {
        console.log((!config) ?  '-- created --' : config.url);
     //   this.params.niu.rr = "==mounted==";
    }
}
</script>
