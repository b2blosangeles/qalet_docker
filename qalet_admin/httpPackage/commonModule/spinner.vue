<template>
    <span v-if="trigger && config.spinner">
        <div class="overlay_spin_cover" v-if="!config.inSection && !config.noCover"></div>
        <div class="spinner" v-if="!config.inSection"></div>
        <div class="section_spin_cover" v-if="config.inSection && !config.noCover"></div>
        <div class="section-spinner"  v-if="config.inSection"></div>
    </span>
</template>
 
<script>
module.exports = {
    props: ["trigger", "config"]
}
</script>
<style>
/*---- overlay and spinner ---*/

.spinner {
   position: fixed;
   left: 50%;
   top: 15%;
   height:60px;
   width:60px;
   margin:0px auto;
   -webkit-animation: rotation .6s infinite linear;
   -moz-animation: rotation .6s infinite linear;
   -o-animation: rotation .6s infinite linear;
   animation: rotation .6s infinite linear;
   border-left:6px solid rgba(0,174,239,.15);
   border-right:6px solid rgba(0,174,239,.15);
   border-bottom:6px solid rgba(0,174,239,.15);
   border-top:6px solid rgba(0,174,239,.8);
   border-radius:100%;
}

.section-spinner {
   position: absolute;
   left: 50%;
   top: 20%;
   height:60px;
   width:60px;
   margin:0px auto;
   -webkit-animation: rotation .6s infinite linear;
   -moz-animation: rotation .6s infinite linear;
   -o-animation: rotation .6s infinite linear;
   animation: rotation .6s infinite linear;
   border-left:6px solid rgba(0,174,239,.15);
   border-right:6px solid rgba(0,174,239,.15);
   border-bottom:6px solid rgba(0,174,239,.15);
   border-top:6px solid rgba(0,174,239,.8);
   border-radius:100%;
}

@-webkit-keyframes rotation {
   from {-webkit-transform: rotate(0deg);}
   to {-webkit-transform: rotate(359deg);}
}
@-moz-keyframes rotation {
   from {-moz-transform: rotate(0deg);}
   to {-moz-transform: rotate(359deg);}
}
@-o-keyframes rotation {
   from {-o-transform: rotate(0deg);}
   to {-o-transform: rotate(359deg);}
}
@keyframes rotation {
   from {transform: rotate(0deg);}
   to {transform: rotate(359deg);}
}

.overlay_spin_page {
    background: transparent;  position: fixed;
    height: 100%; width: 100%;
    z-index: 5009;
    top: 0; left: 0;
    float: left;
    text-align: center;
    padding-top: 0;  opacity: 1
}

.overlay_spin_cover {
    position:fixed;
    top:0; left:0;
    background:rgba(0,0,0,0.6);
    z-index:5008;
    width:100%;
    height:100%;
    /* display:none; */
}


.section_spin_page {
    background: transparent;  position: absolute;
    height: 100%; width: 100%;
    z-index: 2;
    top: 0; left: 0;
    text-align: center;
    padding-top: 0;  opacity: 1
}

.section_spin_cover {
    position: absolute;
    top:0; left:0;
    background:rgba(255,255,255,0.6);
    z-index:8000;
    width:100%;
    height:100%;
}

</style>
