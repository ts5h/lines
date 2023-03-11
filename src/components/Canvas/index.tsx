import React, { useCallback, useEffect, useRef, useState } from "react";
import Styles from "../../scss/Canvas.module.scss";
import { useDrawLines } from "../../hooks/useDrawLines";

export const Canvas = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [isResizing, setIsResizing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerId = useRef<number | null>(null);

  const { drawLines, initializeContext, reset } = useDrawLines({ windowWidth, windowHeight });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    context.canvas.width = windowWidth;
    context.canvas.height = windowHeight;

    initializeContext(context);
    reset();
    if (!isResizing) {
      drawLines();
    }
  }, [canvasRef, drawLines, initializeContext, isResizing, reset, windowWidth, windowHeight]);

  const handleResize = useCallback(() => {
    if (timerId.current) {
      window.clearTimeout(timerId.current);
    }

    setIsResizing(true);
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);

    timerId.current = window.setTimeout(() => {
      setIsResizing(false);
    }, 500);
  }, []);

  // Initialize
  useEffect(() => {
    window.addEventListener("load", handleResize);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("load", handleResize);
      window.removeEventListener("resize", handleResize);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={Styles.canvas}>
      <canvas ref={canvasRef} />
    </div>
  );
};
