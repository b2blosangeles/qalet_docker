if (!_qalet) var _qalet = {};
$(document).ready(function(){
    _qalet.submitAddDB = function() {
        let formData = $('#addMySQLDBFrom').serializeObject();
        console.log(formData);
        alert('welcome dbs.js');
    }
    
});
