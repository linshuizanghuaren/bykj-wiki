---
title: 登陆页弹窗
---

# 弹窗逻辑

```js
改版前逻辑
    判断是否同意：isAgree =localStorage.getItem("AGREE_PRIVACY_STATEMENT") === "true"
    判断是否禁用隐私声明 disableAgreePrivacyStatement 默认为false，就是说同意，取决是否弹窗
    如果isAgree为true 就显示`我知道了`按钮，点击它，禁用同意隐私声明与禁用声明内容设置为false
    如果isAgree为false 就显示`我不同意` 与 `我同意`
        点击`我不同意`
            localStorage.getItem("AGREE_PRIVACY_STATEMENT")设置为false
            disableAgreePrivacyStatement设置为false
        点击`我同意`
            localStorage.getItem("AGREE_PRIVACY_STATEMENT")设置为true
            disableAgreePrivacyStatement设置为false
    弹出窗内容区域
        《服务协议》对应<ServiceAgreementCmp>
        《隐私政策》对应<PrivacyStatementCmp>
        点击《服务协议》与《隐私政策》会修改state的值
            disableStatementContent：true
            statementContent：<ServiceAgreementCmp>
    当disableStatementContent为true的时候，会触发声明内容弹窗
        逻辑1:
            点击关闭按钮
                disableAgreePrivacyStatement: isAgree ? false : true,
                disableStatementContent: false
            点击`我知道了`
                disableAgreePrivacyStatement: false
                disableStatementContent: false
修改后的逻辑
    1:根据设备系统决定是否弹窗，iOS不管，安卓弹（iosVersion字段能区别）
        iosVersion不是iOS设备打印false，是ios设别显示版本
    2:第一次弹显示中文
    3:按钮只能变成一个，就是只允许同意，否则不往下操作
要修改的地方
    1:弹出层前面新加个设备判断条件(isAndroid)
    2:是否是第一次(isAgree)
    3:按钮删除一个，同时修改对应的文案
```