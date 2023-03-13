import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import { Reload } from "../../../../icons";
import Styles from "../../../../scss/Menu.module.scss";

export const MenuButtonReload = () => {
  const [isHover, setIsHover] = useState(false);

  const handleHover = (state: boolean) => {
    if (isMobile) return;
    setIsHover(state);
  };

  const handleTouch = (state: boolean) => {
    if (!isMobile) return;
    setIsHover(state);
  };

  const handleClick = () => {
    window.location.reload();
  };

  return (
    <button
      type={"button"}
      onMouseOver={() => handleHover(true)}
      onMouseOut={() => handleHover(false)}
      onFocus={() => handleHover(true)}
      onBlur={() => handleHover(false)}
      onTouchStart={() => handleTouch(true)}
      onTouchEnd={() => handleTouch(false)}
      onClick={handleClick}
      className={isHover ? Styles.on : ""}
      title={"Reload"}
    >
      <span className={Styles.icon}>
        <Reload />
      </span>
    </button>
  );
};
