---
title: dva
---

# dva
- dva框架就是一个redux框架与redux-saga等框架的一个集大成者，把几个常用的数据处理框架进行了再次封装，在使用方式上给使用者带来了便利
- https://www.jianshu.com/p/21f8ed30e761

```js
/**
 * ActionTypes文件
 * 定义action的类型
 */
export const FETCH_HOME_NAME = 'FETCH_HOME_NAME'; // 获取home name
export const SET_HOME_NAME = 'SET_HOME_NAME'; // 设置home name
```

```js
/**
 * HomeService文件
 * 主要的业务逻辑
*/
export function fetchHomeName() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('处理业务逻辑')
    }, 1000);
  });
}
```

```js
/**
 * model文件
 */
import {
  FETCH_HOME_NAME,
  SET_HOME_NAME,
} from '../constants/ActionTypes';

import {
  fetchHomeName,
} from '../services/HomeService';

export default {
  namespace: 'home',
  state: {
    name: ''
  },
  effects: {
    /**
     * 处理异步的action
     * 主要使用redux-saga
     * 语法就是 es6 generator
     */
    *[FETCH_HOME_NAME]({ payload }, { call, put, select }) {
      /**
       * call 调用自己定义的业务方法
       * put 发起action
       * select 选择某个namespace的state
       * yield 实现同步调用
       */
      const name = yield call(fetchHomeName);
      yield put({
        type: SET_HOME_NAME,
        payload: { name },
      })
    }
  },
  reducers: {
    /**
     * 处理同步的action
     */
    [SET_HOME_NAME](state, { payload: { name } }) {
      return { ...state, name };
    }
  }
}
```

```js
// 页面dispatch触发相关的
import { FETCH_HOME_NAME } from '../../constants/ActionTypes';
componentWillMount() {
    const { dispatch } = this.props;
    /**
     * 在组件中dispatch action
     * 一定要写namespace
     */
    dispatch({
        type: `home/${FETCH_HOME_NAME}`,
        payload:{
            id: xxx
        }
    })
}
function mapStateToProps(state) {
  return {
    name: state.home.name, // state 映射到 props
  };
}
export default connect(mapStateToProps)(Home);
```
## server层

- 处理数据的，干发送数据请求之类的活

## model层

- namespace 命名空间，用于解决多个models之间的互相干扰的问题
- state
- subscription：监听派发，用于初始化数据源
- effects：异步派发，用于通过call接口把数据传回来然后转发
- reducer：处理返回，用于把传过来的各类数据各种处理，然后返回。它是state的最后一步

## call

- call(function, …arguments )
- 第一个参数接收一个函数，可以是普通函数，也可以是generator函数
- 第二个就是传的值了

## put

- put({type: xxx1, payload: {xxx2}})
- xxx1:触发的action的名字
- xxx2:server层拿到的数据

## select
- const id = yield select(state => state.id)

## 过程
- 页面触发handler，subscription监听到了页面变化
- 告诉effects去接口异步取数据，call()
- service层取数据回来，put()，派发给reducer返回数据,修改state
- 页面从state中取数据，select()