import React from 'react';
import { cn } from "@/lib/utils";

interface AnimatedLogoProps {
  className?: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center gap-2 group cursor-pointer", className)}>
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 border-2 border-primary/30 rounded-xl animate-[spin_10s_linear_infinite]" />
        
        {/* Pulsing inner glow */}
        <div className="absolute inset-2 bg-primary/20 blur-md rounded-full animate-pulse" />
        
        {/* Main Icon Structure */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-8 h-8 relative z-10 text-primary transition-transform duration-500 group-hover:scale-110"
          fill="none" 
          stroke="currentColor" 
          strokeWidth="8"
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Central Hexagon */}
          <path 
            d="M50 15 L85 35 L85 65 L50 85 L15 65 L15 35 Z" 
            className="animate-[dash_3s_ease-in-out_infinite]"
            strokeDasharray="300"
            strokeDashoffset="300"
            style={{ 
              animation: 'dash 3s ease-in-out infinite' 
            }}
          />
          
          {/* Inner Core */}
          <circle 
            cx="50" 
            cy="50" 
            r="12" 
            fill="currentColor" 
            className="animate-pulse"
          />
          
          {/* Orbital Dots */}
          <circle cx="50" cy="15" r="4" fill="currentColor">
            <animateTransform 
              attributeName="transform" 
              type="rotate" 
              from="0 50 50" 
              to="360 50 50" 
              dur="4s" 
              repeatCount="indefinite" 
            />
          </circle>
        </svg>

        <style>{`
          @keyframes dash {
            0% { stroke-dashoffset: 300; }
            50% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -300; }
          }
        `}</style>
      </div>

      <div className="flex flex-col leading-none">
        <span className="text-xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">
          ROHIT
          <span className="text-primary group-hover:animate-bounce inline-block">.</span>
        </span>
        <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-muted-foreground opacity-70 group-hover:opacity-100 transition-opacity">
          AI ENGINEER
        </span>
      </div>
    </div>
  );
};

export default AnimatedLogo;
