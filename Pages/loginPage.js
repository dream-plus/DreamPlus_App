var Observable = require('FuseJS/Observable');

var ID = Observable("");
var Password = Observable("");
var NetworkError = Observable(false);
var Loading = Observable(false);
var autoLoin = Observable(false);


function retry(){
	NetworkError.value = false;
	Session();
}

function autoCheck(){
	autoLoin.value = true;
}

function autoClose(){
	autoLoin.value = false;
}

function SignIn(){

    var opts = ({
            	'username' : ID.value,
                'password' : Password.value
              });

	console.log(JSON.stringify(opts));
    console.log('sign'); //Sign_in 함수가 호출되었는지 확인
 

	// fetch('http://18.222.99.74/users/signin',{
		fetch('http://3ff05a06.ngrok.io/users/signin',{
	            method: "POST",
	            headers: {
	            	"Content-type": "application/JSON"
	            },
	            body : JSON.stringify(opts)
	               
	        }).then((res)=>{
	            // console.log(JSON.stringify(res));
	            // console.log(JSON.parse(res));
	            return res.json()
			}).then((res)=>{

	            console.log(res.success);

	            if( JSON.parse(res.success) == true){
	            	// router.push("Home", ID);
	            	 // ID = ID.value;
	            	router.push("home");
	            	console.log("Move to MainPage");
	            	// console.log(ID);
	            }
	            // JSON.parse(res._bodyInit).documents[1].address_name
	        }).catch((err)=>{
	            console.log(err);
	        });

}

function Session(){

	// fetch('http://18.222.99.74/users/session',{
		fetch('http://3ff05a06.ngrok.io/users/session',{
			method: "GET",
			headers: {
				"Content-type": "application/JSON"
			}


		}).then(function(res){
			return res.json();
		}).then(function(res){
			// console.log("session result = " + res.message);
			if(res.message == 'true'){ 
				console.log("test loading");
				Loading.value = true;
				startLoading();
				// router.push("home");
			}			

		}).catch((err)=>{
			console.log(err );
			if(err == "TypeError: Network request failed" ){
				NetworkError.value = true;
			}else if(err == "SyntaxError: Unexpected token < in JSON at position 1"){
				NetworkError.value = true;
			}
			
		});
}

Session();

function startLoading() {
		isBusy.activate();
		setTimeout(function() {
			isBusy.deactivate();
			router.push("home");
		}, 2000);


	};

function SignUp(){
	router.push("signupPage");
	console.log("Move to SignUp");
}


module.exports = {
	ID : ID,
	Password : Password,
	SignUp : SignUp,
	SignIn : SignIn,
	NetworkError : NetworkError,
	retry : retry,
	Loading : Loading,
	// startLoading : startLoading,
	autoCheck : autoCheck,
	autoLoin : autoLoin,
	autoClose : autoClose
};
