import { IAddUserRequest, IUser } from '../store/users/types';
import { IPagination, api } from '../helpers';

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

const logout = () => {
  sessionStorage.removeItem('user');
};

const getUsersPaging = async (
  keyword: string,
  currentPage: number
): Promise<IPagination<IUser>> => {
  const res = await api
    .get<IPagination<IUser>>(
      `/v1/users/paging/${currentPage}?keyword=${keyword}`
    )
    .then((response) => {
      return response.data;
    });
  return res;
};

const addUser = async (user: IAddUserRequest): Promise<any> => {
  const res = await api.post(`/v1/users`, user).then((response) => {
    return response.data;
  });
  return res;
};

export const userService = {
  login,
  logout,
  getCurrentLoginUser,
  getUsersPaging,
  addUser,
};
