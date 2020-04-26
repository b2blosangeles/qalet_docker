<template>
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Input Form keep-alive v9</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <button class="btn btn-primary" v-on:click="closePopup()">clost popup</button>
        </div>
      </div>
</template>

<script>
module.exports = {
    props: [],
   data: function() {  
        return {
        }
    },
    components : {
    },
    methods : {

        closePopup() {
            this.$parent.closePopup();
        }
     
    }
}
</script>

<style>
</style>
