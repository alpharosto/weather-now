export default function ErrorMessage({ children }) {
  if (!children) return null;
  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-br from-red-500/20 via-red-600/15 to-pink-500/10 backdrop-blur-2xl border border-red-400/40 rounded-3xl p-6 text-red-50 font-medium shadow-2xl animate-scaleIn relative overflow-hidden group">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer"></div>
      
      <div className="relative z-10 flex items-start gap-4">
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-lg font-semibold mb-1 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Oops! Something went wrong</p>
          <p className="text-red-100/90 leading-relaxed text-base">{children}</p>
        </div>
      </div>
    </div>
  );
}