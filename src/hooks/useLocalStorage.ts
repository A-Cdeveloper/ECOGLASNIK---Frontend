import { useEffect, useState } from "react";

const getInitialUser = <T>(key: string, initialValue: T): T => {
  const user = localStorage.getItem(key);
  if (user) {
    return JSON.parse(user) as T;
  } else {
    return initialValue;
  }
};

const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [data, setData] = useState<T>(() => getInitialUser(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data, key]);

  return [data, setData];
};

export default useLocalStorage;
