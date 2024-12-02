import { useContext } from "react";
import { AuthContext } from "./authContext";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
};

export default useAuth;
