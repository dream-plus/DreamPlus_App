var Observable = require('FuseJS/Observable');

var title = Observable();
var content = Observable();
var expense = Observable();

var i = 0;

exports.items = Observable()
exports.isLoading = Observable(false);

// data 가져올 때 1회만 가져오게 밖으로 뺐다.
svp.check()

function addComma(num) {
	var regexp = /\B(?=(\d{3})+(?!\d))/g;
	return num.toString().replace(regexp, ',');
}

function loadSome(){
	
	fetch('http://aa52f6e2.ngrok.io/account/call/income',{
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
				expense : addComma(res[i].Import_amount),
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
	//it's possible this gets called again before the previous loading is complete
	if (exports.isLoading.value) {
		return
	}


	exports.isLoading.value = true
	


	var delay = Math.random() * (maxSimulatedDelay - minSimulatedDelay) + minSimulatedDelay
	setTimeout( loadSome, delay * 1000 )
	
}

// module.exports = {

// };



