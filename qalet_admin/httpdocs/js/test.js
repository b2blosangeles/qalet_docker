/*        var todoItem  = Vue.component('todo-item', {
          props: ['todo'],
          template: '<h2>{{ todo }}</h2>'
        });
        */
$(document).ready(function(){
          /*
        new Vue({
          el: '#jxutest',
          data: {
            message : 'niu'
          },
          components : {
          //      todoItem :todoItem
          },
          computed: {

          }
        });
          var app2 = new Vue({
            el: '#jxutest',
            data: {
              message: 'Hello Vue!'
            }
          })*/
          setTimeout(
                    function() {
                              var todoItem  = Vue.component('todo-item', {
                                        props: ['todo'],
                                        template: '<h2>{{ todo }}</h2>'
                              });
                              var app2 = new Vue({
                                el: '#jxutest',
                                data: {
                                  message: 'Hello Vue 8!'
                                },
                                components : {
                                      todoItem :todoItem
                                }
                    });
                    }, 3000
          
          );

});
