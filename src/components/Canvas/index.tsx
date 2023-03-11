import React, { useCallback, useEffect, useRef, useState } from "react";
import Styles from "../../scss/Canvas.module.scss";
import { useDrawLines } from "../../hooks/useDrawLines";

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerId = useRef<number | null>(null);

  const { drawLines, initializeContext, reset } = useDrawLines();

  const handleResize = useCallback(() => {
    if (timerId.current) {
      window.clearTimeout(timerId.current);
    }

    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    reset();

    timerId.current = window.setTimeout(() => {
      drawLines();
    }, 500);
  }, [drawLines, reset]);

  // Initialize
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      initializeContext(context);
    }
  }, [initializeContext]);

  useEffect(() => {
    window.addEventListener("load", handleResize);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("load", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <div className={Styles.canvas}>
      <canvas ref={canvasRef} />
    </div>
  );
};
