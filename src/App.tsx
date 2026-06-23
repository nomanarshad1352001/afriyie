import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '@/lib/stores/authStore';
import { useThemeStore } from '@/lib/stores/themeStore';

import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import NotFoundPage from '@/pages/NotFoundPage';
import BrowseListings from '@/pages/BrowseListings';
import ListingDetail from '@/pages/ListingDetail';

import TravelerDashboard from '@/pages/traveler/TravelerDashboard';
import TravelerFavorites from '@/pages/traveler/TravelerFavorites';
import TravelerTrips from '@/pages/traveler/TravelerTrips';
import TravelerInquiries from '@/pages/traveler/TravelerInquiries';
import AIPlanner from '@/pages/traveler/AIPlanner';

import PartnerDashboard from '@/pages/partner/PartnerDashboard';
import PartnerListings from '@/pages/partner/PartnerListings';
import PartnerInquiries from '@/pages/partner/PartnerInquiries';
import PartnerProfile from '@/pages/partner/PartnerProfile';
import PartnerRegister from '@/pages/partner/PartnerRegister';

import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminPartners from '@/pages/admin/AdminPartners';
import AdminListings from '@/pages/admin/AdminListings';
import AdminInquiries from '@/pages/admin/AdminInquiries';

import DashboardLayout from '@/components/layout/DashboardLayout';
import ProtectedRoute from '@/components/shared/ProtectedRoute';

export default function App() {
  const { loadSession } = useAuthStore();
  const { initTheme } = useThemeStore();

  useEffect(() => {
    initTheme();
    loadSession();
  }, [initTheme, loadSession]);

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          className: '!bg-card !text-card-foreground !border !border-border',
          duration: 3000,
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/listings" element={<BrowseListings />} />
        <Route path="/listings/:id" element={<ListingDetail />} />
        <Route path="/partner/register" element={<PartnerRegister />} />

        {/* Traveler Routes */}
        <Route element={<ProtectedRoute allowedRoles={['traveler']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<TravelerDashboard />} />
            <Route path="/dashboard/favorites" element={<TravelerFavorites />} />
            <Route path="/dashboard/trips" element={<TravelerTrips />} />
            <Route path="/dashboard/inquiries" element={<TravelerInquiries />} />
            <Route path="/dashboard/ai-planner" element={<AIPlanner />} />
          </Route>
        </Route>

        {/* Partner Routes */}
        <Route element={<ProtectedRoute allowedRoles={['partner']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/partner/dashboard" element={<PartnerDashboard />} />
            <Route path="/partner/listings" element={<PartnerListings />} />
            <Route path="/partner/inquiries" element={<PartnerInquiries />} />
            <Route path="/partner/profile" element={<PartnerProfile />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/partners" element={<AdminPartners />} />
            <Route path="/admin/listings" element={<AdminListings />} />
            <Route path="/admin/inquiries" element={<AdminInquiries />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
