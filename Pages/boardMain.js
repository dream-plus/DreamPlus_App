
var Observable = require("FuseJS/Observable");

var date = new Date();
var content = [""]
content=Observable([]);

var maxSimulatedDelay = 1.5
var minSimulatedDelay = 0.25

var opts = ({
	id : '2',
	name : "감사원"
});

function write(){
	id = '1';
	router.push('write',opts);
	// console.log(opts.id, opts.name)

}

var _id = Observable("");
var category = Observable("");
var name = Observable("");
var title = Observable("");
var array = Observable("");
var result = Observable("");

exports.items = Observable();

exports.isLoading = Observable(false);


exports.loadMore = function(){
	//it's possible this gets called again before the previous loading is complete

	if (exports.isLoading.value) {
		return
	}

	exports.isLoading.value = true;

	var delay = Math.random() * (maxSimulatedDelay - minSimulatedDelay) + minSimulatedDelay
	setTimeout( loadSome, delay * 1000 );
	
}


exports.loadSome=function(){
	fetch('http://aa52f6e2.ngrok.io/board/am',{
		method: "GET",
		headers: {
			"Content-type": "application/JSON"
		}


	}).then(function(result){
		result = result;
		exports.result = result;
		return result.json();
	}).then(function(result){
		for(var i in result){
			exports.items.add( {
				name: result[i].name,
				_id : result[i]._id,
				title : result[i].title
			})
			// console.log(name.value);				
		}

	}).catch((err)=>{
		console.log(err);
	});

	exports.isLoading.value = false;

	svp.check();

}




module.exports = {
	
	content : content,
	write: write,
	opts : opts,
	result:result,

	page1: function() { router.goto("page1"); },
	page2: function() { router.goto("page2"); },
	page3: function() { router.goto("page3"); }
};


