import { useNavigate } from 'react-router-dom';
import instance, { get, post } from '../utils/reques';

export const LOGIN = async (data) => {
  const res = await post('/api/login', data);
  if (res.code == 200) {
    localStorage.setItem('token', res.data.token);
    useNavigate();
  }
};
