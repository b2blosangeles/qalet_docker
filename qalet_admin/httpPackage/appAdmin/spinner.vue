<template>
    <span>
    ={{typeof spinner-trigger}}={{ spinner-trigger}}
    <div class="overlay_spin_cover" v-if="spinnertrigger"><div class="section-spinner"></div></div></div>
    </span>
</template>
 
<script>
module.exports = {
    props: ["spinnerTrigger"]
}
</script>
<style>

</style>
