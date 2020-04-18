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
/*
    new Vue({
      el: '#app',
      data: {
        seen    : true,
        message : null
      },
      components: {
          messageSectionA: QALETCOMM.componentA,
          messageSectionB: QALETCOMM.componentB,
          messageSectionC: QALETCOMM.componentC
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
*/    
const NotFound = { template: '<p>Page not found</p>' }
const Home = { template: '<p>home page</p>' }
const About = { template: '<p>about page</p>' }

const routes = {
  '/': Home,
  '/about': About
}

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
}) 
    
    
});
