import { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import { AppProvider, useApp } from './context/AppContext';
import DashboardLayout from './components/DashboardLayout';
import Toast from './components/Toast';
import ProtectedRoute from './components/ProtectedRoute';
import SplashPage from './pages/SplashPage';
import OnboardingPage from './pages/OnboardingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import SearchResultsPage from './pages/SearchResultsPage';
import SavedJobsPage from './pages/SavedJobsPage';
import AppliedJobsPage from './pages/AppliedJobsPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import SettingsPage from './pages/SettingsPage';
import ChatsPage from './pages/ChatsPage';
import ChatDetailPage from './pages/ChatDetailPage';
import CompanyProfilePage from './pages/CompanyProfilePage';
import PostJobPage from './pages/PostJobPage';
import EditJobPage from './pages/EditJobPage';
import MyPostingsPage from './pages/MyPostingsPage';
import ApplicantsPage from './pages/ApplicantsPage';
import ProfileSetupPage from './pages/setup/ProfileSetupPage';
import SkillsSetupPage from './pages/setup/SkillsSetupPage';
import ResumeSetupPage from './pages/setup/ResumeSetupPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary';

const noNavPaths = ['/', '/onboarding', '/login', '/register', '/forgot-password', '/setup/profile', '/setup/skills', '/setup/resume'];

import { AnimatePresence } from 'framer-motion';

function AppLayout() {
  const location = useLocation();
  const { state } = useApp();
  const showDashboard = state.auth.isAuthenticated && !noNavPaths.includes(location.pathname);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  return (
    <div className="app-container">
      {showDashboard ? (
        <DashboardLayout>
          <ErrorBoundary>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                <Route path="/jobs" element={<ProtectedRoute><JobsPage /></ProtectedRoute>} />
                <Route path="/job/:id" element={<ProtectedRoute><JobDetailPage /></ProtectedRoute>} />
                <Route path="/search" element={<ProtectedRoute><SearchResultsPage /></ProtectedRoute>} />
                <Route path="/saved-jobs" element={<ProtectedRoute><SavedJobsPage /></ProtectedRoute>} />
                <Route path="/applied-jobs" element={<ProtectedRoute><AppliedJobsPage /></ProtectedRoute>} />
                <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                <Route path="/edit-profile" element={<ProtectedRoute><EditProfilePage /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                <Route path="/chats" element={<ProtectedRoute><ChatsPage /></ProtectedRoute>} />
                <Route path="/chat/:id" element={<ProtectedRoute><ChatDetailPage /></ProtectedRoute>} />
                <Route path="/company/:id" element={<ProtectedRoute><CompanyProfilePage /></ProtectedRoute>} />
                <Route path="/post-job" element={<ProtectedRoute requiredRole="employer"><PostJobPage /></ProtectedRoute>} />
                <Route path="/edit-job/:id" element={<ProtectedRoute requiredRole="employer"><EditJobPage /></ProtectedRoute>} />
                <Route path="/my-postings" element={<ProtectedRoute requiredRole="employer"><MyPostingsPage /></ProtectedRoute>} />
                <Route path="/postings/:id/applicants" element={<ProtectedRoute requiredRole="employer"><ApplicantsPage /></ProtectedRoute>} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </AnimatePresence>
          </ErrorBoundary>
        </DashboardLayout>
      ) : (
        <main className="main-content">
          <ErrorBoundary>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<SplashPage />} />
                <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/setup/profile" element={<ProtectedRoute><ProfileSetupPage /></ProtectedRoute>} />
                <Route path="/setup/skills" element={<ProtectedRoute><SkillsSetupPage /></ProtectedRoute>} />
                <Route path="/setup/resume" element={<ProtectedRoute><ResumeSetupPage /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </AnimatePresence>
          </ErrorBoundary>
        </main>
      )}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <SmoothScroll>
        <AppProvider>
          <HashRouter>
            <AppLayout />
          </HashRouter>
        </AppProvider>
      </SmoothScroll>
    </ErrorBoundary>
  );
}
