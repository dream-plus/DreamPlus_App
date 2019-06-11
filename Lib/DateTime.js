/* A simple DateTime library used by this example */

exports.monthDays = function(date) {
    var d= new Date(date.getFullYear(), date.getMonth()+1, 0)
    return d.getDate()
}

exports.first = function(date) {
	var d = new Date(date.valueOf())
	d.setDate(1)
	return d
}

exports.nextDay = function(date) {
	var d = new Date(date.valueOf())
	d.setDate( d.getDate() + 1)
	return d
}

exports.dayOfWeek = function(date) {
	return (date.getDay() % 7) //shift to Sun-Sat
}

exports.monthLabels = [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ]

exports.dayLabels = [ "일", "월", "화", "수", "목", "금", "토" ]
