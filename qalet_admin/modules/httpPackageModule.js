(function () { 
	var obj =  function (env, pkg, req, res) {
		this.call = function(p) {
			var me = this;
			var fn = env.adminFolder + '/httpPackage/' + p.replace(/^\//, '') + '.json';
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
					me.veuFiles(d.vue);
				  }
			      } else if(err.code === 'ENOENT') {
				  res.render('html/page404.ect');
			      }
			});
		}		
		this.veuFiles = function(list) {
			var me = this;
			var CP = new pkg.crowdProcess(),_f = {}; 
			
			var dirn = env.adminFolder + '/httpdocs/';
			
			for (var i = 0; i < list.length; i++) {
				_f['_' + i] = (function(i) {
					return function(cbk) {
						let lfn = dirn + list[i].replace(/^\//, '');
						pkg.fs.readFile(lfn, 'utf8', function(err, data){
							cbk(data);
							//cbk(data.replace(/(\r\n|\n|\r)/gm,' ')); 
						}); 
						return true;
					}
				})(i)
			}
			
			CP.serial(
				_f,
				function(data) {
					var str = "var vueCommon = {}; \n";
					for (var i = 0; i < list.length; i++) {
						let lfn = dirn + list[i].replace(/^\//, '');
						let fileName = lfn.substring(lfn.lastIndexOf('/')+1).replace(/\..*$/,' ');
						str += 'vueCommon.' + fileName + ' = ';
						str += "codeVeuSFCLoader(decodeURIComponent(`" +  
							CP.data['_' + i].replace(/(\r\n|\n|\r)/gm,' ') +  
						"`)); \n";
					}
					res.send(str);
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
