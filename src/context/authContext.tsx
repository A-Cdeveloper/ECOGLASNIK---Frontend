/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";
import useSessionStorage from "../hooks/useSessionStorage";
import { User } from "../types";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  setSessionStorageData: (data: User | null) => User | void;
  removeSessionStorageData: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useSessionStorage<User | null>("user", null);

  console.log(data);

  const removeSessionStorageData = () => {
    sessionStorage.removeItem("user");
    setData(null);
  };

  const value = {
    user: data,
    isAuthenticated: !!data,
    setSessionStorageData: setData,
    removeSessionStorageData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
