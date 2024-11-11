import { useEffect, useState } from "react";

const useSessionStorage = <T,>(key: string, initialValue: T) => {
  const storedValue = sessionStorage.getItem(key);

  const [data, setData] = useState<T>(() => {
    if (storedValue !== null) return JSON.parse(storedValue);
    if (initialValue) return initialValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  return [data, setData] as [typeof data, typeof setData];
};

export default useSessionStorage;
