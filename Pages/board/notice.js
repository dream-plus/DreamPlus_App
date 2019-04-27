var Observable = require("FuseJS/Observable");

var maxSimulatedDelay = 1.5
var minSimulatedDelay = 0.25


var _id = Observable("");
var category = Observable("");
var name = Observable("");
var title = Observable("");
var array = Observable("");
var content = Observable("");
var days = Observable("");

exports.items = Observable();

exports.isLoading = Observable(false);

svp.check();
exports.loadMore = function(){
	if (exports.isLoading.value) {
		return
	}
	exports.isLoading.value = true;

	var delay = Math.random() * (maxSimulatedDelay - minSimulatedDelay) + minSimulatedDelay
	setTimeout( loadSome, delay * 1000 );
	
}

function loadSome(){
	fetch('http://aa52f6e2.ngrok.io/board/am',{
		method: "GET",
		headers: {
			"Content-type": "application/JSON"
		}


	}).then(function(res){
		return res.json();
	}).then(function(res){

		for(var i in res){

			exports.items.add({
				name: res[i].name,
				title : res[i].title,
				content : res[i].content,
				days : res[i].date,
					gotoDetails: function() {
						router.push("detailPage", { name: name,title: title,content: content,days: days})
					}
				});		
		}

		exports.isLoading.value = false;

	}).catch((err)=>{
		console.log(err);
	});
}

exports.clicked= function(){router.goto("SubPage")}

