import { userStore } from '@/states/user.state';
import { setToken, removeToken } from './session';

export const setUser = (userData: any) => {
  setToken(userData?.token);
  userStore.set(userData);
};

export const logoutUser = () => {
  removeToken();
  userStore.set(null);
};
