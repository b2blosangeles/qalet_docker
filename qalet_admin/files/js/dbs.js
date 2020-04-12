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
        $.ajax({
          type: "POST",
          url: url,
          data: formData,
          success: function(data) {
             alert(JSON.stringify(data));
          },
          failure: function(errMsg) {
            alert('failure');
          },
          dataType: 'json'
        });
       
    }
    
});
