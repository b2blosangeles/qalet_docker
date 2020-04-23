<template>
    <span v-if="trigger">
        <div class="overlay_popup_cover"></div>
        <div class="overlay_popup">uuu
            <div class="popupWindow">opop
                <!--div class="media">
                  <a class="pull-left" href="#">
                    <img class="media-object" data-src="holder.js/64x64">
                  </a>
                  <div class="media-body">
                    <h4 class="media-heading">Media heading</h4>
                    <div class="media">
                    </div>
                  </div>
                </div-->
            </div>
        </div>
    </span>
</template>
 
<script>
module.exports = {
    props: ["trigger", "config"]
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
