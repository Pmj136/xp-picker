<template>
	<view>
		<xp-picker mode="ym" :action-position="actionPosition" :history="history" :year-range="[2020,2030]" @confirm="confirm">
			<button>年月</button>
		</xp-picker>
		<xp-picker mode="md" :action-position="actionPosition" :history="history" :year-range="[2020,2030]" @confirm="confirm">
			<button>月日</button>
		</xp-picker>
		<xp-picker mode="hi" :action-position="actionPosition" :history="history" :year-range="[2020,2030]" @confirm="confirm">
			<button>时分</button>
		</xp-picker>
		<xp-picker mode="is" :action-position="actionPosition" :history="history" :year-range="[2020,2030]" @confirm="confirm">
			<button>分秒</button>
		</xp-picker>
		<xp-picker :action-position="actionPosition" :history="history" :year-range="[2020,2030]" @confirm="confirm">
			<button>年月日</button>
		</xp-picker>
		<xp-picker mode="mdh" :action-position="actionPosition" :history="history" :year-range="[2020,2030]" @confirm="confirm">
			<button>月日时</button>
		</xp-picker>
		<xp-picker mode="his" :action-position="actionPosition" :history="history" :year-range="[2020,2030]" @confirm="confirm">
			<button>时分秒</button>
		</xp-picker>
		<xp-picker mode="ymdhi" :action-position="actionPosition" :history="history" :year-range="[2020,2030]" @confirm="confirm">
			<button>年月日时分</button>
		</xp-picker>
		<xp-picker mode="ymdhis" :action-position="actionPosition" :history="history" :year-range="[2020,2030]" @confirm="confirm">
			<button>年月日时分秒</button>
		</xp-picker>

		<view class="wrap">
			<text class="label">按钮位置</text>
			<radio-group @change="radioChange" style="display: flex;">
				<view style="margin-right: 20rpx;">
					<radio value="bottom" :checked="actionPosition === 'bottom'" />
					<view>底部</view>
				</view>
				<view>
					<radio value="top" :checked="actionPosition === 'top'" />
					<view>顶部</view>
				</view>
			</radio-group>
		</view>

		<view class="wrap">
			<text class="label">历史模式</text>
			<switch :checked="history" @change="change" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				actionPosition: "bottom",
				history: true
			}
		},
		methods: {
			radioChange(e) {
				this.actionPosition = e.detail.value
			},
			confirm(e) {
				console.log(e)
				uni.showToast({
					icon: 'none',
					duration: 3000,
					title: e.value
				})
			},
			change(e) {
				this.history = e.detail.value
			}
		}
	}
</script>

<style scoped>
	.wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 20rpx;
	}

	.label {
		font-size: 40rpx;
	}
</style>
