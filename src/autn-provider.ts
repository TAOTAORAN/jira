// 定义函数操作JWT的token
// 在真实环境中，如果使用了第三方auth认证服务（如firebase）不需要开发者开发本文件
import { User } from "screens/project-list/search-panel";

const locakStorgeKey = "__auth_provider_token__";
const apiUrl = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(locakStorgeKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(locakStorgeKey, user.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      handleUserResponse(await res.json());
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      handleUserResponse(await res.json());
    }
  });
};

export const logout = () => window.localStorage.removeItem(locakStorgeKey);
