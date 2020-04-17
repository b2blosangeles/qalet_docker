(function () { 
	var obj =  function (env, pkg, req, res) {
		this.call = function(p) {
			var me = this;
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
					me.veuFiles(d);
				  }
			      } else if(err.code === 'ENOENT') {
				  res.render('html/page404.ect');
			      }
			});
		}		
		this.veuFiles = function(list) {
			var me = this;
			var CP = new pkg.crowdProcess(),_f = {}; 
			
			for (var i = 0; i < list.length; i++) {
				_f['_' + i] = (function(i) {
					return function(cbk) {
						return list[i];
					}
				})(i)
			}
			
			CP.serial(
				_f,
				function(data) {
					data.status = 'success';
					res.send(CP.data);
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
