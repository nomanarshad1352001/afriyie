import { useState } from 'react';
import { Sparkles, Loader2, MapPin, DollarSign, Plane, Shirt, Hotel, Bus, CheckCircle2, ArrowRight } from 'lucide-react';
import { sampleAIItinerary } from '@/lib/data/trips';
import { GHANA_REGIONS, GhanaRegion } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/formatters';

const TRAVEL_INTERESTS = ['Culture', 'History', 'Nature', 'Wildlife', 'Food', 'Beach', 'Adventure', 'Photography', 'Wellness', 'Festivals', 'Art', 'Music'];

const LOADING_STEPS = [
  { text: 'Analyzing your preferences...', delay: 0 },
  { text: 'Finding best accommodations...', delay: 800 },
  { text: 'Curating local experiences...', delay: 1600 },
  { text: 'Estimating costs...', delay: 2200 },
  { text: 'Generating your perfect itinerary...', delay: 2800 },
];

export default function AIPlanner() {
  const [step, setStep] = useState<'form' | 'loading' | 'result'>('form');
  const [departureCountry, setDepartureCountry] = useState('United States');
  const [startDate, setStartDate] = useState('2024-12-15');
  const [endDate, setEndDate] = useState('2024-12-28');
  const [budget, setBudget] = useState('3500');
  const [travelers, setTravelers] = useState('2');
  const [selectedRegions, setSelectedRegions] = useState<GhanaRegion[]>(['Greater Accra', 'Central', 'Ashanti']);
  const [interests, setInterests] = useState<string[]>(['Culture', 'History', 'Food']);
  const [loadingStep, setLoadingStep] = useState(0);

  const toggleRegion = (region: GhanaRegion) => setSelectedRegions((prev) => prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]);
  const toggleInterest = (interest: string) => setInterests((prev) => prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('loading');
    setLoadingStep(0);
    LOADING_STEPS.forEach((_, idx) => {
      setTimeout(() => setLoadingStep(idx), LOADING_STEPS[idx].delay);
    });
    setTimeout(() => setStep('result'), 3500);
  };

  const itinerary = sampleAIItinerary;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-6 md:p-8 text-white animate-fade-in-up">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black">AfriYie AI Trip Planner</h1>
              <p className="text-white/70 text-sm">Powered by artificial intelligence</p>
            </div>
          </div>
          <p className="text-white/80 mt-2 max-w-lg">Tell us about your dream Ghana trip and our AI will create a personalized day-by-day itinerary with cost estimates.</p>
        </div>
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-white/5" />
      </div>

      {step === 'form' && (
        <form onSubmit={handleGenerate} className="space-y-6 animate-fade-in-up delay-100">
          <div className="p-6 rounded-2xl border border-border bg-card">
            <h3 className="font-bold text-lg mb-4">Trip Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Departure Country</label>
                <input value={departureCountry} onChange={(e) => setDepartureCountry(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Travelers</label>
                <input type="number" value={travelers} onChange={(e) => setTravelers(e.target.value)} min="1" className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">End Date</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold mb-2">Total Budget (USD)</label>
                <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card">
            <h3 className="font-bold text-lg mb-3">Regions to Visit</h3>
            <div className="flex flex-wrap gap-2">
              {GHANA_REGIONS.slice(0, 10).map((region) => (
                <button key={region} type="button" onClick={() => toggleRegion(region)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95 ${selectedRegions.includes(region) ? 'bg-primary text-primary-foreground shadow-md' : 'bg-secondary text-foreground hover:bg-secondary/80'}`}>
                  📍 {region}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card">
            <h3 className="font-bold text-lg mb-3">Travel Interests</h3>
            <div className="flex flex-wrap gap-2">
              {TRAVEL_INTERESTS.map((interest) => (
                <button key={interest} type="button" onClick={() => toggleInterest(interest)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95 ${interests.includes(interest) ? 'bg-accent text-accent-foreground shadow-md' : 'bg-secondary text-foreground hover:bg-secondary/80'}`}>
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black rounded-2xl hover:shadow-xl transition-all active:scale-[0.98] text-lg shadow-lg">
            <Sparkles className="w-6 h-6" /> Generate My Itinerary
          </button>
        </form>
      )}

      {step === 'loading' && (
        <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
          </div>
          <h3 className="text-2xl font-black mt-8">Creating your itinerary...</h3>
          <div className="mt-6 space-y-3 w-full max-w-sm">
            {LOADING_STEPS.map((s, idx) => (
              <div key={idx} className={`flex items-center gap-3 text-sm transition-all duration-300 ${idx <= loadingStep ? 'opacity-100' : 'opacity-30'}`}>
                {idx < loadingStep ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                ) : idx === loadingStep ? (
                  <Loader2 className="w-5 h-5 text-primary shrink-0 animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-border shrink-0" />
                )}
                <span className={idx <= loadingStep ? 'font-medium' : 'text-muted-foreground'}>{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 'result' && (
        <div className="space-y-6 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black">Your AI Itinerary ✨</h2>
            <button onClick={() => setStep('form')} className="px-4 py-2 border border-border rounded-xl text-sm font-bold hover:bg-secondary transition-all">
              Generate Another
            </button>
          </div>

          {/* Cost Summary */}
          <div className="p-6 rounded-2xl border border-border bg-card">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5 text-primary" /> Cost Estimate</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 stagger-children">
              {Object.entries(itinerary.costEstimate).map(([key, value]) => (
                <div key={key} className={`p-4 rounded-xl ${key === 'total' ? 'bg-primary/10 border-2 border-primary/30 sm:col-span-3' : 'bg-secondary/50'}`}>
                  <p className="text-xs text-muted-foreground capitalize font-medium">{key}</p>
                  <p className={`text-xl font-black mt-0.5 ${key === 'total' ? 'text-primary' : ''}`}>{formatCurrency(value)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Itinerary */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Day-by-Day Plan</h3>
            <div className="space-y-5 stagger-children">
              {itinerary.days.map((day) => (
                <div key={day.day} className="p-6 rounded-2xl border border-border bg-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center font-black text-lg shadow-lg">
                      {day.day}
                    </div>
                    <div>
                      <p className="font-bold text-lg">Day {day.day} — {day.region}</p>
                      <p className="text-xs text-muted-foreground">{day.date}</p>
                    </div>
                  </div>
                  <div className="space-y-4 ml-6 border-l-2 border-primary/20 pl-6">
                    {day.activities.map((activity, idx) => (
                      <div key={idx} className="relative group">
                        <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary/20 border-2 border-primary group-hover:scale-125 transition-transform" />
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-xs text-muted-foreground font-semibold">{activity.time}</p>
                            <p className="font-bold text-sm">{activity.activity}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {activity.location}</p>
                          </div>
                          {activity.cost > 0 && <span className="px-2 py-0.5 rounded-lg bg-primary/10 text-primary text-xs font-bold shrink-0">{formatCurrency(activity.cost)}</span>}
                        </div>
                        {activity.notes && <p className="text-xs text-muted-foreground italic mt-1 flex items-center gap-1"><ArrowRight className="w-3 h-3" /> {activity.notes}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl border border-border bg-card">
              <h3 className="font-bold mb-3 flex items-center gap-2"><Bus className="w-5 h-5 text-blue-500" /> Transport Tips</h3>
              <ul className="space-y-2">{itinerary.transportRecommendations.map((r, i) => <li key={i} className="text-sm text-muted-foreground flex items-start gap-2"><span className="text-primary mt-0.5 shrink-0">•</span>{r}</li>)}</ul>
            </div>
            <div className="p-5 rounded-2xl border border-border bg-card">
              <h3 className="font-bold mb-3 flex items-center gap-2"><Hotel className="w-5 h-5 text-amber-500" /> Where to Stay</h3>
              <ul className="space-y-2">{itinerary.accommodationRecommendations.map((r, i) => <li key={i} className="text-sm text-muted-foreground flex items-start gap-2"><span className="text-primary mt-0.5 shrink-0">•</span>{r}</li>)}</ul>
            </div>
            <div className="p-5 rounded-2xl border border-border bg-card">
              <h3 className="font-bold mb-3 flex items-center gap-2"><Shirt className="w-5 h-5 text-purple-500" /> Packing List</h3>
              <div className="space-y-1.5">{itinerary.packingSuggestions.slice(0, 6).map((s, i) => <p key={i} className="text-sm text-muted-foreground flex items-center gap-2"><Plane className="w-3 h-3 text-primary shrink-0" />{s}</p>)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
