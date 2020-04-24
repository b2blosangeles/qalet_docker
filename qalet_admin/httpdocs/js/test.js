$(document).ready(function(){
          var todoItem  = Vue.component('todoItem', {
                    props: ['todo'],
                    template: '<h3>--{{ todo }}--</h3>'
          });
          setTimeout(
                    function() {

                              var app2 = new Vue({
                                el: '#jxutest',
                                data: {
                                  message: 'Hello Vue : ' + new Date()
                                },
                                components : {
                                      todoItem :todoItem,
                                      dbList   : QALETCOMM.dbList
                                }
                    });
                    });

});
