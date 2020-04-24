$(document).ready(function(){

          
          setTimeout(
                    function() {
                              var todoItem  = Vue.component('todoItem', {
                                        props: ['todo'],
                                        template: '<h3>-8-{{ todo }}-9- <message title="KAI"></message> -</h3>',
                                        components : {
                                              message   : QALETCOMMA.message
                                         }
                                });        
                              var app2 = new Vue({
                                el: '#jxutest',
                                data: {
                                  message: 'Hello Vue : ' + new Date()
                                },
                                components : {
                                      todoItem :todoItem,
                                      message   : QALETCOMMA.messageA
                                }
                    });
                    });

});
