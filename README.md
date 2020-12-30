# e-picker-plus

### 
- 功能强、通用性强、多端兼容。兼容h5、微信小程序(其他平台小程序未作测试)与app


### 一、使用示例
#### 示例1：函数式打开picker，通过 this.$refs[ref].show()
```html
    <template>
    	<view>
    		<e-picker-plus ref="picker"  @confirm="confirm" />
    		<view @tap="show">开启</view>
    	</view>
    </template>
```
```js
	<script>
		export default {
			methods: {
				show() {
					this.$refs.picker.show()
				},
				confirm(e) {
					console.log(e)
				}
			}
		}
	</script>
```
#### 示例2：e-picker-plus包含一个默认插槽，点击内容直接打开picker弹窗
```html
    <template>
    	<view>
    		<e-picker-plus @confirm="confirm">打开</e-picker-plus>
    	</view>
    </template>
```
```js
	<script>
		export default {
			methods: {
				confirm(e) {
					console.log(e)
				}
			}
		}
	</script>
```


### 二、属性介绍

| 字段             | 类型      | 必填 | 默认值               | 描述  |
| ----------- | -------- | ---- | --------------------- | ---------------------------------------- |
| mode             | String | 否  |  YMD                   | 见下方mode 详细介绍       |
| height           | Number | 否  |  35                    | 选择器的高度，单位vh     |
| animation        | Boolean| 否  |  true                     | 打开和关闭是否使用动画效果      |
| defaultValue     | String | 否  |  当前时间                  | 打开选择器时默认选中的时间,详细见下方使用方式      |
| initOnOpen       | Boolean| 否  |  false                    | 每次打开picker时是否重置显示的时间(若设置defaultValue将重置为defaultVale,否则重置为当前时间)      |
| startRule       | String| 否  |  一天的开始                  | 此规则之前的时间将不可选      |
| endRule       | String| 否  |  一天的结束                    | 此规则之后的时间将不可选       |
| ~~start~~        |  |   |               | v1.2已移除，请使用startRule    |
| ~~end~~          |  |   |              | v1.2已移除，请使用endRule     |
| ~~errorMsg~~         |  |   |   | v1.2已移除     |




### 1、mode的使用(Y年；M月；D日；h时；m分；s秒)
| 可选类型             | 描述  |
| -------| --------------------------------- |
| Y        | picker将只显示 '年'一列       |
| YM        | picker将只显示 '年月'两列      |
| YMD         | picker将只显示 '年月日'两列      |
| YMDh       | picker将只显示 '年月日时'四列       |
| YMDhm      | picker将显示 '年月日时分'五列       |
| YMDhms     | picker将显示 '年月日时分秒'六列      |
| h         | picker将只显示 '时'一列       |
| hm       | picker将只显示 '时分'两列       |
| hms       | picker将只显示 '时分秒'两列        |
| m      | ……   v1.2新增    |
| s       | ……  v1.2新增     |
| ms       | ……  v1.2新增     |


### 2、defaultValue的使用
此选项用于自定义picker打开时的显示时间，同样需要与mode对应  
#### PS:如果设置了startRule或endRule ，defaultValue的值应在规则范围之内，否则出现不可预料的bug
| mode    | defaultValue格式  |
| --------- | --------------------------------- |
| YMD   |  yyyy-MM-dd  |
| hms    | HH:mm:ss    |
|    …… |      ……     |




### 三、事件

| 字段      | 描述  |
| --------- | ------------------------ |
| confirm   | 点击确定按钮的响应事件     | 
| cancel    | 关闭picker的响应事件     |

#### confirm 事件返回属性介绍
| 属性      | 类型  | 描述    |
| --------- | ------------------------ |--------------------------|
| isOverTime   | Boolean     | 选择的时间是否超过当前北京时间（v1.2新增）
| result    | String     |选择的时间 例如:'2020-12-06'|
| resultArr    | Array<String>     |例如:['2020年','12月','06日']|
| timestamp    | BigInt     |返回的时间戳，仅mode为"YMDhms"有效|


### 四、插槽
可使用此方式打开picker弹窗，若样式不满足需求，源文件样式类名已写好，可直接添加css