---
title: umi
---

# umi

- Umi，是可扩展的企业级前端应用框架。Umi 以路由为基础的，同时支持配置式路由和约定式路由，保证路由的功能完备，并以此进行功能扩展。然后配以生命周期完善的插件体系，覆盖从源码到构建产物的每个生命周期，支持各种功能扩展和业务需求。
- Umi 是蚂蚁金服的底层前端框架，已直接或间接地服务了 3000+ 应用，包括 java、node、H5 无线、离线（Hybrid）应用、纯前端 assets 应用、CMS 应用等
- 有血，有泪，有坑，有屎

## create-react-app

- create-react-app 是基于 webpack 的打包层方案，包含 build、dev、lint 等，他在打包层把体验做到了极致，但是不包含路由，不是框架，也不支持配置。所以，如果大家想基于他修改部分配置，或者希望在打包层之外也做技术收敛时，就会遇到困难。

## next.js

- next.js 是个很好的选择，Umi 很多功能是参考 next.js 做的。要说有哪些地方不如 Umi，我觉得可能是不够贴近业务，不够接地气。比如 antd、dva 的深度整合，比如国际化、权限、数据流、配置式路由、补丁方案、自动化 external 方面等等一线开发者才会遇到的问题。

## .umi 临时文件

- 临时文件是 Umi 框架中非常重要的一部分，框架或插件会根据你的代码生成临时文件，这些原来需要放在项目里的脏乱差的部分都被藏在了这里。因为他的临时性，每次启动 umi 时都会在 umi dev 和 umi build 时被删除并重新生成

## 详细介绍

- 参考：https://umijs.org/zh-CN/docs