var Observable = require('FuseJS/Observable');

var ID = Observable();
var Password = Observable();
var NetworkError = Observable(false);
var Loading = Observable(false);
var autoLogin = Observable(false);
var inputError = Observable(false);
var inputMessage = Observable();

// 서버와 연동이 안되었을 때 다시 시도하는 함수.
function retry(){
	NetworkError.value = false;
	Session();
}

// 자동로그인을 클릭 했을 때 실행되는 함수
function autoCheck(){
	autoLogin.value = true;
}

// 자동로그인을 클릭 취소 했을 때 실행되는 함수
function autoClose(){
	autoLogin.value = false;
}

function inputRetry(){
	inputError.value = false;
}

// username, password 변수는 로그인 할때 id와 pw를 나타냄
// autoLogin은 자동로그인 부분을 체크 했는지 안했는지 구분하기 위한 변수(체크 하면 true)
function SignIn(){

	var opts = ({
		'username' : ID.value,
		'password' : Password.value,
		'autoLogin' : autoLogin.value
	});

	if(!ID.value){
		inputMessage.value = "아이디를 입력해 주세요"
		inputError.value = true;
	}else if(!Password.value){
		inputMessage.value = "비밀번호를 입력해 주세요"
		inputError.value = true;
	}else {

		fetch('http://18.222.99.74/users/signin',{
		// fetch('http://3ff05a06.ngrok.io/users/signin',{
			method: "POST",
			headers: {
				"Content-type": "application/JSON"
			},
			body : JSON.stringify(opts)

		}).then((res)=>{
			return res.json();
		}).then((res)=>{

			if( JSON.parse(res.success) == true){
				router.push("home");
			}else if(JSON.parse(res.success) == false){
				inputMessage.value = "입력하신 아이디 또는 비밀번호가 일치하지 않습니다"
				inputError.value = true;
			}
		}).catch((err)=>{
			console.log(err);
		});
	}

}

// 세션을 불러오는 함수.( 초기에 네트워크와 연결이 되었는지 확인하는 용도로도 쓰인다. )
function Session(){

	fetch('http://18.222.99.74/users/session',{
		// fetch('http://3ff05a06.ngrok.io/users/session',{
			method: "GET",
			headers: {
				"Content-type": "application/JSON"
			}
		}).then(function(res){
			return res.json();
		}).then(function(res){
			// message true는 세션이 작동 되었는지 확인하는 변수.
			// autoLogin은 자동로그인 버튼을 누르면 true , 안누르면 false
			if(res.message == 'true' && res.autoLogin == true){ 
				Loading.value = true;
				startLoading();
			}			

		}).catch((err)=>{
			console.log(err );
			if(err == "TypeError: Network request failed" ){
				NetworkError.value = true;
			}else if(err == "SyntaxError: Unexpected token < in JSON at position 1"){ // 이 SyntaxError는 서버에서 값을 받지 못할때 발생하므로 network failed와 같은 에러로 취급하였다.
				NetworkError.value = true;
			}
			
		});
	}

Session(); // Session 함수를 loginPage에 올때 무조건 실행시키기 위한 곳.

// 로딩 화면 보여주는 함수.
function startLoading() {
	isBusy.activate();
	setTimeout(function() {
		isBusy.deactivate();
		Loading.value = false;
			router.push("home"); // 로팅 후 홈으로 
		}, 2000);


};

// 회원가입 페이지로 이동하는 함수.
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
	autoCheck : autoCheck,
	autoLogin : autoLogin,
	autoClose : autoClose,
	inputError : inputError,
	inputRetry : inputRetry,
	inputMessage : inputMessage
};
