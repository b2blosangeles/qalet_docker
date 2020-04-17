if (!_qalet) var _qalet = {};




(function ($) {
    $.fn.serializeFormJSON = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);

  Vue.component('button-counter', {
    data: function () {
      return {
        count: 0
      }
    },
      components: {
          'my-component': httpVueLoader('/vue/my-component.vue')
        },
    template: '<span><button v-on:click="count++">==You clicked me {{ count }} times.</button>' +
      '<my-component></my-component></span>'
  }); 

//template: '<button v-on:click="count++">==You clicked me {{ count }} times.</button>'
$(document).ready(function(){
  

    _qalet = new Vue({
      el: '#app',
      data: {
        seen    : true,
        message : null
      },
      components: {
          'my-component': httpVueLoader('/vue/my-component.vue')
        },
      methods: {
        setMessage : function(code) {
            this.message = code + ' =><=' + new Date();
        },
        showModule : function(code) {
            return (!this.switchModule) ? false : this.switchModule(code);
        }
      }
    });
    _qalet.switchModule = function(code) {
            switch (code) {
                case 'a' : 
                    return true;
                    break;
                 case 'b' : 
                    return true;
                    break;
                default:
                    return false;
            }
    }
    
    _qalet.submitAddDB = function() {
        let formData = $('#addMySQLDBFrom').serializeFormJSON();;
        $.ajax({
          type: "POST",
          url: '/api/addMySQLDB',
          data: formData,
          success: function(data) {
              window.location.href = '/dbs'
          },
          error: function(errMsg) {
            alert('failure to add ' + JSON.stringify(formData));
          },
          dataType: 'json'
        });
       
    }

    _qalet.removeDB = function(code) {
        $.ajax({
          type: "POST",
          url: '/api/removeMySQLDB',
          data: {code : code},
          success: function(data) {
              window.location.href = '/dbs'
          },
          error: function(errMsg) {
            console.log('failure to remove ' + code);
          },
          dataType: 'json'
        });
       
    }

    _qalet.$forceUpdate();
   // _qalet.el = '#app';
    // _qalet.$set('el', '#app');
});
