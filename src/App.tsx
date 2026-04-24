import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import { useScrollReveal } from './hooks/useScrollReveal';
import { Loader2 } from 'lucide-react';

// ─── Protected Route ────────────────────────────────────────────────
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-brand-black flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-lime" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

// ─── Status-Based Route ─────────────────────────────────────────────
const OnboardingRoute = () => {
    const { driver, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-brand-black flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-lime" />
            </div>
        );
    }

    if (driver?.status === 'ACTIVE') {
        return <Navigate to="/dashboard" replace />;
    }

    return <OnboardingPage />;
};

const DashboardRoute = () => {
    const { driver, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-brand-black flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-lime" />
            </div>
        );
    }

    if (driver && driver.status !== 'ACTIVE') {
        return <Navigate to="/onboarding" replace />;
    }

    return <DashboardPage />;
};

// ─── Auth Route (redirect if already logged in) ─────────────────────
const AuthRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, driver, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-brand-black flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-lime" />
            </div>
        );
    }

    if (isAuthenticated && driver) {
        return <Navigate to={driver.status === 'ACTIVE' ? '/dashboard' : '/onboarding'} replace />;
    }

    return <>{children}</>;
};

// ─── Main App ───────────────────────────────────────────────────────
function AppContent() {
    useScrollReveal();

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
            <Route path="/signup" element={<AuthRoute><SignupPage /></AuthRoute>} />
            <Route path="/onboarding" element={<ProtectedRoute><OnboardingRoute /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardRoute /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    );
}

export default App;
