import { useEffect, useRef, useState } from "react";

export const useCountUp = (end: number, duration = 1200) => {
  const [value, setValue] = useState(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    let raf = 0;
    const step = (t: number) => {
      if (startTime.current === null) startTime.current = t;
      const p = Math.min(1, (t - startTime.current) / duration);
      setValue(Math.round(end * (1 - Math.cos(p * Math.PI)) / 2 * 100) / 100);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);

  return value;
};
