var Observable = require('FuseJS/Observable');

function goBack()
{
	router.goBack();
}


var newID = Observable("");
var newPW = Observable("");
var newName = Observable("");
var newGender = Observable("");
var newMajor = Observable("");
var newNumber = Observable("");
var newPhoneNum = Observable("");
var ruleToggle = Observable(false);
var majorToggle = Observable(false);

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

function Save(){

	fetch('http://aa52f6e2.ngrok.io/users/signup',{
		method: "POST",
		headers: {
			"Content-type": "application/json"
		},
		body : JSON.stringify({
			'_id' : newID.value,
			'pw' : newPW.value,
			'name' : newName.value,
			'major' : newMajor.value,
			'class' : "2"
		})
	}).then((res)=>{ return res.json()
	}).then((res)=>{
	            // console.log( JSON.parse(res._bodyInit).documents[1].address_name )
	            console.log(JSON.stringify(res));
	            console.log(res.success);

	            if( JSON.parse(res.success) == true){
	            	router.push("loginPage");
	            	console.log("Move to LoginPage");
	            }


	            // JSON.parse(res._bodyInit).documents[1].address_name
	        }).catch((err)=>{
	        	console.log(err);
	        });


	    }

	    module.exports = {
	    	newID : newID,
	    	newPW : newPW,
	    	newName : newName,
	    	newGender : newGender,
	    	newMajor : newMajor,
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
	    	majorValue : majorValue
	    };
