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
        const NotFound = { template: '<message-section-a>Page not found</message-section-a>' }
        const Home = { template: '<messageSectionB>home page</messageSectionB>' }
        const About = { template: '<p><message-section-c>about page</message-section-c></p>' }

        const routes = {
          '/': Home,
          '/about': About
        }

        new Vue({
          el: '#app',
          data: {
            currentRoute: window.location.pathname
          },
         components: {
              messageSectionA: QALETCOMM.componentA,
              messageSectionB: QALETCOMM.componentB,
              messageSectionC: QALETCOMM.componentC
            },
          computed: {
            ViewComponent () {
              return routes[this.currentRoute] || NotFound
            }
          },
          render (h) { return h(this.ViewComponent) }
        }) 
    
    
});
