import { motion } from "framer-motion";
import { BarChart3, Users, MessageSquare } from "lucide-react";
import { Node } from "./Node";
import { useEffect, useRef, useState } from "react";

interface DashboardProps {
  scrollProgress: number;
  chapterProgress: number;
}

export function Dashboard({ scrollProgress, chapterProgress }: DashboardProps) {
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Node scrollProgress={scrollProgress} chapterProgress={chapterProgress} position="center">
      <div ref={ref} className="flex flex-col items-center gap-6">
        <div className="text-white/90 font-display text-2xl tracking-wide">Tournament dashboard</div>
        
        <motion.div
          className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm w-80 md:w-96 shadow-2xl shadow-cyan-900/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isFocused ? 1 : 0.6,
            y: 0,
            scale: isFocused ? 1.05 : 1,
            boxShadow: isFocused ? "0 0 40px rgba(6, 182, 212, 0.15)" : "0 0 0 rgba(0,0,0,0)"
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header bar */}
          <div className="bg-white/5 border-b border-white/10 px-6 py-4 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            </div>
            <div className="ml-4 text-white/40 text-sm font-mono">dashboard.sys</div>
          </div>

          {/* Dashboard sections */}
          <div className="p-6 space-y-4">
            {/* Leaderboard */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/20">
                <BarChart3 size={20} className="text-cyan-400" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-sm font-medium">Leaderboard</div>
                <div className="text-white/40 text-xs">Top performers</div>
              </div>
              <div className="text-cyan-400 text-xs font-mono">LIVE</div>
            </div>

            {/* Profiles */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center border border-purple-500/20">
                <Users size={20} className="text-purple-400" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-sm font-medium">Profiles</div>
                <div className="text-white/40 text-xs">Player stats</div>
              </div>
            </div>

            {/* Comments */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center border border-green-500/20">
                <MessageSquare size={20} className="text-green-400" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-sm font-medium">Comments</div>
                <div className="text-white/40 text-xs">Community chat</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Node>
  );
}
