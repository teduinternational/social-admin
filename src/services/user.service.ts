import { IPagination } from '../helpers/pagination';
import { IUser } from '../store/users/types';
import { api } from '../helpers';

const login = async (email: string, password: string) => {
  const body = { email, password };
  return await api.post('/v1/auth', body).then((response) => {
    return response.data;
  });
};

const getCurrentLoginUser = async (): Promise<any> => {
  return await api.get<any>('/v1/auth').then((response) => {
    return response.data;
  });
};

const getUsersPaging = async (
  keyword: string,
  currentPage: number,
  pageSize: number
): Promise<IPagination<IUser>> => {
  const res = await api
    .get<IPagination<IUser>>(`/v1/users/paging/${currentPage}`)
    .then((response) => {
      return response.data;
    });
  return res;
};

const logout = () => {
  sessionStorage.removeItem('user');
};

export const userService = {
  login,
  logout,
  getCurrentLoginUser,
  getUsersPaging,
};
