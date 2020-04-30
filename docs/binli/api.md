---
title: 常见api
---

# api

## 获取store

```js
export function getStore() {
  return Vue.prototype.$store;
}
```
## getRootState

```js
export function getRootState() {
  return getStore().state.root;
}
```

## setRootState

```js
export function setRootState(key, value) {
  getStore().state.root[key] = value;
}
```
## setQuery

```js
export function setQuery(query = null, page = "", isBack = false) {
  _setPage(page, isBack);
  const rootState = getStore().state.root;
  const historyQuerys = rootState.$historyQuerys;
  rootState.$latestQuery = query;
  if (historyQuerys.length < 100) historyQuerys.push({ page, query });
  else {
    historyQuerys.splice(0, 1);
    historyQuerys.push({ page, query });
  }
}
```
## getLatestQuery

```js
export function getLatestQuery() {
  const root = getStore().state.root;
  const query = root.$latestQuery;
  root.$latestQuery = null; //使用一次就销毁
  root.$latestQuerySnapshot = query;
  if (query == null) return {};
  //防止外面报错undefined
  else return query;
}
```

## getLatestQuery

```js
export function getLatestQuery() {
  const root = getStore().state.root;
  const query = root.$latestQuery;
  root.$latestQuery = null; //使用一次就销毁
  root.$latestQuerySnapshot = query;
  if (query == null) return {};
  //防止外面报错undefined
  else return query;
}
```

## setTemporaryQuery

```js
export function setTemporaryQuery(key, query) {
  const {
    $key_temporaryQuery_,
    $historyTemporaryQuerys
  } = getStore().state.root;
  $key_temporaryQuery_[key] = query;
  if ($historyTemporaryQuerys.length < 100)
    $historyTemporaryQuerys.push({ key, query });
  else {
    $historyTemporaryQuerys.splice(0, 1);
    $historyTemporaryQuerys.push({ key, query });
  }
}
```

## getTenantId

```js
// 获得应用的tenantId
export function getTenantId() {
  return L2LApi.getApiConfig().tenantId;
}
```

## getAppId

```js
// 获取appId
export function getAppId() {
  return L2LApi.getApiConfig().appId;
}
```

## navigateTo
```js
export function navigateTo(pageName, query) {
  const pageUrl = `../${pageName}/main`;
  store.setQuery(query, pageName);
  wxUtil.navigateTo(pageUrl);
}
```

## navigateBack
```js
export function navigateBack(query, delta = 1) {
  store.setQuery(query, null, true);
  wxUtil.navigateBack({ delta });
}
```

## redirectTo
```js
export function redirectTo(pageName, query) {
  const pageUrl = `../${pageName}/main`;
  store.setQuery(query, pageName);
  wxUtil.redirectTo(pageUrl);
}
```

## reLaunch

```js
export function reLaunch(pageName, query) {
  // const pageUrl = `../${pageName}/main`;
  const pageUrl = `/pages/${pageName}/main`;
  console.log("%c reLaunch reLaunch reLaunch ---> " + pageUrl, "color:red;");
  store.setQuery(query, pageName);
  wxUtil.reLaunch(pageUrl);
}
```

## toTabPage
```js
export function toTabPage(page, query) {
  console.log(`%c >>> toTabPage`, "color:red");
  const pageUrl = `../${pageCst.PAGE_APP_TEMPLATE}/main`;
  store.setQuery({ page, data: query }, page);
  console.log(`%c >>> toTabPage`, "color:red");
  wxUtil.reLaunch(pageUrl);
}
```

## getEventBus
```js
export function getEventBus() {
  return eventBus;
}
```