import { Node } from "./Node";
import { Cpu, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function AIEngine({ scrollProgress, chapterProgress }: { scrollProgress: number, chapterProgress: number }) {
  return (
    <Node position="center">
      <div className="flex flex-col items-center gap-8">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <div className="absolute inset-0 border border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-4 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          
          <motion.div 
            className="w-24 h-24 bg-cyan-950/30 rounded-full flex items-center justify-center border border-cyan-500/50 backdrop-blur-md relative overflow-hidden"
            whileHover={{ scale: 1.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent" />
            <Cpu className="text-cyan-400 w-10 h-10 relative z-10" />
          </motion.div>
          
          {/* Particles */}
          <Zap className="absolute top-0 text-yellow-400 w-4 h-4 animate-pulse" />
          <Zap className="absolute bottom-4 right-8 text-cyan-400 w-3 h-3 animate-pulse delay-100" />
        </div>
        
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-display font-semibold text-white mb-2">Neural Processing</h2>
          <p className="text-white/40 text-sm">Highlight detection • Sentiment analysis • Narrative construction</p>
        </div>
      </div>
    </Node>
  );
}
