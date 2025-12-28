import { motion } from "framer-motion";
import { Node } from "./Node";
import { useEffect, useRef, useState } from "react";

interface FilmStripProps {
  scrollProgress: number;
  chapterProgress: number;
}

export function FilmStrip({ scrollProgress, chapterProgress }: FilmStripProps) {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const nodeCenter = rect.top + rect.height / 2;
      const distanceFromCenter = Math.abs(nodeCenter - viewportCenter);
      const threshold = window.innerHeight * 0.25;
      setIsFocused(distanceFromCenter < threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Node scrollProgress={scrollProgress} chapterProgress={chapterProgress} position="center">
      <div ref={ref} className="flex flex-col items-center gap-8">
        <div className="relative group">
          {/* Film strip container */}
          <div className="bg-black/50 border border-white/10 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden">
            <div className="flex items-center gap-4">
              {/* Perforations left */}
              <div className="flex flex-col gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={`perf-l-${i}`} className="w-3 h-4 rounded-[2px] bg-white/10" />
                ))}
              </div>

              {/* Film frames */}
              <div className="flex gap-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={`frame-${i}`}
                    className="w-32 h-44 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:border-white/20 transition-colors"
                  >
                     {/* Static Image Placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                    
                    {/* Scan line effect */}
                    {isFocused && (
                      <motion.div
                        className="absolute inset-x-0 h-1 bg-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.5)] z-10"
                        initial={{ top: "-10%" }}
                        animate={{ top: "110%" }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 0.5,
                          delay: i * 0.3,
                          ease: "linear",
                        }}
                      />
                    )}
                    
                    {/* Content Placeholder */}
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                       <span className="font-mono text-xs text-white/20">0{i+1}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Perforations right */}
              <div className="flex flex-col gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={`perf-r-${i}`} className="w-3 h-4 rounded-[2px] bg-white/10" />
                ))}
              </div>
            </div>
          </div>
          
          {/* Glow effect under container */}
          <div className="absolute -inset-4 bg-cyan-500/5 rounded-[2rem] blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>

        <div className="text-center space-y-1">
          <div className="text-white/90 font-display text-2xl tracking-wide">Full Episode Processing</div>
          <div className="text-white/40 font-mono text-sm">AI Analysis • 8–15 min runtime</div>
        </div>
      </div>
    </Node>
  );
}
