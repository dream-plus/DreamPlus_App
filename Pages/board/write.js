var Observable = require("FuseJS/Observable");

var title = Observable("");

var category = ['공지', '자유','Q&A'];

var date = new Date(); 
var year = date.getFullYear(); 
var month = new String(date.getMonth()+1); 
var day = new String(date.getDate()); 

// 현재 날짜 구하는 곳 ============
// 한자리수일 경우 0을 채워준다. 
if(month.length == 1){ 
	month = "0" + month; 
} 
if(day.length == 1){ 
	day = "0" + day; 
} 

var currentdate = Observable(year+"."+month+"."+day);
// ==============


var content = Observable("");
var date = new Date();
var selectCategory = Observable("다온");
var daonToggle = Observable(true);
var leafToggle = Observable(false);
var designToggle = Observable(false);

var sessionUserID = Observable("");
var sessionUserName = Observable("");

function daonSelect(){
	daonToggle.value = true;
	leafToggle.value = false;
	designToggle.value = false;
	selectCategory.value = "다온";
}

function leafSelect(){
	daonToggle.value = false;
	leafToggle.value = true;
	designToggle.value = false;
	selectCategory.value = "네잎";
}

function designSelect(){
	daonToggle.value = false;
	leafToggle.value = false;
	designToggle.value = true;
	selectCategory.value = "디자인";
}

var boardselect = Observable("");
var boardOpen = Observable(false);
var boardRUL = "";

function boardtoggleOpen(){
	boardOpen.value = true;
}

function boardclick(e){
	boardselect.value = e.data;
	boardOpen.value = false;

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
				sessionUserName.value = res.username;
				sessionUserID.value = res.userid;
			}			

		}).catch((err)=>{
			console.log(err );
			
		});
}

Session(); // Session 함수를 무조건 실행시키기 위한 곳.

function contents(){
	var opts2 = ({
		'_id': sessionUserID.value,
		'name' : sessionUserName.value,
		'title' : title.value,
		'category' : selectCategory.value,
		'content' : content.value,
		date : currentdate.value
	});

	if(boardselect.value == "공지"){
		boardRUL = "am"
	}else if(boardselect.value == "자유"){
		boardRUL = "free"
	}else if(boardselect.value == "Q&A"){
		boardRUL = "qna"
	}

	fetch('http://18.222.99.74/board/' + boardRUL,{
	// fetch('http://aa52f6e2.ngrok.io/board/am',{
		method: "POST",
		headers: {
			"Content-type": "application/JSON"
		},
		body : JSON.stringify(opts2)

	}).then((res)=>{
		return res.json()
	}).then((res)=>{
		if( JSON.parse(res.success) == true){
			router.push("boardMain");
		}
	}).catch((err)=>{
		console.log(err);
	});
}


function goBack()
{
	router.push("boardMain");
}

module.exports = {
	board : function(){router.goto("board");},
	title: title,
	category : category,
	content:content,
	contents : contents,
	goBack : goBack,
	boardOpen : boardOpen,
	boardselect :boardselect,
	boardtoggleOpen : boardtoggleOpen,
	boardclick : boardclick,
	daonSelect : daonSelect,
	leafSelect : leafSelect,
	designSelect : designSelect,
	daonToggle : daonToggle,
	leafToggle : leafToggle,
	designToggle : designToggle
};
