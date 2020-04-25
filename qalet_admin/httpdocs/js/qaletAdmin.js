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

// $(document).ready(function(){
        var globalComponents = {
                  dbList         : QALETCOMM.dbList,
                  hostList       : QALETCOMM.hostList,
                  messageSectionA: QALETCOMM.componentA,
                  messageSectionB: QALETCOMM.componentB,
                  messageSectionC: QALETCOMM.componentC
                }
    
        var NotFound = { 
            template: '<message postTitle="Page not found"></message>',
            components : globalComponents 
         },
         Home = { 
            template: '<message postTitle="Home"></message>',
            components : globalComponents 
         },
         About = { 
            template: '<message postTitle="About"> </message>',
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
        });
   

    
// });
