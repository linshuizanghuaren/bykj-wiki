<template>
    <div
        :class="boxClasses"
        :style="inputBoxStyles"
        @mouseenter="mouseenterHandle"
        @mouseleave="mouseleaveHandle"
    >
        <template v-if="type !== 'textarea'">
            <div v-if="label || $slots.label" ref="label" :class="labelClasses" :style="labelStyles">
                <slot name="label">{{ label }}</slot>
            </div>
            <div v-if="$slots.prepend && !label && !$slots.label" ref="prepend" :class="[prefixCls+`-prepend`]">
                <slot name="prepend"></slot>
            </div>
            <div v-if="$slots.append && !label && !$slots.label" ref="append" :class="[prefixCls+`-append`]">
                <slot name="append"></slot>
            </div>
            <div :class="[prefixCls+`-main`]" :style="inputStyles">
                <div v-if="prefix || $slots.prefix" :class="[prefixCls+`-icon`,prefixCls+`-icon-prefix`]">
                    <slot name="prefix">
                        <i size :class="prefix" @click="handleIconClick"></i>
                    </slot>
                </div>
                <transition name="fade">
                    <div
                        v-if="suffix || $slots.suffix || clearable || showPassword"
                        v-show="showSuffix"
                        :class="[prefixCls+`-icon`,prefixCls+`-icon-suffix`]"
                    >
                        <i v-if="clearable && currentValue" size :class="[prefixCls+`-icon-clear`]" class="el-icon-error" @click="handleClear"></i>
                        <i v-if="showPassword && currentValue" class="el-icon-view" size @click="handleShowPassword"></i>
                        <slot v-if="suffix || $slots.suffix" name="suffix">
                            <i :class="suffix" size @click="handleIconClick"></i>
                        </slot>
                    </div>
                </transition>
                <input
                    :id="elementId"
                    ref="input"
                    :class="inputClasses"
                    :spellcheck="spellcheck"
                    :value="currentValue"
                    :name="name"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    :maxlength="maxlength"
                    :minlength="minlength"
                    :readonly="readonly"
                    :autofocus="autofocus"
                    :type="currentType"
                    :autocomplete="autocomplete"
                    @change="handleChange"
                    @input="handleInput"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @keyup="handleKeyup"
                    @keydown="handleKeydown"
                />
            </div>
        </template>
        <textarea
            v-else
            :id="elementId"
            ref="textarea"
            :class="textareaClasses"
            :style="textareaStyles"
            :spellcheck="spellcheck"
            :value="currentValue"
            :name="name"
            :placeholder="placeholder"
            :disabled="disabled"
            :maxlength="maxlength"
            :minlength="minlength"
            :readonly="readonly"
            :autofocus="autofocus"
            :rows="rows"
            :wrap="wrap"
            :autosize="autosize"
            :type="currentType"
            @change="handleChange"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            @keyup="handleKeyup"
            @keydown="handleKeydown"
        >
        </textarea>
    </div>
</template>

<script>
import calcTextareaHeight from './calcTeatareaHeight.js'
import { oneOf, propsInit } from '../utils/util.js'
// import Icon from '../icon'

const prefix = 'c-'
const prefixCls = prefix + 'input' // c-input

export default {
    name: prefixCls,
    props: {
        // 接收input的自带属性
        elementId: {
            type: String
        },
        type: {
            validator(value) {
                return oneOf(value, ['text', 'textarea', 'password', 'url', 'email', 'date', 'number', 'tel'])
            },
            default: 'text'
        },
        value: {
            type: [String, Number],
            default: ''
        },
        // 样式属性
        size: {
            validator: function(value) {
                return ['large', 'small', 'default'].indexOf(value) !== -1
            },
            default() {
                return !this.size || this.size === '' ? 'default' : this.size
            }
        },
        placeholder: {
            type: String,
            default: ''
        },
        showSuffix: {
            type: Boolean,
            default: true
        },
        name: {
            type: String
        },
        autocomplete: {
            type: String,
            default: 'off',
            validator(value) {
                return oneOf(value, ['off', 'on'])
            }
        },
        // textarea
        rows: {
            type: [Number, String],
            default: 2
        },
        autosize: {
            type: [Boolean, Object],
            default: false
        },
        wrap: {
            validator(value) {
                return function(value) {
                    return ['hard', 'soft'].indexOf(value) !== -1
                }
            },
            default: 'soft'
        },
        // props type为[Number, String]的配置
        ...propsInit({
            // label label样式的文字描述
            // width input的宽度
            // labelWidth label样式的文字的宽度 仅在fixed为false时有效
            // maxlength lmaxlength
            // minlength minlength
            props: ['label', 'width', 'labelWidth', 'maxlength', 'minlength'],
            config: {
                type: [Number, String]
            }
        }),
        // props type为 Boolean 的配置
        ...propsInit({
            // disabled disabled
            // readonly readonly
            // autofocus autofocus
            // spellcheck 原生的拼写检测
            // error error的样式设置
            // clearable 清空
            // fixed label的两种样式
            // prefix 前面的icon显示
            // suffix 后面的icon显示
            props: ['disabled', 'readonly', 'autofocus', 'spellcheck', 'error', 'clearable', 'showPassword', 'fixed'],
            config: {
                type: Boolean,
                default: false
            }
        }),
        // props type为 Boolean 的配置
        ...propsInit({
            // prefix 前面的icon显示
            // suffix 后面的icon显示
            props: ['prefix', 'suffix'],
            config: {
                type: [Boolean, String],
                default: ''
            }
        })
    },
    data() {
        return {
            currentValue: this.value,
            prefixCls: prefixCls,
            textareaStyles: {},
            labelFocus: false,
            inputStyles: {},
            currentType: this.type
        }
    },
    computed: {
        boxClasses() {
            return [
                `${prefixCls}-box`,
                `${prefixCls}-box-${this.size}`,
                {
                    [`${prefixCls}-error`]: this.error,
                    [`${prefixCls}-fixed-disabled`]: this.label && this.fixed && this.disabled,
                    [`${prefixCls}-box-clear`]: this.clearable && this.currentValue,
                    [`${prefixCls}-group`]: this.label && !this.fixed,
                    [`${prefixCls}-group-fixed`]: (this.label && this.fixed) || ((this.$slots.append || this.$slots.prepend) && !this.label && !this.$slots.label),
                    [`${prefixCls}-box-textarea`]: this.type === 'textarea',
                    [`${prefixCls}-box-focused`]: this.label && this.fixed && this.labelFocus
                }
            ]
        },
        inputClasses() {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-prefix`]: this.prefix || this.$slots.prefix,
                    [`${prefixCls}-suffix`]: this.suffix || this.$slots.suffix || this.showPassword,
                    [`${prefixCls}-nobox`]: this.label && !this.fixed
                }
            ]
        },
        labelClasses() {
            return [
                prefixCls + `-label`,
                {
                    [prefixCls + `-label-box`]: this.fixed
                }
            ]
        },
        textareaClasses() {
            return [
                `${prefixCls}`,
                `${prefixCls}-textarea`
            ]
        },
        labelStyles() {
            const { label, $slots, labelWidth } = this
            let style = {}
            if ((label || $slots.label) && labelWidth) {
                style = {
                    width: `${labelWidth}px`
                }
            }
            return style
        },
        // 整体的input的宽度
        inputBoxStyles() {
            const { label, fixed } = this
            const style = {}
            if (!label || (label && fixed)) { //
                style.width = `${this.width}px`
            }
            return style
        }
    },
    watch: {
        value(val) {
            this.setCurrentValue(val)
        }
    },
    mounted() {
        if (this.type === 'textarea') {
            this.resizeTextarea()
        } else {
            this.label && this.widthInit()
        }
    },
    methods: {
        widthInit() {
            const { fixed, label, $el } = this
            let width = ''
            if (label && fixed) {
                const clientWidth = parseInt($el.style.width)
                const labelWidth = this.labelWidth || +$el.querySelector(`.${prefixCls}-label`).clientWidth
                width = clientWidth - labelWidth - 1
                this.inputStyles = {
                    width: width + 'px'
                }
            } else {
                this.inputStyles = {
                    width: this.width + 'px'
                }
            }
        },
        handleShowPassword() {
            this.currentType = this.currentType !== 'password' ? 'password' : 'text'
        },
        mouseenterHandle(event) {
            this.$emit('on-mouseenter', event)
        },
        mouseleaveHandle(event) {
            this.$emit('on-mouseleave', event)
        },
        handleChange(event) {
            this.$emit('on-change', event)
        },
        handleFocus(event) {
            this.labelFocus = true
            this.$emit('on-focus', event)
        },
        handleBlur(event) {
            this.labelFocus = false
            this.$emit('on-blur', event)
            // if (!findComponentUpward(this, [`${prefix}datepicker`, `${prefix}timepicker`])) {
            //     this.dispatch(prefix + 'form-item', 'on-form-blur', this.currentValue)
            // }
        },
        handleKeyup(event) {
            this.$emit('on-keyup', event)
        },
        handleKeydown(event) {
            if (event.keyCode === 13) {
                this.$emit('on-enter', event, this.currentValue)
            }
            this.$emit('on-keydown', event)
        },
        handleInput(event) {
            const value = event.target.value
            this.$emit('input', value)
            this.setCurrentValue(value)
            this.$emit('on-change', event)
        },
        setCurrentValue(value) {
            if (value === this.currentValue) return
            this.$nextTick(() => {
                this.resizeTextarea()
            })
            this.currentValue = value
        },
        resizeTextarea() {
            const autosize = this.autosize
            if (!autosize || this.type !== 'textarea') {
                return false
            }
            const minRows = autosize.minRows
            const maxRows = autosize.maxRows
            this.textareaStyles = calcTextareaHeight(this.$refs.textarea, minRows, maxRows)
        },
        handleIconClick(e) {
            e && e.preventDefault()
            e && e.stopPropagation()
            this.$emit('on-click', e, this.currentValue)
        },
        handleClear() {
            const e = { target: { value: '' }}
            this.$emit('input', '')
            this.setCurrentValue('')
            this.$emit('on-change', e)
            this.$emit('on-clear', '')
        },
        focus() {
            if (this.type === 'textarea') {
                this.$refs.textarea.focus()
            } else {
                this.labelFocus = true
                this.$refs.input.focus()
            }
        },
        blur() {
            if (this.type === 'textarea') {
                this.$refs.textarea.blur()
            } else {
                this.labelFocus = false
                this.$refs.input.blur()
                // if (!findComponentUpward(this, ['DatePicker', 'TimePicker', 'Cascader', 'Search'])) {
                //     this.dispatch(prefix + 'form-item', 'on-form-change', this.currentValue)
                // }
            }
        }
    }
}

</script>

<style lang="scss">

$css-prefix-input: 'c-input';
$css-prefix-input-icon: $css-prefix-input+'-icon';
$css-prefix-form-item: 'c-form-item';
$input-small-size:24px;
$input-default-size:32px;
$input-large-size:40px;
$input-small-font:12px;
$input-default-font:12px;
$input-large-font:14px;
$Border: #dddee1; // border
$Background: #f8f8f9; // background
$Content: #495060; // content
$white: #fff; // active
$LightPrimary: #52b7fc; // hover
$Disabled: #e8e8e8; // disabled
$SubContent: #9ea7b4; // subContent
$Error: #f44336; // error

//input 的hover focus 等效果
@mixin inputMockClass($color, $shadowColor) {
  &:hover {
    border-color: $color;
  }

  &:focus {
    border-color: $color;
    box-shadow: $shadowColor;
  }

  &:disabled {
    background-color: $Disabled;
    cursor: not-allowed;
  }

  &:disabled:hover {
    border-color: $Border;
  }
}

@mixin labelMockClass($color, $shadowColor) {
  &:hover {
    border-color: $color;
  }

  &:focus {
    border-color: $color;
    box-shadow: $shadowColor;
  }

  .#{$css-prefix-input}:focus {
    box-shadow: none;
    outline: none;
    border-color: $Border;
  }
}

// input 的icon配合时的padding
@mixin inputSize($type, $input-size, $input-padding, $input-font-size) {
  &-#{$type} {
    .#{$css-prefix-input} {
      height: $input-size;
      padding: $input-padding;
      font-size: $input-font-size;

      &-prefix {
        padding-left: 25px;
      }

      &-suffix {
        padding-right: 25px;
      }

      &-prepend {
        height: $input-size;
        font-size: $input-font-size;
      }

      &-append {
        height: $input-size;
        font-size: $input-font-size;
      }

      &-label {
        font-size: $input-font-size;
      }

      &-icon {
        .icon {
          font-size: $input-font-size;
        }

        line-height: $input-size - 2px;
      }
    }
  }
}

@mixin borderTrans() {
  border: 1px solid $Border;
  border-radius: 4px;
  transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}

@mixin placeholder($color) {

    // Firefox
    &::-moz-placeholder {
        color: $color;
        opacity: 1;
    }

    // Internet Explorer 10+
    &:-ms-input-placeholder {
        color: $color;
    }

    // Safari and Chrome
    &::-webkit-input-placeholder {
        color: $color;
    }

    &::-ms-clear,
    &::-ms-reveal {
        display: none;
    }
}

@mixin borderInit($borderColor, $radius) {
  border: 1px solid $borderColor;
  border-radius: $radius;
  box-sizing: border-box;
}
//input 组件
//input基础样式
.#{$css-prefix-input}-box {
  display: inline-table;
  vertical-align: middle;
  position: relative;
  width: 100%;

  &-textarea {
    overflow: inherit;
  }

  //b-input-box：hover 显示clear-icon
  &-clear {
    &:hover {
      .#{$css-prefix-input-icon}-clear {
        display: inline-block;
      }

      .#{$css-prefix-input}-noclear {
        display: none;
      }
    }
  }
  .#{$css-prefix-input} {
    &-prepend{
      display: table-cell;
      border-radius: 4px;
      border-right:1px solid $Border;
      border-top-right-radius:0 !important;
      border-bottom-right-radius:0 !important;
      background-color: $Background;
      padding: 0 7px;
      vertical-align: middle;
      white-space: nowrap;
      :first-child{
        border: none !important;
        border-top-right-radius:0 !important;
        border-bottom-right-radius:0 !important;
        white-space: nowrap;
      }
    }
    &-append{
      display: table-cell;
      border-radius: 4px;
      border-left:1px solid $Border;
      border-top-left-radius:0 !important;
      border-bottom-left-radius:0 !important;
      background-color: $Background;
      padding: 0 7px;
      vertical-align: middle;
      white-space: nowrap;
      :first-child{
        border: none !important;
        border-top-left-radius:0 !important;
        border-bottom-left-radius:0 !important;
        white-space: nowrap;
      }
    }
  }

  @include inputSize(small, $input-small-size, 1px 7px, $input-small-font);
  @include inputSize(default, $input-default-size, 4px 7px, $input-default-font);
  @include inputSize(large, $input-large-size, 6px 7px, $input-large-font);

  .#{$css-prefix-input} {
    display: table-cell;
    width: 100%;
    line-height: 1.5;
    font-size: 12px;
    color: $Content;
    background: $white;
    cursor: text;
    outline: none;
    margin: 0;
    box-sizing: border-box;
    vertical-align: middle;
    @include borderTrans();
    @include inputMockClass($LightPrimary, 0 0 0 2px rgba(45, 140, 240, 0.2));
    @include placeholder($SubContent);
    //去掉IE的默认清空与小眼睛 icon

    //input label样式
    &-label {
      display: table-cell;
      word-break: keep-all;
      white-space: nowrap;
      vertical-align: middle;
      color: #495060;
      padding: 0 7px;
      text-align: center;
      box-sizing: border-box;

      &-box {
        display: table-cell;
        text-align: center;
        background-color: $Background;
        border-right: 1px solid $Border;
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
        white-space: nowrap;
        vertical-align: middle;
      }
    }

    //icon样式
    &-icon {
      position: absolute;
      top: 1px;
      z-index: 3;
      text-align: center;
      height: calc(100% - 2px);

      .icon {
        width: 25px;
      }

      &-prefix {
        left: 1px;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        margin-left: 5px;
      }

      &-suffix {
        right: 1px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        margin-right: 5px;
      }

      &-clear {
        display: none;
        z-index: 3;
        color: #666;
        opacity: .7;
        cursor: pointer;
      }
    }

    //Reset height for textarea
    &-textarea {
      max-width: 100%;
      height: auto;
      min-height: $input-default-size;
      vertical-align: bottom;
    }
    &-main {
      width: 100%;
      position: relative;
    }
  }

  input::-ms-clear,
  input::-ms-reveal,
  input::-o-clear {
    display: none;
  }

  // error input样式
  &.#{$css-prefix-input}-error {
    .#{$css-prefix-input} {
      @include inputMockClass($Error, 0 0 0 2px rgba(244, 67, 54, 0.2));
    }
  }
}

.#{$css-prefix-input}-fixed-disabled {
  background: $Disabled;
  border-color: $Border !important;
}

.#{$css-prefix-input}-group {
  width: auto;
  .#{$css-prefix-input}-main {
    display: table-cell;
  }
}

// input label组合 固定长度label input的宽度自适应
.#{$css-prefix-input}-group-fixed {
  width: 100%;
  display: inline-table;
  vertical-align: middle;
  overflow: hidden;
  @include borderTrans();
  @include labelMockClass($LightPrimary, 0 0 0 2px rgba(45, 140, 240, 0.2));

  .#{$css-prefix-input} {
    border: 0;
    width: 100%;
    &-main {
      display: table-cell;
    }

    &-icon {
      height: 100%;
      top: 0;
    }
  }

  &.#{$css-prefix-input}-error {
    @include labelMockClass($Error, 0 0 0 2px rgba(244, 67, 54, 0.2));
  }

  &.#{$css-prefix-input}-focused {
    overflow: auto;
  }

  &.#{$css-prefix-input}-box {
    @include inputSize(small, $input-small-size - 2, 1px 7px, $input-small-font);
    @include inputSize(default, $input-default-size - 2, 4px 7px, $input-default-font);
    @include inputSize(large, $input-large-size - 2, 7px 7px, $input-large-font);
  }
}

.#{$css-prefix-form-item}{
  &-error{
    .#{$css-prefix-input},.#{$css-prefix-input}-group-fixed {
      @include inputMockClass($Error, 0 0 0 2px rgba(244, 67, 54, 0.2));
      border-color: $Error;
    }
  }
}
</style>
