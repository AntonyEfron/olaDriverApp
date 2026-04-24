import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, RefreshCw, Loader2 } from 'lucide-react';
import OnboardingStepper from '../components/onboarding/OnboardingStepper';
import PersonalInfoForm from '../components/onboarding/PersonalInfoForm';
import DocumentUploadForm from '../components/onboarding/DocumentUploadForm';
import StatusWaiting from '../components/onboarding/StatusWaiting';
import { updateDriverProfile, uploadDriverDocument, getDriverMe } from '../services/driverService';
import type { Driver } from '../types/driver';

const OnboardingPage = () => {
    const { driver, logout, refreshProfile } = useAuth();
    const navigate = useNavigate();
    const [localDriver, setLocalDriver] = useState<Driver | null>(driver);
    const [activeTab, setActiveTab] = useState<'info' | 'docs'>('info');
    const [error, setError] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        setLocalDriver(driver);
    }, [driver]);

    useEffect(() => {
        if (driver?.status === 'ACTIVE') {
            navigate('/dashboard', { replace: true });
        }
    }, [driver?.status, navigate]);

    const handleSavePersonalInfo = async (data: any) => {
        if (!localDriver) return;
        setError('');
        try {
            await updateDriverProfile(localDriver._id, data);
            await refreshProfile();
            // Re-fetch to get updated data
            const updated = await getDriverMe();
            setLocalDriver(updated);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to save. Please try again.');
            throw err;
        }
    };

    const handleUpload = async (formData: FormData) => {
        if (!localDriver) return;
        setError('');
        try {
            await uploadDriverDocument(localDriver._id, formData);
            await refreshProfile();
            const updated = await getDriverMe();
            setLocalDriver(updated);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Upload failed. Please try again.');
            throw err;
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            await refreshProfile();
            const updated = await getDriverMe();
            setLocalDriver(updated);
        } catch { /* ignore */ }
        setRefreshing(false);
    };

    if (!localDriver) {
        return (
            <div className="min-h-screen bg-brand-black flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-lime" />
            </div>
        );
    }

    const isDraft = localDriver.status === 'DRAFT';

    return (
        <div className="min-h-screen bg-brand-black">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-brand-black/90 backdrop-blur-xl border-b border-dark-border">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-black text-white tracking-tight">OLA <span className="text-lime">CARS</span></h1>
                        <p className="text-[10px] text-gray-500 uppercase tracking-[2px] font-bold">Driver Onboarding</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={handleRefresh} disabled={refreshing}
                            className="p-2.5 rounded-xl bg-dark-card border border-dark-border text-gray-400 hover:text-white transition-all">
                            <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
                        </button>
                        <button onClick={logout}
                            className="p-2.5 rounded-xl bg-dark-card border border-dark-border text-gray-400 hover:text-red-400 transition-all">
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-6 space-y-6 pb-24">
                {/* Stepper */}
                <OnboardingStepper currentStatus={localDriver.status} />

                {/* Error */}
                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium">
                        {error}
                    </div>
                )}

                {/* Content based on status */}
                {isDraft ? (
                    <>
                        {/* Tabs */}
                        <div className="flex gap-2 p-1 bg-dark-card border border-dark-border rounded-2xl w-fit">
                            <button onClick={() => setActiveTab('info')}
                                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                                    activeTab === 'info' ? 'bg-lime text-brand-black' : 'text-gray-500 hover:text-white'
                                }`}>
                                Personal Info
                            </button>
                            <button onClick={() => setActiveTab('docs')}
                                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                                    activeTab === 'docs' ? 'bg-lime text-brand-black' : 'text-gray-500 hover:text-white'
                                }`}>
                                Documents
                            </button>
                        </div>

                        {activeTab === 'info' ? (
                            <PersonalInfoForm driver={localDriver} onSave={handleSavePersonalInfo} />
                        ) : (
                            <DocumentUploadForm driver={localDriver} onUpload={handleUpload} />
                        )}

                        {/* Submit hint */}
                        <div className="bg-dark-card border border-dark-border rounded-2xl p-5 text-center">
                            <p className="text-xs text-gray-500">
                                Once you've filled in your details and uploaded all required documents, our team will be notified to review your application.
                            </p>
                        </div>
                    </>
                ) : (
                    <StatusWaiting status={localDriver.status} />
                )}

                {/* Status History */}
                {localDriver.statusHistory && localDriver.statusHistory.length > 0 && (
                    <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                        <h3 className="text-xs font-black text-gray-500 uppercase tracking-wider mb-4">Application Timeline</h3>
                        <div className="space-y-3">
                            {[...localDriver.statusHistory].reverse().map((entry, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-lime mt-1.5 shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold text-white">{entry.status}</p>
                                        <p className="text-[10px] text-gray-500">
                                            {new Date(entry.timestamp).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            {entry.notes && ` — ${entry.notes}`}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default OnboardingPage;
