        var todoItem  = Vue.component('todo-item', {
          props: ['todo'],
          template: '<h2>{{ todo }}</h2>'
        });
        new Vue({
          el: '#jxutest',
          data: {
            message : 'niu'
          },
          components : {
                todoItem : Vue.component('todo-item', {
                          props: ['todo'],
                          template: '<h2>{{ todo }}</h2>'
                        })
          },
          computed: {

          }
           //,
         // render (h) { return h() }
        });
