import React from "react";
import { useAtom } from "jotai";
import { AiFillGithub } from "react-icons/ai";
import { Reload, SoundOn, SoundOff } from "../../icons";
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
          <span className={`${Styles.icon} ${Styles.reload}`} title={"Reload"}>
            <Reload />
          </span>
        </button>
        <button type={"button"} onClick={handleGitHub}>
          <AiFillGithub className={`${Styles.icon} ${Styles.reload}`} title={"GitHub"} />
        </button>
      </nav>
    </div>
  );
};
