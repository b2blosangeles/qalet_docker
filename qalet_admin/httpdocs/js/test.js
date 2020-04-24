        Vue.component('todo-item', {
          props: ['todo'],
          template: '<h2>{{ todo }}</h2>'
        });
        new Vue({
          el: '#jxutest',
          data: {
            
          },
          computed: {

          }
           //,
         // render (h) { return h() }
        });
