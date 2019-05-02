var Observable = require('FuseJS/Observable');

function goBack()
{
	router.goBack();
}


var newID = Observable("");
var newPW = Observable("");
var newName = Observable("");
var newGender = Observable("");
var newNumber = Observable("");
var newPhoneNum = Observable("");
var ruleToggle = Observable(false);
var majorToggle = Observable(false);
var idCheck = Observable(false);

var majorInit = Observable("융합 IT");
var majorValue = ["융합 IT", "융합 디자인"];

function ruleOpen(){
	ruleToggle.value = true;
}

function ruleClose(){
	ruleToggle.value = false;
}

function majorChange(){
	majorToggle.value = true;
}

function choicemajor(e){
	majorInit.value = e.data;
	majorToggle.value = false;
}

function idpopup(){
	idCheck.value = false;
}

function Save(){

	fetch('http://18.222.99.74/users/signup',{
		// fetch('http://aa52f6e2.ngrok.io/users/signup',{
		method: "POST",
		headers: {
			"Content-type": "application/json"
		},
		// body에 회원가입 정보를 넣어 서버에 보내는 부분.
		body : JSON.stringify({
			'_id' : newID.value,
			'pw' : newPW.value,
			'name' : newName.value,
			'major' : majorInit.value,
			'number' : newNumber.value,
			'gender' : newGender.value,
			'phoneNum' : newPhoneNum.value
		})
	}).then((res)=>{ return res.json()
	}).then((res)=>{
		// res 변수로 서버로부터 요청한 값을 받는 부분.
		console.log(res.result);
	            if( JSON.parse(res.success) == true){
	            	router.push("loginPage");
	            	console.log("Move to LoginPage");
	            }else if (res.result == "overlapping"){
	            	idCheck.value = true;
	            }

	        }).catch((err)=>{
	        	console.log(err);
	        });


	    }

	    module.exports = {
	    	newID : newID,
	    	newPW : newPW,
	    	newName : newName,
	    	newGender : newGender,
	    	newNumber : newNumber,
	    	newPhoneNum : newPhoneNum,
	    	Save : Save,
	    	goBack : goBack,
	    	ruleOpen : ruleOpen,
	    	ruleClose : ruleClose,
	    	ruleToggle : ruleToggle,
	    	majorInit : majorInit,
	    	majorToggle : majorToggle,
	    	majorChange : majorChange,
	    	choicemajor : choicemajor,
	    	majorValue : majorValue,
	    	idCheck : idCheck,
	    	idpopup : idpopup
	    };
