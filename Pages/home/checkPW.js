var Observable = require("FuseJS/Observable");

var Password = Observable("");
var setID = Observable("");

var getId = this.Parameter.map( function(x) {
	// setID.value = JSON.stringify(x.getSessionId); 
	setID.value = x.getSessionId;
	return x.getSessionId;
});

function checkPassword(){
	// username, password 변수는 로그인 할때 id와 pw를 나타냄
	var opts = ({
		'userId' : setID.value,
		'password' : Password.value,
	});
	
	fetch('http://18.222.99.74/users/userch',{
		// fetch('http://3ff05a06.ngrok.io/users/userch',{
			method: "POST",
			headers: {
				"Content-type": "application/JSON"
			},
			body : JSON.stringify(opts)
			
		}).then((res)=>{
			return res.json()
		}).then((res)=>{

			if( JSON.parse(res.success) == true){
				router.push("changeProfile",{getSessionId : setID.value});
			}
		}).catch((err)=>{
			console.log(err);
		});

	}

	function goBack()
	{
		router.goBack();
	}

	module.exports = {
		goBack : goBack,
		getId : getId,
		checkPassword : checkPassword,
		Password : Password
	}