"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function parseValue(v: string) {
  const suffix = v.replace(/[\d,.]/g, "");
  const num = parseFloat(v.replace(/[^0-9.]/g, ""));
  return { num, suffix };
}

export function CountUpNumber({ value }: { value: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);
  const prefix = value.startsWith("$") ? "$" : "";
  const clean = value.replace(/^\$/, "");
  const { num, suffix } = parseValue(clean);
  const isK = suffix.includes("K");
  const isM = suffix.includes("M");

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const ticks = Math.round(duration / 16);
    const rawStep = num / ticks;
    const timer = setInterval(() => {
      start += rawStep;
      if (start >= num) {
        setDisplay(num);
        clearInterval(timer);
      } else {
        setDisplay(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, num]);

  const decimals = num % 1 !== 0 ? String(num).split(".")[1]?.length || 0 : 0;

  const formatDisplay = (n: number) => {
    if (isK || isM) return Math.round(n);
    if (decimals > 0) return n.toFixed(decimals);
    return Math.round(n).toLocaleString();
  };

  return (
    <span ref={ref}>
      {display > 0 || inView
        ? `${prefix}${formatDisplay(display)}${suffix}`
        : `${prefix}0`}
    </span>
  );
}
