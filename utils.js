const fmt = e => e > 9 ? e : "0" + e;
const isLeapYear = y => y % 4 == 0 && y % 100 != 0 || y % 100 == 0 && y % 400 == 0
const modesDef = {
	Y: {
		startRule: '2000',
		endRule: new Date().getFullYear() + ''
	},
	YM: {
		startRule: '2000-01',
		endRule: new Date().getFullYear() + '-' + '12'
	},
	YMD: {
		startRule: '2000-01-01',
		endRule: new Date().getFullYear() + '-' + '12' + '-' + '31'
	},
	YMDh: {
		startRule: '2000-01-01 00',
		endRule: new Date().getFullYear() + '-' + '12' + '-' + '31' + ' ' + '23'
	},
	YMDhm: {
		startRule: '2000-01-01 00:00',
		endRule: new Date().getFullYear() + '-' + '12' + '-' + '31' + ' ' + '23' + ':' + '59'
	},
	YMDhms: {
		startRule: '2000-01-01 00:00:00',
		endRule: new Date().getFullYear() + '-' + '12' + '-' + '31' + ' ' + '23' + ':' + '59' + ':' + '59'
	},
	h: {
		startRule: '00',
		endRule: '23'
	},
	m: {
		startRule: '00',
		endRule: '59'
	},
	s: {
		startRule: '00',
		endRule: '59'
	},
	hm: {
		startRule: '00:00',
		endRule: '23:59'
	},
	hms: {
		startRule: '00:00:00',
		endRule: '23:59:59'
	},
	ms: {
		startRule: '00:00',
		endRule: '59:59'
	}
}
export const mp = {
	Y: '年',
	M: '月',
	D: '日',
	h: '时',
	m: '分',
	s: '秒'
}
export class PickerRun {
	constructor(source) {
		const {
			mode,
			startRule,
			endRule,
			defaultValue
		} = source
		this.mode = mode.trim()
		this.columns = mode.split('')
		this.firstKey = mode[0]
		this.startRule = startRule || this.getDefRule('startRule')
		this.endRule = endRule || this.getDefRule('endRule')
		this.defaultValue = defaultValue || this.getLocalTime()
	}
	initContainer() {
		const container = {}
		const startObj = this.datetime2Obj(this.startRule)
		const endObj = this.datetime2Obj(this.endRule)
		for (const v of this.columns) {
			let startNum = parseInt(startObj[v]);
			let endNum = parseInt(endObj[v])
			if (v === 'D') {
				const tmp = this.datetime2Obj(this.defaultValue)
				endNum = this.getDays(tmp['Y'], tmp['M'])
			}
			container[v] = this.getColumn(startNum, endNum)
		}
		return container;
	}
	getValue(init = true) {
		let endObj = this.datetime2Obj(this.defaultValue)
		if (init === false) endObj = this.datetime2Obj(this.getLocalTime())
		return this.obj2Value(this.datetime2Obj(this.startRule), endObj)
	}
	getDays(y, m) {
		const days = [31, isLeapYear(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
		return days[Number(m) - 1]
	}
	//获取列
	getColumn(start, end) {
		const arr = []
		for (let i = start; i <= end; i++) {
			arr.push(fmt(i) + "")
		}
		return arr
	}
	value2Obj(value, container) {
		const obj = {}
		for (let i = 0; i < this.columns.length; i++) {
			obj[this.columns[i]] = container[this.columns[i]][value[i]]
		}
		return obj
	}
	time2Timestamp(timer) {
		return new Date(timer).getTime()
	}
	getLocalTime(mode) {
		const d = new Date()
		const types = {
			'Y': `${d.getFullYear()}`,
			'YM': `${d.getFullYear()}-${fmt(d.getMonth() + 1)}`,
			'YMD': `${d.getFullYear()}-${fmt(d.getMonth() + 1)}-${fmt(d.getDate())}`,
			'YMDh': `${d.getFullYear()}-${fmt(d.getMonth() + 1)}-${fmt(d.getDate())} ${fmt(d.getHours())}`,
			'YMDhm': `${d.getFullYear()}-${fmt(d.getMonth() + 1)}-${fmt(d.getDate())} ${fmt(d.getHours())}:${fmt(d.getMinutes())}`,
			'YMDhms': `${d.getFullYear()}-${fmt(d.getMonth() + 1)}-${fmt(d.getDate())} ${fmt(d.getHours())}:${fmt(d.getMinutes())}:${fmt(d.getSeconds())}`,
			'h': `${fmt(d.getHours())}:${fmt(d.getMinutes())}:${fmt(d.getSeconds())}`,
			'hm': `${fmt(d.getHours())}:${fmt(d.getMinutes())}:${fmt(d.getSeconds())}`,
			'hms': `${fmt(d.getHours())}:${fmt(d.getMinutes())}:${fmt(d.getSeconds())}`,
			'm': `${fmt(d.getMinutes())}`,
			's': `${fmt(d.getSeconds())}`,
			'ms': `${fmt(d.getMinutes())}:${fmt(d.getSeconds())}`
		}
		if (mode) return types[mode]
		return types[this.mode]
	}
	obj2Arr(obj) {
		const arr = []
		for (const key in obj) {
			arr.push(obj[key] + mp[key])
		}
		return arr
	}
	obj2Value(startObj, showObj) {
		let arr = []
		for (const key in showObj) {
			arr.push(Number(showObj[key]) - Number(startObj[key]))
		}
		return arr
	}
	//获取默认范围
	getDefRule(type) {
		return modesDef[this.mode][type]
	}
	//时间转换成对象格式
	datetime2Obj(dt, columns) {
		let col = this.columns
		if (columns) col = columns
		const obj = {}
		const arr = dt.split(/-|:|\s/)
		for (let i = 0; i < arr.length; i++) {
			obj[col[i]] = arr[i]
		}
		return obj
	}
	obj2DateTime(obj, flag = true) {
		let str = ''
		for (const key in obj) {
			str += obj[key] + mp[key]
		}
		let dt = str.replace('年', '-').replace('月', '-').replace('日', ' ').replace('时', ':').replace('分', ':').replace('秒',
			'')
		if (!this.mode.endsWith('s') && flag)
			dt = dt.substring(0, dt.length - 1)
		return dt
	}
	getWholeTime(timeObj) {
		const dfObj = this.datetime2Obj(this.getLocalTime("YMDhms"), ['Y', 'M', 'D', 'h', 'm', 's'])
		const obj = {}
		for (const k in dfObj) {
			if (timeObj[k]) obj[k] = timeObj[k]
			else obj[k] = dfObj[k]
		}
		return this.obj2DateTime(obj, false)
	}
}
