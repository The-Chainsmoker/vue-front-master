function getBeforeDate(day, str, show = false) {//str格式化
	var now = new Date().getTime(); //获取毫秒数
	var before = new Date(now - ((day > 0 && day ? day : 0) * 86400 * 1000));//?天数转成毫秒
	var year = before.getFullYear();
	var month = before.getMonth() + 1;
	var date = before.getDate();
	console.log(date)
	let dayAgo = year + (str ? str : '') + (month < 10 ? '0' + month : month) + (str ? str : '') + (date < 10 ? '0' +
		date : date)
	console.log(dayAgo)

	if (show) {
		var hours = before.getHours()
		var minutes = before.getMinutes()
		var seconds = before.getSeconds()
		dayAgo = `${dayAgo} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
		return dayAgo
	}

	return dayAgo
}
export default {
	getBeforeDate
}