<template>
    <span>
    ={{typeof spinnertrigger}}={{ spinnertrigger}}
    <div class="overlay_spin_cover" v-if="spinnertrigger=='on'"><div class="section-spinner"></div></div></div>
    </span>
</template>
 
<script>
module.exports = {
    props: ["spinnertrigger"]
}
</script>
<style>

</style>
