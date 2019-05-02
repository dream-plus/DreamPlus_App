var Observable = require("FuseJS/Observable");
var DateTime = require("Lib/DateTime.js");

var viewNode = this
var date = Observable(DateTime.first(new Date()))

/** The parameter to this page contains the date we should be displaying. */
/**이 페이지의 매개 변수는 우리가 표시해야하는 날짜를 포함합니다. */
this.Parameter.onValueChanged(module, function(value) {
	date.value = new Date(value.year, value.month,1)
})

/** When a month is activated we set the bookmarks to the previous and next month. */
/** 한 달이 활성화되면 책갈피를 이전 및 다음 달로 설정합니다. */
exports.activated = function() {
	var p = new Date(date.value.valueOf())
	p.setMonth( p.getMonth() - 1)
	router.bookmark({
		name: "prevMonth",
		relative: viewNode,
		path: [ "month", { month: p.getMonth(), year: p.getFullYear() } ]
	})
	
	p = new Date(date.value.valueOf())
	p.setMonth( p.getMonth() + 1)
	router.bookmark({
		name: "nextMonth",
		relative: viewNode,
		path: [ "month", { month: p.getMonth(), year: p.getFullYear() } ]
	})
}

/** A day from the previous/next month on the grid */
/** 그리드의 이전 / 다음 달의 하루 */
function FillDay(day) {
	this.type = "fill"
	this.day = day
}

/** A day from the current month */
/** 당월의 하루 */
function Day(day) {
	this.type = "day"
	this.day = day
	this.dayOfMonth = day.getDate()
}

/** The `days` are filled with complete weeks worth of days to cover the current month. */
/** 'days'는 현재 월을 포괄하는 일주일의 완전한 주가 표시됩니다. */
exports.days = Observable()
date.onValueChanged(module, function(v) {
	var first = DateTime.first(v)
	var num = DateTime.monthDays(v)
	
	var days = []
	
	var day = first
	var start = DateTime.dayOfWeek(first)
	day.setDate(day.getDate() - start)
	for (var i=0; i < start; ++i) {
		days.push( new FillDay(day) )
		day = DateTime.nextDay(day)
	}

	for (var i=0; i < num; ++i) {
		days.push( new Day(day) )
		day = DateTime.nextDay(day)
	}
	
	var end = (num + start) % 7
	if (end > 0) {
		for (var i=end; i < 7; ++i) {
			days.push( new FillDay(day) );
			day = DateTime.nextDay(day)
		}
	}
	

	exports.days.replaceAll(days)
})

exports.monthLabel = date.map( function(v) {
	return DateTime.monthLabels[v.getMonth()]
})

exports.daysOfWeek = DateTime.dayLabels

exports.openDay = function(args) {
	var day = args.data.day
	router.pushRelative( viewNode, "day", { month: day.getMonth(), year: day.getFullYear(), day: day.getDate() })
}
