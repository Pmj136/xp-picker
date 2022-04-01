const isLeapYear = y => y % 4 == 0 && y % 100 != 0 || y % 100 == 0 && y % 400 == 0
const variables = {
	y: {
		text: "年",
		range: [null, null]
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

function templateFactory(args) {
	const {
		mode,
		yearRange
	} = args
	let val
	// #ifdef VUE2
	val = args.value
	// #endif
	// #ifdef VUE3
	val = args.modelValue
	// #endif
	let ret = {}
	for (const key of mode) {
		ret[key] = variables[key]
	}
	if (mode.indexOf("y") !== -1) ret['y'].range = yearRange
	if (mode.indexOf("d") !== -1) {
		const date = getDate(val || getLocalTime(mode))
		ret['d'].range = [1, date]
	}
	return ret
}

export function generateUntisAndCols(target) {
	const raw = templateFactory(target)
	const units = [],
		cols = []
	const mode = target.mode
	for (let index = 0; index < mode.length; index++) {
		const s = mode[index]
		const {
			text,
			range
		} = raw[s]
		units.push(text)
		const tmp = [],
			[start, end] = range
		for (let i = start; i <= end; i++)
			tmp.push(fmtNumber(i))
		cols[index] = tmp
	}
	return {
		units,
		cols
	}
}
export function getDate(dt) {
	const s = dt.substring(0, dt.lastIndexOf("-"))
	let year, month
	const d = new Date()
	switch (s.length) {
		case 0:
			year = d.getFullYear()
			month = d.getMonth() + 1
			break;
		case 2:
			year = d.getFullYear()
			month = +s
			break;
		default:
			const [y, m] = s.split("-")
			year = +y
			month = +m
			break;
	}
	const days = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
	return days[month - 1]
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
		'mdh': `${m}-${d} ${h}`,
		'ymdh': `${y}-${m}-${d} ${h}`,
		'mdhi': `${m}-${d} ${h}:${i}`,
		'mdhis': `${m}-${d} ${h}:${m}:${s}`,
		'yd': `${y}-${d}`,
		'ymdhi': `${y}-${m}-${d} ${h}:${i}`,
		'ymdhis': `${y}-${m}-${d} ${h}:${i}:${s}`,
	}
	return types[fmt]
}
export function fmtNumber(n) {
	// return n.toString().padStart(2,"0")
	return n > 9 ? n + "" : "0" + n
}
export function getForm(name = 'uniForms') {
	let parent = this.$parent;
	let parentName = parent.$options.name;
	while (parentName !== name) {
		parent = parent.$parent;
		if (!parent) return false;
		parentName = parent.$options.name;
	}
	return parent;
}

export function getSelectedDateTimeStr({
	selected,
	units,
	cols,
	mode
}) {
	let str = ""
	for (let i = 0; i < selected.length; i++)
		str += cols[i][selected[i]] + units[i]
	let dt = str
		.replace('年', '-')
		.replace('月', '-')
		.replace('日', ' ')
		.replace('时', ':')
		.replace('分', ':')
		.replace('秒', '')
	if (!mode.endsWith('s'))
		dt = dt.substring(0, dt.length - 1)
	return dt
}
