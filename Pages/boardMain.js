
var Observable = require("FuseJS/Observable");

var opts = ({
	id : '2',
	name : "감사원"
});

function write(){
	_id = '1';
	router.push('write',opts);

}

var maxSimulatedDelay = 1.5
var minSimulatedDelay = 0.25


var _id = Observable("");
var category = Observable("");
var name = Observable("");
var title = Observable("");
var array = Observable("");
var content = Observable("");
var days = Observable("");
var category = Observable("");
var categoryColor = Observable("");

var noticeitems = Observable();
var freeitems  = Observable();
var qnaitems = Observable();

// exports.isLoading = Observable(false);
var noticeisLoading = Observable(false);
var boardColorChange = Observable(true);
var homeColorChange = Observable(false);
var shebColorChange = Observable(false);
var accColorChange = Observable(false);

var freeisLoading = Observable(false);
var qnaisLoading = Observable(false);

var NetworkError = Observable(false);

// var tapNotice = Observable(false);
var noticeColor = Observable("#FEFFFE");
var freeColor = Observable("#F2F3F2");
var qnaColor = Observable("#F2F3F2");
var noticeTextColor = Observable("#0C82B3");
var freeTextColor = Observable("#B8B9B8");
var qnaTextColor = Observable("#B8B9B8");

function noticetap(){
	noticeColor.value = "#FEFFFE"
	freeColor.value = "#F2F3F2"
	qnaColor.value = "#F2F3F2"
	noticeTextColor.value = "#0C82B3"
	freeTextColor.value = "#B8B9B8"
	qnaTextColor.value = "#B8B9B8"
}

function freetap(){
	noticeColor.value = "#F2F3F2"
	freeColor.value = "#FEFFFE"
	qnaColor.value = "#F2F3F2"
	noticeTextColor.value = "#B8B9B8"
	freeTextColor.value = "#0C82B3"
	qnaTextColor.value = "#B8B9B8"
}

function qnatap(){
	noticeColor.value = "#F2F3F2"
	freeColor.value = "#F2F3F2"
	qnaColor.value = "#FEFFFE"
	noticeTextColor.value = "#B8B9B8"
	freeTextColor.value = "#B8B9B8"
	qnaTextColor.value = "#0C82B3"
}

function retry(){
	NetworkError.value = false;
	noticesvp.check();
}


// 공지사항을 불러오는 곳.
noticesvp.check();
function noticeloadMore(){
	if (noticeisLoading.value) {
		return
	}
	noticeisLoading.value = true;

	var delay = Math.random() * (maxSimulatedDelay - minSimulatedDelay) + minSimulatedDelay
	setTimeout( noticeloadSome, delay * 1000 );
	
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
			for(var i = res.length - 1 ; i >= 0 ; i--){

				noticeitems.add(createPage(res[i].name,res[i].title,res[i].content,res[i].date,res[i].category)

					);		

			}

			noticeisLoading.value = false;

		}).catch((err)=>{
			console.log(err);
			if(err == "TypeError: Network request failed" ){
				NetworkError.value = true;
				noticeisLoading.value = false;
			}
		});
	}
// ------------------------------------------------------

// 자유게시판 
freesvp.check();
function freeloadMore(){
	if (freeisLoading.value) {
		return
	}
	freeisLoading.value = true;

	var delay = Math.random() * (maxSimulatedDelay - minSimulatedDelay) + minSimulatedDelay
	setTimeout( freeloadSome, delay * 1000 );
	
}

function freeloadSome(){
	fetch('http://18.222.99.74/board/free',{
		// fetch('http://3ff05a06.ngrok.io/board/am',{
			method: "GET",
			headers: {
				"Content-type": "application/JSON"
			}


		}).then(function(res){
			return res.json();
		}).then(function(res){
			for(var i = res.length - 1 ; i >= 0 ; i--){

				freeitems.add(createPage(res[i].name,res[i].title,res[i].content,res[i].date,res[i].category)

					);		

			}

			freeisLoading.value = false;

		}).catch((err)=>{
			console.log(err);
			if(err == "TypeError: Network request failed" ){
				NetworkError.value = true;
				freeisLoading.value = false;
			}
		});
	}

// ------------------------------------------------------

// 질문 답변 게시
qnasvp.check();
function qnaloadMore(){
	if (qnaisLoading.value) {
		return
	}
	qnaisLoading.value = true;

	var delay = Math.random() * (maxSimulatedDelay - minSimulatedDelay) + minSimulatedDelay
	setTimeout( qnaloadSome, delay * 1000 );
	
}

function qnaloadSome(){
	fetch('http://18.222.99.74/board/qna',{
		// fetch('http://3ff05a06.ngrok.io/board/am',{
			method: "GET",
			headers: {
				"Content-type": "application/JSON"
			}


		}).then(function(res){
			return res.json();
		}).then(function(res){
			for(var i = res.length - 1 ; i >= 0 ; i--){

				qnaitems.add(createPage(res[i].name,res[i].title,res[i].content,res[i].date,res[i].category)

					);		

			}

			qnaisLoading.value = false;

		}).catch((err)=>{
			console.log(err);
			if(err == "TypeError: Network request failed" ){
				NetworkError.value = true;
				qnaisLoading.value = false;
			}
		});
	}


// for문과 합치게 되면 마지막 데이터만 들어가는 문제 발생하기 때문에 반드시 createPage로 분리 시켜줘야한다.
function createPage(name, title, content, date, category) {
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
		name : name,
		title: title,
		content : content,
		days : date,
		category : category,
		categoryColor : categoryColor.value,
		gotoDetails: function() {
			router.push("detailPage", { title: title , name:name, content:content, days:date})
		}
	};
}

	// exports.clicked= function(){router.goto("SubPage")}


	module.exports = {

		noticeitems : noticeitems,
		noticeisLoading : noticeisLoading,
		write : write,
		noticeloadMore : noticeloadMore,
		boardColorChange : boardColorChange,
		homeColorChange : homeColorChange,
		shebColorChange : shebColorChange,
		accColorChange : accColorChange,
		NetworkError : NetworkError,
		retry : retry,
		category : category,
		categoryColor : categoryColor,
		freeloadMore : freeloadMore,
		freeisLoading : freeisLoading,
		freeitems : freeitems,
		qnaloadMore : qnaloadMore,
		qnaisLoading : qnaisLoading,
		qnaitems : qnaitems,
		noticetap : noticetap,
		noticeColor : noticeColor,
		freeColor : freeColor,
		qnaColor : qnaColor,
		freetap : freetap,
		qnatap : qnatap,
		noticeTextColor : noticeTextColor,
		freeTextColor : freeTextColor,
		qnaTextColor : qnaTextColor


	};


