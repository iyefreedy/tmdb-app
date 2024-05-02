import PrimaryButton from "@/components/PrimaryButton";
import PrimaryInput from "@/components/PrimaryInput";
import PrimaryLabel from "@/components/PrimaryLabel";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import * as yup from "yup";

interface LoginCredential {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { user, attemptLogin, error, loading } = useAuth();

  const [isVisible, setVisibility] = useState(false);

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

  const togglePasswordVisibility = () => {
    setVisibility((prev) => !prev);
  };

  const onSubmit: SubmitHandler<LoginCredential> = async (data) => {
    attemptLogin(data);
  };

  if (user) return <Navigate to={"/"} replace />;

  return (
    <div className="flex h-[calc(100vh_-_5rem)] w-screen items-center justify-center">
      <div className="w-full max-w-md rounded-md bg-white p-5 shadow-md dark:bg-gray-900">
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="mb-4 rounded-lg bg-red-500 p-2 text-center text-slate-100">
              Invalid credential
            </div>
          )}

          <div className="mb-4">
            <PrimaryLabel htmlFor="username">Username</PrimaryLabel>
            <PrimaryInput
              id="username"
              autoComplete="username"
              className="block w-full disabled:opacity-80"
              {...register("username")}
            />

            <div className="my-2 text-sm text-red-500">
              {errors.username?.message}
            </div>
          </div>

          <div className="mb-6">
            <PrimaryLabel htmlFor="password">Password</PrimaryLabel>

            <div className="relative">
              <PrimaryInput
                id="password"
                type={isVisible ? "text" : "password"}
                autoComplete="current-password"
                className="block w-full disabled:opacity-80"
                {...register("password")}
              />

              <button
                type="button"
                className="absolute right-4 top-2 h-6 w-6 text-gray-800 dark:text-slate-100"
                onClick={togglePasswordVisibility}
              >
                {isVisible ? (
                  <EyeSlashIcon className="h-full w-full" />
                ) : (
                  <EyeIcon className="h-full w-full" />
                )}
              </button>
            </div>

            <div className="my-2 text-sm text-red-500">
              {errors.password?.message}
            </div>
          </div>

          <PrimaryButton type="submit" className="block w-full font-medium">
            {loading ? (
              <Spinner className="my-0 h-4 w-4 p-0 text-center" />
            ) : (
              "Loading"
            )}
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default Login;
