import React from "react";
import styles from "../../styles/Button.module.css";

const Button = ({ children, onClick, disabled }) => {
  return (
    <div className={styles.btn}>
      <button disabled={disabled} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
