import { useEffect } from "react";
import { autoLogout } from "../api/authentication";

const useAutoLogout = (tokenExpiry: Date | null, onLogout: () => void) => {
  useEffect(() => {
    const timer = autoLogout(tokenExpiry, onLogout);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [tokenExpiry, onLogout]);
};

export default useAutoLogout;
