<template>
    <div v-if="showPopup">
        <div class="overlay_popup_cover"></div>
        <div class="overlay_popup">
            <div class="popup_body rounded shadow">
                <keep-alive>
                  <component :is="config.dynamicPlugin"></component>
                </keep-alive>          
            </div>
        </div>
    </div>    
</template>

<script>
module.exports = {
   props: ["config"],
   data: function() {  
        return {
            showPopup : false
        }
    },
    methods : {
        closePopup() {
            this.showPopup = false;
        },    
        activePopUp() {
            this.showPopup = true;
        }
    }
}
</script>

<style>

.overlay_popup {
    background: transparent; position: fixed;
    height: 100%; width: 100%;
    z-index: 5001;
    top: 0; left: 0;
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

 
.popup_body {
    background-color: #ffff;
    width : 80%;
    margin: 0 auto;
}

</style>
