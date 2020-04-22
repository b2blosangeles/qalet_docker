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
   created ()  {
        console.log((config) ? config.url : '-- created --');
     //   this.params.niu.rr = "==mounted==";
    }
}
</script>
