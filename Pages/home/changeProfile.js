var Observable = require("FuseJS/Observable");

var sendId = Observable("");

var getUserName = Observable("");
var getUserGender = Observable("");
var getUserMajor = Observable("");
var getUserNumber = Observable("");
var getUserPhone = Observable("");
var getSessionId = Observable("");

var changeUserPW = Observable("");
var changeUserMajor = Observable("");
var changeUserNumber = Observable("");
var changeUserPhone = Observable("");

// 세션을 불러오는 함수.( id, name 불러오는 용도. )
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
			if(res.message == 'true'){ 
				getSessionId.value = res.userid;
			}			

			getUserInfo();

		}).catch((err)=>{
			console.log(err );
			
		});
	}

Session(); // Session 함수를 무조건 실행시키기 위한 곳.


function getUserInfo(){

	fetch('http://18.222.99.74/users/info/' + getSessionId.value,{
		// fetch('http://3ff05a06.ngrok.io/users/session',{
			method: "GET",
			headers: {
				"Content-type": "application/JSON"
			}
		}).then(function(res){
			return res.json();
		}).then(function(res){
			
			getUserName.value = res[0].name;
			getUserGender.value = res[0].gender;
			getUserMajor.value = res[0].major;
			getUserNumber.value = res[0].number;
			getUserPhone.value = res[0].phoneNum			

		}).catch((err)=>{
			console.log(err );
			
		});
	}

	function modify(){

	// 각각의 변수에 입력이 안되었으면 초기 값을 넣어 주는 부분이다. 

	if(changeUserMajor.value == ""){
		changeUserMajor.value = getUserMajor.value; 
	}
	if(changeUserNumber.value == ""){
		changeUserNumber.value = getUserNumber.value; 
	}
	if(changeUserPhone.value == ""){
		changeUserPhone.value = getUserPhone.value; 
	}

	var opts = ({
		'_id' : getSessionId.value,
		'pw' : changeUserPW.value,
		'major' : changeUserMajor.value,
		'number' : changeUserNumber.value,
		'phoneNum' : changeUserPhone.value
	});

	fetch('http://18.222.99.74/users/modify',{
	// fetch('http://aa52f6e2.ngrok.io/board/am',{
		method: "PUT",
		headers: {
			"Content-type": "application/JSON"
		},
		body : JSON.stringify(opts)

	}).then((res)=>{
		return res.json()
	}).then((res)=>{
		if( JSON.parse(res.success) == true){
			router.push("home");
		}
	}).catch((err)=>{
		console.log("Error = "+err);
	});
}

function goBack()
{
	router.goBack();
}

module.exports = {
	goBack : goBack,
	modify : modify,
	getUserName : getUserName,
	getUserGender : getUserGender,
	getUserMajor : getUserMajor,
	getUserNumber : getUserNumber,
	getUserPhone : getUserPhone,
	getSessionId : getSessionId,
	changeUserPW : changeUserPW,
	changeUserMajor : changeUserMajor,
	changeUserNumber : changeUserNumber,
	changeUserPhone : changeUserPhone

}

