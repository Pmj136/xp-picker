const isLeapYear = y => y % 4 == 0 && y % 100 != 0 || y % 100 == 0 && y % 400 == 0
const parseDay = (y, m) => {
	const days = [31, isLeapYear(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
	return days[Number(m) - 1]
}
export const variables = {
	y: {
		text: "年",
		range: [2016, new Date().getFullYear()]
	},
	m: {
		text: "月",
		range: [1, 12]
	},
	d: {
		text: "日",
		range: [1, 31]
	},
	h: {
		text: "时",
		range: [0, 23]
	},
	i: {
		text: "分",
		range: [0, 59]
	},
	s: {
		text: "秒",
		range: [0, 59]
	}
}
export function getLocalTime(fmt) {
	if (!fmt) return null
	const da = new Date()
	const y = fmtNumber(da.getFullYear()),
		m = fmtNumber(da.getMonth() + 1),
		d = fmtNumber(da.getDate()),
		h = fmtNumber(da.getHours()),
		i = fmtNumber(da.getMinutes()),
		s = fmtNumber(da.getSeconds())
	const types = {
		'y': `${y}`,
		'm': `${m}`,
		'd': `${d}`,
		'h': `${h}`,
		'i': `${i}`,
		's': `${s}`,
		'ym': `${y}-${m}`,
		'md': `${m}-${d}`,
		'hi': `${h}:${i}`,
		'is': `${i}:${s}`,
		'ymd': `${y}-${m}-${d}`,
		'his': `${h}:${i}:${s}`,
		'mdh':`${m}-${d} ${h}`,
		'ymdh': `${y}-${m}-${d} ${h}`,
		'mdhi':`${m}-${d} ${h}:${i}`,
		'mdhis':`${m}-${d} ${h}:${m}:${s}`,
		'ymdhi': `${y}-${m}-${d} ${h}:${i}`,
		'ymdhis': `${y}-${m}-${d} ${h}:${i}:${s}`,
	}
	return types[fmt]
}
export function fmtNumber(n) {
	// return n.toString().padStart(2,"0")
	return n > 9 ? n + "" : "0" + n
}
export function time2Timestamp(timer) {
	return new Date(timer).getTime()
}
export function getDate(dtObj) {
	const year = parseInt(dtObj.y) || getLocalTime("y")
	const month = parseInt(dtObj.m) || getLocalTime("m")
	return parseDay(year, month);
}