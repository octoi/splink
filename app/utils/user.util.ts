import { userStore } from '@/states/user.state';
import { setToken, removeToken, getToken } from './session';

export const setUser = (userData: any) => {
  setToken(userData?.token);
  userStore.set(userData);
};

export const logoutUser = () => {
  removeToken();
  userStore.set(null);
};

export const getRequestHeader = () => {
  return {
    Authorization: 'Bearer ' + getToken(),
  };
};
