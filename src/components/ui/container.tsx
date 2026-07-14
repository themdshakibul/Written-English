import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}

export function Container({ children, className = "", as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={`w-full mx-auto px-4 sm:px-6 lg:px-8 container ${className}`}>
      {children}
    </Tag>
  );
}
