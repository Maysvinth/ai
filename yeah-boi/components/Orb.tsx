import React from 'react';

interface OrbProps {
  isActive: boolean;
  isSpeaking: boolean;
}

export const Orb: React.FC<OrbProps> = ({ isActive, isSpeaking }) => {
  return (
    <div className="relative flex items-center justify-center w-64 h-64">
      {/* Outer Glow - Dynamic */}
      <div 
        className={`absolute inset-0 rounded-full transition-all duration-700 ease-in-out blur-3xl
        ${isActive ? 'opacity-60 bg-blue-600 scale-110' : 'opacity-10 bg-slate-700 scale-90'}
        ${isSpeaking ? 'animate-pulse bg-purple-600 opacity-80 scale-125' : ''}
        `}
      />

      {/* Main Circle */}
      <div 
        className={`relative z-10 w-40 h-40 rounded-full shadow-2xl transition-all duration-500 flex items-center justify-center border-4 border-opacity-20
        ${isActive 
          ? 'bg-gradient-to-br from-blue-500 to-indigo-600 border-white animate-pulse-slow shadow-blue-500/50' 
          : 'bg-slate-800 border-slate-600 shadow-none scale-95'}
        ${isSpeaking ? '!animate-glow !from-purple-500 !to-pink-600 !scale-110 !border-purple-200' : ''}
        `}
      >
        {/* Inner core */}
        <div className={`w-32 h-32 rounded-full transition-colors duration-500 
          ${isActive ? 'bg-black/20' : 'bg-black/40'}`} 
        />
      </div>

      {/* Orbit rings (purely aesthetic) */}
      <div className={`absolute inset-0 border border-white/10 rounded-full scale-150 transition-all duration-1000 ${isActive ? 'rotate-180 opacity-100' : 'opacity-0'}`} />
      <div className={`absolute inset-0 border border-white/5 rounded-full scale-[1.8] transition-all duration-1000 delay-100 ${isActive ? '-rotate-180 opacity-100' : 'opacity-0'}`} />
    </div>
  );
};
