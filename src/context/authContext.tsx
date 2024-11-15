/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";
import useSessionStorage from "../hooks/useSessionStorage";
import { User } from "../types";

type SessionPropsType = {
  user: Omit<User, "password" | "createdAt"> | null;
};

type AuthContextType = {
  user: SessionPropsType["user"];
  isAuthenticated: boolean;
  setSessionStorageData: (data: Omit<User, "password" | "createdAt">) => void;
  removeSessionStorageData: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useSessionStorage<SessionPropsType>("userSession", {
    user: null,
  });

  const removeSessionStorageData = () => {
    sessionStorage.removeItem("userSession");
    setData({ user: null });
  };

  const setSessionStorageData = (
    userData: Omit<User, "password" | "createdAt">
  ) => {
    setData({ user: userData });
  };

  const value = {
    user: data.user,
    isAuthenticated: data.user !== null,
    setSessionStorageData,
    removeSessionStorageData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
