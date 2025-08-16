"use client";
import React, { useState } from "react";
import Styles from "./form.module.css";
import CustomInput from "../customInput/CustomInput";
import lockImage from "../../public/images/lock.png";
import SMS from "../../public/images/sms.png";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface LoginEvent extends React.FormEvent<HTMLFormElement> {}

const Form = () => {
  const Router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [valid, setValid] = useState<boolean>(true);

  const { login, error, isLoading } = useAuthStore();

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = async (e: LoginEvent) => {
    e.preventDefault();

    const success = await login(email, password);

    if (!success) {
      toast.error("Invalid credentials. Please try again.");
    } else {
      toast.success("Login successful!");
      Router.replace("/dashboard");
    }
  };
  const handleValidation = () => {
    if (!isValidEmail(email)) {
      setValid(false);
      return;
    }

    setValidationError(null);
    setValid(true);
  };

  return (
    <div className={Styles.formContainer}>
      <form className={Styles.form} onSubmit={handleLogin}>
        <p className={Styles.header}>Welcome back</p>
        <p className={Styles.formText}>
          Step into our shopping metaverse for an unforgettable shopping
          experience
        </p>

        <CustomInput
          icon={SMS}
          placeholder="Email"
          type="text"
          value={email}
          onChange={(val) => {
            setEmail(val);
            if (validationError) setValidationError(null);
          }}
          isValid={valid}
          onBlur={handleValidation}
        />

        <CustomInput
          type="password"
          icon={lockImage}
          placeholder="Password"
          value={password}
          onChange={(val) => {
            setPassword(val);
            if (validationError) setValidationError(null);
          }}
          isValid={valid}
          onBlur={handleValidation}
        />
        <button
          type="submit"
          className={Styles.btn}
          disabled={isLoading || !email || !password || !isValidEmail(email)}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <p className={Styles.formText}>Don't have an account? Sign up</p>
      </form>
    </div>
  );
};

export default Form;
