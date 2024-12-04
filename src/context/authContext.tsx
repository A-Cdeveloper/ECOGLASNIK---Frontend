/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";
import useSessionStorage from "../hooks/useSessionStorage";
import { User } from "../types";
import { differenceInSecs } from "../utils/helpers";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (data: User | null) => User | void;
  setTokenExpiry: (data: Date | null) => Date | void;
  removeSessionStorageData: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useSessionStorage<User | null>("user", null);
  const [tokenExpiry, setTokenExpiry] = useSessionStorage<Date | null>(
    "tokenExpiry",
    null
  );

  // const expirationDate = new Date(tokenExpiry as Date);
  // console.log(new Date());
  // console.log(expirationDate);
  // console.log(differenceInSecs(expirationDate, new Date()));

  const removeSessionStorageData = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("tokenExpiry");
    setUser(null);
    setTokenExpiry(null);
  };

  // if (differenceInSecs(expirationDate, new Date()) < 0) {
  //   removeSessionStorageData();
  // }

  const value = {
    user,
    tokenExpiry,
    isAuthenticated: !!user,
    setUser,
    removeSessionStorageData,
    setTokenExpiry,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
