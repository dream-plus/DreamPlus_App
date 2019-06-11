var Observable = require("FuseJS/Observable");

var Password = Observable("");
var setID = Observable("");

var photoView = Observable(false);
var imagePath = Observable("");

var getId = this.Parameter.map( function(x) {
	// setID.value = JSON.stringify(x.getSessionId); 
	setID.value = x.getSessionId;
	getImages(); // setID에 아이디 저장 후 getImages 실행.
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

	function getImages(){

		fetch('http://18.222.99.74/users/info/' + setID.value + "/image",{
		// fetch('http://b2cf6af0.ngrok.io/users/info/' + getSessionId.value + "/image",{
			method: "GET",
			headers: {
				"Content-type": "application/JSON"
			}
		}).then(function(res){
			return res.json();
		}).then(function(res){
			if(res.length != 0){
				imagePath.value = res[0].path;
				photoView.value = true;
			}
			
		}).catch((err)=>{
			console.log(err );
			
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
		Password : Password,
		photoView : photoView,
		imagePath : imagePath	
	}