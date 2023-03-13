import { useCallback, useMemo } from "react";
import { useAtom } from "jotai";
import { soundFlagAtom } from "../../../store/Atoms";

window.AudioContext = window.AudioContext || window.webkitAudioContext;

export const usePlaySound = () => {
  const [isSound, setIsSound] = useAtom(soundFlagAtom);

  const getFrequency = useCallback((midiNumber: number) => {
    return 2 ** ((midiNumber - 69) / 12) * 440;
  }, []);

  const audioCtx = useMemo(() => new AudioContext(), []);

  const playSound = useCallback(
    (midiNumber: number, speed: number, isBass: boolean) => {
      if (!isSound) return;

      const seventh = isBass ? [midiNumber] : [midiNumber, midiNumber + 3, midiNumber + 7, midiNumber + 10];
      const duration = isBass ? (10 - speed) * 0.5 : (10 - speed) * 0.25;

      const comp = new DynamicsCompressorNode(audioCtx, {
        threshold: -8,
        knee: 36,
        ratio: 16,
        attack: 0.01,
        release: 1.0,
      });

      seventh.forEach((tone) => {
        const osc = new OscillatorNode(audioCtx);
        const amp = new GainNode(audioCtx);

        osc.type = "sine";
        osc.frequency.value = getFrequency(tone);
        // NOTE: Cut super bass
        if (osc.frequency.value <= 55) return;

        amp.gain.value = osc.frequency.value < 120 ? 0.0001 : 0.01;

        osc.connect(amp).connect(comp).connect(audioCtx.destination);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + duration);

        amp.gain.setValueAtTime(0.2, audioCtx.currentTime);
        amp.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
      });
    },
    [audioCtx, getFrequency, isSound]
  );

  return {
    playSound,
  };
};
