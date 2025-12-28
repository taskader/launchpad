import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ConnectorPathProps {
  scrollProgress: number; // Global scroll progress passed from parent
  startProgress: number;
  endProgress: number;
  fromPosition?: "left" | "right" | "center";
  toPosition?: "left" | "right" | "center";
}

export function ConnectorPath({ 
  startProgress, 
  endProgress 
}: ConnectorPathProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="absolute left-1/2 -translate-x-1/2 w-px h-64 -mt-32 -mb-32 z-0 pointer-events-none flex justify-center">
      <div className="w-px h-full bg-white/5 relative overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
          style={{ 
            height: "50%",
            top: useTransform(scrollYProgress, [0, 1], ["-50%", "150%"]),
            opacity
          }}
        />
      </div>
    </div>
  );
}
