(function () { 
	var obj =  function (env, pkg, req, res) {
		this.get = function(cmd) {
			res.send(cmd);
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
