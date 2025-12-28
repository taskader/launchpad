import { motion } from "framer-motion";
import { Node } from "./Node";
import { Globe, MessageCircle, Languages, Radio } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const languages = [
  { code: "EN", name: "English", flag: "🇺🇸", sample: "Join the tournament!", region: "Americas" },
  { code: "ES", name: "Spanish", flag: "🇪🇸", sample: "¡Únete al torneo!", region: "Americas/Europe" },
  { code: "ZH", name: "Chinese", flag: "🇨🇳", sample: "加入比赛！", region: "Asia" },
  { code: "AR", name: "Arabic", flag: "🇸🇦", sample: "انضم إلى البطولة!", region: "Middle East" },
  { code: "PT", name: "Portuguese", flag: "🇧🇷", sample: "Junte-se ao torneio!", region: "Americas" },
  { code: "HI", name: "Hindi", flag: "🇮🇳", sample: "टूर्नामेंट में शामिल हों!", region: "Asia" },
];

const contentTypes = [
  { type: "Podcasts", icon: Radio },
  { type: "Comments", icon: MessageCircle },
  { type: "Translations", icon: Languages },
];

export function GlobalAudience({ scrollProgress, chapterProgress }: { scrollProgress: number; chapterProgress: number }) {
  const [isFocused, setIsFocused] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState(0);
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
      setActiveLanguage((prev) => (prev + 1) % languages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isFocused]);

  return (
    <Node position="center" scrollProgress={scrollProgress} chapterProgress={chapterProgress}>
      <div ref={ref} className="flex flex-col items-center gap-6">
        <div className="text-center mb-2">
          <h3 className="text-2xl md:text-3xl font-display text-white mb-2">Global Content Empire</h3>
          <p className="text-white/40 text-sm font-mono">Multilingual Content & Native Language Engagement</p>
        </div>

        {/* Globe visualization with orbiting languages */}
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          {/* Central globe */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isFocused ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-700/10 border border-cyan-500/30 flex items-center justify-center">
                <Globe className="w-12 h-12 md:w-16 md:h-16 text-cyan-400" />
              </div>
              {/* Rotating ring */}
              <motion.div
                className="absolute inset-[-8px] rounded-full border border-dashed border-cyan-500/20"
                animate={isFocused ? { rotate: 360 } : {}}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-[-20px] rounded-full border border-dashed border-cyan-500/10"
                animate={isFocused ? { rotate: -360 } : {}}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>

          {/* Orbiting language nodes */}
          {languages.map((lang, index) => {
            const angle = (index / languages.length) * 2 * Math.PI - Math.PI / 2;
            const radius = 100;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isActive = activeLanguage === index;

            return (
              <motion.div
                key={lang.code}
                className="absolute left-1/2 top-1/2"
                style={{ x: x - 24, y: y - 24 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isFocused ? { 
                  opacity: isActive ? 1 : 0.6, 
                  scale: isActive ? 1.1 : 1,
                } : { opacity: 0.2, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                    isActive 
                      ? 'bg-cyan-500/20 border-cyan-400/60 shadow-lg shadow-cyan-500/20' 
                      : 'bg-white/5 border-white/10'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-lg">{lang.flag}</span>
                </motion.div>
                
                {/* Language label */}
                {isActive && isFocused && (
                  <motion.div
                    className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-cyan-400 text-xs font-mono">{lang.code}</span>
                  </motion.div>
                )}
              </motion.div>
            );
          })}

          {/* Connection lines from center to active language */}
          {isFocused && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
              {languages.map((_, index) => {
                const angle = (index / languages.length) * 2 * Math.PI - Math.PI / 2;
                const radius = 100;
                const centerX = 160;
                const centerY = 160;
                const endX = centerX + Math.cos(angle) * radius;
                const endY = centerY + Math.sin(angle) * radius;
                const isActive = activeLanguage === index;

                return (
                  <motion.line
                    key={`line-${index}`}
                    x1={centerX}
                    y1={centerY}
                    x2={endX}
                    y2={endY}
                    stroke={isActive ? "#22d3ee" : "rgba(255,255,255,0.1)"}
                    strokeWidth={isActive ? 2 : 1}
                    strokeDasharray={isActive ? "none" : "4 4"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 0.8 : 0.3 }}
                    transition={{ duration: 0.3 }}
                  />
                );
              })}
            </svg>
          )}
        </div>

        {/* Active language showcase */}
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={isFocused ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{languages[activeLanguage].flag}</span>
              <div>
                <div className="text-white font-display">{languages[activeLanguage].name}</div>
                <div className="text-white/40 text-xs font-mono">{languages[activeLanguage].region}</div>
              </div>
              <div className="ml-auto flex gap-1">
                {contentTypes.map((ct, idx) => {
                  const Icon = ct.icon;
                  return (
                    <div key={idx} className="w-6 h-6 rounded bg-cyan-500/10 flex items-center justify-center">
                      <Icon className="w-3 h-3 text-cyan-400" />
                    </div>
                  );
                })}
              </div>
            </div>
            
            <motion.div
              key={activeLanguage}
              className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle className="w-3 h-3 text-cyan-400" />
                <span className="text-cyan-400/60 text-xs font-mono">Native Reply</span>
              </div>
              <p className="text-cyan-300 text-sm">{languages[activeLanguage].sample}</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div 
          className="flex gap-6 md:gap-10 mt-4 pt-6 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={isFocused ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center">
            <div className="text-2xl font-display text-cyan-400">{languages.length}+</div>
            <div className="text-white/40 text-xs font-mono">Languages</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-display text-cyan-400">Native</div>
            <div className="text-white/40 text-xs font-mono">Podcasts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-display text-cyan-400">Auto</div>
            <div className="text-white/40 text-xs font-mono">Translation</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-display text-cyan-400">Global</div>
            <div className="text-white/40 text-xs font-mono">Reach</div>
          </div>
        </motion.div>
      </div>
    </Node>
  );
}
