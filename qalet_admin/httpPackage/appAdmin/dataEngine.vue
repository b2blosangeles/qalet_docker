<template>
    <span>
        test--+--{{dataEngineConfig.url}}---test-dataEngine
    </span>
</template>
 
<script>
module.exports = {
    props: ["dataEngineConfig"],
    data: {
    },
    mounted ()  {
        console.log(dataEngineConfig.url);
     //   this.params.niu.rr = "==mounted==";
    }
}
</script>
