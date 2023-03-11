import { useCallback, useEffect, useRef, useState } from "react";
import { usePlaySound } from "../usePlaySound";

type Point = {
  left: number;
  top: number;
  angle: number;
  speed: number;
  collisionFlag: boolean;
  isBass: boolean;
  midiNumber: number;
};

export const useDrawLines = () => {
  const { playSound } = usePlaySound();

  const [context, setContext] = useState<CanvasRenderingContext2D>();
  const [points, setPoints] = useState<Point[]>();

  const requestRef = useRef<number | null>(null);

  const lineWidth = 0.4;
  const pointRadius = 1.2;

  const update = useCallback(() => {
    if (!points) return;

    const tmpPoints = points.map((point, index) => {
      const radian = point.angle * (Math.PI / 180);
      let newLeft = point.left + Math.cos(radian) * point.speed;
      let newTop = point.top + Math.sin(radian) * point.speed;

      let collisionFlag = false;
      let newAngle = point.angle;
      if (newLeft < 0 || newLeft > window.innerWidth) {
        newAngle = 180 - point.angle;
        collisionFlag = true;

        if (newLeft < 0) {
          newLeft = 0;
        } else if (newLeft > window.innerWidth) {
          newLeft = window.innerWidth;
        }
      }

      if (newTop < 0 || newTop > window.innerHeight) {
        newAngle = 360 - point.angle;
        collisionFlag = true;

        if (newTop < 0) {
          newTop = 0;
        } else if (newTop > window.innerHeight) {
          newTop = window.innerHeight;
        }
      }

      return {
        left: newLeft,
        top: newTop,
        angle: newAngle,
        speed: point.speed,
        collisionFlag,
        midiNumber: point.midiNumber,
        isBass: point.isBass,
      } as Point;
    });

    setPoints(tmpPoints);
  }, [points]);

  const drawLines = useCallback(() => {
    if (!context) return;

    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    if (points) {
      const maxLength = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);

      for (let i = 0; i < points.length; i++) {
        const fromPoint = points[i];

        if (fromPoint.collisionFlag) {
          playSound(fromPoint.midiNumber, fromPoint.speed, fromPoint.isBass);
        }

        context.fillStyle = "rgba(68, 68, 68, 0.75)";
        context.strokeStyle = "transparent";

        context.beginPath();
        context.arc(fromPoint.left, fromPoint.top, pointRadius, 0, (360 * Math.PI) / 180);
        context.fill();

        for (let j = i + 1; j < points.length; j++) {
          const toPoint = points[j];

          const xLength = toPoint.left - fromPoint.left;
          const yLength = toPoint.top - fromPoint.top;
          const length = Math.sqrt(xLength ** 2 + yLength ** 2);

          context.fillStyle = "transparent";
          context.strokeStyle = `rgba(68, 68, 68, ${(1 - length / maxLength ** 0.83) * 0.9})`;
          context.lineWidth = lineWidth;

          context.beginPath();
          context.moveTo(fromPoint.left, fromPoint.top);
          context.lineTo(toPoint.left, toPoint.top);
          context.stroke();
        }
      }
    }

    update();
    requestRef.current = requestAnimationFrame(drawLines);
  }, [context, playSound, points, update]);

  const reset = useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }

    const numberOfPoints = Math.floor(Math.random() * 80) + 40;
    const tmpPoints = [];

    for (let i = 0; i < numberOfPoints; i++) {
      const bass = Math.random();
      const point: Point = {
        left: Math.random() * (window.innerWidth - pointRadius * 2) + pointRadius,
        top: Math.random() * (window.innerHeight - pointRadius * 2) + pointRadius,
        angle: Math.random() * 360,
        speed: bass < 0.9 ? Math.random() * 1.9 + 0.1 : Math.random() * 9.9 + 0.1,
        collisionFlag: false,
        isBass: bass < 0.9,
        midiNumber: bass < 0.9 ? Math.floor(Math.random() * 32) + 12 : Math.floor(Math.random() * 32) + 24,
      };

      tmpPoints.push(point);
    }

    setPoints(tmpPoints);
  }, []);

  const initializeContext = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
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
  }, [drawLines]);

  return {
    drawLines,
    initializeContext,
    reset,
  };
};
