/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";
import useSessionStorage from "../hooks/useSessionStorage";
import { User } from "../types";

type SessionPropsType = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setSessionStorageData: (data: SessionPropsType) => SessionPropsType | void;
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
    accessToken: null,
    refreshToken: null,
  });

  const removeSessionStorageData = () => {
    sessionStorage.removeItem("userSession");
    setData({ user: null, accessToken: null, refreshToken: null });
  };

  const value = {
    user: data?.user,
    token: data?.accessToken,
    isAuthenticated: !!data?.accessToken,
    setSessionStorageData: setData,
    removeSessionStorageData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
