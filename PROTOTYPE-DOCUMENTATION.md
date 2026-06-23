# AfriYie — Prototype Documentation

## SECTION 1: EXECUTIVE SUMMARY

### What is AfriYie?
AfriYie is an AI-powered tourism marketplace that connects travelers worldwide with Ghana's rich culture, heritage, and experiences. The platform enables travelers to discover, plan, and book experiences across all 16 regions of Ghana — from heritage tours at Cape Coast Castle to wildlife safaris at Mole National Park.

### Who is it for?
- **Travelers** — Anyone wanting to visit Ghana, particularly diaspora travelers, cultural tourists, and adventure seekers
- **Tourism Partners** — Hotels, tour operators, transport providers, event organizers, and wellness centers in Ghana
- **Platform Administrators** — AfriYie team managing the marketplace

### Core Value Proposition
One integrated platform to discover Ghana — combining AI trip planning, curated listings, direct partner communication, and trip management in a single beautiful interface.

---

## SECTION 2: FEATURES BUILT

| Page | Route | Description | Key Interactions |
|------|-------|-------------|-----------------|
| Landing Page | `/` | Hero with Ghana photography, featured listings, regions, testimonials, CTAs | Search, browse categories, view regions |
| Login | `/login` | Auth with demo accounts | Email/password login, one-click demo login |
| Signup | `/signup` | Registration with role selection | Create traveler or partner account |
| Browse Listings | `/listings` | Full listing directory | Search, filter by category/region, grid/list toggle |
| Listing Detail | `/listings/:id` | Complete listing page | Image gallery, send inquiry, save to favorites, share |
| Partner Register | `/partner/register` | Business registration form | Multi-step form submission |
| Traveler Dashboard | `/dashboard` | Personalized home for travelers | View stats, trips, inquiries, recommendations |
| Favorites | `/dashboard/favorites` | Saved listings | Search, remove favorites |
| My Trips | `/dashboard/trips` | Trip planning | Create, delete trips, select regions |
| Inquiries (Traveler) | `/dashboard/inquiries` | Sent inquiries | View status, read replies |
| AI Trip Planner | `/dashboard/ai-planner` | AI itinerary generator | Set preferences, generate itinerary, view day-by-day plan |
| Partner Dashboard | `/partner/dashboard` | Business overview | Stats, performance chart, recent inquiries |
| Partner Listings | `/partner/listings` | Manage listings | Create, edit, delete listings |
| Partner Inquiries | `/partner/inquiries` | Handle inquiries | Read, reply to traveler messages |
| Partner Profile | `/partner/profile` | Business profile editor | Update info, upload photos |
| Admin Dashboard | `/admin/dashboard` | Platform analytics | Revenue chart, growth trends, category distribution, activity feed |
| Admin Users | `/admin/users` | User management | Search, filter by role, activate/deactivate |
| Admin Partners | `/admin/partners` | Partner management | Approve/reject applications |
| Admin Listings | `/admin/listings` | Listing moderation | Approve/reject/remove listings |
| Admin Inquiries | `/admin/inquiries` | All communications | Monitor all traveler-partner messages |
| 404 Page | `/404` | Custom error page | Navigate home or go back |

---

## SECTION 3: USER FLOWS

### Flow 1: Traveler Discovers and Saves a Listing
1. Land on homepage → See featured listings
2. Click "Explore" → Browse all listings
3. Apply category filter (e.g., "Experiences")
4. Click a listing card → View full detail page
5. Click "Save to Favorites" → Toast confirms save
6. Navigate to Dashboard → Favorites → See saved listing

### Flow 2: AI Trip Planning
1. Login as traveler → Navigate to AI Planner
2. Enter departure country, dates, budget, travelers
3. Select regions to visit (Greater Accra, Central, Ashanti)
4. Choose interests (Culture, History, Food)
5. Click "Generate My Itinerary"
6. Watch animated loading with progress steps
7. View complete day-by-day itinerary with costs, transport tips, packing list

### Flow 3: Sending an Inquiry
1. Browse listings → Click on a listing
2. Click "Send Inquiry" button
3. Modal opens → Type message
4. Click "Send" → Success animation shows
5. Navigate to Dashboard → Inquiries → See sent inquiry
6. Partner receives inquiry in their dashboard

### Flow 4: Partner Managing Business
1. Login as partner → See partner dashboard with stats and charts
2. Click "My Listings" → View all listings
3. Click "New Listing" → Fill form → Submit for review
4. Click "Inquiries" → See traveler messages → Reply
5. Click "Business Profile" → Update information

### Flow 5: Admin Managing Platform
1. Login as admin → See analytics dashboard with charts
2. Revenue trend, user growth, category distribution, activity feed
3. Click "Partners" → See pending applications → Approve/Reject
4. Click "Listings" → Moderate content → Approve/Remove
5. Click "Users" → Search users → Change roles, activate/deactivate

---

## SECTION 4: DEMO GUIDE

### Recommended Demo Flow (10 minutes)

1. **Landing Page** (1 min) — Show hero, scroll through featured listings, regions, testimonials
2. **Login as Traveler** (30s) — Click "Traveler" demo account for instant login
3. **Traveler Dashboard** (1 min) — Show stats, upcoming trips, inquiries, recommendations
4. **AI Trip Planner** (2 min) — Generate an itinerary, show the animated loading, explore day-by-day plan
5. **Browse Listings** (1 min) — Search, filter by category, switch grid/list view
6. **Listing Detail** (1 min) — Show image gallery, amenities, send inquiry
7. **Logout → Login as Partner** (30s) — Switch to partner view
8. **Partner Dashboard** (1 min) — Show performance chart, inquiries, metrics
9. **Logout → Login as Admin** (30s) — Switch to admin view
10. **Admin Dashboard** (2 min) — Show revenue chart, analytics, approve a pending partner

### Demo Credentials
- Admin: `admin@demo.com` / `demo1234`
- Traveler: `user@demo.com` / `demo1234`
- Partner: `partner@demo.com` / `demo1234`

---

## SECTION 5: PROTOTYPE LIMITATIONS & PRODUCTION NOTES

### What is Mocked
- Authentication uses localStorage (no real backend)
- AI Trip Planner returns pre-generated sample data (no OpenAI API call)
- All data is dummy data stored in TypeScript files
- Image uploads show UI only (no actual file storage)
- Inquiry replies are client-side only
- Map shows placeholder (no Google Maps integration)
- Payment/booking is not implemented

### Production Requirements
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **AI**: OpenAI API integration for real itinerary generation
- **Maps**: Google Maps API for location display
- **Payments**: Stripe or Paystack for Ghana-based payments
- **Email**: SendGrid or Resend for transactional emails
- **File Storage**: Supabase Storage for partner photos
- **Real-time**: Supabase Realtime for live notifications
- **Analytics**: PostHog or Mixpanel for user behavior tracking
- **CDN**: Cloudflare for image optimization and delivery

---

## SECTION 6: DUMMY DATA REFERENCE

### Users (10 records)
| Field | Type | Purpose |
|-------|------|---------|
| id | string | Primary key (usr_001) |
| email | string | Login identifier |
| name | string | Display name |
| role | enum | traveler, partner, admin |
| phone | string | Contact number |
| country | string | User's country |
| isActive | boolean | Account status |
| createdAt | ISO string | Registration date |

### Listings (12 records)
| Field | Type | Purpose |
|-------|------|---------|
| id | string | Primary key (lst_001) |
| partnerId | string | FK to partners |
| title | string | Listing name |
| category | enum | accommodation, experience, attraction, etc. |
| region | enum | Ghana region |
| priceValue | number | Base price |
| rating | number | Average rating |
| status | enum | active, pending, rejected, draft |
| featured | boolean | Featured flag |

### Partners (9 records)
| Field | Type | Purpose |
|-------|------|---------|
| id | string | Primary key (prt_001) |
| userId | string | FK to users |
| businessName | string | Company name |
| businessType | enum | hotel, tour_operator, etc. |
| status | enum | approved, pending, rejected |
| listingCount | number | Active listings |

### Inquiries (8 records)
| Field | Type | Purpose |
|-------|------|---------|
| id | string | Primary key (inq_001) |
| travelerId | string | FK to users |
| partnerId | string | FK to partners |
| listingId | string | FK to listings |
| status | enum | new, read, replied, closed |
| reply | string | Partner's response |

### Trips (5 records)
Planned trips with dates, budget, regions, and traveler count.

### Favorites (10 records)
User-listing bookmark relationships.

### AI Itinerary (1 sample)
Complete 3-day itinerary with daily activities, cost breakdown, transport/accommodation recommendations, and packing suggestions.

### Entity Relationships
```
Users ──── Partners (1:1, via userId)
Partners ── Listings (1:many, via partnerId)
Users ──── Favorites (1:many, via userId)
Users ──── Trips (1:many, via userId)
Users ──── Inquiries (1:many, as traveler)
Partners ── Inquiries (1:many, as partner)
Listings ── Inquiries (1:many, via listingId)
```
