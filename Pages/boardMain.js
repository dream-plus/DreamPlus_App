
var Observable = require("FuseJS/Observable");



var opts = ({
	id : '2',
	name : "감사원"
});

function write(){
	_id = '1';
	router.push('write',opts);

}

var maxSimulatedDelay = 1.5
var minSimulatedDelay = 0.25


var _id = Observable("");
var category = Observable("");
var name = Observable("");
var title = Observable("");
var array = Observable("");
var content = Observable("");
var days = Observable("");

var items = Observable();

// exports.isLoading = Observable(false);
var isLoading = Observable(false);
var boardColorChange = Observable(true);
var homeColorChange = Observable(false);
var shebColorChange = Observable(false);
var accColorChange = Observable(false);



svp.check();
function loadMore(){
	if (isLoading.value) {
		return
	}
	isLoading.value = true;

	var delay = Math.random() * (maxSimulatedDelay - minSimulatedDelay) + minSimulatedDelay
	setTimeout( loadSome, delay * 1000 );
	
}

function loadSome(){
	fetch('http://18.222.99.74/board/am',{
		// fetch('http://aa52f6e2.ngrok.io/board/am',{
			method: "GET",
			headers: {
				"Content-type": "application/JSON"
			}


		}).then(function(res){
			return res.json();
		}).then(function(res){

			for(var i in res){

				items.add(createPage(res[i].name,res[i].title,res[i].content,res[i].date)

				);		
				console.log(res);

			}

			isLoading.value = false;

		}).catch((err)=>{
			console.log(err);
		});
	}

// for문과 합치게 되면 마지막 데이터만 들어가는 문제 발생하기 때문에 반드시 createPage로 분리 시켜줘야한다.
	function createPage(name, title, content, date) {
		return {
			name : name,
			title: title,
			content : content,
			days : date,
			gotoDetails: function() {
				router.push("detailPage", { title: title , name:name, content:content, days:date})
			}
		};
	}

	exports.clicked= function(){router.goto("SubPage")}


	module.exports = {

		items : items,
		isLoading : isLoading,
		write : write,
		loadMore : loadMore,
		boardColorChange : boardColorChange,
		homeColorChange : homeColorChange,
		shebColorChange : shebColorChange,
		accColorChange : accColorChange
	};


