import { useCallback } from "react";

type Props = {
  windowWidth: number;
  windowHeight: number;
};

export const useDrawLines = (props: Props) => {
  const { windowWidth, windowHeight } = props;

  const reset = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      if (!ctx) return;
      ctx.clearRect(0, 0, windowWidth, windowHeight);
    },
    [windowWidth, windowHeight]
  );

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    console.log(ctx);
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(50, 100, 20, 0, 2 * Math.PI);
    ctx.fill();
  }, []);

  return {
    draw,
    reset,
  };
};
