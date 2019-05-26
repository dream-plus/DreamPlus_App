
var Observable = require("FuseJS/Observable");

var boardColorChange = Observable(false);
var homeColorChange = Observable(true);
var shebColorChange = Observable(false);
var accColorChange = Observable(false);

var projectItems = Observable();
var percent = Observable();

function projectloadSome(){

	fetch('http://18.222.99.74/cal/am',{
		// fetch('http://aa52f6e2.ngrok.io/cal/am',{
			method: "GET",
			headers: {
				"Content-type": "application/JSON"
			}


		}).then(function(res){
			return res.json();
		}).then(function(res){
			for(var i = res.length-1; i > (res.length - 3); i--){

				projectItems.add(createProjectPage(res[i].title,res[i].member,"2019.04.22 ~ 2019.05.30",res[i].percent,res[i].contents,res[i].num));	
			}

		}).catch((err)=>{
			console.log(err);
			if(err == "TypeError: Network request failed" ){
				NetworkError.value = true;
			}
		});
	}

// for문과 합치게 되면 마지막 데이터만 들어가는 문제 발생하기 때문에 반드시 createPage로 분리 시켜줘야한다.
function createProjectPage(title, member, date, percent, contents, num) {
	return {
		noticetitle : title,
		noticemember: member,
		noticedate : date,
		percent : percent,
		gotoDetails: function() {
			router.push("detailProjectPage", { title: title , member:member, date : date, percent: percent, contents:contents, num:num  })
		}
	};
}

projectloadSome();
function goBack() { router.push("home")};
function gotoAddProject() {router.push("addProject")};

module.exports = {
	boardColorChange : boardColorChange,
	homeColorChange : homeColorChange,
	shebColorChange : shebColorChange,
	accColorChange : accColorChange,
	projectloadSome : projectloadSome,
	projectItems : projectItems,
	percent : percent,
	goBack : goBack,
	gotoAddProject : gotoAddProject
}