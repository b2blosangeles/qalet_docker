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
     _qalet.loadECT=function(code) {
         /*
        var renderer = ECT({ root : '/ectClientView' });
        var data = { title : 'Hello, World!' };
         
        var html = renderer.render('test.ect', data);
         console.log(html);*/
         var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
         /*
         var source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
             "{{kids.length}} kids:</p>" +
             "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";
            var template = Handlebars.compile(source);

            var data = { "name": "Alan", "hometown": "Somewhere, TX",
                         "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
            var result = template(data);
          console.log( result);
          */
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
    
});
