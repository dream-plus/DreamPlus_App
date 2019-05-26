var Observable = require("FuseJS/Observable");

var boardColorChange = Observable(false);
var homeColorChange = Observable(true);
var shebColorChange = Observable(false);
var accColorChange = Observable(false);

// req.body._id, req.body.name, req.body.title, req.body.contents, req.body.date, 
// req.body.time, req.body.place, req.body.public, req.body.notice, req.body.member

var sessionUserID = Observable("");
var sessionUserName = Observable("");

var projectTitle = Observable("");
var projectContents = Observable("");
var percent = Observable("0");

function AddProject(){
	var opts2 = ({
		'_id': sessionUserID.value,
		'name' : sessionUserName.value,
		'title' : projectTitle.value,
		'percent' : percent.value,
		'content' : projectContents.value,
		date : currentdate.value
	});

	fetch('http://18.222.99.74/board/am',{
	// fetch('http://aa52f6e2.ngrok.io/board/am',{
		method: "POST",
		headers: {
			"Content-type": "application/JSON"
		},
		body : JSON.stringify(opts2)

	}).then((res)=>{
		return res.json()
	}).then((res)=>{
	        	// console.log(res.success);
	        	if( JSON.parse(res.success) == true){
	        		router.push("home");
	        	}
	        }).catch((err)=>{
	        	console.log(err);
	        });
	    }

	    function goBack() { router.push("projectSch")};

	    module.exports = {
	    	boardColorChange : boardColorChange,
	    	homeColorChange : homeColorChange,
	    	shebColorChange : shebColorChange,
	    	accColorChange : accColorChange,
	    	goBack : goBack,
	    	AddProject : AddProject,
	    	projectTitle : projectTitle,
	    	projectContents : projectContents,
	    	percent : percent

	    }