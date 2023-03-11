import { useCallback, useEffect, useRef, useState } from "react";

type Point = {
  left: number;
  top: number;
  angle: number;
  speed: number;
};

export const useDrawLines = () => {
  const [context, setContext] = useState<CanvasRenderingContext2D>();
  const [points, setPoints] = useState<Point[]>();

  const requestRef = useRef<number | null>(null);

  const color = "#444444";
  const lineWidth = 0.2;
  const pointRadius = 1.5;

  const update = useCallback(() => {
    if (!points) return;

    const tmpPoints = points.map((point, index) => {
      const radian = point.angle * (Math.PI / 180);
      const newLeft = point.left + Math.cos(radian) * point.speed;
      const newTop = point.top + Math.sin(radian) * point.speed;

      let newAngle = point.angle;
      if (newLeft - pointRadius <= 0 || window.innerWidth <= newLeft + pointRadius) {
        newAngle = 180 - point.angle;
      }

      if (newTop - pointRadius <= 0 || window.innerHeight <= newTop + pointRadius) {
        newAngle = 360 - point.angle;
      }

      return {
        left: newLeft,
        top: newTop,
        angle: newAngle,
        speed: point.speed,
      } as Point;
    });

    setPoints(tmpPoints);
  }, [points]);

  const drawLines = useCallback(() => {
    if (!context) return;

    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    if (points) {
      context.fillStyle = "transparent";
      context.strokeStyle = "rgba(68, 68, 68, 0.7)";
      context.lineWidth = lineWidth;

      for (let i = 0; i < points.length - 1; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const fromPoint = points[i];
          const toPoint = points[j];

          context?.beginPath();
          context.moveTo(fromPoint.left, fromPoint.top);
          context.lineTo(toPoint.left, toPoint.top);
          context.stroke();
        }
      }
    }

    update();

    requestRef.current = requestAnimationFrame(drawLines);
  }, [context, points, update]);

  const reset = useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }

    const numberOfPoints = Math.floor(Math.random() * 50) + 50;
    const tmpPoints = [];

    for (let i = 0; i < numberOfPoints; i++) {
      const point: Point = {
        left: Math.random() * (window.innerWidth - pointRadius * 2),
        top: Math.random() * (window.innerHeight - pointRadius * 2),
        angle: Math.random() * 360,
        speed: Math.random() < 90 ? Math.random() * 1.9 + 0.1 : Math.random() * 9.9 + 0.1,
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
