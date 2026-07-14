"use client";

import { motion } from "framer-motion";
import { ReactNode, ElementType } from "react";

interface AnimateInViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}

export function AnimateInView({ children, className = "", delay = 0, as: Tag = "div" }: AnimateInViewProps) {
  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
