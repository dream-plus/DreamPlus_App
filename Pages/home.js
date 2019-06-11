var Observable = require("FuseJS/Observable");

var boardColorChange = Observable(false);
var homeColorChange = Observable(true);
var shebColorChange = Observable(false);
var accColorChange = Observable(false);

var NetworkError = Observable(false);

var name = Observable("");

var noticeItems = Observable();
var projectItems = Observable();
var percent = Observable();
var category = Observable("");
var categoryColor = Observable("");


// 서버와 연동이 안되었을 때 다시 시도하는 함수.
function retry(){
	NetworkError.value = false;
	noticeloadSome();
	projectloadSome();
}

function gotoBoard(){
	router.push("boardMain");
}
function gotoProject(){
	router.push("projectSch");
}

function gotomyProfile(){
	router.push("myProfile");
}

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
			// 가장 최근의 공지사항 4개만 표시하도록 하는 for문
			for(var i = res.length-1; i > (res.length - 5); i--){				
				if(i < 0) break;
				else{
					noticeItems.add(createBoardPage(res[i].name,res[i].title,res[i].content,res[i].date,res[i].category));		
				}
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

// 서버와 연동해 프로젝트 데이터를 불러오는 함수.
function projectloadSome(){

	fetch('http://18.222.99.74/cal/am',{
		// fetch('http://3ff05a06.ngrok.io/board/am',{
			method: "GET",
			headers: {
				"Content-type": "application/JSON"
			}


		}).then(function(res){
			return res.json();
		}).then(function(res){
			for(var i = res.length-1; i > (res.length - 3); i--){

				projectItems.add(createProjectPage(res[i].title,res[i].member,"2019.04.22 ~ 2019.05.30",res[i].percent,res[i].contents,res[i].num)

					);		
			}

		}).catch((err)=>{
			console.log(err);
			// 서버와 연동이 되지 않았을 때 나오는 에러. 
			// networkError 변수로 다시 연결을 시도하기 위해 만들었다.
			if(err == "TypeError: Network request failed" || err == "SyntaxError: JSON Parse error: Unrecognized token '<'" ){
				NetworkError.value = true;
			}
		});
	}

// for문과 합치게 되면 마지막 데이터만 들어가는 문제 발생하기 때문에 반드시 createPage로 분리 시켜줘야한다.
function createProjectPage(title, member, date, percent,contents,num) {
	return {
		noticetitle : title,
		noticemember: member,
		noticedate : date,
		percent : percent,
		gotoDetails: function() {
			router.push("detailProjectPage", { title: title , member:member, date : date, percent: percent, contents:contents, num:num})
		}
	};
}

	// 각 함수들을 실행시켜주는 곳.
	noticeloadSome(); 
	projectloadSome();

	module.exports = {

		noticeItems : noticeItems,
		boardColorChange : boardColorChange,
		homeColorChange : homeColorChange,
		shebColorChange : shebColorChange,
		accColorChange : accColorChange,
		gotoBoard : gotoBoard,
		gotoProject : gotoProject,
		NetworkError : NetworkError,
		retry : retry,
		projectItems : projectItems,
		percent : percent,
		category : category,
		categoryColor : categoryColor,
		gotomyProfile : gotomyProfile

	};
