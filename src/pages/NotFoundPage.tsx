import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Compass } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-obsidian text-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full border border-primary/10 animate-orbit-slow pointer-events-none" />

      <div className="text-center max-w-md relative z-10 animate-scale-in">
        <div className="w-24 h-24 mx-auto rounded-full border-2 border-primary flex items-center justify-center animate-float">
          <Compass className="w-11 h-11 text-primary" />
        </div>
        <p className="font-display text-8xl font-black gold-text mt-8">404</p>
        <h1 className="font-display text-3xl font-bold mt-2">Lost off the map</h1>
        <p className="text-white/50 mt-3 font-light leading-relaxed">
          This page eludes us — but the coastlines, castles and
          savannahs of Ghana are right where you left them.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-9">
          <Link to="/" className="btn-shine flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wide-luxe hover:shadow-lg hover:shadow-primary/25 transition-all active:scale-95">
            <Home className="w-4 h-4" /> Home
          </Link>
          <button onClick={() => window.history.back()} className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/20 font-bold text-sm uppercase tracking-wide-luxe hover:bg-white/5 transition-all">
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
