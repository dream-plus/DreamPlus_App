var Observable = require('FuseJS/Observable');

var balance = Observable(0);
var Monthselect = Observable("4");

var MonthisOpen = Observable(false);

var Month = [];



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
	
	fetch('http://aa52f6e2.ngrok.io/account/call/amount',{
		method: "GET",
		headers: {
			"Content-type": "application/JSON"
		}	               
	}).then((res)=>{ return res.json()
	}).then((res)=>{
		// console.log(res.data);
		balance.value = addComma(res.data);
		

	}).catch((err)=>{
		console.log("Error: " + error);
	});
}
totalAmount();

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
	totalAmount : totalAmount


};