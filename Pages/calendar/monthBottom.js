var Observable = require("FuseJS/Observable")

exports.weekColorChange = Observable(true);
exports.dayColorChange = Observable(false);
exports.detailchange = Observable(true);
exports.detailpanel = Observable(false);
exports.scheduleMonth = Observable(false);
exports.scheduleDay = Observable(false);


// 오늘자 날자 체크 하기 위한 부분 ---------------------------
var today = new Date();
var day = today.getDate();
var month = today.getMonth()+1; //January is 0!
var year = today.getFullYear();
var dayLabel = today.getDay();

if(month<10) {
    month='0'+month
}

if(day<10) {
    day='0'+day
}

var label = year + "." + month + "." + day
// ---------------------------------------------------

exports.monthitems = Observable();
exports.todayitems = Observable();
exports.monthisLoading = Observable(false);
exports.todayisLoading = Observable(false);



var monthi = 0;
var todayi = 0;
monthsvp.check();
todaysvp.check();

console.log("month detail");

exports.monthtest = function(){

			
				exports.detailchange.value = false;
			
			exports.scheduleDay.value = false;
			exports.scheduleMonth.value = true;
}


// 월간 데이터를 불러오기 위한 함수 (현재 전체 데이터를 불러옴)
function monthloadSome(){
	var count = 0;
//function loadSome(){
	console.log("loading each");
	fetch('http://18.222.99.74/cal/am',{
		// fetch('http://3ff05a06.ngrok.io/board/am',{
			method: "GET",
			headers: {
				"Content-type": "application/JSON"
			}

		}).then(function(res){
			return res.json();
		}).then(function(res){

			for(; monthi < res.length; monthi++){
				console.log(res[monthi].date);

				// 월별로 나누기 위해 split사용 (더 생각해 보아야함)
				// var arrMonth = res[i].date.split('.');
				// console.log(arrMonth[1]);

				exports.monthitems.add(monthcreatePage(res[monthi].title,res[monthi].contents,res[monthi].date, res[monthi].time, res[monthi].place, res[monthi].color));	
				// console.log(res[i].title,res[i].contents,res[i].date, res[i].time, res[i].place);
				count = count +1;

			}
			exports.monthisLoading.value = false;
			
			// exports.scheduleDay.value = false;
			// exports.scheduleMonth.value = true;

			console.log("content exist")

		}).catch((err)=>{
			console.log(err);
			if(err == "TypeError: Network request failed" ){
				// NetworkError.value = true;
				console.log("dsfadfas");
				exports.monthisLoading.value = false;
			}
		});
	}

				
// for문과 합치게 되면 마지막 데이터만 들어가는 문제 발생하기 때문에 반드시 createPage로 분리 시켜줘야한다.
function monthcreatePage(title, contents, date, time, place, color) {

	console.log("createPage");
	return {
		title : title,
		time: time,
		place : place,

		contents : contents,
		date : date,
		color : color
		// gotoDetails: function() {
		// 	console.log("Details");
		// 	// exports.detailpanel.value = true;

		// 	router.push("Detailschedule", { title : title, contents : contents, date : date, time : time, place : place})
		// 	console.log("Details2");
		// 	// router.goBack();
		// }
	};

}



exports.todaytest = function(){
			todayloadSome;
			
			exports.detailchange.value = false;
			
			exports.scheduleDay.value = true;
			exports.scheduleMonth.value = false;
}


// 오늘자 데이터를 불러오기 
function todayloadSome(){
	var count = 0;
//function loadSome(){
	console.log("loading each");
	fetch('http://18.222.99.74/cal/am',{
		// fetch('http://3ff05a06.ngrok.io/board/am',{
			method: "GET",
			headers: {
				"Content-type": "application/JSON"
			}

		}).then(function(res){
			return res.json();
		}).then(function(res){

			for(; todayi < res.length; todayi++){
				console.log("-----------");
				console.log(res[todayi].date);
				console.log(label);

				if(res[todayi].date == label){
					exports.todayitems.add(todaycreatePage(res[todayi].title,res[todayi].contents,res[todayi].date, res[todayi].time, res[todayi].place, res[todayi].color));

					count = count +1;	
				}
				
				// console.log(res[i].title,res[i].contents,res[i].date, res[i].time, res[i].place);
			}
		
			
			exports.todayisLoading.value = false;
			// if(count == 0){
			// 	exports.detailchange.value = true;
			// }
			// else{
			// 	exports.detailchange.value = false;
			// }
			// exports.scheduleDay.value = true;
			// exports.scheduleMonth.value = false;			


		}).catch((err)=>{
			console.log(err);
			if(err == "TypeError: Network request failed" ){
				// NetworkError.value = true;
				console.log("dsfadfas");
				exports.todayisLoading.value = false;
			}
		});
	}

function todaycreatePage(title2, contents2, date2, time2, place2, color2) {

	console.log("createPage2");
	return {
		title2 : title2,
		time2: time2,
		place2 : place2,
		contents2 : contents2,
		date2 : date2,
		color2 : color2

		// gotoDetails: function() {
		// 	console.log("Details");
		// 	// exports.detailpanel.value = true;

		// 	router.push("Detailschedule", { title : title, contents : contents, date : date, time : time, place : place})
		// 	console.log("Details2");
		// 	// router.goBack();
		// }
	};

}


// exports.goBack = function()
// 	{
// 	exports.detailpanel.value = false;
// 	};



// exports.detailed = function(){
// 	console.log("go detail");
// 	// router.push("Detailschedule");
// 	exports.detailpanel.value = true;
// 	// console.log(title);
// }


// 로딩창
var maxSimulatedDelay = 1.5
var minSimulatedDelay = 0.25
exports.monthloadMore = function() {
//function loadMore() {
	if (exports.monthisLoading.value) {
		return
	}
	exports.monthisLoading.value = true
	
	//simulate a delay in loading data from a remote request
	var delay = Math.random() * (maxSimulatedDelay - minSimulatedDelay) + minSimulatedDelay
	setTimeout( monthloadSome, delay * 500 )
}


exports.todayloadMore = function() {
//function loadMore() {
	if (exports.todayisLoading.value) {
		return
	}
	exports.todayisLoading.value = true
	
	//simulate a delay in loading data from a remote request
	var delay = Math.random() * (maxSimulatedDelay - minSimulatedDelay) + minSimulatedDelay
	setTimeout( todayloadSome, delay * 500 )
}

exports.weekChange = function(){
	exports.weekColorChange.value = true;
	exports.dayColorChange.value = false;
}

exports.dayChange = function(){
	exports.weekColorChange.value = false;
	exports.dayColorChange.value = true;
}

// module.exports = {
// 	loadSome : loadSome,
// 	loadMore : loadMore
// }


