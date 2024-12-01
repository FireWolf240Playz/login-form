import { UseFormSetValue, Path } from "react-hook-form";
import { useEffect } from "react";

export function useLocalStorageSync<T extends Record<string, any>>(
  setValue: UseFormSetValue<T>,
) {
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedUsername) {
      setValue("username" as Path<T>, savedUsername as T[Path<T>]);
    }
    if (savedRememberMe) {
      setValue("rememberMe" as Path<T>, savedRememberMe as T[Path<T>]);
    }
  }, [setValue]);

  const updateLocalStorage = (name: Path<T>, value: T[Path<T>]) => {
    if (name === "username" && typeof value === "string") {
      localStorage.setItem("username", value);
    }
    if (name === "rememberMe" && typeof value === "boolean") {
      localStorage.setItem("rememberMe", value ? "true" : "false");
    }
  };

  return updateLocalStorage;
}
