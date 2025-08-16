import React from "react";
import Styles from "./login.module.css";
import Form from "../form/Form";
import Logo from "../logo/Logo";
import Image from "next/image";

const Login = () => {
  return (
    <div className={Styles.loginPage}>
      <Form />
      <Logo />
    </div>
  );
};

export default Login;
