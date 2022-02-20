/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'BaseInfo', // 命名空间，在调用action的时候会默认的设置为action的前缀
  // 初始值
  initialState: {
    title: 'ceo',
    level: '',
  },
  // 这里的属性会自动的导出为actions，在组件中可以直接通过dispatch进行触发
  reducers: {
    setTitle(state, { payload }) {
      // console.log(action);
      state.count = payload.title; // 内置了immutable
    },
    setLevel(state, { payload }) {
      // console.log(action);
      state.level = payload.level; // 内置了immutable
    },
  },
});

// 导出actions
export const { setName, setAvatarUrl } = counterSlice.actions;

// 内置了thunk插件，可以直接处理异步请求
// export const asyncAction = (payload) => (dispatch) => {
//   setTimeout(() => {
//   }, 2000);
// };
export default counterSlice.reducer; // 导出reducer，在创建store时使用到
