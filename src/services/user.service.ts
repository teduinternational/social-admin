import env from 'react-dotenv';

const login = (email: string, password: string) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${env.API_URL}/api/v1/auth`, requestOptions)
    .then(handleResponse)
    .then((response) => {
      sessionStorage.setItem('user', JSON.stringify(response));
      return response;
    });
};

const logout = () => {
  sessionStorage.removeItem('user');
};

const handleResponse = (response: any) => {
  return response.text().then((text: string) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
};

export const userService = {
  login,
  logout,
};
