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

function retry(){
	NetworkError.value = false;
	noticeloadSome();
	projectloadSome();
}

function gotoBoard(){
	router.goto("boardMain");
}

function gotoProject(){
	router.goto("projectSch");
}

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
					noticeItems.add(createBoardPage(res[i].name,res[i].title,res[i].content,res[i].date));		
				}
			}

		}).catch((err)=>{
			console.log(err);
			if(err == "TypeError: Network request failed" ){
				NetworkError.value = true;
			}
		});
	}

// for문과 합치게 되면 마지막 데이터만 들어가는 문제 발생하기 때문에 반드시 createPage로 분리 시켜줘야한다.
function createBoardPage(name, title, content, date) {
	return {
		noticeName : name,
		noticeTitle: title,
		noticeContent : content,
		noticeDays : date,
		gotoDetails: function() {
			router.push("detailPage", { title: title , name:name, content:content, days:date})
		}
	};
}

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

				projectItems.add(createProjectPage(res[i].title,res[i].member,"2019.04.22 ~ 2019.05.30",res[i].percent,res[i].contents)

					);		

			}

		}).catch((err)=>{
			console.log(err);
			if(err == "TypeError: Network request failed" ){
				NetworkError.value = true;
			}
		});
}

// for문과 합치게 되면 마지막 데이터만 들어가는 문제 발생하기 때문에 반드시 createPage로 분리 시켜줘야한다.
function createProjectPage(title, member, date, percent,contents) {
	return {
		noticetitle : title,
		noticemember: member,
		noticedate : date,
		percent : percent,
		gotoDetails: function() {
			router.push("detailProjectPage", { title: title , member:member, date : date, percent: percent, contents:contents})
		}
	};
}

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
	percent : percent

};
