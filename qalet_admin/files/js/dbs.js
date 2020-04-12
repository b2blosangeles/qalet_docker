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
    _qalet.submitAddDB = function() {
        let formData = $('#addMySQLDBFrom').serializeFormJSON();
        formData.cmd = 'add';
        $.ajax({
          type: "POST",
          url: '/api/addMySQLDB',
          data: formData,
          success: function(data) {
          //    window.location.href = '/dbs'
          },
          error: function(errMsg) {
            alert('failure');
          },
          dataType: 'json'
        });
       
    }
    
    _qalet.removeDB = function(code) {
        $.ajax({
          type: "POST",
          url: '/api/addMySQLDB',
          data: {cmd: 'remove', code : code},
          success: function(data) {
          //    window.location.href = '/dbs'
          },
          error: function(errMsg) {
            alert('failure');
          },
          dataType: 'json'
        });
       
    }
    
});
