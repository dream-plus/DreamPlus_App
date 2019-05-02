var Observable = require("FuseJS/Observable")
var DateTime = require("Lib/DateTime")
var date = Observable(new Date())

// var Title = Observable("");

this.Parameter.onValueChanged(module, function(value) {
	date.value = new Date(value.year, value.month,value.day)
})





exports.label = date.map(function(day) {
	return "" + day.getFullYear() + "-" + DateTime.monthLabels[day.getMonth()] + "-" + 
		 day.getDate()+ "-" + DateTime.dayLabels[day.getDay()]
})
