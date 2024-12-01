import { useForm } from "react-hook-form";

interface LoginForm {
  username: string;
  password: string;
  rememberMe: boolean;
}

export function useLoginForm() {
  const { register, formState, handleSubmit, setValue, watch } =
    useForm<LoginForm>({
      defaultValues: { rememberMe: false },
    });

  const rememberMe = watch("rememberMe");

  return {
    register,
    formState,
    handleSubmit,
    setValue,
    rememberMe,
    errors: formState.errors,
  };
}
