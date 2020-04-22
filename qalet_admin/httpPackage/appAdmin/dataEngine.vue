<template>
    <span>
        test--+--{{params.niu.rr}}---test-dataEngine
    </span>
</template>
 
<script>
module.exports = {
    props: ["params"],
    data: {

    
    },
    mounted ()  {
        this.params.niu.rr = "==mounted==";
    }
}
</script>
