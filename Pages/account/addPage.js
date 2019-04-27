var Observable = require('FuseJS/Observable');

var today = new Date();

var title = Observable("");
var amount = Observable("");
var detail = Observable("");
var based = Observable("");
var imagePath = Observable("");
// var image1 = Observable('../../Assets/logoGray.png');

var selection = Observable(false);
var photoView = Observable(false);
var monthToggle = Observable(false);
var dayToggle = Observable(false);

var select = Observable("수입");
var monthInit = Observable(today.getMonth() + 1);
var dayInit = Observable(today.getDate());

var array = ['수입' , '지출'];
var monthValue = [];
var dayValue = Observable();

var Camera = require('FuseJS/Camera');
var picture = Observable('Images/Camera.png');


for(i=1; i<13; i++){
	monthValue.push(i);
}
for(i=1; i<33 - new Date(2019, monthInit.value - 1, 32).getDate(); i++){
	dayValue.add(i);
}

function toggleChange(){
	selection.value = true;
}

function choice(e){
	select.value = e.data;
	selection.value = false;

}

// camera
function takePicture(){
	Camera.takePicture(640, 480).then(function(image){
		picture.value = image;
		console.log(JSON.stringify(image));
		imagePath.value = image.path;
		photoView.value = true;
	}).catch(function(err){
		console.error(err);
	})
}

// year, month, day
function monthChange(){
	monthToggle.value = true;
}

function choicemonth(e){
	monthInit.value = e.data;
	monthToggle.value = false;
}

function dayChange(){
	dayValue.clear();
	for(i=1; i<33 - new Date(2019, monthInit.value - 1, 32).getDate(); i++){
		dayValue.add(i);
	}
	dayToggle.value = true;
}

function choiceDay(e){
	dayInit.value = e.data;
	dayToggle.value = false;
}

function Save(){
	
	fetch('http://aa52f6e2.ngrok.io/account/add',{
		method: "POST",
		headers: {
			"Content-type": "application/json"
		},
		body : JSON.stringify({
			'selection' : select.value,
			'title' : title.value,
			'amount' : amount.value,
			'detail' : detail.value,
			'based' : based.value
		})
	}).then((res)=>{ return res.json()
	}).then((res)=>{
	            // console.log( JSON.parse(res._bodyInit).documents[1].address_name )
	            console.log("received the JSON" + JSON.stringify(res));
	            console.log(res.success);

	            if( JSON.parse(res.success) == true){
	            	router.push("accountBook");
	            }


	            // JSON.parse(res._bodyInit).documents[1].address_name
	        }).catch((err)=>{
	        	console.log(err);
	        });




	    }


	    module.exports = {
	    	title : title,
	    	amount : amount,
	    	detail : detail,
	    	based : based,
	    	Save : Save,
	    	array : array,
	    	toggleChange : toggleChange,
	    	choice : choice,
	    	select : select,
	    	selection : selection,
	    	picture : picture,
	    	takePicture : takePicture,
	    	photoView : photoView,
	    	imagePath : imagePath,
	    	monthValue : monthValue,
	    	monthToggle : monthToggle,
	    	monthInit : monthInit,
	    	monthChange : monthChange,
	    	choicemonth : choicemonth,
	    	dayInit : dayInit,
	    	dayValue : dayValue,
	    	dayToggle : dayToggle,
	    	dayChange : dayChange,
	    	choiceDay : choiceDay

	    };