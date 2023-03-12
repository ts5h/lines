import React from "react";
import { AiFillGithub } from "react-icons/ai";
import Styles from "../../scss/Menu.module.scss";

export const Menu = () => {
  return (
    <div className={Styles.wrapper}>
      <nav className={Styles.nav}>
        <button type={"button"}>
          <i className={`${Styles.icon} ${Styles.sound}`}>Sound</i>
        </button>
        <button type={"button"}>
          <i className={`${Styles.icon} ${Styles.reload}`}>Reload</i>
        </button>
        <button type={"button"}>
          <i className={`${Styles.icon} ${Styles.github}`}>
            <AiFillGithub />
          </i>
        </button>
      </nav>
    </div>
  );
};
