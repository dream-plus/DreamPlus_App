var Observable = require("FuseJS/Observable");

var boardColorChange = Observable(false);
var homeColorChange = Observable(true);
var shebColorChange = Observable(false);
var accColorChange = Observable(false);

var sessionUserID = Observable("");
var sessionUserName = Observable("");

var projectTitle = Observable("");
var projectContents = Observable("");
var percent = Observable("0");

// 세션을 불러오는 함수.( id, name 불러오는 용도. )
function Session(){

	fetch('http://18.222.99.74/users/session',{
		// fetch('http://3ff05a06.ngrok.io/users/session',{
			method: "GET",
			headers: {
				"Content-type": "application/JSON"
			}
		}).then(function(res){
			return res.json();
		}).then(function(res){
			// message true는 세션이 작동 되었는지 확인하는 변수.
			if(res.message == 'true'){ 
				sessionUserName.value = res.username;
				sessionUserID.value = res.userid;
			}			

		}).catch((err)=>{
			console.log(err );
			
		});
}

Session(); // Session 함수를 무조건 실행시키기 위한 곳.

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