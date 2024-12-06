/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback } from "react";
import useAutoLogout from "../features/auth/hooks/useAutoLogout";
import useSessionStorage from "../hooks/useSessionStorage";
import { User } from "../types";

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

  const removeSessionStorageData = useCallback(() => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("tokenExpiry");
    setUser(null);
    setTokenExpiry(null);
  }, [setUser, setTokenExpiry]);

  useAutoLogout(tokenExpiry, removeSessionStorageData);

  // Use the custom hook for auto-logout
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
