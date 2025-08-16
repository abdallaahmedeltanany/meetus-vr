import Styles from "./customInput.module.css";
import Image from "next/image";
import React from "react";

interface InputProps {
  icon: any;
  type: string;
  placeholder: string;
  value: string | undefined;
  onChange: (value: string) => void;
  isValid: boolean;
  onBlur: () => void;
}

const CustomInput: React.FC<InputProps> = ({
  icon,
  type,
  placeholder,
  value,
  onChange,
  isValid,
  onBlur,
}) => {
  return (
    <div
      className={!isValid ? Styles.inputContainerError : Styles.inputContainer}
    >
      <Image src={icon} alt="icon" className={Styles.icon} />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={Styles.input}
        onBlur={onBlur}
      />
    </div>
  );
};

export default CustomInput;
