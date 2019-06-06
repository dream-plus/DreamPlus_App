var Observable = require("FuseJS/Observable");

var getSessionName = Observable("");
var getSessionId = Observable("");
var categoryColor = Observable("#FEFFFE");
var category = Observable("");
var noticeTitle = Observable("");
var noticeDays = Observable("");
var Items = Observable("");
var imagePath = Observable("");

var noneBoard = Observable(false);
var photoView = Observable(false);

function gotoHome(){
	router.goto("home");
}

function gotoCheckPW(){
	router.push("checkPW", {getSessionId: getSessionId.value } );
}


// 세션을 불러오는 함수.( id, name 불러오는 용도. )
function Session(){

	// fetch('http://18.222.99.74/users/session',{
		fetch('http://b2cf6af0.ngrok.io/users/session',{
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
				getImages();
			}			

		}).catch((err)=>{
			console.log(err );
			
		});
	}

Session(); // Session 함수를 무조건 실행시키기 위한 곳.

// 서버와 연결 해 해당 아이디가 올린 글들을 불러오는 함수.
function noticeloadSome(){
	// fetch('http://18.222.99.74/board/am/' + getSessionId.value,{
		fetch('http://b2cf6af0.ngrok.io/board/am/'+ getSessionId.value,{
			method: "GET",
			headers: {
				"Content-type": "application/JSON"
			}


		}).then(function(res){
			return res.json();
		}).then(function(res){

			// 가장 최근 올린 글 하나만 보여주는 곳
			if(!res[length]){
				categoryColor.value = "#FEFFFE";
				noneBoard.value = true;
			}else {
				var length = res.length - 1 ;
				if(res[length].category == "다온"){
					console.log("다온");
					categoryColor.value = "#95D1EC";
				} else if(res[length].category == "네잎"){
					categoryColor.value = "#B3E579";
				} else if(res[length].category == "디자인"){
					categoryColor.value = "#F7D976";
				}

				noneBoard.value = false;
				category.value = res[length].category;
				noticeTitle.value = res[length].title;
				noticeDays.value = res[length].date;
			}


		}).catch((err)=>{
			console.log("err: " + err);
		});
	}


	function getImages(){

	// fetch('http://18.222.99.74/users/info/' + getSessionId.value + "/image",{
		fetch('http://b2cf6af0.ngrok.io/users/info/' + getSessionId.value + "/image",{
			method: "GET",
			headers: {
				"Content-type": "application/JSON"
			}
		}).then(function(res){
			return res.json();
		}).then(function(res){
			imagePath.value = res[0].path;
			photoView.value = true;
		}).catch((err)=>{
			console.log(err );
			
		});
	}


// 로그아웃을 해주는 함수.
function signOut(){
	// fetch('http://18.222.99.74/users/signout',{
		fetch('http://b2cf6af0.ngrok.io/users/signout',{
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
		Items : Items,
		noneBoard : noneBoard,
		photoView : photoView,
		imagePath : imagePath

	}