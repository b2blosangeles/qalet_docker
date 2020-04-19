(function () { 
	var obj =  function (env, pkg, req, res) {
		this.vhosts = [
			{
				serverName	: 'www.shusiou.winA', 
				serverAlias	: 'shusiou.win',
				gitHub		: 'https://github.com/b2blosangeles/docker_apachePHP.git',
				innerPort	: 80,
				gatewayIp	: '173.28.5.254',
				gatewayPort: 20001
			},
			{
				serverName	: 'www.shusiou.winB', 
				serverAlias	: 'shusiou.win',
				gitHub		: 'https://github.com/b2blosangeles/docker_apachePHP.git',
				innerPort	: 80,
				gatewayIp	: '173.28.5.254',
				gatewayPort: 20001
			}
		];
		this.get = function(cmd) {
			res.send({
				status	: 'success',
				cmd 	: cmd,
				results	: this.vhosts
				
			});
		}
	};

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} else {
		window.apiModule = function() {
			return obj; 
		}
	}
	
})();
