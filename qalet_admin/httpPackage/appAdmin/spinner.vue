<template>
    <span>
    ={{typeof trigger}}={{ trigger}}
    <div class="overlay_spin_cover" v-if="trigger=='on'"><div class="section-spinner"></div></div></div>
    </span>
</template>
 
<script>
module.exports = {
    props: ["trigger"]
}
</script>
<style>

</style>
