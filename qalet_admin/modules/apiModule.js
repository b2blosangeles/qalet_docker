(function () { 
	var obj =  function (env, pkg, req, res) {
		this.do = function(cmd, spacename) {
			res.send(env);
		}
		this.addDB = function() {
			var me = this;
			var CP = new pkg.crowdProcess(),_f = {}; 
			
			res.send('Test');
			return true;
			/*
			_f['prepare_folder'] = function(cbk) {
				var cmd = 'mkdir -p ' + env.root + '/db_setting';
				exec(cmd, 
				     {maxBuffer: 1024 * 2048},
				     function(error, stdout, stderr) {
					cbk(true);
				});
			}
			
			_f['savefile'] = function(cbk) {
				var dt = req.body;
				dt.gitHub = 'https://github.com/b2blosangeles/docker_mysql.git';
				var data = [];
				try {
					delete require.cache[env.root + '/db_setting/dbs.json'];
					data = require(env.root + '/db_setting/dbs.json');
				} catch(e) {
					
				} 				
				data.push(dt);
				
				fs.writeFile(env.root + '/db_setting/dbs.json', JSON.stringify(data), (err) => {
				  cbk(true);
				});
			}
			
			CP.serial(
				_f,
				function(data) {
					res.writeHead(301,
					  {Location: 'http://admin.shusiou.win/dbs'}
					);
					res.end();
			   	},
			   	6000
			);
			*/
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
