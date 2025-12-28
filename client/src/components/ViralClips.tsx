import { Node } from "./Node";
import { Play, Share2 } from "lucide-react";

export function ViralClips({ scrollProgress, chapterProgress }: { scrollProgress: number, chapterProgress: number }) {
  return (
    <Node position="center">
      <div className="flex flex-col items-center gap-8">
        <div className="flex gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-24 md:w-32 aspect-[9/16] glass-panel rounded-lg border-white/10 flex flex-col items-center justify-center relative group cursor-pointer overflow-hidden transition-all hover:border-cyan-500/50">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover:bg-cyan-500 group-hover:text-black transition-colors z-10">
                <Play size={12} fill="currentColor" />
              </div>
              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center z-10 opacity-60 text-xs text-white">
                <span>12.5k</span>
                <Share2 size={10} />
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <h3 className="text-xl font-display text-white mb-1">Viral Shorts Generation</h3>
          <p className="text-white/40 text-sm font-mono">Vertical Format • Auto-Captions</p>
        </div>
      </div>
    </Node>
  );
}
