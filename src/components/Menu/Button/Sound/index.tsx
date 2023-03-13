import React, { useState } from "react";
import { useAtom } from "jotai/index";
import { isMobile } from "react-device-detect";
import { soundFlagAtom } from "../../../../store/Atoms";
import { SoundOff, SoundOn } from "../../../../icons";
import Styles from "../../../../scss/Menu.module.scss";

export const MenuButtonSound = () => {
  const [isSound, setIsSound] = useAtom(soundFlagAtom);
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
    setIsSound((prev) => !prev);
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
      title={"Sound"}
    >
      <span className={Styles.icon}>{isSound ? <SoundOn /> : <SoundOff />}</span>
    </button>
  );
};
