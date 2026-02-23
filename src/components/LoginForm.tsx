import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Input } from "./index";
import { login as authLogin } from "../store/authSlice";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { Spinner } from "./ui/spinner";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const email = useRef(null);
  const password = useRef(null);

  const login = async (data) => {
    try {
      setError("");
      setIsSigningIn(true);
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="w-full bg-card border-2 border-border max-w-md p-8 rounded-lg shadow-lg">
      <form
        onSubmit={handleSubmit(login)}
        className="flex flex-col items-center justify-center gap-y-3"
      >
        <h1 className="my-5 text-3xl">Login to your Account</h1>
        <Input
          type="email"
          placeholder="Enter Email"
          ref={email}
          {...register("email", {
            required: true,
          })}
        />
        <Input
          type="password"
          placeholder="Enter Password"
          ref={password}
          {...register("password", {
            required: true,
            min: 8,
          })}
        />
        <Button type="submit">
          {isSigningIn ?
            <div className="flex items-center justify-center gap-2">
              <Spinner />
              <span>Signing In...</span>
            </div>
          : "Sign In"}
        </Button>
      </form>
      {error && <div className="text-red-400 text-2xl mt-4 text-center">{error}</div>}
      <div className="mt-6 text-center">
        <span>Don&apos;t have an account? </span>
        <Link to={"/signup"} className="hover:underline duration-200 ml-1">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
