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

$(document).ready(function(){
    _qalet = new Vue({
      el: '#app',
      data: {
        seen    : true,
        message : null
      },
      methods: {
        setMessage : function(code) {
            this.message = code + ' =><=' + new Date();
        },
        switch : function(code) {
            return (!this.ttt1) ? false: this.ttt1(code);
        }
      }
    });
    _qalet.ttt1 = function(code) {
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
        return true;
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
    _qalet.forceUpdate();
   // _qalet.el = '#app';
});
