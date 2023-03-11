import {useCallback, useMemo} from "react";

window.AudioContext = window.AudioContext || window.webkitAudioContext;

export const usePlaySound = () => {
  const getFrequency = useCallback((midiNumber: number) => {
    return 2 ** ((midiNumber - 69) / 12) * 440;
  }, []);

  const ctx = useMemo(() => new AudioContext(), []);

  const playSound = useCallback((midiNumber: number, speed: number, isBass: boolean) => {
    const seventh = isBass ? [midiNumber] : [midiNumber, midiNumber + 3, midiNumber + 7, midiNumber + 10];
    const duration = isBass ? (10 - speed) * 0.5 : (10 - speed) * 0.25;

    seventh.forEach((tone) => {
      const osc = new OscillatorNode(ctx);
      const amp = new GainNode(ctx);

      osc.type = "sine";
      osc.frequency.value = getFrequency(tone);
      amp.gain.value = 0.001;

      osc.connect(amp).connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);

      amp.gain.setValueAtTime(0.2, ctx.currentTime);
      amp.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
    });
  }, [ctx, getFrequency]);

  return {
    playSound,
  };
};
