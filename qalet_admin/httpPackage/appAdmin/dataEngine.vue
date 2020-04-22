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
        console.log(config.url);
     //   this.params.niu.rr = "==mounted==";
    }
}
</script>
