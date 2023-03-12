import React from "react";
import { ArrowBackToHome } from "../../../icons";
import Styles from "../../../scss/MenuHome.module.scss";

export const MenuHome = () => {
  const handleHome = () => {
    window.location.href = "/";
  };

  return (
    <div className={Styles.wrapper}>
      <button type={"button"} className={Styles.menu} onClick={handleHome}>
        <div className={Styles.icon}>
          <ArrowBackToHome />
        </div>
        <p>HOME</p>
      </button>
    </div>
  );
};
