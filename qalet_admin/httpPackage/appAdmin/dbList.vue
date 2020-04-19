<template>
    <span>
        <h3>QALET Databases</h3>
        <!--div class="db_list_class">DB list 22</div-->
         <table class="table">
            <thead>
              <tr>
                <th>DB Name</th>
                <th>ip address</th>
                <th>Port</th>
                <th>Gateway:Port</th>
                <th><a href="/addMySQLDB"><button type="button" class="btn btn-warning"><i class="icon-plus-sign-alt"></i> Add</button></a></th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="item in items">
                    <td>{{item.serverName}}</td>
                    <td>{{item.gitHub}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
          </table>
     </span>
</template>
 
<script>
module.exports = {
    props: ["postTitle"],
    data: function() {
 // 778899  
        return {
            items : [
                {
                    serverName	: 'www.shusiou.win', 
                    serverAlias	: 'shusiou.win',
                    gitHub : 'http://github.com/b2blosangeles/docker_apachePHP.gitC',
                    innerPort	: '80',
                    gatewayIp	: '173.28.5.254',
                    gatewayPort: '20001'
                },
                {
                    serverName	: 'www.shusiou.win', 
                    serverAlias	: 'shusiou.win',
                    gitHub : 'http://github.com/b2blosangeles/docker_apachePHP.gitC',
                    innerPort	: '80',
                    gatewayIp	: '173.28.5.254',
                    gatewayPort: '20001'
                }
            ]
        }
    },
    components : {
        messageSectionA : QALETCOMM.componentA 
    },
    mounted() {
        axios({ method: "GET", "url": "https://httpbin.org/ip" }).then(result => {
            this.ip = result.data.origin;
        }, error => {
            console.error(error);
        });
    }
}


</script>
<style>
.db_list_class {
    background-color : lightgreen
}
</style>
