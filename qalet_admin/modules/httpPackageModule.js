(function () { 
	var obj =  function (env, pkg, req, res) {
		this.call = function(p) {
			var fn = env.adminFolder + '/httpPackage/' + p.replace(/^\//, '');
			pkg.fs.stat(fn, function(err, stat) {
			      if(err == null) {
				  if (stat.isDirectory()) {
					res.render('html/page404.ect');
				  } else {
					let d = {};
					try {
						delete require.cache[fn];
						d = require(fn);
					}  catch (err) {}
					res.send(d);
				  }
			      } else if(err.code === 'ENOENT') {
				  res.render('html/page404.ect');
			      }
			});
		}		
		this.packageCodeFiles = function() {
			var me = this;
			var CP = new pkg.crowdProcess(),_f = {}; 
			
			_f['prepare_folder'] = function(cbk) {
				var cmd = 'mkdir -p ' + env.root + '/db_setting';
				pkg.exec(cmd, 
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
				
				pkg.fs.writeFile(env.root + '/db_setting/dbs.json', JSON.stringify(data), (err) => {
				  cbk(true);
				});
			}
			
			CP.serial(
				_f,
				function(data) {
					data.status = 'failure';
					res.send(data);
					/*
					res.writeHead(301,
					  {Location: 'http://admin.shusiou.win/dbs'}
					);
					res.end();
					*/
			   	},
			   	6000
			);
			
		}
	};

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} else {
		window.httpPackageModule = function() {
			return obj; 
		}
	}
	
})();