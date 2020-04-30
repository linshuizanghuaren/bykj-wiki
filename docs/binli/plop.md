---
title: plop的接入
---
# plop

## 安装

```js
npm i plop -D
```

## 配置

### 配置启动命令

```js
npm run plop
```

### 配置启动文件

```js
// 在项目根目录新建plopfile.js文件
const viewGenerator = require('./plop-templates/view/prompt')

module.exports = function(plop) {
  plop.setGenerator('view', viewGenerator)
}
```

### 配置模版

```js
// index.hbs
{{#if template}}
<template>
  <div />
</template>
{{/if}}

{{#if script}}
<script>
export default {
  name: '{{ properCase name }}',
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
{{/if}}

{{#if style}}
<style lang="scss" scoped>
</style>
{{/if}}
```

```js
// prompt.js
function notEmpty(name) {
  return v => {
    if (!v || v.trim === '') {
      return `${name} is required`
    } else {
      return true
    }
  }
}

module.exports = {
  description: 'generate a view',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'view name please',
    validate: notEmpty('name')
  },
  {
    type: 'checkbox',
    name: 'blocks',
    message: 'Blocks:',
    choices: [{
      name: '<template>',
      value: 'template',
      checked: true
    },
    {
      name: '<script>',
      value: 'script',
      checked: true
    },
    {
      name: 'style',
      value: 'style',
      checked: true
    }
    ],
    validate(value) {
      if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
        return 'View require at least a <script> or <template> tag.'
      }
      return true
    }
  }
  ],
  actions: data => {
    const name = '{{name}}'
    const actions = [{
      type: 'add',
      path: `src/views/${name}/index.vue`,
      templateFile: 'plop-templates/view/index.hbs',
      data: {
        name: name,
        template: data.blocks.includes('template'),
        script: data.blocks.includes('script'),
        style: data.blocks.includes('style')
      }
    }]

    return actions
  }
}
```