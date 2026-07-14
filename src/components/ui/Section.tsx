import * as React from "react";
import { cn } from "../../lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

export interface SectionProps extends HTMLMotionProps<"section"> {
  containerClassName?: string;
  bgClassName?: string;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, containerClassName, bgClassName, children, ...props }, ref) => {
    return (
      <motion.section
        ref={ref}
        className={cn("py-20 md:py-32 overflow-hidden", bgClassName, className)}
        {...props}
      >
        <div className={cn("container mx-auto px-4", containerClassName)}>
          {children as React.ReactNode}
        </div>
      </motion.section>
    );
  }
);
Section.displayName = "Section";
