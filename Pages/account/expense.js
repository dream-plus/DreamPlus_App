var Observable = require('FuseJS/Observable');

var title = Observable();
var content = Observable();
var expense = Observable();

var i = 0;

exports.items = Observable()
exports.isLoading = Observable(false);

// income 과 expense 는 false 과 true 가 반대입니다.
exports.expenseColorChange = Observable(false);
exports.incomeColorChange = Observable(true);
exports.addColorChange = Observable(false);

svp.check()

function addComma(num) {
	var regexp = /\B(?=(\d{3})+(?!\d))/g;
	return num.toString().replace(regexp, ',');
}

function loadSome(){
	
	fetch('http://18.222.99.74/account/call/expense',{
	// fetch('http://aa52f6e2.ngrok.io/account/call/expense',{
		method: "GET",
		headers: {
			"Content-type": "application/JSON"
		}	               
	}).then((res)=>{ return res.json()
	}).then((res)=>{
		
		for( ; i < res.length ; i++){
			exports.items.add({
				title : res[i].title,
				content : res[i].based,
				expense : addComma(res[i].Expense_amount),
				detail : res[i].Details_of_usage,
			})
			
		}

		exports.isLoading.value = false


	}).catch((err)=>{
		console.log("Error: " + error);
	});
}


var maxSimulatedDelay = 1.5
var minSimulatedDelay = 0.25
exports.loadMore = function() {
	if (exports.isLoading.value) {
		return
	}
	
	exports.isLoading.value = true



	var delay = Math.random() * (maxSimulatedDelay - minSimulatedDelay) + minSimulatedDelay
	setTimeout( loadSome, delay * 1000 )
	
}




