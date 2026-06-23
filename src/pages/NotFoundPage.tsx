import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Compass } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="text-center max-w-md relative z-10 animate-fade-in-up">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-float">
          <Compass className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-8xl font-black text-primary">404</h1>
        <h2 className="text-2xl font-black mt-3">Lost in Ghana?</h2>
        <p className="text-muted-foreground mt-3 text-lg leading-relaxed">
          This page doesn&apos;t exist, but Ghana has plenty of amazing places to discover!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <Link to="/" className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg active:scale-95">
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <button onClick={() => window.history.back()} className="flex items-center gap-2 px-6 py-3 border border-border font-bold rounded-xl hover:bg-secondary transition-all">
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
