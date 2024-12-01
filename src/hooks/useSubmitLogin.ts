import { useAppDispatch } from "../store";
import { logInUser } from "../features/user/userThunks";

interface LoginForm {
  username: string;
  password: string;
  rememberMe: boolean;
}

export function useSubmitLogin(
  updateLocalStorage: (username: string, rememberMe: boolean) => void,
) {
  const dispatch = useAppDispatch();

  const onSubmit = async (data: LoginForm) => {
    updateLocalStorage(data.username, data.rememberMe);

    try {
      await dispatch(
        logInUser({ username: data.username, password: data.password }),
      );
    } catch (err) {
      console.error(err);
    }
  };

  return onSubmit;
}
