import { useCallback, useMemo } from "react";

window.AudioContext = window.AudioContext || window.webkitAudioContext;

export const usePlaySound = () => {
  const getFrequency = useCallback((midiNumber: number) => {
    return 2 ** ((midiNumber - 69) / 12) * 440;
  }, []);

  const audioCtx = useMemo(() => new AudioContext(), []);

  const playSound = useCallback(
    (midiNumber: number, speed: number, isBass: boolean) => {
      const seventh = isBass ? [midiNumber] : [midiNumber, midiNumber + 3, midiNumber + 7, midiNumber + 10];
      const duration = isBass ? (10 - speed) * 0.5 : (10 - speed) * 0.25;

      seventh.forEach((tone) => {
        const osc = new OscillatorNode(audioCtx);
        const amp = new GainNode(audioCtx);
        const comp = new DynamicsCompressorNode(audioCtx, {
          threshold: -24,
          knee: 40,
          ratio: 12,
          attack: 0.05,
          release: 1.0,
        });

        osc.type = "sine";
        osc.frequency.value = getFrequency(tone);
        amp.gain.value = 0.01;

        osc.connect(amp).connect(comp).connect(audioCtx.destination);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + duration);

        amp.gain.setValueAtTime(0.2, audioCtx.currentTime);
        amp.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
      });
    },
    [audioCtx, getFrequency]
  );

  return {
    playSound,
  };
};
