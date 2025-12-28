import { motion } from "framer-motion";
import { Node } from "./Node";
import { 
  SiInstagram, 
  SiYoutube, 
  SiFacebook, 
  SiTiktok, 
  SiTwitch, 
  SiBluesky, 
  SiX,
  SiReddit,
  SiDiscord,
  SiLinkedin,
  SiThreads
} from "react-icons/si";
import { useEffect, useRef, useState } from "react";

interface Platform {
  name: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  delay: number;
}

const platforms: Platform[] = [
  { name: "Instagram", icon: SiInstagram, delay: 0 },
  { name: "YouTube", icon: SiYoutube, delay: 0.05 },
  { name: "Facebook", icon: SiFacebook, delay: 0.1 },
  { name: "TikTok", icon: SiTiktok, delay: 0.15 },
  { name: "Twitch", icon: SiTwitch, delay: 0.2 },
  { name: "X", icon: SiX, delay: 0.25 },
  { name: "Reddit", icon: SiReddit, delay: 0.3 },
  { name: "Discord", icon: SiDiscord, delay: 0.35 },
  { name: "LinkedIn", icon: SiLinkedin, delay: 0.4 },
  { name: "Bluesky", icon: SiBluesky, delay: 0.45 },
  { name: "Threads", icon: SiThreads, delay: 0.5 },
];

export function PlatformCluster({ scrollProgress, chapterProgress }: { scrollProgress: number; chapterProgress: number }) {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [iconPositions, setIconPositions] = useState<{x: number, y: number}[]>([]);
  const [sourcePos, setSourcePos] = useState<{x: number, y: number}>({x: 0, y: 0});

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

  // Calculate positions for animated lines
  useEffect(() => {
    const updatePositions = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      
      const sourceEl = container.querySelector('[data-source]');
      const iconEls = container.querySelectorAll('[data-platform]');
      
      if (sourceEl) {
        const sourceRect = sourceEl.getBoundingClientRect();
        setSourcePos({
          x: sourceRect.left + sourceRect.width / 2 - containerRect.left,
          y: sourceRect.top + sourceRect.height / 2 - containerRect.top
        });
      }
      
      const positions: {x: number, y: number}[] = [];
      iconEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        positions.push({
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top
        });
      });
      setIconPositions(positions);
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);
    
    // Delayed update to ensure DOM is ready
    const timer = setTimeout(updatePositions, 100);
    
    return () => {
      window.removeEventListener('resize', updatePositions);
      clearTimeout(timer);
    };
  }, [isFocused]);

  return (
    <Node position="center" scrollProgress={scrollProgress} chapterProgress={chapterProgress}>
      <div ref={ref} className="flex flex-col items-center gap-6">
        <div className="text-center mb-2">
          <h3 className="text-2xl md:text-3xl font-display text-white mb-2">Multi-Platform Distribution</h3>
          <p className="text-white/40 text-sm font-mono">Auto-Publishing Across All Networks</p>
        </div>

        <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
          {/* Central Source Node */}
          <div className="flex justify-center mb-12">
            <motion.div
              data-source
              className="relative z-20"
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

          {/* SVG Animated Lines - Positioned absolutely to connect source to icons */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-10" 
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="cyanLineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            
            {iconPositions.map((pos, index) => {
              const platform = platforms[index];
              if (!platform) return null;
              
              // Calculate control point for curved line
              const midY = (sourcePos.y + pos.y) / 2;
              
              return (
                <g key={`line-${index}`}>
                  {/* Animated line */}
                  <motion.path
                    d={`M${sourcePos.x},${sourcePos.y} Q${sourcePos.x},${midY} ${pos.x},${pos.y}`}
                    fill="none"
                    stroke="url(#cyanLineGradient)"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isFocused ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.6, delay: platform.delay, ease: "easeOut" }}
                  />
                  {/* Traveling dot */}
                  {isFocused && (
                    <motion.circle
                      r="3"
                      fill="#22d3ee"
                      filter="drop-shadow(0 0 4px #22d3ee)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 1, 0] }}
                      transition={{ 
                        duration: 1.2, 
                        delay: platform.delay + 0.2,
                        repeat: Infinity,
                        repeatDelay: 0.8
                      }}
                    >
                      <animateMotion
                        dur="1.2s"
                        repeatCount="indefinite"
                        begin={`${platform.delay + 0.2}s`}
                        path={`M${sourcePos.x},${sourcePos.y} Q${sourcePos.x},${midY} ${pos.x},${pos.y}`}
                      />
                    </motion.circle>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Platform Icons Grid - Clean aligned grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 md:gap-5 relative z-20">
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <motion.div
                  key={platform.name}
                  data-platform={platform.name}
                  className="flex flex-col items-center gap-2 group"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={isFocused ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.3, y: 10, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: platform.delay + 0.1 }}
                >
                  <motion.div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center border border-cyan-500/30 bg-cyan-500/10 transition-all duration-300 cursor-pointer"
                    whileHover={{ 
                      scale: 1.1, 
                      borderColor: 'rgba(34, 211, 238, 0.6)',
                      boxShadow: '0 0 16px rgba(34, 211, 238, 0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon 
                      size={24} 
                      className="text-cyan-400 transition-transform group-hover:scale-110"
                    />
                  </motion.div>
                  <span className="text-white/50 text-xs font-mono text-center leading-tight group-hover:text-cyan-400 transition-colors">
                    {platform.name}
                  </span>
                  {/* Status indicator */}
                  <motion.div
                    className="flex items-center gap-1"
                    initial={{ opacity: 0 }}
                    animate={isFocused ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: platform.delay + 0.4 }}
                  >
                    <motion.div 
                      className="w-1.5 h-1.5 rounded-full bg-green-500"
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.1 }}
                    />
                    <span className="text-green-500/70 text-[10px]">Live</span>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats row */}
        <motion.div 
          className="flex gap-6 md:gap-10 mt-8 pt-6 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={isFocused ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-center">
            <div className="text-2xl font-display text-cyan-400">{platforms.length}</div>
            <div className="text-white/40 text-xs font-mono">Platforms</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-display text-cyan-400">Auto</div>
            <div className="text-white/40 text-xs font-mono">Publish</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-display text-cyan-400">24/7</div>
            <div className="text-white/40 text-xs font-mono">Scheduling</div>
          </div>
        </motion.div>
      </div>
    </Node>
  );
}
