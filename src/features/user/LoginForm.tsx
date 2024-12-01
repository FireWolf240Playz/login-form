import Checkbox from "../../ui/Checkbox";
import Heading from "../../ui/Heading";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import FormRow, { Error } from "../../ui/FormRow";
import Form from "../../ui/Form";

import { useLocalStorageSync } from "../../hooks/useLocalStorageSync";
import { useLoginForm } from "../../hooks/useLoginForm";
import { SubmitHandler } from "react-hook-form";
import { logInUser } from "./userThunks";

import { useAppDispatch } from "../../store";
import { useState } from "react";

export interface LoginForm {
  username: string;
  password: string;
  rememberMe: boolean;
}

function LoginForm() {
  const { register, handleSubmit, setValue, rememberMe, errors } =
    useLoginForm();

  const appDispatch = useAppDispatch();

  const updateLocalStorage = useLocalStorageSync<LoginForm>(setValue);

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    updateLocalStorage("username", data.username);
    updateLocalStorage("rememberMe", data.rememberMe);

    try {
      await appDispatch(
        logInUser({ username: data.username, password: data.password }),
      );
    } catch (err) {
      console.error(err);
      setErrorMessage(
        (err as Error).message || "An unexpected error occurred.",
      );
    }
  };

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h1">Sign in to your account</Heading>

      <FormRow error={errors?.username?.message as string | undefined}>
        <Input
          id="username"
          placeholder="Username"
          {...register("username", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address",
            },
            onChange: (e) => {
              setValue("username", e.target.value);
              if (rememberMe) {
                localStorage.setItem("username", e.target.value);
              }
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.password?.message as string | undefined}>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Please enter at least 6 characters",
            },
          })}
        />
      </FormRow>

      <Checkbox label="Remember me" id="rememberMe" register={register} />
      {errorMessage && <Error>{errorMessage}</Error>}
      <Button>Log in now</Button>
    </Form>
  );
}

export default LoginForm;
