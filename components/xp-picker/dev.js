//生产模式下，此文件不会打包构建
import {
	getLocalTime
} from "./util.js"
export function assert({
	mode,
	value,
	yearRange
}) {
	if ("ymdhis".indexOf(mode) === -1)
		throw new Error("illegal 'mode'")

	if (getLocalTime(mode) == undefined)
		throw new Error("'mode' is not found")

	if (value != null) {
		if (value.length !== getLocalTime(mode).length)
			throw new Error("'value' cannot be formatted as 'mode'")
		const arr = value.split(/-|:|\s/)
		if (arr.length != mode.length)
			throw new Error("'value' cannot be formatted as 'mode'")

	}
	if (yearRange.length !== 2)
		throw new Error("the length of array 'year-rang' must be 2")
}
