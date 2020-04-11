(function () { 
	var obj =  function (pkg, env, req, res) {
		this.do = function(cmd, spacename) {
			res.send(env);
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
