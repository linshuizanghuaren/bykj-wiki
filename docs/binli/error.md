---
title: 报错记录
---

# 报错记录

## 页面找不到（巨坑）

```js
page[pages/XXX/XXX] not found.May be caused by :1. Forgot to add page route in app.json.2. Invoking Page() in async task.
// 开发者工具运行的效果与真机运行的效果还不一样，日
```

- 尝试1:升级微信开发者工具版本，不好使
- 尝试2:app.json中改变页面路由的位置，不好使
- 尝试3:Page({})函数，不好使
- 尝试4:删掉目标页面的所有代码，保留简单的样式代码，不好使
- 尝试5:删掉跳转前页面的所有代码，保留跳转代码，不好使
- 尝试6:删掉dist文件，重新编译，好使了

## 控制台总是报安装fs与net依赖的错

- 尝试方案1:按照控制台提示安装相关的依赖，不好使
- 尝试方案2:修改webpack的配置，新增node配置，不报错，但是编译出来的文件不能运行，不好使
- 尝试方案3:重新拉代码，第一次编译OK，新增文件后编译报依赖的错，不好使
- 尝试方案4:切换node的版本重新编译，不好使
- 尝试方案5:将node升级到最稳定版然后编译，不好使
- 尝试方案6:耐心的比对代码，好吧，代码运行的时候自己新增了express的导入，删掉就好使了，不删掉，即使不引用，依旧会造成报错