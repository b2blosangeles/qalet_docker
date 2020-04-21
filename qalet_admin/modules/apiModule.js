(function () { 
	var obj =  function (env, pkg, req, res) {
		this.dbs = [
			{
				serverName	: 'www.shusiou.winADB', 
				serverAlias	: 'shusiou.win',
				gitHub		: 'https://github.com/b2blosangeles/docker_apachePHP.git',
				innerPort	: 80,
				gatewayIp	: '173.28.5.254',
				gatewayPort: 20001
			},
			{
				serverName	: 'www.shusiou.winBDB', 
				serverAlias	: 'shusiou.win',
				gitHub		: 'https://github.com/b2blosangeles/docker_apachePHP.git',
				innerPort	: 80,
				gatewayIp	: '173.28.5.254',
				gatewayPort: 20001
			}
		];
		this.vhosts = [
			{
				serverName	: 'www.shusiou.winAPOST', 
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
		this.get = function(code) {
			switch(code) {
				case '/dbs'	:
					res.send({
						status	: 'success',
						cmd 	: code,
						results	: this.dbs

					});
					break;
				default : 	
					res.send({
						status	: 'failure',
						cmd 	: code,
						message	: 'Missiing or wrong code'
					});		
			}

		};
		this.post = function() {
			var code = req.body.code;
			switch(code) {
				case '/dbs'	:
					res.send({
						status	: 'success',
						cmd 	: code,
						results	: this.dbs

					});
					break;
				case '/vhosts'	:
					res.send({
						status	: 'success',
						cmd 	: code,
						results	: this.vhosts

					});
					break;
				default : 	
					res.send({
						status	: 'failure',
						cmd 	: code,
						message	: 'Missiing or wrong code'
					});		
			}

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
