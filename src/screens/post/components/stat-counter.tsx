"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

type StatCounterProps = {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  group?: boolean;
};

export function StatCounter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  group = false,
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(v),
    });

    return () => controls.stop();
  }, [inView, to]);

  const formatted = group
    ? value.toLocaleString("ru-RU", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : value.toFixed(decimals);

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
