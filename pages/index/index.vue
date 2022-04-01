<template>
	<view>
		<uni-forms ref="form" :modelValue="form" :rules="{str:{rules:[{required:true,errorMessage:'aaa'}]}}">
			<uni-forms-item name="str" required label="时间" >
				<xp-picker :mode="mode" v-model="form.str"/>
			</uni-forms-item>
			<uni-forms-item name="nnn" required label="名称">
				<uni-easyinput v-model="form.nnn" :inputBorder="false" placeholder="请输入名称"></uni-easyinput>
			</uni-forms-item>
		</uni-forms>
		<!-- #ifdef VUE3 -->
		<xp-picker :mode="mode" :modelValue="form.str" @input="handleInput"/>
		<!-- #endif -->
		<!-- #ifdef VUE2 -->
		<xp-picker :mode="mode" :value="form.str" @input="handleInput"/>
		<!-- #endif -->
		<button type="default" @click="valid">触发表单验证</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					str:""
				},
				mode:'ymdhis'
			}
		},
		created() {
		},
		methods: {
			valid(){
				this.$refs.form.validate()
			},
			handleInput(e){
				this.form.str=e
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
