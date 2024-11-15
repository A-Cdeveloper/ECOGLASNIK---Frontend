/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";
import useSessionStorage from "../hooks/useSessionStorage";
import { User } from "../types";

type SessionPropsType = {
  user: User | null;
};

type AuthContextType = {
  user: User | null;
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
  });

  const removeSessionStorageData = () => {
    sessionStorage.removeItem("userSession");
    setData({ user: null });
  };

  const value = {
    user: data.user,
    isAuthenticated: !!data?.user,
    //isAuthenticated: true,
    setSessionStorageData: setData,
    removeSessionStorageData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
