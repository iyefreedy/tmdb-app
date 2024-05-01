import PrimaryButton from "@/components/PrimaryButton";
import PrimaryInput from "@/components/PrimaryInput";
import PrimaryLabel from "@/components/PrimaryLabel";
import { useAuth } from "@/hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import * as yup from "yup";

interface LoginCredential {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { user, attemptLogin } = useAuth();

  const schema: yup.ObjectSchema<LoginCredential> = yup.object({
    username: yup.string().trim().required("Username is required"),
    password: yup.string().trim().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredential>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginCredential> = (data) => {
    attemptLogin(data);
  };

  if (user) return <Navigate to={"/"} replace />;

  return (
    <div className="flex h-[calc(100vh_-_5rem)] w-screen items-center justify-center">
      <div className="w-full max-w-md rounded-md bg-white p-5 shadow-md dark:bg-gray-900">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <PrimaryLabel htmlFor="email">Username</PrimaryLabel>
            <PrimaryInput
              autoComplete="username"
              className="block w-full"
              {...register("username")}
            />

            <div className="my-2 text-sm text-red-500">
              {errors.username?.message}
            </div>
          </div>

          <div className="mb-6">
            <PrimaryLabel htmlFor="password">Password</PrimaryLabel>
            <PrimaryInput
              type="password"
              autoComplete="current-password"
              className="block w-full"
              {...register("password")}
            />

            <div className="my-2 text-sm text-red-500">
              {errors.password?.message}
            </div>
          </div>

          <PrimaryButton type="submit" className="block w-full font-medium">
            Login
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default Login;
