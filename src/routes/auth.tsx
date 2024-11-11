import { AuthContextProvider } from "../context/authContext";

const AuthContext = ({ children }: { children: React.ReactNode }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};

export default AuthContext;
