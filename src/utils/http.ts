import qs from "qs";

import * as auth from "autn-provider";
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object;
  token?: string;
}

export const http = async (
  endPoint: string,
  { data, token, headers, ...customerConfig }: Config = {}
) => {
  const config = {
    method: "get",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-type": data ? "application/json" : "",
    },
    ...customerConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endPoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window
    .fetch(`${apiUrl}/${endPoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }

      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        // axios和fetch的表现不一样，它可以在返回状态不为2xx的情况下抛出异常
        // 不用像fetch一样在这里手动抛出
        return Promise.reject(data);
      }
    });
};

// 函数里要使用其他的hook，它本身也必须是一个hook
export const useHttp = () => {
  const { user } = useAuth();
  return (...[endPoint, config]: Parameters<typeof http>) =>
    http(endPoint, { ...config, token: user?.token });
};
