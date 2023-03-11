export const usePlaySound = () => {
  const playSound = (midiNumber: number, speed: number) => {
    console.log(midiNumber);
  };

  return {
    playSound,
  };
};
