import { UseFormSetValue, Path, PathValue } from "react-hook-form";
import { useEffect } from "react";

export function useLocalStorageSync<T extends Record<string, any>>(
  setValue: UseFormSetValue<T>,
) {
  useEffect(() => {
    // Retrieve saved values from localStorage
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    // If "rememberMe" is true, fetch the saved username and prefill it
    if (savedRememberMe) {
      const savedUsername = localStorage.getItem("username");
      if (savedUsername) {
        // Correctly set the value of username with type PathValue
        setValue("username" as Path<T>, savedUsername as PathValue<T, Path<T>>);
      }
    }

    // Correctly set the value of rememberMe as boolean
    setValue("rememberMe" as Path<T>, savedRememberMe as PathValue<T, Path<T>>);
  }, [setValue]);

  const updateLocalStorage = (name: Path<T>, value: T[Path<T>]) => {
    if (name === "username" && typeof value === "string") {
      localStorage.setItem("username", value);
    }

    if (name === "rememberMe" && typeof value === "boolean") {
      // Update rememberMe in localStorage
      localStorage.setItem("rememberMe", value ? "true" : "false");

      // If rememberMe is being checked, save the username as well
      if (value) {
        const username = localStorage.getItem("username");
        if (username) {
          localStorage.setItem("username", username);
        }
      } else {
        // If rememberMe is unchecked, clear the username from localStorage
        localStorage.removeItem("username");
      }
    }
  };

  return updateLocalStorage;
}
