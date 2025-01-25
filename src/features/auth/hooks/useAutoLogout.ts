import { useEffect } from "react";
import { autoLogout } from "../api/authentication";

const useAutoLogout = (
  tokenExpiry: Date | null,
  onLogout: () => void,
  uid: number
) => {
  useEffect(() => {
    const timer = autoLogout(tokenExpiry, onLogout, uid);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [tokenExpiry, onLogout, uid]);
};

export default useAutoLogout;
