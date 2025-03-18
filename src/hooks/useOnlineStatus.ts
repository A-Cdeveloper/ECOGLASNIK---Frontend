import { useEffect, useSyncExternalStore } from "react";
import toast from "react-hot-toast";

export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);

  useEffect(() => {
    if (isOnline) {
      toast.dismiss();
    } else {
      toast.error(`You're offline.Please check yout Internet connection`, {
        duration: Infinity,
      });
    }
  }, [isOnline]);

  return;
}

function getSnapshot() {
  return navigator.onLine;
}

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}
