var Observable = require('FuseJS/Observable');


var direction = Observable();
var title = Observable();
var content = Observable();
var expense = Observable();

var right = Observable(0);
var left = Observable(0);
var opp = Observable();

var pin = 0;
var i = 0;

exports.items = Observable()
exports.isLoading = Observable(false);

function addComma(num) {
	var regexp = /\B(?=(\d{3})+(?!\d))/g;
	return num.toString().replace(regexp, ',');
}

svp.check()

function loadSome(){
	
	fetch('http://aa52f6e2.ngrok.io/account/call/all',{
		method: "GET",
		headers: {
			"Content-type": "application/JSON"
		}	               
	}).then((res)=>{ return res.json()
	}).then((res)=>{
		
		for (;i < res.length ; i++) {
			if("Import" == res[i].table_name){
				exports.items.add( {
					direction : "Left",
					opp : "Right",
					title : res[i].title,
					content : res[i].based,
					expense : addComma(res[i].amount),
					right : 0,
					left : 10,
				})
			}
			else if("Expense" == res[i].table_name){
				exports.items.add( {
					direction : "Right",
					opp : "Left",
					title : res[i].title,
					content : res[i].based,
					expense : addComma(res[i].amount),
					right : 10,
					left : 0,
				})
			}
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



