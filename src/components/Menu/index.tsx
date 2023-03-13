import React from "react";
import { useAtom } from "jotai";
import { Reload, SoundOn, SoundOff } from "../../icons";
import { MenuButtonGitHub } from "./Button/GitHub";
import { soundFlagAtom } from "../../store/Atoms";
import Styles from "../../scss/Menu.module.scss";

export const Menu = () => {
  const [isSound, setIsSound] = useAtom(soundFlagAtom);

  const handleSound = () => {
    setIsSound((prev) => !prev);
  };

  const handleReload = () => {
    window.location.reload();
  };

  const handleGitHub = () => {
    window.open("https://github.com/ts5h/lines");
  };

  return (
    <div className={Styles.wrapper}>
      <nav className={Styles.nav}>
        <button type={"button"} onClick={handleSound}>
          <span className={`${Styles.icon} ${Styles.sound}`} title={"Sound"}>
            {isSound ? <SoundOn /> : <SoundOff />}
          </span>
        </button>
        <button type={"button"} onClick={handleReload}>
          <span className={Styles.icon} title={"Reload"}>
            <Reload />
          </span>
        </button>
        <MenuButtonGitHub />
      </nav>
    </div>
  );
};
