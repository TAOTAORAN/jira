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
// js typeof在runtime运行
// ts typeof静态环境运行
export const useHttp = () => {
  const { user } = useAuth();
  // Parameters是ts的utility type（工具类类型中的一个）
  // 常用工具类型有：Partial、Omit
  return (...[endPoint, config]: Parameters<typeof http>) =>
    http(endPoint, { ...config, token: user?.token });
};

// 联合类型
let myFavoriteNumber: string | number;
myFavoriteNumber = 8;
myFavoriteNumber = "eight";

// 类型别名
type FavoriteNumber = string | number;
let tomFavoriteNumber: FavoriteNumber;

// interface和类型别名 大多数情况下可以互换

// interface Person {
//     name?: string
// }

// type Person = { name?: string }

// 区别：interface无法处理联合类型/交叉类型 ；interface无法实现utility type，类型别名可以创造工具类型
// type FavoriteNumber = string | number;
// type FavoriteNumber = string & number;
