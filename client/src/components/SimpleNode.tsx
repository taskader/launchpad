import { Node } from "./Node";
import { type LucideIcon } from "lucide-react";

interface SimpleNodeProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color?: string;
  scrollProgress?: number;
  chapterProgress?: number;
}

export function SimpleNode({ title, subtitle, icon: Icon, color = "text-white", scrollProgress, chapterProgress }: SimpleNodeProps) {
  return (
    <Node position="center" scrollProgress={scrollProgress} chapterProgress={chapterProgress}>
      <div className="flex flex-col items-center gap-6 group">
        <div className={`w-20 h-20 glass-panel rounded-full flex items-center justify-center border-white/10 group-hover:border-white/30 transition-colors duration-500`}>
          <Icon className={`w-8 h-8 ${color}`} strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-display text-white mb-1">{title}</h3>
          <p className="text-white/40 text-sm">{subtitle}</p>
        </div>
      </div>
    </Node>
  );
}
