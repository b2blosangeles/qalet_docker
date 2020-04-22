<template>
    <span>
    ={{trigger}}=
    <div class="overlay_spin_cover" v-if="trigger==true"><div class="section-spinner"></div></div></div>
    </span>
</template>
 
<script>
module.exports = {
    props: ["trigger"]
}
</script>
<style>

</style>
