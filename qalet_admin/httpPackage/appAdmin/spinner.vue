<template>
    <span>
    ={{typeof spinnerTrigger}}={{ spinnerTrigger}}
    <div class="overlay_spin_cover" v-if="spinnerTrigger"><div class="section-spinner"></div></div></div>
    </span>
</template>
 
<script>
module.exports = {
    props: ["spinnerTrigger"]
}
</script>
<style>

</style>
