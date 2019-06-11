var Observable = require('FuseJS/Observable');

var Number1 = [];
var PercentOpen = Observable(false);

var boardColorChange = Observable(false);
var homeColorChange = Observable(true);
var shebColorChange = Observable(false);
var accColorChange = Observable(false);
var Percentselect = Observable("");
var percentvalue = Observable("");

for(var i=1; i<=100; i++){
	Number1.push(i);
}
var test = this.Parameter;

var title = this.Parameter.map( function(x) {
	percentvalue.value = JSON.stringify(x.num); // 게시판 번호를 받는 부분.
	return x.title;
});

var member = this.Parameter.map( function(x) {

	return x.member;
});

var date = this.Parameter.map( function(x) {

	return x.date;
});

var percent = this.Parameter.map( function(x) {

	return x.percent;
});

var contents = this.Parameter.map( function(x) {
	return x.contents;
});


function PercentToggleOpen(){
	PercentOpen.value = true;
}

function Percentclick(d){
	Percentselect.value = d.data;
	PercentOpen.value = false;
}

function ChangePercent(){
	var opts = ({
		'num' : percentvalue.value,
		'percent' : Percentselect.value
	});

	fetch('http://18.222.99.74/cal/am',{
	// fetch('http://aa52f6e2.ngrok.io/board/am',{
		method: "PUT",
		headers: {
			"Content-type": "application/JSON"
		},
		body : JSON.stringify(opts)

	}).then((res)=>{
		return res.json()
	}).then((res)=>{
		if( JSON.parse(res.success) == true){
			router.goto("home");
		}
	}).catch((err)=>{
		console.log("Error = "+err);
	});
}


function goBack(){router.goBack()};

module.exports = {
	goBack : goBack,
	Percentclick : Percentclick,
	Percentselect : Percentselect,
	PercentOpen : PercentOpen,
	Number1 : Number1,
	PercentToggleOpen : PercentToggleOpen,
	PercentOpen : PercentOpen,
	boardColorChange : boardColorChange,
	homeColorChange : homeColorChange,
	shebColorChange : shebColorChange,
	accColorChange : accColorChange,
	title : title,
	member : member,
	date : date,
	percent : percent,
	contents : contents,
	ChangePercent : ChangePercent



};


