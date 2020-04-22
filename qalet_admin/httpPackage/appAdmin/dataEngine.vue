<template>
    <span>
        test--+--{{config.url}}---test-dataEngine
    </span>
</template>
 
<script>
module.exports = {
    props: ["config"],
    data: {
    },
    mounted ()  {
        console.log(config.url);
     //   this.params.niu.rr = "==mounted==";
    }
}
</script>
