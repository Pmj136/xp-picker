# xp-picker

### 
- 可以与uni-forms配合使用-表单验证
- 支持vue2 vue3

### 一、使用示例
#### 示例1：配合uni-forms使用，内置支持表单验证
```html
    <template>
    	<uni-forms :modelValue="form" :rules="[]">
    		<uni-forms-item label="时间" name="time">
				<xp-picker v-model="form.time" />
			</uni-forms-item>
    	</uni-forms>
    </template>
```
#### 示例2：函数式打开picker，通过 this.$refs[ref].show()
```html
    <template>
    	<view>
    		<xp-picker ref="picker"  @input="confirm" />
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
#### 示例3：xp-picker包含一个默认插槽，点击内容直接打开picker弹窗
```html
    <template>
    	<view>
    		<xp-picker @input="confirm">打开</xp-picker>
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
| value 或 modelValue(vue3)    | String | 否  |  当前时间                  | 打开选择器时默认选中的时间,详细见下方使用方式      |
| yearRange      |Array | 否  | [2016,null]      | 数组第一项代表开始年份(配置为null将使用默认2016)，第二项代表结束年份(配置null将使用本年)，配置示例:[2010,null]     |
| actionPosition| String|否   |bottom     |       可选 top,设置"取消"和"确定"按钮的位置      |
| ~~history~~       | |   |                  | v2.3已移除      |
| ~~startRule~~       | |   |                  | v2.0已移除      |
| ~~endRule~~       | |  |                      | v2.0已移除      |
| ~~start~~        |  |   |               | v1.2已移除    |
| ~~end~~          |  |   |              | v1.2已移除     |
| ~~errorMsg~~         |  |   |   | v1.2已移除     |


### mode的使用(y年；m月；d日；h时；i分；s秒)
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

### 三、事件

| 字段      | 描述  |
| --------- | ------------------------ |
| input   | 点击确定按钮的响应事件     | 
| ~~confirm~~         |  |   |   | v2.3已移除     |

### 四、插槽
可使用此方式打开picker弹窗