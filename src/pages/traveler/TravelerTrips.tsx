import { useState } from 'react';
import { Plus, Calendar, MapPin, Users, DollarSign, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/lib/stores/authStore';
import { savedTrips } from '@/lib/data/trips';
import { formatDate, formatCurrency } from '@/lib/utils/formatters';
import { GHANA_REGIONS, GhanaRegion } from '@/lib/types';

export default function TravelerTrips() {
  const { user } = useAuthStore();
  const [showForm, setShowForm] = useState(false);
  const [trips, setTrips] = useState(savedTrips.filter((t) => t.userId === user?.id));
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Form state
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [travelers, setTravelers] = useState('2');
  const [regions, setRegions] = useState<GhanaRegion[]>([]);

  if (!user) return null;

  const handleCreateTrip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tripName || !startDate || !endDate) {
      toast.error('Please fill in required fields');
      return;
    }
    const newTrip = {
      id: `trp_${String(trips.length + 10).padStart(3, '0')}`,
      userId: user.id,
      name: tripName,
      startDate,
      endDate,
      regions,
      budget: Number(budget) || 0,
      travelers: Number(travelers) || 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTrips((prev) => [newTrip, ...prev]);
    toast.success('Trip created!');
    setShowForm(false);
    setTripName('');
    setStartDate('');
    setEndDate('');
    setBudget('');
    setTravelers('2');
    setRegions([]);
  };

  const handleDelete = (id: string) => {
    setTrips((prev) => prev.filter((t) => t.id !== id));
    setDeleteConfirm(null);
    toast.success('Trip deleted');
  };

  const toggleRegion = (region: GhanaRegion) => {
    setRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Trips</h1>
          <p className="text-muted-foreground mt-1">{trips.length} planned trips</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Trip</span>
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <form onSubmit={handleCreateTrip} className="p-5 rounded-xl border border-border bg-card animate-fade-in">
          <h3 className="font-semibold mb-4">Plan a New Trip</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Trip Name *</label>
              <input
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                placeholder="My Ghana Adventure"
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Start Date *</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date *</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Budget (USD)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="3000"
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Travelers</label>
              <input
                type="number"
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                min="1"
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-2">Regions to Visit</label>
              <div className="flex flex-wrap gap-2">
                {GHANA_REGIONS.slice(0, 10).map((region) => (
                  <button
                    key={region}
                    type="button"
                    onClick={() => toggleRegion(region)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      regions.includes(region)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
              Create Trip
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Trips List */}
      {trips.length > 0 ? (
        <div className="space-y-4">
          {trips.map((trip) => (
            <div key={trip.id} className="p-5 rounded-xl border border-border bg-card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold">{trip.name}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(trip.startDate)} — {formatDate(trip.endDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {trip.travelers} travelers
                    </span>
                    {trip.budget > 0 && (
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5" />
                        {formatCurrency(trip.budget)}
                      </span>
                    )}
                  </div>
                  {trip.regions.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {trip.regions.map((r) => (
                        <span key={r} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                          <MapPin className="w-3 h-3" /> {r}
                        </span>
                      ))}
                    </div>
                  )}
                  {trip.notes && (
                    <p className="text-sm text-muted-foreground mt-2">{trip.notes}</p>
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={() => setDeleteConfirm(deleteConfirm === trip.id ? null : trip.id)}
                    className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {deleteConfirm === trip.id && (
                    <div className="absolute right-0 top-full mt-1 p-3 rounded-lg border border-border bg-popover shadow-lg z-10 w-48 animate-fade-in">
                      <p className="text-sm mb-2">Delete this trip?</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(trip.id)}
                          className="flex-1 px-2 py-1 bg-destructive text-destructive-foreground text-xs rounded hover:bg-destructive/90"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="flex-1 px-2 py-1 border border-border text-xs rounded hover:bg-secondary"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <span className="text-6xl block mb-4">🗺️</span>
          <h3 className="text-xl font-semibold">No trips planned yet</h3>
          <p className="text-muted-foreground mt-2">Start planning your Ghana adventure!</p>
        </div>
      )}
    </div>
  );
}
