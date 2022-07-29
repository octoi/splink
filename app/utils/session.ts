import cookie from 'js-cookie';
import { getUserFromToken } from './jwt';

export const setToken = (token: string) => {
  cookie.set('token', token);
};

export const getToken = (): string => {
  const token = cookie.get('token') || '';
  return token;
};

export const removeToken = () => {
  cookie.remove('token');
};

export const getUserFromCookie = () => {
  const token = cookie.get('token');

  if (!token) return false;

  return getUserFromToken(token);
};
