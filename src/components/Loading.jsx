export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-16">
      {/* Main spinner */}
      <div className="relative">
        {/* Outer ring */}
        <div className="w-20 h-20 border-4 border-white/10 rounded-3xl shadow-2xl"></div>
        {/* Spinning rings */}
        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-white rounded-3xl animate-spin shadow-lg"></div>
        <div className="absolute top-2 left-2 w-16 h-16 border-4 border-transparent border-b-white/60 rounded-2xl animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.8s' }}></div>
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white/80 rounded-full animate-pulse"></div>
      </div>

      {/* Text and dots */}
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <p className="text-white font-semibold text-lg bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Fetching Weather Data</p>
          <p className="text-white/60 text-sm">Getting the latest conditions...</p>
        </div>
        
        {/* Animated dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}