appId = 285414425069 // this is your facebook app id




function logout() {
	window.plugins.facebook.logout(function(res) {
		alert(res);
	});
}
            
function login() {
	alert("login");
    window.plugins.facebook.authorize(appId, function(res) {
	    if(res.token !== undefined) {
	        window.plugins.facebook.request("me" ,function(res){
		        alert(res.name); 
		    });
	    } else {
	        // we have to call authorize
	        window.plugins.facebook.getAccess(function(res) {
	            if(res.token !== undefined) {
	                window.plugins.facebook.request("me" ,function(res){
				        alert(res.name); 
				    });
	            }
	        });
	    }
	});
}