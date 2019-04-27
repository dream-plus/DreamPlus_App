var Observable = require('FuseJS/Observable');

function gotoHome(){
	router.goto("home");
}

function gotoBoard(){
	router.goto("boardMain");
}

function gotoSchedule(){
	router.goto("schedule");
}

function gotoAccount(){
	router.goto("accountBook");
}

module.exports = {
	gotoHome : gotoHome,
	gotoBoard : gotoBoard,
	gotoSchedule : gotoSchedule,
	gotoAccount : gotoAccount

};