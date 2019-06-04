var Observable = require("FuseJS/Observable")
// var LocalNotify = require("FuseJS/LocalNotifications");
var DateTime = require("Lib/DateTime")
var today = new Date();





var Title = Observable("");
var Place = Observable("");
var etx = Observable("");

var today = new Date();
var day = today.getDate();
var month = today.getMonth()+1; //January is 0!
var year = today.getFullYear();
var dayLabel = today.getDay();

//=================================== 이부분 선택했을 때 바뀌는 부분 
var allNotify = Observable(false);
var personalNotify = Observable(false);

function getToday(day){
	var week = new Array('일', '월', '화', '수', '목', '금', '토');
	var todayLabel = week[day];
	return todayLabel;
}

if(day<10) {
    day='0'+day
} 

if(month<10) {
    month='0'+month
}

var label = year + "-" + month + "-" + day + "-" + getToday(dayLabel);


var monthToggle = Observable(false);
var dayToggle = Observable(false);

var monthValue = [];
var dayValue = [];

var hourToggle = Observable(false);
var minuteToggle = Observable(false);
var dateToggle = Observable(false);


var dateValue = [];
var hourValue = [];
var minuteValue = [];


// 현재 시간 나타내기
var hours = today.getHours();
var ampm = hours >= 12 ? '오후' : '오전';
hours = hours % 12;
hours = hours ? hours : 12; 
if(hours<10) {
    hours = '0' + hours
} 


var minutes = today.getMinutes();
if(minutes<10) {
    minutes = '0' + minutes
} 

var Time = ampm + '  ' + hours + ' : ' + minutes;



var dayInit = Observable(day);
var monthInit = Observable(month);
var dateInit = Observable(ampm);
var hourInit = Observable(hours);
var minuteInit = Observable(minutes);
var timeInit = Observable(Time);



for(var i=0; i<2; i++){
	if(i==0)
		dateValue[i]="오전";
	else
		dateValue[i]="오후";
}

for(var j=0;j<=12;j++){
	if(j<10){
		hourValue.push('0'+j);
	}
	else{
		hourValue.push(j);
	}
}

for(var i=0; i<=59; i++){
	if(i<10){
		minuteValue.push('0'+i);
	}
	else{
		minuteValue.push(i);
	}
}

for(var j=1;j<=12;j++){
	if(j<10){
		monthValue.push('0'+j);
	}
	else{
		monthValue.push(j);
	}
}

for(var i=1; i<=31; i++){
	if(i<10){
		dayValue.push('0'+i);
	}
	else{
		dayValue.push(i);
	}
}



// 시, 분 정하는 팝업띄우기
var popup_visible = Observable(false);

function popup(){
	popup_visible.value = true;
	console.log("popup");

}

var alltime = Observable();
function settime(){
	popup_visible.value = false;
	console.log("settime");
	// Time = dateInit.value + ' ' + addZeros(hourInit.value, 2) + ' : ' + addZeros(minuteInit.value, 2);

	Time = dateInit.value + hourInit.value + ' : ' + minuteInit.value;

	console.log(Time);
	timeInit.value = Time;

	alltime = dateInit.value + '.' + hourInit.value + '.' + minuteInit.value;


}

function popoff(){
	popup_visible.value = false;
	console.log("popoff");

}


// 날짜 정하는 팝업 띄우기
var popup_visible2 = Observable(false);

function popup2(){
	popup_visible2.value = true;
	console.log("popup");

}
var label2 = year + "-" + month + "-" + day + "-" + getToday(dayLabel);
var timeInit2 = Observable(label2);
var alllabel = Observable("");
function settime2(){
	popup_visible2.value = false;
	console.log("settime");
	// Time = dateInit.value + ' ' + addZeros(hourInit.value, 2) + ' : ' + addZeros(minuteInit.value, 2);

	var setday = new Date(year + "-" + monthInit.value + "-" + dayInit.value).getDay();
	console.log(setday);

	label2 =  year + "-" + monthInit.value + "-" + dayInit.value + "-" + getToday(setday);

	console.log(Time);
	timeInit2.value = label2;

	alllabel = year + '.' + monthInit.value + '.' + dayInit.value;

}

function popoff2(){
	popup_visible2.value = false;
	console.log("popoff");

}





function monthChange(){
	monthToggle.value = true;
}

function choiceMonth(e){
	monthInit.value = e.data;
	monthToggle.value = false;
}


function dayChange(){
	dayToggle.value = true;
}

function choiceDay(e){
	dayInit.value = e.data;
	dayToggle.value = false;
}



function dateChange(){
	dateToggle.value = true;
}

function choiceDate(e){
	dateInit.value = e.data;
	dateToggle.value = false;
}


function hourChange(){
	hourToggle.value = true;
}

function choiceHour(e){
	hourInit.value = e.data;
	hourToggle.value = false;
}

function minuteChange(){
	minuteToggle.value = true;
}

function choiceMinute(e){
	minuteInit.value = e.data;
	minuteToggle.value = false;
}


// ============================== color code ============================================================
var popup_colorcode = Observable(false);

var blue = Observable(false);
var red = Observable(false);
var gray = Observable(false);
var yellow = Observable(false);
var	purple = Observable(false);
var green = Observable(false);
var sky = Observable(false);
var orange = Observable(false);

var selectColor = Observable("#0070AA");


function popup_pastel(){
	popup_colorcode.value = true;
	console.log("popup");
}

function popupOff(){
	popup_colorcode.value = false;
	console.log("popupOff");
}


function setColor(){
	popup_colorcode.value = false;
	console.log("setColor");
}


function bluecheck(){
	blue.value = true;
	console.log("Check the color is Blue");

	red.value = false;
	gray.value = false;
	yellow.value = false;
	purple.value = false;
	green.value = false;
	sky.value = false;
	orange.value = false;

	if (blue.value == true ){
		selectColor.value = "#68AECF";
	} 
	console.log(selectColor.value);

}
function redcheck(){
	red.value = true;
	console.log("Check the color is Red");

	blue.value = false;
	gray.value = false;
	yellow.value = false;
	purple.value = false;
	green.value = false;
	sky.value = false;
	orange.value = false;

	if (red.value == true ){
		selectColor.value = "#FF92B1";
	}
	console.log(selectColor.value); 
}
function graycheck(){
	gray.value = true;
	console.log("Check the color is Gray");

	blue.value = false;
	red.value = false;
	yellow.value = false;
	purple.value = false;
	green.value = false;
	sky.value = false;
	orange.value = false;

	if (gray.value == true ){
		selectColor.value = "#E2DFDF";
	} 
	console.log(selectColor.value);
}
function yellowcheck(){
	yellow.value = true;
	console.log("Check the color is Yellow");

	blue.value = false;
	red.value = false;
	gray.value = false;
	purple.value = false;
	green.value = false;
	sky.value = false;
	orange.value = false;

	if (yellow.value == true ){
		selectColor.value = "#FFF0B0";
	} 
	console.log(selectColor.value);
}
function purplecheck(){
	purple.value = true;
	console.log("Check the color is Purple");

	blue.value = false;
	red.value = false;
	gray.value = false;
	yellow.value = false;
	green.value = false;
	sky.value = false;
	orange.value = false;

	if (purple.value == true ){
		selectColor.value = "#E8C5FD";
	} 
	console.log(selectColor.value);
}
function greencheck(){
	green.value = true;
	console.log("Check the color is Green");

	blue.value = false;
	red.value = false;
	gray.value = false;
	yellow.value = false;
	purple.value = false;
	sky.value = false;
	orange.value = false;

	if (green.value == true ){
		selectColor.value = "#A9EC77";
	} 
	console.log(selectColor.value);
}
function skycheck(){
	sky.value = true;
	console.log("Check the color is Sky");

	blue.value = false;
	red.value = false;
	gray.value = false;
	yellow.value = false;
	purple.value = false;
	green.value = false;
	orange.value = false;

	if (sky.value == true ){
		selectColor.value = "#9EF6E5";
	} 
	console.log(selectColor.value);
}
function orangecheck(){
	orange.value = true;
	console.log("Check the color is Orange");

	blue.value = false;
	red.value = false;
	gray.value = false;
	yellow.value = false;
	purple.value = false;
	green.value = false;
	sky.value = false;

	if (orange.value == true ){
		selectColor.value = "#FFDCB9";
	} 
	console.log(selectColor.value);
}

// ============================== color code ===============================================================


// ============================== team chart ===============================================================
var popup_team = Observable(false);

function popup_Tchart(){
	popup_team.value = true;
	console.log("popup_teamChart");
}

function popupOff_T(){
	popup_team.value = false;
	console.log("popupOff_T");

}

function setTeam(){
	popup_team.value = false;
	console.log("setTeam");

}


function allNotified() {
	console.log("전체 공개로 설정되었습니다.");
	personalNotify.value = false;
	allNotify.value = true;
}

function personalNotified() {
	console.log("팀원 선택으로 설정되었습니다.");
	personalNotify.value = true;
	allNotify.value = false;
}
// ============================== team chart ===============================================================





function Send(){
	var opts = ({
					'_id' : 'choiwonk',
	                'name' : 'dkdkdk',
	                'title' : Title.value,
	                'contents' : etx.value,
					'date' : alllabel,
					'time' : alltime,
					'place' : Place.value,
					'public' : "all",
					'notice' : "1",
					'member' : "hi, hello",
					'percent' : '0',
					'color' : selectColor.value
	});
    console.log('Send'); //Sign_in 함수가 호출되었는지 확인
    console.log(JSON.stringify(opts));

	fetch('http://18.222.99.74/cal/amPost',{
	            method: "POST",
	            headers: {
	            	"Content-type": "application/json"
	            },
	            body : JSON.stringify(opts)

	        }).then((res)=>{ return res.json()
	        }).then((res)=>{
	            // console.log( JSON.parse(res._bodyInit).documents[1].address_name )
	            console.log(JSON.stringify(res));
	            console.log(res.success);

	            if( JSON.parse(res.success) == true){
	            	router.push("MonthView");


	            	//로컬로 푸쉬알림 보내려 했는데 이 backend에서는 불가능하다고 뜸
					// console.log(year);
					// console.log(monthInit.value);
					// console.log(dayInit.value);
					// console.log(dateInit.value);
					// console.log(hourInit.value);
					// console.log(Number(hourInit.value)+12);
					// console.log(minuteInit.value);

	    //         	if(dateInit.value=="오후"){
			  //           var sethour =Number(hourInit.value)+12;
     //       			}
     //       			else{
     //       				var sethour = hourInit.value;
     //       			}
     //       			var setmonth = Number(monthInit.value)-1;
     //       			// console.log(sethour);

	    //         	var settime = new Date(year,setmonth,dayInit.value,sethour,minuteInit.value);
					// //차이를 초로 계산
					// var difference = (settime - today) / 1000;
					// console.log(today);
				 //    console.log(settime);
				 //    console.log(difference);

				 //    LocalNotify.later(difference, "드디어!", Title.value, "그렇죠?", true);



	            	console.log("Move to MonthView");
	            }


	            // JSON.parse(res._bodyInit).documents[1].address_name
	        }).catch((err)=>{
	            console.log(err);
	        });


	

}


module.exports = {
	today : today,
	hours : hours,
	minutes : minutes,
	ampm : ampm,
	Time : Time,
	timeInit : timeInit,
	timeInit2 : timeInit2, 

	dateInit : dateInit,
	dateValue : dateValue,
	dateToggle : dateToggle,
	dateChange : dateChange,
	choiceDate : choiceDate,

	hourInit : hourInit,
	hourValue : hourValue,
	hourToggle : hourToggle,
	hourChange : hourChange,
	choiceHour : choiceHour,

	minuteInit : minuteInit,
	minuteValue : minuteValue,
	minuteToggle : minuteToggle,
	minuteChange : minuteChange,
	choiceMinute : choiceMinute,

	monthInit : monthInit,
	monthValue : monthValue,
	monthToggle : monthToggle,
	monthChange : monthChange,
	choiceMonth : choiceMonth,

	dayInit : dayInit,
	dayValue : dayValue,
	dayToggle : dayToggle,
	dayChange : dayChange,
	choiceDay : choiceDay,

	popup_visible : popup_visible,
	popup : popup,
	popoff : popoff,
	settime : settime,
	
	popup_visible2 : popup_visible2,
	popup2 : popup2,
	popoff2 : popoff2,
	settime2 : settime2,

	Title : Title,
	label : label,
	label2 : label2, 
	day : day,
	month : month,
	year : year,
	dayLabel : dayLabel,
	getToday : getToday,
	Place : Place,
	etx : etx,
	alltime : alltime,
	alllabel : alllabel,
	Send : Send,

	//----------------------colorcode
	blue : blue,
	red : red,
	gray : gray,
	yellow : yellow,
	purple : purple,
	green : green,
	sky : sky,
	orange : orange,

	bluecheck : bluecheck,
	redcheck : redcheck,
	graycheck : graycheck,
	yellowcheck : yellowcheck,
	purplecheck : purplecheck,
	greencheck : greencheck,
	skycheck : skycheck,
	orangecheck : orangecheck,

    //----------------------- 선택한 컬러가 저장될 변
	selectColor : selectColor,

 	//-----------------------
	popup_colorcode : popup_colorcode,
	popup_pastel :popup_pastel,
	popupOff : popupOff,
	setColor : setColor,

	//----------------------colorcode

	//----------------------teamchart
	popup_team : popup_team,
	popup_Tchart : popup_Tchart,
	popupOff_T : popupOff_T,
	setTeam : setTeam,
	//----------------------teamchart

	allNotify : allNotify,
	allNotified : allNotified,
	personalNotify : personalNotify,
	personalNotified : personalNotified


};
