<template>
	<view>
		<view v-if="hasSlot" @tap="show">
			<slot />
		</view>
		<view class="xp-picker" :style="{'visibility':pickerVisible?'visible':'hidden'}">
			<view class="xp-picker-mask" :class="{'xp-picker-animation':animation}" :style="{'opacity':pickerVisible?0.6:0}"
			 @tap="_cancel"></view>
			<view class="xp-picker-container" :class="{'xp-picker-container--show':pickerVisible,'xp-picker-animation':animation}">
				<view class="xp-picker-action_h5">
					<view class="xp-picker-action--cancel_h5" @tap="_cancel">取消</view>
					<view class="xp-picker-action--confirm_h5" @tap="_confirm">确定</view>
				</view>
				<view v-if="isError" class="xp-picker-error" :style="{'height':height+'vh'}">
					Render Error
				</view>
				<picker-view v-else :style="{'height':height+'vh'}" indicator-style="height:40px;" :value="selected" @change="_change">
					<picker-view-column v-for="(k,i) in modeArr" :key="i" class="xp-picker-column">
						<view class="xp-picker-list-item" v-for="(item,index) in cols[i]" :key="index">
							{{item+units[i]}}
						</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		variables,
		getLocalTime,
		fmtNumber,
		time2Timestamp,
		getDate
	} from "./util.js"
	export default {
		name: 'XpPicker',
		data() {
			return {
				isError: false,
				pickerVisible: false,
				cols: [],
				selected: []
			}
		},
		props: {
			mode: {
				type: String,
				default: "ymd"
			},
			animation: {
				type: Boolean,
				default: true
			},
			height: {
				type: [Number, String],
				default: 35
			},
			'year-range': {
				type: Array,
				default: () => [2010, null]
			},
			value: {
				type: String,
				default: null
			},
			history: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			hasSlot() {
				return !!this.$slots['default']
			},
			modeArr() {
				return this.mode.split("")
			},
			units() {
				const arr = []
				for (const k in variables) {
					if (this.mode.indexOf(k) !== -1) arr.push(variables[k].text)
				}
				return arr
			}
		},
		created() {
			this.assert()
			this.initCols()
			this.initSelected()
		},
		methods: {
			assert() {
				if (this.value != null) {
					const arr = this.value.split(/-|:|\s/)
					if (arr.length != this.modeArr.length) {
						this.isError = true
						throw new Error("render error，because the 'value' cannot be formatted as 'mode'")
					}
				}	
				if (this.yearRange.length !== 2) {
					this.isError = true
					throw new Error("render error，because the length of array 'year-rang' must be 2")
				}
				if (this.yearRange != null) this.updateVariables("y", this.yearRange)

				if (this.mode.indexOf("d") !== -1) {
					const dtObj = this.datetime2Obj(this.value || getLocalTime(this.mode))
					this.updateVariables("d", [1, getDate(dtObj)])
				}
			},
			initCols() {
				this.modeArr.forEach((k, i) => {
					const range = variables[k].range
					this.fillCol(k, ...range)
				})
			},
			initSelected() {
				const v = this.value || getLocalTime(this.mode)
				this.setSelected(v)
			},
			updateVariables(k, arr) {
				for (let i = 0; i < arr.length; i++) {
					if (arr[i] != null) variables[k].range[i] = arr[i]
				}
			},
			fillCol(k, s, e) {
				const index = this.mode.indexOf(k)
				let arr = []
				for (let i = s; i <= e; i++) {
					arr.push(fmtNumber(i))
				}
				this.$set(this.cols, index, arr)
			},
			//dt 时间字符串 如 '2020-02-16'
			setSelected(dt) {
				const arr = dt.split(/-|:|\s/)
				const a = this.cols
				for (let i = 0; i < a.length; i++)
					this.$set(this.selected, i, a[i].indexOf(arr[i]))
			},
			datetime2Obj(dt) {
				const obj = {}
				const arr = dt.split(/-|:|\s/)
				for (const i in this.mode)
					obj[this.mode[i]] = arr[i]
				return obj
			},
			selected2Obj(value) {
				const obj = {}
				for (let i = 0; i < this.modeArr.length; i++) {
					obj[this.modeArr[i]] = this.cols[i][value[i]]
				}
				return obj
			},
			resolveSelected() {
				let str = ""
				const arr = []
				for (let i = 0; i < this.selected.length; i++) {
					const v = this.cols[i][this.selected[i]] + this.units[i]
					str += v
					arr.push(v)
				}
				let dt = str
					.replace('年', '-')
					.replace('月', '-')
					.replace('日', ' ')
					.replace('时', ':')
					.replace('分', ':')
					.replace('秒', '')
				if (!this.mode.endsWith('s'))
					dt = dt.substring(0, dt.length - 1)
				return {
					result: dt,
					resultArr: arr
				}
			},
			show() {
				if (!this.history) this.initSelected()
				this.pickerVisible = true
			},
			_confirm() {
				this.$emit('confirm', this._getResult())
				this.pickerVisible = false
			},
			_getResult() {
				const r = {
					...this.resolveSelected()
				}
				const tp = time2Timestamp(r.result)
				if (!isNaN(tp)) r.timestamp = tp
				return r
			},
			_cancel() {
				this.$emit('cancel')
				this.pickerVisible = false
			},
			_change(e) {
				const newValue = e.detail.value
				const index = this.mode.indexOf("d")
				if (index !== -1 && this.mode.length > 1) {
					const dtObj = this.selected2Obj(newValue)
					this.fillCol("d", 1, getDate(dtObj))
				}
				this.selected = newValue
			}
		}
	}
</script>

<style scoped lang="scss">
	.xp-picker {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		font-size: 30rpx;
	}

	.xp-picker-container {
		position: fixed;
		bottom: 0;
		transform: translateY(100%);
		z-index: 999;
		width: 100%;
		background-color: #fff;
		visibility: hidden;

	}

	.xp-picker-container--show {
		transform: translateY(0);
		visibility: visible;
	}

	.xp-picker-mask {
		z-index: 998;
		width: 100%;
		height: 100%;
		background-color: rgb(0, 0, 0);
	}

	.xp-picker-animation {
		transition: all 0.25s;
	}

	.xp-picker-error {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.xp-picker-action_h5 {
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 22rpx 28rpx;
		box-sizing: border-box;
		position: relative;
		font-size: 34rpx;
		border-bottom: 0.5px solid #e5e5e5
	}

	.xp-picker-action--cancel_h5 {
		opacity: .7;
	}

	.xp-picker-action--confirm_h5 {
		color: #007aff;
	}

	.xp-picker-column {
		text-align: center;
		border: none;
	}

	.xp-picker-list-item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40px;
	}
</style>
