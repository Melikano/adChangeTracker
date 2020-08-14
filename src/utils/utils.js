//@flow
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const compareString = (a: string, b: string) =>
  a > b ? 1 : a < b ? -1 : 0;

export const useQuery = () => new URLSearchParams(useLocation().search);

export const useLocalStorage = (key: string) => {
  //$FlowFixMe
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key) || "[]")
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};
