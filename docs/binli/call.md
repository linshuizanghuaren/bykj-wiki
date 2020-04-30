---
title: 常见调用方法
---

# 调用方法

## 页面跳转

```js
import { reLaunch } from "../../base/common-func";

reLaunch(PAGE_LOGIN_CHOISE, {
    page: this.page,
    data: { isTempMess: true }
});

reLaunch(PAGE_LOGIN_CHOISE);
```

## 页面通讯

```js
import cf from "../../base/common-func";
const param = cf.store.getLatestQuery();
```

## 数据请求

- 主要用来请求一些不需要auth-token的资源

```js
export function asyncRequest(url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url, //开发者服务器接口地址",
      data, //请求的参数",
      method: method || "GET",
      dataType: "json", //如果设为json，会尝试对返回的数据做一次 JSON.parse
      success: res => {
        if (res.statusCode === 200 && res.data) {
          resolve(res.data);
        } else {
          let err = new Error("failed request");
          err.code = 500;
          reject(err);
        }
      },
      fail: err => {
        reject(err);
      },
      complete: () => {}
    });
  });
}
```

## 数据存储

## 刷新加载

## 其他
- 判断环境

```js
export function isTestEnv() {
  return process.env.NODE_ENV !== "production";
}
```