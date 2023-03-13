import React from "react";
import { useAtom } from "jotai";
import { SoundOn, SoundOff } from "../../icons";
import {MenuButtonReload} from "./Button/Reload";
import { MenuButtonGitHub } from "./Button/GitHub";
import { soundFlagAtom } from "../../store/Atoms";
import Styles from "../../scss/Menu.module.scss";

export const Menu = () => {
  const [isSound, setIsSound] = useAtom(soundFlagAtom);

  const handleSound = () => {
    setIsSound((prev) => !prev);
  };

  return (
    <div className={Styles.wrapper}>
      <nav className={Styles.nav}>
        <button type={"button"} onClick={handleSound}>
          <span className={`${Styles.icon} ${Styles.sound}`} title={"Sound"}>
            {isSound ? <SoundOn /> : <SoundOff />}
          </span>
        </button>
        <MenuButtonReload />
        <MenuButtonGitHub />
      </nav>
    </div>
  );
};
