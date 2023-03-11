import React, { useEffect, useRef } from "react";
import Styles from "../../scss/Canvas.module.scss";

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(50, 100, 20, 0, 2 * Math.PI);
    ctx.fill();
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    requestAnimationFrame(() => {
      draw(context);
    });
  }, [canvasRef]);

  // Initialize
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    const handleResize = () => {
      context.canvas.width = window.innerWidth;
      context.canvas.height = window.innerHeight;
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
