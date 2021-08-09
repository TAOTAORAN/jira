import React, { ReactNode, useState } from "react";

import * as auth from "autn-provider";
import { User } from "screens/project-list/search-panel";
interface AuthForm {
  username: string;
  password: string;
}

const AunthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

// 用于jira-dev-tool
AunthContext.displayName = "AunthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  return <AunthContext.Provider value={{ user, login, register, logout }} />;
};

export const useAuth = () => {
  const context = React.useContext(AunthContext);
  if (!context) {
    throw new Error("useAuth 必须在AuthProvider中使用");
  }
  return context;
};
