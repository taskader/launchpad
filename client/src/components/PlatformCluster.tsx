import { motion } from "framer-motion";
import { Node } from "./Node";
import { 
  SiInstagram, 
  SiYoutube, 
  SiFacebook, 
  SiTiktok, 
  SiTwitch, 
  SiBluesky, 
  SiX 
} from "react-icons/si";
import { useEffect, useRef, useState } from "react";

interface Platform {
  name: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: string;
  bgColor: string;
  delay: number;
}

const platforms: Platform[] = [
  { name: "Instagram", icon: SiInstagram, color: "#E4405F", bgColor: "rgba(228, 64, 95, 0.15)", delay: 0 },
  { name: "YouTube Shorts", icon: SiYoutube, color: "#FF0000", bgColor: "rgba(255, 0, 0, 0.15)", delay: 0.1 },
  { name: "Facebook", icon: SiFacebook, color: "#1877F2", bgColor: "rgba(24, 119, 242, 0.15)", delay: 0.2 },
  { name: "TikTok", icon: SiTiktok, color: "#00F2EA", bgColor: "rgba(0, 242, 234, 0.15)", delay: 0.3 },
  { name: "Twitch", icon: SiTwitch, color: "#9146FF", bgColor: "rgba(145, 70, 255, 0.15)", delay: 0.4 },
  { name: "Bluesky", icon: SiBluesky, color: "#0085FF", bgColor: "rgba(0, 133, 255, 0.15)", delay: 0.5 },
  { name: "X", icon: SiX, color: "#FFFFFF", bgColor: "rgba(255, 255, 255, 0.1)", delay: 0.6 },
];

export function PlatformCluster({ scrollProgress, chapterProgress }: { scrollProgress: number; chapterProgress: number }) {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const nodeCenter = rect.top + rect.height / 2;
      const distanceFromCenter = Math.abs(nodeCenter - viewportCenter);
      const threshold = window.innerHeight * 0.4;
      setIsFocused(distanceFromCenter < threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Node position="center" scrollProgress={scrollProgress} chapterProgress={chapterProgress}>
      <div ref={ref} className="flex flex-col items-center gap-8">
        <div className="text-center mb-4">
          <h3 className="text-2xl md:text-3xl font-display text-white mb-2">Multi-Platform Distribution</h3>
          <p className="text-white/40 text-sm font-mono">Simultaneous Publishing Across All Networks</p>
        </div>

        <div className="relative w-full max-w-xl mx-auto">
          {/* Central Source Node */}
          <div className="flex justify-center mb-8">
            <motion.div
              className="relative z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isFocused ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center shadow-lg shadow-cyan-500/30 border-2 border-cyan-400/50">
                <span className="text-white font-bold text-xs text-center leading-tight">VIRAL<br/>SHORTS</span>
              </div>
              {/* Pulse rings */}
              {isFocused && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-cyan-400/40"
                    animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                    animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
                  />
                </>
              )}
            </motion.div>
          </div>

          {/* SVG Animated Lines */}
          <svg 
            className="absolute top-0 left-0 w-full h-full pointer-events-none" 
            style={{ overflow: 'visible' }}
            viewBox="0 0 400 350"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
              </linearGradient>
              {/* Animated dot for traveling along path */}
              <circle id="dot" r="3" fill="#22d3ee">
                <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
              </circle>
            </defs>
            
            {/* Lines from center (200, 50) to each platform position */}
            {platforms.map((platform, index) => {
              const totalPlatforms = platforms.length;
              const angle = ((index - (totalPlatforms - 1) / 2) / (totalPlatforms - 1)) * Math.PI * 0.8;
              const endX = 200 + Math.sin(angle) * 140;
              const endY = 50 + Math.cos(angle * 0.3) * 30 + 200;
              const controlY = 100 + index * 10;
              
              return (
                <g key={platform.name}>
                  {/* Static line */}
                  <motion.path
                    d={`M200,50 Q200,${controlY} ${endX},${endY}`}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isFocused ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.8, delay: platform.delay, ease: "easeOut" }}
                  />
                  {/* Animated traveling dot */}
                  {isFocused && (
                    <motion.circle
                      r="4"
                      fill="#22d3ee"
                      filter="drop-shadow(0 0 6px #22d3ee)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 1, 0] }}
                      transition={{ 
                        duration: 1.5, 
                        delay: platform.delay + 0.3,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    >
                      <animateMotion
                        dur="1.5s"
                        repeatCount="indefinite"
                        begin={`${platform.delay + 0.3}s`}
                        path={`M200,50 Q200,${controlY} ${endX},${endY}`}
                      />
                    </motion.circle>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Platform Icons Grid */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4 relative z-10">
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <motion.div
                  key={platform.name}
                  className="flex flex-col items-center gap-2 group"
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={isFocused ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.3, y: 20, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: platform.delay + 0.2 }}
                >
                  <motion.div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center border transition-all duration-300 cursor-pointer"
                    style={{ 
                      backgroundColor: platform.bgColor,
                      borderColor: `${platform.color}40`,
                    }}
                    whileHover={{ 
                      scale: 1.15, 
                      borderColor: platform.color,
                      boxShadow: `0 0 20px ${platform.color}40`
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon 
                      size={28} 
                      style={{ color: platform.color }} 
                      className="transition-transform group-hover:scale-110"
                    />
                  </motion.div>
                  <span className="text-white/60 text-xs font-mono text-center max-w-16 leading-tight group-hover:text-white/90 transition-colors">
                    {platform.name}
                  </span>
                  {/* Status indicator */}
                  <motion.div
                    className="flex items-center gap-1"
                    initial={{ opacity: 0 }}
                    animate={isFocused ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: platform.delay + 0.5 }}
                  >
                    <motion.div 
                      className="w-1.5 h-1.5 rounded-full bg-green-500"
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-green-500/70 text-xs">Live</span>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats row */}
        <motion.div 
          className="flex gap-6 md:gap-10 mt-6 pt-6 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={isFocused ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center">
            <div className="text-2xl font-display text-cyan-400">7</div>
            <div className="text-white/40 text-xs font-mono">Platforms</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-display text-cyan-400">1-Click</div>
            <div className="text-white/40 text-xs font-mono">Publish</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-display text-cyan-400">Auto</div>
            <div className="text-white/40 text-xs font-mono">Format</div>
          </div>
        </motion.div>
      </div>
    </Node>
  );
}
