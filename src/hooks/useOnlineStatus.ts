import { use, useEffect, useSyncExternalStore } from "react";
import toast from "react-hot-toast";
import { TranslationContext } from "../context/translationContext";

export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  const { t } = use(TranslationContext);

  useEffect(() => {
    if (isOnline) {
      toast.dismiss();
    } else {
      toast.error(t("offline_mode"), {
        duration: Infinity,
      });
    }
  }, [isOnline, t]);

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
