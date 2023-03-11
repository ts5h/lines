import React, { useCallback, useEffect, useRef, useState } from "react";
import Styles from "../../scss/Canvas.module.scss";
import { useDrawLines } from "../../hooks/useDrawLines";

export const Canvas = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const { draw, reset } = useDrawLines({ windowWidth, windowHeight });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    context.canvas.width = windowWidth;
    context.canvas.height = windowHeight;

    reset(context);
    draw(context);
  }, [canvasRef, draw, reset, windowWidth, windowHeight]);

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
