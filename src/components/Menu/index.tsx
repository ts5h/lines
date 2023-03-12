import React from "react";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import { AiFillGithub, AiOutlineReload } from "react-icons/ai";
import Styles from "../../scss/Menu.module.scss";

export const Menu = () => {
  const handleSound = () => {
    // sound
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
          <GiSpeaker className={`${Styles.icon} ${Styles.sound}`} />
        </button>
        <button type={"button"} onClick={handleReload}>
          <AiOutlineReload className={`${Styles.icon} ${Styles.reload}`} />
        </button>
        <button type={"button"} onClick={handleGitHub}>
          <AiFillGithub className={`${Styles.icon} ${Styles.reload}`} />
        </button>
      </nav>
    </div>
  );
};
