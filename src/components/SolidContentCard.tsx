
import React from "react";

interface SolidContentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * A semi-transparent, blurred card for legible content over media backgrounds.
 */
const SolidContentCard = ({ children, className = "", ...props }: SolidContentCardProps) => (
  <div
    className={
      "backdrop-blur-md bg-black/70 border border-white/10 rounded-2xl shadow-lg px-6 py-8 md:px-14 md:py-12 " +
      "max-w-4xl mx-auto flex flex-col items-center gap-4 " +
      "transition-all duration-300 " +
      className
    }
    {...props}
  >
    {children}
  </div>
);

export default SolidContentCard;
