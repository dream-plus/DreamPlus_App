var Observable = require("FuseJS/Observable");

var title = Observable("");

var category = ['공지', '자유게시판','QnA'];

var date = new Date(); 
var year = date.getFullYear(); 
var month = new String(date.getMonth()+1); 
var day = new String(date.getDate()); 

// 현재 날짜 구하는 곳 ============
// 한자리수일 경우 0을 채워준다. 
if(month.length == 1){ 
	month = "0" + month; 
} 
if(day.length == 1){ 
	day = "0" + day; 
} 

var currentdate = Observable(year+"."+month+"."+day);
// console.log(currentdate.value);
// ==============


var content = Observable("");
var date = new Date();


function goBack()
{
	router.push("boardMain");
}

function contents(){
	var opts2 = ({
		'_id': 'testid07',
		'name' : 'kbs',
		'title' : title.value,
		'category' : category.value,
		'content' : content.value,
		date : currentdate.value
	});

	fetch('http://aa52f6e2.ngrok.io/board/am',{
		method: "POST",
		headers: {
			"Content-type": "application/JSON"
		},
		body : JSON.stringify(opts2)

	}).then((res)=>{
	            // console.log(JSON.stringify(res));
	            // console.log(JSON.parse(res));
	            return res.json()
	        }).then((res)=>{

	        	console.log(res.success);


	        	if( JSON.parse(res.success) == true){
	            	// router.push("Home", ID);
	            	router.push("boardMain");
	            	// console.log("Move to mainviewBis");
	            }
	            // JSON.parse(res._bodyInit).documents[1].address_name
	        }).catch((err)=>{
	        	console.log(err);
	        });
	    }

	    var categoryselect = Observable("");

	    var categoryisOpen = Observable(false);

	    function categorytoggleOpen(){
	    	categoryisOpen.value = true;
	    }

	    function categoryclick(e){
	    	categoryselect.value = e.data;
	    	categoryisOpen.value = false;

	    }

	    module.exports = {
	    	board : function(){router.goto("board");},
	    	title: title,
	    	category : category,
	    	content:content,
	    	contents : contents,
	    	goBack : goBack,
	    	categoryisOpen:categoryisOpen,
	    	categoryselect :categoryselect,
	    	categorytoggleOpen:categorytoggleOpen,
	    	categoryclick:categoryclick
	    };
