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
			}			

		}).catch((err)=>{
			console.log(err );
			
		});
	}

Session(); // Session 함수를 무조건 실행시키기 위한 곳.

// 서버와 연결 해 공지사항을 불러오는 함수.
function noticeloadSome(){
	fetch('http://18.222.99.74/board/am',{
		// fetch('http://3ff05a06.ngrok.io/board/am',{
			method: "GET",
			headers: {
				"Content-type": "application/JSON"
			}


		}).then(function(res){
			return res.json();
		}).then(function(res){
			// 가장 최근 올린 글 하나만 보여주는 곳
			Items.add(createBoardPage(res[res.length-1].name,res[res.length-1].title,res[res.length-1].content,res[res.length-1].date,res[res.length-1].category));		
		}).catch((err)=>{
			console.log(err);
		});
	}

// noticeItems에 한번에(for문 안에) 
// 합치게 되면 마지막 데이터만 들어가는 문제 발생하기 때문에 반드시 createPage로 분리 시켜줘야한다.
function createBoardPage(name, title, content, date, category) {
	if(category == "다온"){
		categoryColor.value = "#95D1EC";
	} else if(category == "네잎"){
		categoryColor.value = "#B3E579";
	} else if(category == "디자인"){
		categoryColor.value = "#F7D976";
	}else {
		categoryColor.value = "#FEFFFE";
	}

	return {
		noticeName : name,
		noticeTitle: title,
		noticeContent : content,
		noticeDays : date,
		category : category,
		categoryColor : categoryColor.value,
		gotoDetails: function() {
			router.push("detailPage", { title: title , name:name, content:content, days:date})
		}
	};
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

			// 서버와 연동이 되지 않았을 때 나오는 에러. 
			// networkError 변수로 다시 연결을 시도하기 위해 만들었다.
			if(err == "TypeError: Network request failed" ){
				NetworkError.value = true;
			}
		});
	}

	noticeloadSome();

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