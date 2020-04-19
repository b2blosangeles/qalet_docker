(function () { 
	var obj =  function (env, pkg, req, res) {
		this.call = function() {
		
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
