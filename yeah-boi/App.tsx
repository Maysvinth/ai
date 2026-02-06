import React from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { Orb } from './components/Orb';
import { useGeminiLive } from './hooks/useGeminiLive';
import { ConnectionState } from './types';

const App: React.FC = () => {
  const { connect, disconnect, connectionState, isAiSpeaking, error } = useGeminiLive();
  
  const isConnected = connectionState === ConnectionState.CONNECTED;
  const isConnecting = connectionState === ConnectionState.CONNECTING;

  const handleToggle = () => {
    if (isConnected || isConnecting) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-200 p-6 relative">
      
      {/* Header / Status */}
      <div className="absolute top-8 text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          GEMINI LIVE
        </h1>
        <div className="flex items-center justify-center gap-2 text-sm font-medium">
          <span className={`w-2 h-2 rounded-full ${
            isConnected ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]' : 
            isConnecting ? 'bg-yellow-500 animate-ping' : 'bg-slate-600'
          }`} />
          <span className={`${isConnected ? 'text-green-400' : 'text-slate-500'}`}>
            {connectionState === ConnectionState.DISCONNECTED ? 'Ready to Connect' : connectionState}
          </span>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="absolute top-24 bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-2 rounded-lg flex items-center gap-2 text-sm max-w-md text-center">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Main Visualizer */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl">
         <Orb isActive={isConnected} isSpeaking={isAiSpeaking} />
         
         {/* Instruction Text */}
         <p className={`mt-12 text-lg transition-opacity duration-500 font-light ${isConnected ? 'opacity-100' : 'opacity-0'}`}>
            {isAiSpeaking ? 'Gemini is speaking...' : 'Listening...'}
         </p>
      </div>

      {/* Controls */}
      <div className="mb-12">
        <button
          onClick={handleToggle}
          disabled={isConnecting}
          className={`
            relative group flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300
            ${isConnected 
              ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30' 
              : 'bg-white text-slate-900 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)]'}
            ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {isConnected ? (
            <>
              <MicOff className="w-5 h-5" />
              <span>End Session</span>
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              <span>{isConnecting ? 'Connecting...' : 'Start Conversation'}</span>
            </>
          )}
        </button>
        
        {!isConnected && !isConnecting && (
          <p className="mt-4 text-xs text-center text-slate-600">
            Powered by Gemini 2.5 Flash Native Audio
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
