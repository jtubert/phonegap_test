appId = 285414425069 // this is your facebook app id

function init() {    
	document.addEventListener("deviceready", reauthorize, true);
}

function authorize(){
	window.plugins.facebook.authorize(appId, login);
}

function reauthorize(){
	//alert(device.platform);
	window.plugins.facebook.reauthorize(appId, login);
}

function logout() {
	window.plugins.facebook.logout(onLogout);
}
            
function login(res) {    
    if(res.token !== undefined) {
        window.plugins.facebook.request("me" ,function(res){	        
			onLogin(res);  
	    });
    } else {
        // we have to call authorize
        window.plugins.facebook.getAccess(function(res) {
            if(res.token !== undefined) {
                window.plugins.facebook.request("me" ,function(res){			        
					onLogin(res); 
			    });
            }
        });
    }
}

function onLogin(res){
	alert(res.name);
	$("#login").hide();
	$("#logout").show();
}

function onLogout(res){
	alert(res);
	$("#login").show();
	$("#logout").hide();	
}