<template>
    <div v-if="showAlert">
        <div class="overlay_alert_cover"></div>
        <div class="overlay_alert">
            <div class="alert_body">
                <div class="alert alert-primary" role="alert">
                  This is a primary alert—check it out!
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
module.exports = {
   props: ["text"],
   data: function() {  
        return {
            showAlert : false
        }
    },
    methods : {
        closeAlert() {
            this.showAlert = false;
        },    
        activeAlert() {
            this.showAlert = true;
        }
    }
}
</script>

<style>

.overlay_slert {
    background: transparent; position: fixed;
    height: 100%; width: 100%;
    z-index: 5001;
    top: 0; left: 0;
    text-align: center;
    padding-top: 6em;
    opacity: 1
}
.overlay_alert_cover {
    position:fixed;
    top:0;
    left:0;
    background:rgba(200,200,200,0.8);
    z-index:5000;
    width:100%;
    height:100%;
}

 
.alert_body {
    background-color: transparent;
    width : 80%;
    min-height : 1em;
    margin: 0 auto;
}

</style>
