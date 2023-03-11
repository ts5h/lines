import React, { useEffect, useRef } from "react";
import Styles from "../../scss/Lines.module.scss";

export const Lines = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(50, 100, 20, 0, 2 * Math.PI);
    ctx.fill();
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      draw(context);
    }
  }, [canvasRef.current]);

  return <canvas ref={canvasRef} />;
};
