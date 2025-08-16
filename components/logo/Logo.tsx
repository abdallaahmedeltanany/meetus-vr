import Image from "next/image";
import React from "react";
import Logo_Image from "../../public/images/logo.png";
import Logo_Text from "../../public/images/logoName.png";
import styles from "./logo.module.css";

const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <Image src={Logo_Image} className={styles.image} alt="logo" />
      <Image src={Logo_Text} className={styles.logoText} alt="text" />
    </div>
  );
};

export default Logo;
