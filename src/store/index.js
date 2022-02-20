import { configureStore } from '@reduxjs/toolkit';
import BaseInfo from './BaseInfo';
import CompanyInfo from './CompanyInfo';

// configureStore创建一个redux数据
export default configureStore({
  reducer: {
    baseInfo: BaseInfo,
    companyInfo: CompanyInfo,
  },
});
