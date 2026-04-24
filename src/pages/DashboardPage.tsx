import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader2, RefreshCw } from 'lucide-react';
import BottomNav from '../components/dashboard/BottomNav';
import DashboardHome from '../components/dashboard/DashboardHome';
import VehicleDetails from '../components/dashboard/VehicleDetails';
import PaymentsTab from '../components/dashboard/PaymentsTab';
import ProfileTab from '../components/dashboard/ProfileTab';
import { getDriverMe } from '../services/driverService';
import { getVehicleById } from '../services/vehicleService';
import { getInvoicesByDriver } from '../services/invoiceService';
import type { Driver, Vehicle, Invoice } from '../types/driver';

const DashboardPage = () => {
    const { driver, logout, refreshProfile } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('home');
    const [localDriver, setLocalDriver] = useState<Driver | null>(driver);
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (driver && driver.status !== 'ACTIVE') {
            navigate('/onboarding', { replace: true });
            return;
        }
        loadData();
    }, [driver]);

    const loadData = async () => {
        try {
            const d = await getDriverMe();
            setLocalDriver(d);

            // Load vehicle if assigned
            if (d.currentVehicle) {
                const vehicleId = typeof d.currentVehicle === 'string' ? d.currentVehicle : d.currentVehicle._id;
                try {
                    const v = await getVehicleById(vehicleId);
                    setVehicle(v);
                } catch {
                    setVehicle(null);
                }
            }

            // Load invoices
            try {
                const inv = await getInvoicesByDriver(d._id);
                setInvoices(inv);
            } catch {
                setInvoices([]);
            }
        } catch (err) {
            console.error('Failed to load dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await refreshProfile();
        await loadData();
        setRefreshing(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-brand-black flex items-center justify-center">
                <div className="text-center">
                    <Loader2 size={32} className="animate-spin text-lime mx-auto mb-4" />
                    <p className="text-sm text-gray-500 font-bold">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (!localDriver) {
        return (
            <div className="min-h-screen bg-brand-black flex items-center justify-center p-4">
                <div className="text-center">
                    <p className="text-sm text-gray-500">Unable to load profile.</p>
                    <button onClick={handleLogout} className="mt-4 text-lime font-bold text-sm">Log Out</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-black">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-brand-black/90 backdrop-blur-xl border-b border-dark-border">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-black text-white tracking-tight">OLA <span className="text-lime">CARS</span></h1>
                        <p className="text-[10px] text-gray-500 uppercase tracking-[2px] font-bold">Driver Dashboard</p>
                    </div>
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="p-2.5 rounded-xl bg-dark-card border border-dark-border text-gray-400 hover:text-white transition-all"
                    >
                        <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-2xl mx-auto px-4 py-6 pb-28">
                {activeTab === 'home' && <DashboardHome driver={localDriver} vehicle={vehicle} invoices={invoices} />}
                {activeTab === 'vehicle' && <VehicleDetails vehicle={vehicle} />}
                {activeTab === 'payments' && <PaymentsTab invoices={invoices} />}
                {activeTab === 'profile' && <ProfileTab driver={localDriver} onLogout={handleLogout} />}
            </main>

            {/* Bottom Navigation */}
            <BottomNav active={activeTab} onChange={setActiveTab} />
        </div>
    );
};

export default DashboardPage;
