<template>
	<view>
		<view v-if="hasSlot" class="e-picker--text" @tap="show">
			<slot />
		</view>
		<view class="e-picker" :style="{'visibility':pickerVisible?'visible':'hidden'}">
			<view class="e-picker-mask" :class="{'e-picker-animation':animation}" :style="{'opacity':pickerVisible?0.6:0}" @tap="_cancel"></view>
			<view class="e-picker-container" :class="{'e-picker-container--show':pickerVisible,'e-picker-animation':animation}">
				<view class="e-picker-action">
					<view class="e-picker-action--cancel" @tap="_cancel">取消</view>
					<view class="e-picker-action--confirm" @tap="_confirm">确定</view>
				</view>
				<picker-view :style="{'height':height+'vh'}" indicator-style="height:40px" :value="value" @change="_change">
					<picker-view-column v-for="(k,i) in columns" :key="i" class="e-picker-column">
						<view class="e-picker-list-item" v-for="(item,index) in container[k]" :key="index">
							{{item+mp[k]}}
						</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		PickerRun,
		mp
	} from './utils.min.js'
	export default {
		name: 'ePickerPlus',
		data() {
			return {
				mp,
				pickerVisible: false,
				value: [],
				container: {}
			}
		},
		props: {
			mode: {
				type: String,
				default: 'YMD'
			},
			animation: {
				type: Boolean,
				default: true
			},
			height: {
				type: Number,
				default: 35
			},
			initOnOpen: {
				type: Boolean,
				default: false
			},
			startRule: String,
			endRule: String,
			defaultValue: String
		},
		created() {
			this.initPicker()
		},
		computed: {
			hasSlot() {
				return !!this.$slots['default']
			},
			columns() {
				return this.mode.split('')
			}
		},
		watch: {
			mode() {
				this.initPicker()
			}
		},
		methods: {
			initPicker() {
				this.utils = new PickerRun(this);
				this.container = this.utils.initContainer()
				this.value = this.utils.getValue()
			},
			show() {
				this.pickerVisible = true
				if (this.initOnOpen) this.value = this.utils.getValue(false)
			},
			_cancel() {
				this.$emit('cancel')
				this.pickerVisible = false
			},
			_confirm() {
				this.$emit('confirm', this._getResult())
				this.pickerVisible = false
			},
			_getResult() {
				const obj = this.utils.value2Obj(this.value, this.container)
				const r = {
					resultArr: this.utils.obj2Arr(obj),
					result: this.utils.obj2DateTime(obj)
				}
				const wholeTime = this.utils.getWholeTime(obj) //当前选择的时间 所在的完整时间线
				const current = this.utils.getLocalTime("YMDhms") //当前系统时间
				r.isOverTime = false
				if (this.utils.time2Timestamp(current) < this.utils.time2Timestamp(wholeTime)) r.isOverTime = true
				if (this.mode === 'YMDhms') r.timestamp = this.utils.time2Timestamp(r.result)
				return r
			},
			_change(e) {
				const newValue = e.detail.value
				if (this._hasModeStr('D') && (newValue[1] != this.value[1] || newValue[0] != this.value[0])) {
					let tmp = this.utils.value2Obj(newValue, this.container)
					let startNum = 1
					let endNum = this.utils.getDays(tmp['Y'], tmp['M'])
					if (this.end) endNum = Number(this.utils.datetime2Obj(this.end)['D'])
					if (this.start) startNum = Number(this.utils.datetime2Obj(this.start)['D'])
					this.$set(this.container, 'D', this.utils.getColumn(startNum, endNum))
				}
				this.value = newValue
			},
			_hasModeStr(str) {
				return this.mode.includes(str)
			}
		}
	}
</script>

<style scoped lang="scss">
	.e-picker--text {}

	.e-picker {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		font-size: 30rpx;
	}

	.e-picker-container {
		position: fixed;
		bottom: 0;
		transform: translateY(100%);
		z-index: 999;
		width: 100%;
		background-color: #fff;
		visibility: hidden;

	}

	.e-picker-container--show {
		transform: translateY(0);
		visibility: visible;
	}

	.e-picker-mask {
		z-index: 998;
		width: 100%;
		height: 100%;
		background-color: rgb(0, 0, 0);
	}

	.e-picker-animation {
		transition: all 0.3s;
	}

	.e-picker-action {
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		box-sizing: border-box;
		position: relative;
		font-size: 32rpx;
		border-bottom: 0.5px solid #e5e5e5
	}

	.e-picker-action--cancel {
		opacity: .7;
	}

	.e-picker-action--confirm {
		color: #007aff;
	}

	.e-picker-column {
		text-align: center;
		border: none
	}

	.e-picker-list-item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40px;
	}
</style>
