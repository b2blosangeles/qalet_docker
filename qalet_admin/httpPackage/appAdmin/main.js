$(document).ready(function(){
        var globalComponents = {
              dbList         : appAdmin.dbList,
              hostList       : appAdmin.hostList
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
   

    
});
