import { useEffect, useRef, useState } from 'react';
import { SourceCluster } from '@/components/SourceCluster';
import { AIEngine } from '@/components/AIEngine';
import { FilmStrip } from '@/components/FilmStrip';
import { ViralClips } from '@/components/ViralClips';
import { SimpleNode } from '@/components/SimpleNode';
import { PlatformCluster } from '@/components/PlatformCluster';
import { AutoEngagement } from '@/components/AutoEngagement';
import { GlobalAudience } from '@/components/GlobalAudience';
import { Dashboard } from '@/components/Dashboard';
import { TournamentJoin } from '@/components/TournamentJoin';
import { ConnectorPath } from '@/components/ConnectorPath';
import { Lock, Unlock, CheckCircle, Repeat } from 'lucide-react';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.max(0, Math.min(1, scrollTop / scrollHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Component definition map to make rendering cleaner
  const SECTIONS = [
    { component: SourceCluster, id: "source" },
    { component: AIEngine, id: "ai" },
    { component: FilmStrip, id: "film" },
    { component: ViralClips, id: "viral" },
    { component: PlatformCluster, id: "platform" },
    { component: AutoEngagement, id: "engagement" },
    { component: GlobalAudience, id: "global" },
    { component: Dashboard, id: "dashboard" },
    { component: (props: any) => <SimpleNode {...props} title="Verification Locked" subtitle="Tournament Entry Required" icon={Lock} color="text-red-400" />, id: "locked" },
    { component: (props: any) => <SimpleNode {...props} title="Access Granted" subtitle="Welcome to the Arena" icon={Unlock} color="text-green-400" />, id: "unlocked" },
    { component: (props: any) => <SimpleNode {...props} title="Verified Creator" subtitle="Identity Confirmed" icon={CheckCircle} color="text-cyan-400" />, id: "verified" },
    { component: TournamentJoin, id: "join" },
    { component: (props: any) => <SimpleNode {...props} title="Continuous Loop" subtitle="The cycle never ends" icon={Repeat} color="text-white/60" />, id: "loop" },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-body selection:bg-cyan-500/30">
      {/* Background grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="w-full h-full opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)' // Inverted mask logic via opacity
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div ref={containerRef} className="relative z-10">
        {/* Center spine indicator */}
        <div className="fixed left-1/2 top-0 bottom-0 w-px bg-white/5 pointer-events-none hidden md:block" />

        {/* Main flow container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-32">
          
          <div className="text-center mb-32 space-y-6 pt-20">
            <h1 className="text-4xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-tight">
              SCROLLYTELLING
              <span className="block text-xl md:text-2xl font-mono font-normal text-cyan-400 mt-4 tracking-widest uppercase">
                Interactive Narrative Engine
              </span>
            </h1>
            <p className="text-white/40 max-w-lg mx-auto">
              Scroll down to experience the content pipeline.
            </p>
          </div>

          {SECTIONS.map((section, index) => {
            const SectionComponent = section.component;
            const isLast = index === SECTIONS.length - 1;
            
            // Calculate approximate progress range for this section
            const startProgress = index / SECTIONS.length;
            const endProgress = (index + 1) / SECTIONS.length;

            return (
              <div key={section.id} className="relative">
                <div id={`chapter-${index + 1}`}>
                  <SectionComponent 
                    scrollProgress={scrollProgress} 
                    chapterProgress={startProgress} // Simplified for demo
                  />
                </div>
                
                {!isLast && (
                  <div className="h-32 md:h-64 relative"> {/* Spacer for connector */}
                     <ConnectorPath 
                      scrollProgress={scrollProgress} 
                      startProgress={startProgress} 
                      endProgress={endProgress}
                    />
                  </div>
                )}
              </div>
            );
          })}
          
          <div className="h-64 text-center text-white/20 text-sm flex items-end justify-center pb-8">
            © 2024 Scrollytelling Hero. All systems operational.
          </div>
        </div>
      </div>
    </div>
  );
}
