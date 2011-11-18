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

//http://jquerymobile.com/test/docs/api/methods.html
//$.mobile.changePage( "about/us.html", { transition: "slideup"} );

function onLogin(res){
	//alert(res.name);
	
	addFriends();
	
	$("#login").hide();
	$("#logout").show();
}

function dump_pic(data) {
    var viewport = document.getElementById('viewport');
    console.log(data);
    viewport.style.display = "";
    viewport.style.position = "absolute";
    viewport.style.top = "10px";
    viewport.style.left = "10px";
    document.getElementById("test_img").src = "data:image/jpeg;base64," + data;
}

function fail(msg) {
    alert(msg);
}

function show_pic() {
    navigator.camera.getPicture(dump_pic, fail, {
        quality : 50
    });
}

function onLogout(res){
	alert(res);
	$("#login").show();
	$("#logout").hide();	
}

function addFriends(){
	window.plugins.facebook.request("me/friends" ,function(res){			        
		//onLogin(res);
		var dataLen = res.data.length;
		var friendsList = "";
		
		for(var i=0;i<dataLen;i++){			
			friendsList+='<li><a href="acura.html"><img src="https://graph.facebook.com/'+res.data[i].id+'/picture?type=square"/><h3>'+res.data[i].name+'</h3></a></li>'
		}
		
		$("#friendlist").html(friendsList);
		
		$('#friendlist').listview('refresh'); 
    });


	
	
	//$("#friendlist")
	/*
	
	<li><a href="acura.html">Acura</a></li>
	<li><a href="audi.html">Audi</a></li>
	<li><a href="bmw.html">BMW</a></li>
	<li><a href="acura.html">Acura</a></li>
	<li><a href="audi.html">Audi</a></li>
	<li><a href="bmw.html">BMW</a></li>
	<li><a href="acura.html">Acura</a></li>
	<li><a href="audi.html">Audi</a></li>
	<li><a href="bmw.html">BMW</a></li>
	<li><a href="acura.html">Acura</a></li>
	*/
}