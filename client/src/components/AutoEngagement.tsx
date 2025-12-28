import { motion } from "framer-motion";
import { Node } from "./Node";
import { MessageCircle, Reply, ArrowRight, Bot, Target } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const sampleComments = [
  { user: "trader_joe", text: "Great analysis on $SPY today!", time: "2m" },
  { user: "market_maven", text: "What's your take on tech earnings?", time: "5m" },
  { user: "day_gains", text: "Love the morning recap!", time: "8m" },
];

const autoReplies = [
  "Check out our full breakdown on the tournament dashboard!",
  "Join the live discussion at dayrade.com",
  "See how this played out in today's tournament",
];

export function AutoEngagement({ scrollProgress, chapterProgress }: { scrollProgress: number; chapterProgress: number }) {
  const [isFocused, setIsFocused] = useState(false);
  const [activeReplyIndex, setActiveReplyIndex] = useState(0);
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

  useEffect(() => {
    if (!isFocused) return;
    const interval = setInterval(() => {
      setActiveReplyIndex((prev) => (prev + 1) % sampleComments.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isFocused]);

  return (
    <Node position="center" scrollProgress={scrollProgress} chapterProgress={chapterProgress}>
      <div ref={ref} className="flex flex-col items-center gap-6">
        <div className="text-center mb-2">
          <h3 className="text-2xl md:text-3xl font-display text-white mb-2">Automated Engagement</h3>
          <p className="text-white/40 text-sm font-mono">Smart Comments Drive Traffic to Tournament</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full max-w-3xl">
          {/* Comments Section */}
          <motion.div 
            className="flex-1 w-full"
            initial={{ opacity: 0, x: -30 }}
            animate={isFocused ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                <MessageCircle className="w-4 h-4 text-cyan-400" />
                <span className="text-white/60 text-sm font-mono">Incoming Comments</span>
              </div>
              
              <div className="space-y-3">
                {sampleComments.map((comment, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isFocused ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 5 }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <div className={`bg-white/5 rounded-lg p-3 border transition-all duration-300 ${
                      activeReplyIndex === index ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-white/5'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs text-white/60">
                          {comment.user[0].toUpperCase()}
                        </div>
                        <span className="text-white/70 text-sm">@{comment.user}</span>
                        <span className="text-white/30 text-xs ml-auto">{comment.time}</span>
                      </div>
                      <p className="text-white/50 text-sm pl-8">{comment.text}</p>
                    </div>
                    
                    {/* Auto-reply indicator */}
                    {activeReplyIndex === index && isFocused && (
                      <motion.div
                        className="mt-2 ml-6 flex items-start gap-2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Reply className="w-4 h-4 text-cyan-400 mt-0.5 rotate-180" />
                        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-2 flex-1">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Bot className="w-3 h-3 text-cyan-400" />
                            <span className="text-cyan-400 text-xs font-mono">Auto-Reply</span>
                          </div>
                          <p className="text-cyan-300/80 text-xs">{autoReplies[index]}</p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Arrow Connection */}
          <motion.div 
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isFocused ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.8 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              animate={isFocused ? { x: [0, 5, 0] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-8 h-8 text-cyan-400 rotate-90 md:rotate-0" />
            </motion.div>
            <span className="text-white/30 text-xs font-mono hidden md:block">drives traffic</span>
          </motion.div>

          {/* Tournament Dashboard Target */}
          <motion.div 
            className="flex-1 w-full max-w-xs"
            initial={{ opacity: 0, x: 30 }}
            animate={isFocused ? { opacity: 1, x: 0 } : { opacity: 0.3, x: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/30 rounded-2xl p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-white font-display">Tournament Dashboard</div>
                  <div className="text-cyan-400/60 text-xs font-mono">dayrade.com</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white/40 text-xs">Referral Clicks</span>
                  <motion.span 
                    className="text-cyan-400 text-sm font-mono"
                    animate={isFocused ? { opacity: [1, 0.5, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    +247 today
                  </motion.span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/40 text-xs">New Sign-ups</span>
                  <span className="text-green-400 text-sm font-mono">+34</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/40 text-xs">Engagement Rate</span>
                  <span className="text-white/60 text-sm font-mono">12.8%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div 
          className="flex gap-6 md:gap-10 mt-6 pt-6 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={isFocused ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center">
            <div className="text-2xl font-display text-cyan-400">24/7</div>
            <div className="text-white/40 text-xs font-mono">Monitoring</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-display text-cyan-400">Smart</div>
            <div className="text-white/40 text-xs font-mono">Context-Aware</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-display text-cyan-400">Auto</div>
            <div className="text-white/40 text-xs font-mono">Responses</div>
          </div>
        </motion.div>
      </div>
    </Node>
  );
}
