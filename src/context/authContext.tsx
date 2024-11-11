/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { User } from "../types";
import useLocalStorage from "../hooks/useLocalStorage";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useLocalStorage<User | null>("user", null);

  const value = {
    user,
    setUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useCurrentUserToken = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
};

export const useAccessToken = () => {
  const {
    user: { accessToken },
  } = useContext(AuthContext);
  return accessToken;
};
