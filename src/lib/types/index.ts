export type UserRole = 'traveler' | 'partner' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
  country?: string;
  bio?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ListingCategory =
  | 'accommodation'
  | 'experience'
  | 'attraction'
  | 'transportation'
  | 'festival'
  | 'wellness';

export type ListingStatus = 'active' | 'pending' | 'rejected' | 'draft';

export interface Listing {
  id: string;
  partnerId: string;
  title: string;
  description: string;
  category: ListingCategory;
  region: GhanaRegion;
  city: string;
  address: string;
  images: string[];
  priceRange: string;
  priceValue: number;
  currency: string;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  amenities: string[];
  rating: number;
  reviewCount: number;
  status: ListingStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export type PartnerBusinessType =
  | 'hotel'
  | 'resort'
  | 'guest_house'
  | 'lodge'
  | 'restaurant'
  | 'tour_operator'
  | 'transportation'
  | 'event_organizer'
  | 'wellness_provider';

export type PartnerStatus = 'approved' | 'pending' | 'rejected';

export interface Partner {
  id: string;
  userId: string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  whatsapp?: string;
  region: GhanaRegion;
  city: string;
  businessType: PartnerBusinessType;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  description: string;
  photos: string[];
  status: PartnerStatus;
  listingCount: number;
  inquiryCount: number;
  createdAt: string;
  updatedAt: string;
}

export type InquiryStatus = 'new' | 'read' | 'replied' | 'closed';

export interface Inquiry {
  id: string;
  travelerId: string;
  travelerName: string;
  travelerEmail: string;
  partnerId: string;
  partnerName: string;
  listingId: string;
  listingTitle: string;
  subject: string;
  message: string;
  travelDates?: string;
  numberOfGuests?: number;
  status: InquiryStatus;
  reply?: string;
  repliedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SavedTrip {
  id: string;
  userId: string;
  name: string;
  startDate: string;
  endDate: string;
  regions: GhanaRegion[];
  budget: number;
  travelers: number;
  notes?: string;
  itinerary?: AIItinerary;
  createdAt: string;
  updatedAt: string;
}

export interface Favorite {
  id: string;
  userId: string;
  listingId: string;
  listing: Listing;
  createdAt: string;
}

export interface AIItinerary {
  id: string;
  userId: string;
  departureCountry: string;
  travelDates: { start: string; end: string };
  budget: number;
  travelers: number;
  regions: GhanaRegion[];
  interests: string[];
  days: AIItineraryDay[];
  transportRecommendations: string[];
  accommodationRecommendations: string[];
  costEstimate: {
    flights: number;
    accommodation: number;
    activities: number;
    food: number;
    transport: number;
    total: number;
  };
  packingSuggestions: string[];
  createdAt: string;
}

export interface AIItineraryDay {
  day: number;
  date: string;
  region: string;
  activities: {
    time: string;
    activity: string;
    location: string;
    cost: number;
    notes: string;
  }[];
}

export type GhanaRegion =
  | 'Greater Accra'
  | 'Ashanti'
  | 'Central'
  | 'Western'
  | 'Eastern'
  | 'Volta'
  | 'Northern'
  | 'Upper East'
  | 'Upper West'
  | 'Brong Ahafo'
  | 'Western North'
  | 'Ahafo'
  | 'Bono East'
  | 'Oti'
  | 'North East'
  | 'Savannah';

export const GHANA_REGIONS: GhanaRegion[] = [
  'Greater Accra',
  'Ashanti',
  'Central',
  'Western',
  'Eastern',
  'Volta',
  'Northern',
  'Upper East',
  'Upper West',
  'Brong Ahafo',
  'Western North',
  'Ahafo',
  'Bono East',
  'Oti',
  'North East',
  'Savannah',
];

export const LISTING_CATEGORIES: { value: ListingCategory; label: string }[] = [
  { value: 'accommodation', label: 'Accommodations' },
  { value: 'experience', label: 'Experiences' },
  { value: 'attraction', label: 'Attractions' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'festival', label: 'Festivals' },
  { value: 'wellness', label: 'Wellness' },
];

export const BUSINESS_TYPES: { value: PartnerBusinessType; label: string }[] = [
  { value: 'hotel', label: 'Hotel' },
  { value: 'resort', label: 'Resort' },
  { value: 'guest_house', label: 'Guest House' },
  { value: 'lodge', label: 'Lodge' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'tour_operator', label: 'Tour Operator' },
  { value: 'transportation', label: 'Transportation Provider' },
  { value: 'event_organizer', label: 'Event Organizer' },
  { value: 'wellness_provider', label: 'Wellness Provider' },
];
