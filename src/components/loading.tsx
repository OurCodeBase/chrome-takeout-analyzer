import { Clock3, Loader } from 'lucide-preact';

export default function SciFiDialog() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-cyan-400 font-mono relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-transparent to-blue-900/30"></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(6,182,212,0.1)_25px,rgba(6,182,212,0.1)_26px,transparent_27px,transparent_74px,rgba(6,182,212,0.1)_75px,rgba(6,182,212,0.1)_76px,transparent_77px),linear-gradient(rgba(6,182,212,0.1)_24px,transparent_25px,transparent_26px,rgba(6,182,212,0.1)_27px,rgba(6,182,212,0.1)_74px,transparent_75px,transparent_76px,rgba(6,182,212,0.1)_77px)] bg-[length:50px_50px]" style={{ animation: 'drift 30s linear infinite' }}></div>
      </div>
      {/* Glowing elements */}
      <div className="absolute top-10 right-1/4 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      {/* Dialog Container */}
      <div className={`relative max-w-md w-full transition-all duration-300 scale-100 opacity-100`}>
        {/* Outer Border with Corner Details */}
        <div className="relative border-2 border-cyan-400/60 bg-black/90 backdrop-blur-md">
          {/* Header */}
          <div className="border-b border-cyan-400/40 p-4 bg-cyan-400/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Clock3 className="w-6 h-6 text-cyan-400" />
                  <div className="absolute inset-0 animate-ping">
                    <Clock3 className="w-6 h-6 text-cyan-400/40" />
                  </div>
                </div>
                <div>
                  <h2 className="text-cyan-400 font-bold text-sm tracking-wider">LOADING</h2>
                  <div className="text-xs text-cyan-300 font-mono">WAITING FOR DATA LOAD</div>
                </div>
              </div>
            </div>
          </div>
          {/* Content */}
          <div className="p-6 text-center">
            {/* Warning Icon with Animation */}
            <div className="relative mb-6 flex justify-center">
              <div className="w-16 h-16 border border-cyan-400/40 bg-cyan-400/10 flex items-center justify-center">
                <Loader className="w-8 h-8 text-cyan-400 animate-spin" />
              </div>
            </div>
            {/* Error Message */}
            <div className="mb-6">
              <h3 className="text-cyan-400 font-bold text-xl mb-3 font-mono tracking-wider">
                PAGE LOADING
              </h3>
              <p className="text-cyan-300 text-sm leading-relaxed">
                Chrome's takeout data contains so much data, and we are preparing optimized, minimalistic and specific data (only which are important) to provide you smoothness and performance.
              </p>
            </div>
            {/* Status Indicators */}
            <div className="mb-6 space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center p-2 border border-cyan-400/20 bg-cyan-400/5">
                <span className="text-cyan-400">TAKEOUT READING:</span>
                <span className="text-yellow-400">INITIALIZING...</span>
              </div>
              <div className="flex justify-between items-center p-2 border border-green-400/20 bg-green-400/5">
                <span className="text-cyan-400">SAFE MODE:</span>
                <span className="text-green-400">ACTIVE</span>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="border-t border-cyan-400/30 p-3 bg-cyan-400/5">
            <div className="flex justify-between items-center text-xs font-mono">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-cyan-400">INITIATED AT</span>
              </div>
              <div className="text-cyan-400 uppercase">
                {new Date().toLocaleTimeString('en-IN', { hour12: true })}
              </div>
            </div>
          </div>
        </div>

        {/* Outer glow effect */}
        <div className="absolute inset-0 border-2 border-red-400/20 -z-10 blur-sm"></div>
      </div>
    </div>
  );
}
