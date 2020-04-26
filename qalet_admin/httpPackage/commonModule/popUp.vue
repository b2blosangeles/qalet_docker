<template>
    <div v-if="showPopup">
        <div class="overlay_popup_cover"></div>
        <div class="overlay_popup">
            <div class="popupBody">
                <div class="card" style="width: 18rem;">
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <button class="btn btn-primary" v-on:click="setPopupStatus(false)">clost popup</button>
                  </div>
                </div>           
            </div>
        </div>
    </div>    
</template>

<script>
module.exports = {
    props: [],
   data: function() {  
        return {
            showPopup : false
        }
    },
    methods : {
        setPopupStatus(v) {
            this.showPopup = v;
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

 
.popupBody {
    background-color: #ffff;
    width : 80%;
    margin: 0 auto;
}

</style>
