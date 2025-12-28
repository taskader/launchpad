import { Node } from "./Node";
import { Database, FolderGit2, HardDrive } from "lucide-react";
import { motion } from "framer-motion";

export function SourceCluster({ scrollProgress, chapterProgress }: { scrollProgress: number, chapterProgress: number }) {
  return (
    <Node position="center" className="mt-32">
      <div className="flex flex-col items-center gap-8">
        <motion.div 
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full" />
          <div className="grid grid-cols-2 gap-4 relative z-10">
            {[Database, FolderGit2, HardDrive, Database].map((Icon, i) => (
              <div key={i} className="w-20 h-20 glass-panel rounded-2xl flex items-center justify-center border-white/5">
                <Icon className="text-white/60 w-8 h-8" strokeWidth={1} />
              </div>
            ))}
          </div>
        </motion.div>
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-2">Ingest Sources</h2>
          <p className="text-white/40 font-mono">Raw Footage • Game Data • Audio Streams</p>
        </div>
      </div>
    </Node>
  );
}
