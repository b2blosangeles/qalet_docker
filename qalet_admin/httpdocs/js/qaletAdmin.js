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
        var globalComponents = {
                  dbList         : QALETCOMM.dbList,
                  hostList       : QALETCOMM.hostList,
                  messageSectionA: QALETCOMM.componentA,
                  messageSectionB: QALETCOMM.componentB,
                  messageSectionC: QALETCOMM.componentC
                }
    
        var NotFound = { 
            template: '<message-section-a postTitle="Page not found"></message-section-a>',
            components : globalComponents 
         },
         Home = { 
            template: '<message-section-b postTitle="Home"></message-section-b>',
            components : globalComponents 
         },
         About = { 
            template: '<message-section-c postTitle="About"> </message-section-c>',
            components : globalComponents 
         },
         Databases = { 
            template: '<db-list postTitle="Databases"></db-list>',
            components : globalComponents 
         },
         virtualHosts = { 
            template: '<host-list postTitle="Databases"></host-list>',
            components : globalComponents 
         };
    
        var routes = {
          '/'               : Home,
          '/about'          : About,
          '/dbs'            : Databases,
          '/virtualHosts'   : virtualHosts
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
