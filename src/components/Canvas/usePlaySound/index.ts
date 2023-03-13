import { useCallback, useMemo } from "react";
import { useAtom } from "jotai";
import { soundFlagAtom } from "../../../store/Atoms";

window.AudioContext = window.AudioContext || window.webkitAudioContext;

export const usePlaySound = () => {
  const [isSound, setIsSound] = useAtom(soundFlagAtom);

  const getFrequency = useCallback((midiNumber: number) => {
    return 2 ** ((midiNumber - 69) / 12) * 440;
  }, []);

  const audioContext = useMemo(() => new AudioContext(), []);

  const playSound = useCallback(
    (midiNumber: number, speed: number, isBass: boolean) => {
      if (!isSound) return;

      const chord = isBass ? [midiNumber] : [midiNumber, midiNumber + 3, midiNumber + 7, midiNumber + 10];
      const duration = isBass ? (10 - speed) * 0.5 : (10 - speed) * 0.25;

      const compressor = new DynamicsCompressorNode(audioContext, {
        threshold: -8,
        knee: 36,
        ratio: 16,
        attack: 0.01,
        release: 1.0,
      });

      chord.forEach((tone) => {
        const oscillator = new OscillatorNode(audioContext);
        const gain = new GainNode(audioContext);

        oscillator.type = "sine";
        oscillator.frequency.value = getFrequency(tone);
        // NOTE: Cut super bass
        if (oscillator.frequency.value <= 55) return;

        gain.gain.value = oscillator.frequency.value < 120 ? 0.0001 : 0.01;

        oscillator.connect(gain).connect(compressor).connect(audioContext.destination);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);

        gain.gain.setValueAtTime(0.2, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + duration);
      });
    },
    [audioContext, getFrequency, isSound]
  );

  return {
    playSound,
  };
};
