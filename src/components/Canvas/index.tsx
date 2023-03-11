import React, {useCallback, useEffect, useRef, useState} from "react";
import Styles from "../../scss/Canvas.module.scss";

export const Canvas = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const reset = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, windowWidth, windowHeight);
  }, [windowWidth, windowHeight]);

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(50, 100, 20, 0, 2 * Math.PI);
    ctx.fill();
  };

  // useEffect(() => {
  //   if (!canvasRef.current) return;
  //
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext("2d");
  //
  //   if (!context) return;
  //
  //   requestAnimationFrame(() => {
  //     draw(context);
  //     console.log("test");
  //   });
  // }, [canvasRef]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    context.canvas.width = windowWidth;
    context.canvas.height = windowHeight;
    reset(context);
  }, [canvasRef, reset, windowWidth, windowHeight]);

  // Initialize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={Styles.canvas}>
      <canvas ref={canvasRef} />
    </div>
  );
};
