<template>
    <div>
        <div>uuu</div>
        <div class="overlay_popup"> a ggg</div>
    </div>    
</template>

<script>
module.exports = {
    props: []
}
</script>
<style>
/*---- overlay and spinner ---*/
.overlay_popup {
    background: transparent; position: fixed;
    height: 100%; width: 100%;
    z-index: 5001;
    top: 0; left: 0;
    float: left;
    text-align: center;
    padding-top: 6em;
    opacity: 1
}
.overlay_popup_cover {
    position:fixed;
    top:0;
    left:0;
    background:rgba(200,200,200,0.8);
    z-index:5000;
    width:100%;
    height:100%;
}
.popupWindow {
    background-color: #ff0000;
    width : 640px;
}
</style>
