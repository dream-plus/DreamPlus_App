var Observable = require('FuseJS/Observable');

var balance = Observable(0);
var Monthselect = Observable("4");

var MonthisOpen = Observable(false);
var boardColorChange = Observable(false);
var homeColorChange = Observable(false);
var shebColorChange = Observable(false);
var accColorChange = Observable(true);

// 서버와 연동이 안되었을 때 다시 시도하는 함수.
function retry(){
	NetworkError.value = false;
	totalAmount();
}

var Month = [];

var NetworkError = Observable(false);


for(var i=1; i<=12; i++){
	Month.push(i);
}

function MonthtoggleOpen(){
	MonthisOpen.value = true;
}

function Monthclick(e){
	Monthselect.value = e.data;
	MonthisOpen.value = false;

}


// add comma
function addComma(num) {
	var regexp = /\B(?=(\d{3})+(?!\d))/g;
	return num.toString().replace(regexp, ',');
}


function totalAmount(){
	
	fetch('http://18.222.99.74/account/call/amount',{
	// fetch('http://3ff05a06.ngrok.io/account/call/amount',{
		method: "GET",
		headers: {
			"Content-type": "application/JSON"
		}	               
	}).then((res)=>{ return res.json()
	}).then((res)=>{
		// console.log(res.data);
		balance.value = addComma(res.data);
		

	}).catch((err)=>{
		console.log("Error: " + err);
		if(err == "TypeError: Network request failed" ){
			NetworkError.value = true;
		}
	});
}
totalAmount();

// // 세션을 불러오는 함수.( 초기에 네트워크와 연결이 되었는지 확인하는 용도로도 쓰인다. )
// function Session(){

// 	fetch('http://18.222.99.74/users/session',{
// 		// fetch('http://3ff05a06.ngrok.io/users/session',{
// 			method: "GET",
// 			headers: {
// 				"Content-type": "application/JSON"
// 			}
// 		}).then(function(res){
// 			return res.json();
// 		}).then(function(res){
// 			// message true는 세션이 작동 되었는지 확인하는 변수.
// 			// autoLogin은 자동로그인 버튼을 누르면 true , 안누르면 false
// 			if(res.message == 'true' && res.autoLogin == true){ 
// 				Loading.value = true;
// 				startLoading();
// 			}			

// 		}).catch((err)=>{
// 			console.log(err );
// 			if(err == "TypeError: Network request failed" ){
// 				NetworkError.value = true;
// 			}else if(err == "SyntaxError: Unexpected token < in JSON at position 1"){ // 이 SyntaxError는 서버에서 값을 받지 못할때 발생하므로 network failed와 같은 에러로 취급하였다.
// 				NetworkError.value = true;
// 			}
			
// 		});
// 	}

// Session();

// router
function gotoIncome(){
	router.push("income");
}

function gotoAddPage(){
	router.goto("addPage");
}

function gotoExpense(){
	router.goto("expense");
}

module.exports = {

	balance : balance,
	MonthtoggleOpen : MonthtoggleOpen,
	Monthclick : Monthclick,
	MonthisOpen : MonthisOpen,
	Monthselect : Monthselect,
	Month : Month,
	gotoIncome : gotoIncome,
	gotoExpense : gotoExpense,
	gotoAddPage : gotoAddPage,
	totalAmount : totalAmount,
	boardColorChange : boardColorChange,
	homeColorChange : homeColorChange,
	shebColorChange : shebColorChange,
	accColorChange : accColorChange,
	retry : retry,
	NetworkError : NetworkError


};