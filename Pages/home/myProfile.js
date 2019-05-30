var Observable = require("FuseJS/Observable");

var getSessionName = Observable("");
var getSessionId = Observable("");
var categoryColor = Observable("");
var category = Observable("");
var noticeTitle = Observable("");
var noticeDays = Observable("");
var Items = Observable("");

function gotoHome(){
	router.goto("home");
}

function gotoCheckPW(){
	router.push("checkPW", {getSessionId: getSessionId.value } );
}

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
				getSessionName.value = res.username;
				getSessionId.value = res.userid;
				noticeloadSome();
			}			

		}).catch((err)=>{
			console.log(err );
			
		});
	}

Session(); // Session 함수를 무조건 실행시키기 위한 곳.

// 서버와 연결 해 해당 아이디가 올린 글들을 불러오는 함수.
function noticeloadSome(){
	fetch('http://18.222.99.74/board/am/' + getSessionId.value,{
		// fetch('http://3ff05a06.ngrok.io/board/am',{
			method: "GET",
			headers: {
				"Content-type": "application/JSON"
			}


		}).then(function(res){
			return res.json();
		}).then(function(res){

			if(res[res.length-1].category == "다온"){
				categoryColor.value = "#95D1EC";
			} else if(res[res.length-1].category == "네잎"){
				categoryColor.value = "#B3E579";
			} else if(res[res.length-1].category == "디자인"){
				categoryColor.value = "#F7D976";
			}else {
				categoryColor.value = "#FEFFFE";
			}
			// 가장 최근 올린 글 하나만 보여주는 곳
			category.value = res[res.length-1].category;
			noticeTitle.value = res[res.length-1].title;
			noticeDays.value = res[res.length-1].date;

			console.log(res[res.length-1].category);	
		}).catch((err)=>{
			console.log(err);
		});
	}


// 로그아웃을 해주는 함수.
function signOut(){
	fetch('http://18.222.99.74/users/signout',{
		// fetch('http://3ff05a06.ngrok.io/users/signout',{
			method: "GET",
			headers: {
				"Content-type": "application/JSON"
			}


		}).then(function(res){
			return res.json();
		}).then(function(res){
			if(res.success == true){
				router.goto("loginPage");
			}			
		}).catch((err)=>{
			console.log(err);
		});
	}



	module.exports = {
		getSessionName : getSessionName,
		getSessionId : getSessionId,
		signOut : signOut,
		gotoHome : gotoHome,
		gotoCheckPW : gotoCheckPW,
		categoryColor : categoryColor,
		category : category,
		noticeTitle : noticeTitle,
		noticeDays : noticeDays,
		Items : Items

	}