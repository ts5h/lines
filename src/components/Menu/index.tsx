import React from "react";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import { AiFillGithub, AiOutlineReload } from "react-icons/ai";
import { useAtom } from "jotai";
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
        <button type={"button"} className={Styles.sound} onClick={handleSound}>
          {isSound ? (
            <GiSpeaker className={`${Styles.icon} ${Styles.sound}`} title={"Sound On / Off"} />
          ) : (
            <GiSpeakerOff className={`${Styles.icon} ${Styles.sound}`} title={"Sound On / Off"} />
          )}
        </button>
        <button type={"button"} onClick={handleReload}>
          <AiOutlineReload className={`${Styles.icon} ${Styles.reload}`} title={"Reload"} />
        </button>
        <button type={"button"} onClick={handleGitHub}>
          <AiFillGithub className={`${Styles.icon} ${Styles.reload}`} title={"GitHub"} />
        </button>
      </nav>
    </div>
  );
};
