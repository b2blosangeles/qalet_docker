<template>
    <span>
        test--+--{{showConfig ()}}---test-dataEngine
    </span>
</template>
 
<script>
module.exports = {
    props: ["config"],
    data: {
    },
    showConfig () {
        return (config) ? config.url : '-- showConfig --';
    },
    created ()  {
        console.log((config) ? config.url : '-- created --');
     //   this.params.niu.rr = "==mounted==";
    }
}
</script>
