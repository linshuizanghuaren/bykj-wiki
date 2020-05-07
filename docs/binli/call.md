---
title: 常见调用方法
---

# 调用方法

## 页面跳转

```js
import cf, { navigateTo,reLaunch } from "../../base/common-func";

reLaunch(PAGE_LOGIN_CHOISE, {
    page: this.page,
    data: { isTempMess: true }
});

reLaunch(PAGE_LOGIN_CHOISE);

cf.toTabPage(page.PAGE_HOME);

navigateTo(PAGE_LOGIN);
cf.navigateTo(PAGE_SELECT_ACCOUNT, {
    accountId: this.account._id,
    clear: true,
    from: PAGE_OPPORTUNITY
});

cf.navigateBack({ id, from: PAGE_TASK_COMMENTS_EDIT });

cf.catchError(error);
```

## 页面通讯

```js
import cf from "../../base/common-func";
const param = cf.store.getLatestQuery();
const info = cf.store.getRootState().loginUserInfo;
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

## 刷新加载

```js
  onPullDownRefresh() {
    //下拉
    setTimeout(function() {
      wxUtil.stopPullDownRefresh();
    }, 1000);
  },
  onPageScroll(obj) {
    this.onScroll();
  }
```

## 数据存储

```js
cf.store.setQuery(param,param.page);

const { mapActions, mapState, mapMutations } = createNamespacedHelpers("task");
  methods: {
    ...mapActions([
      "changeTaskListview",
    ]),
    ...mapMutations([ACC_SELECT_ONE_ACCOUNT_LIST_ITEM, ACC_UNMOUNT_LIST]),
    changeSelectedTaskListview(newId, formId) {
      _uploadFormId(formId);
      const { selectedTaskListview } = cf.getStore().state.task;
      if (selectedTaskListview.id === newId) {
        navigateBack();
      } else {
        this.changeTaskListview(newId);
        navigateBack({ refresh: true });
      }
    },
    handleAccountItemSelect(id, isSelected) {
      this[ACC_SELECT_ONE_ACCOUNT_LIST_ITEM]({ id, isSelected });
    },
  },
  computed: {
    ...mapState(["taskListviewData", "selectedTaskListview"]),
    ...mapGetters([
      "convertedAccountData"
    ]),
    selectedListviewId() {
      return this.selectedTaskListview.id;
    }
  }
```

## 中英文

```js
// 调用
import { getLocale } from '../../locale';
getLocale().pages.me.dealer;

// locale文件
import { isGeneralManager } from "../base/common-func";
export const enLocale = en;
export const zhLocale = zh;
export function getLocale() {
  return isGeneralManager() ? enLocale : zhLocale;
}

// isGeneralManager
export function isGeneralManager() {
  const info = store.getRootState().loginUserInfo;
  if (info) {
    return info.profileId === profile.PROFILE_GENERAL_MANAGER || info.profileId === profile.PROFILE_REGION_MANAGER;
  } else {
    return false;
  }
}
```

## 其他
- 判断环境

```js
export function isTestEnv() {
  return process.env.NODE_ENV !== "production";
}
```

- 弹窗

```js
import { wxUtil } from "../../base/utils";
wxUtil.showTip("xxxx");
```

- 数据请求的处理

```js
// 调用
import { ignoreFnLoadingJudge, recoverFnLoadingJudge } from "@/base/common-func/store";
ignoreFnLoadingJudge(); // 取消闪烁
...
recoverFnLoadingJudge();
this.showView();

// methods
hideView() {
    this.isShowLoading = true;
    this.isDataReady = false;
},
showView() {
    this.isShowLoading = false;
    this.isDataReady = true;
}

// 控制加载组件
<LBottomEventLoading v-if="isShowLoading"></LBottomEventLoading>
<view v-if="isDataReady"></view>

// mounted
mounted() {
    wx.setNavigationBarTitle({ title: '跟进任务详情' });
    this.handleOnShow();
}
handleOnShow() {
    this.hideView();
    const query = getLatestQuery();
    if (query) {
        this.from = query.from;
        if (PAGES.includes(query.from)) {
            setQuery({ accountId: this.task.accountId, updated: true });
        }
        if (query.id) {
            this.getTaskData(query.id);
        } else {
            this.showView();
        }
    } else if (this.task._id) {
        this.from = "";
        this.getTaskData(this.task._id);
    } else {
        this.from = ""; //这里做一次清空，用于解决从客户详情页面返回客户详情两次之后，再回到客户详情却回到了任务列表
        this.showView();
    }
}
getTaskData() {
    ignoreFnLoadingJudge();
    ....
    recoverFnLoadingJudge();
    this.showView();
}
```