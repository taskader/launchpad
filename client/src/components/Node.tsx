import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface NodeProps {
  children: ReactNode;
  position?: "left" | "right" | "center";
  className?: string;
  scrollProgress?: number; // Passed but often handled by specific children logic
  chapterProgress?: number;
}

export function Node({ children, position = "center", className }: NodeProps) {
  return (
    <div className={cn("relative w-full flex mb-32", className, {
      "justify-center": position === "center",
      "justify-start pl-8 md:pl-32": position === "left",
      "justify-end pr-8 md:pr-32": position === "right",
    })}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
