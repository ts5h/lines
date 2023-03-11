import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  windowWidth: number;
  windowHeight: number;
};

export const useDrawLines = (props: Props) => {
  const { windowWidth, windowHeight } = props;

  const [context, setContext] = useState<CanvasRenderingContext2D>();
  const requestRef = useRef<number | null>(null);

  const reset = useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }

    if (!context) return;
    context.clearRect(0, 0, windowWidth, windowHeight);
  }, [context, windowWidth, windowHeight]);

  const drawLines = useCallback(() => {
    if (!context) return;

    context.fillStyle = "#ff0000";
    context.beginPath();
    context.arc(50, 100, 20, 0, 2 * Math.PI);
    context.fill();

    requestRef.current = requestAnimationFrame(drawLines);
  }, [context]);

  const initializeContext = useCallback((ctx: CanvasRenderingContext2D) => {
    setContext(ctx);
  }, []);

  // initialize
  useEffect(() => {
    requestRef.current = requestAnimationFrame(drawLines);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    drawLines,
    initializeContext,
    reset,
  };
};
