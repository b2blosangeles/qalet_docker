<template>
    <span>
    ={{typeof spinner-trigger}}={{ spinner-trigger}}
    <div class="overlay_spin_cover" v-if="spinner-trigger"><div class="section-spinner"></div></div></div>
    </span>
</template>
 
<script>
module.exports = {
    props: ["spinner-trigger"]
}
</script>
<style>

</style>
