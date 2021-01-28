# xp-picker

### 
- 上一代e-picker-plus的优化版本，适配任何可选列的配置，包括但不限于'y-m-d h:i'、'm-d'等，详情请看文档
- 功能强、通用性强、多端兼容。兼容h5、微信小程序(其他平台小程序未作测试)与app

### 一、使用示例
#### 示例1：函数式打开picker，通过 this.$refs[ref].show()
```html
    <template>
    	<view>
    		<xp-picker ref="picker"  @confirm="confirm" />
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
#### 示例2：xp-picker包含一个默认插槽，点击内容直接打开picker弹窗
```html
    <template>
    	<view>
    		<xp-picker @confirm="confirm">打开</xp-picker>
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
| ----------- | -------- | ---- | ---------------------- | ------------------------------- |
| mode             | String | 否  |  ymd                   | 见下方mode 详细介绍       |
| height           | Number | 否  |  35                    | 选择器的高度，单位vh     |
| animation        | Boolean| 否  |  true                     | 打开和关闭是否使用动画效果      |
| value     | String | 否  |  当前时间                  | 打开选择器时默认选中的时间,详细见下方使用方式      |
| year-range      |Array | 否  | [2016,null]      | 数组第一项代表开始年份(配置为null将使用默认2016)，第二项代表结束年份(配置null将使用本年)，配置示例:[2010,null]     |
| history       | Boolean| 否  |  false                    | 每次打开picker时，是否保持用户最后一次选择的历史时间，若为fasle,则每次打开显示当前时间|
| ~~startRule~~       | |   |                  | v2.0已移除      |
| ~~endRule~~       | |  |                      | v2.0已移除      |
| ~~start~~        |  |   |               | v1.2已移除    |
| ~~end~~          |  |   |              | v1.2已移除     |
| ~~errorMsg~~         |  |   |   | v1.2已移除     |


### 1、mode的使用(y年；m月；d日；h时；i分；s秒)
| 可选类型             | 描述  |
| -------| --------------------------------- |
| y        | picker将只显示 '年'一列       |
| ym        | picker将只显示 '年月'两列      |
| ymd        | picker将只显示 '年月日'两列      |
| ymdh      | picker将只显示 '年月日时'四列       |
| ymdhi     | picker将显示 '年月日时分'五列       |
| ymdhis     | picker将显示 '年月日时分秒'六列      |
| m       | 略……        |
| d       | 略……         |
| h       | 略……         |
| i       | 略……         |
| s       | 略……         |
| md       |略……        |
| hi       | 略……         |
| is      | 略……         |
| his       | 略……        |
| mdh       | 略……         |
| mdhi       | 略……         |
| mdhis      | 略……       |

未出现在表格中的配置代表不支持。但是xp-picker可以适配任何自定义列，比如：其中'dh'未预定义，因此只需在源码加一行dh的预定义即可(util.js/getLocalTime)，不会联系作者，热心答复
### 2、value的使用
此选项用于自定义picker打开时的显示时间，同样需要与mode对应  

| mode    | value格式（必须）  |
| --------- | --------------------------------- |
| ymd   |  yyyy-MM-dd  |
| his    | HH:mm:ss    |
|    …… |      ……     |


### 三、事件

| 字段      | 描述  |
| --------- | ------------------------ |
| confirm   | 点击确定按钮的响应事件     | 
| cancel    | 关闭picker的响应事件     |

#### confirm 事件返回属性介绍
| 属性      | 类型  | 描述    |
| --------- | ------------------------ |--------------------------|
| ~~isOverTime~~   |     | v2.0.0已移除|
| result    | String     |选择的时间 例如:'2020-12-06'|
| resultArr    | Array<String>     |例如:['2020年','12月','06日']|
| timestamp    | BigInt     |返回的时间戳，支持理论可转换的时间|


### 四、插槽
可使用此方式打开picker弹窗
