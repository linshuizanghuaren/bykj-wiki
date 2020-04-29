<template class="C-Button">
  <el-button :size="size"
             :type="type"
             :plain="plain"
             :round="round"
             :circle="circle"
             :loading="loading"
             :disabled="disabled"
             :icon="icon"
             :autofocus="autofocus"
             :native-type="nativeType">
    <slot></slot>
  </el-button>
</template>

<script>
import { oneOf } from '../utils/util.js'
export default {
  name: 'CButton',
  props: {
    size: {
      validator (value) {
        return oneOf(value, ['medium', 'small', 'mini'])
      },
      type: String,
      default: 'medium'
    },
    type: {
      validator (value) {
        return oneOf(value, ['primary', 'success', 'warning', 'danger', 'info', 'text'])
      },
      type: String,
      default: ''
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    nativeType: {
      type: String,
      default: 'button',
      validator (value) {
        return oneOf(value, ['button', 'submit', 'reset'])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.C-Button {
  display: inline;

  .el-button {
    display: inline;
  }
}
</style>