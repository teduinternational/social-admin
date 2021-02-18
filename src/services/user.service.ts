import { api } from '../helpers';

const login = async (email: string, password: string): Promise<any> => {
  const body = { email, password };

  return await api.post<any>('/v1/auth', body).then((response) => {
    sessionStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  });
};

const getCurrentLoginUser = async (): Promise<any> => {
  return await api.get<any>('/v1/auth').then((response) => {
    return response.data;
  });
};

const logout = () => {
  sessionStorage.removeItem('user');
};

export const userService = {
  login,
  logout,
  getCurrentLoginUser,
};
