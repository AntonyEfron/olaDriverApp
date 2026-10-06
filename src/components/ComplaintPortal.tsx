import React, { useState, useEffect, useCallback } from 'react';
import { 
    AlertCircle, HelpCircle, ChevronRight, Send, User, Car, Phone, 
    FileText, MapPin, Mail, Tag, History, CheckCircle2,  Clock, 
    MessageSquare, AlertTriangle, Loader2, Shield
} from 'lucide-react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const ENQUIRY_CATEGORIES = [
    'Vehicle Rental',
    'Lease Options',
    'Fleet Management',
    'Corporate Booking',
    'Maintenance Support',
    'Job Opportunities',
    'General Information'
];

interface Complaint {
    _id: string;
    type: 'ENQUIRY' | 'COMPLAINT';
    category: string;
    message: string;
    status: 'PENDING' | 'RESOLVED' | 'IN_PROGRESS';
    response?: string;
    branchId: { name: string };
    createdAt: string;
}

const SuccessModal = ({ isOpen, onClose, message }: { isOpen: boolean; onClose: () => void; message: string }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-dark-card border border-white/10 rounded-[2rem] p-8 w-full max-w-sm text-center shadow-2xl animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-lime/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="text-lime" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Success!</h3>
                <p className="text-gray-400 mb-8">{message}</p>
                <button
                    onClick={onClose}
                    className="w-full py-4 bg-lime text-brand-black font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-transform"
                >
                    Great, thanks
                </button>
            </div>
        </div>
    );
};

const ComplaintPortal = () => {
    const { driver, isAuthenticated } = useAuth();
    const [view, setView] = useState<'new' | 'history' | 'enquiry'>('new');
    const [idType, setIdType] = useState<'license' | 'vehicle' | 'mobile'>('license');
    const [loading, setLoading] = useState(false);
    const [fetchingHistory, setFetchingHistory] = useState(false);
    const [branches, setBranches] = useState<{ _id: string, name: string }[]>([]);
    const [history, setHistory] = useState<Complaint[]>([]);
    const [showSuccess, setShowSuccess] = useState(false);
    
    const [formData, setFormData] = useState({
        idValue: driver?.personalInfo?.licenseNumber || '',
        branchId: typeof driver?.branch === 'object' ? driver.branch?._id : (driver?.branch || ''),
        branchArea: typeof driver?.branch === 'object' ? driver.branch?.name : 'Panama City - Tocumen Intl Airport (PTY)',
        message: '',
        name: driver?.personalInfo?.fullName || '',
        email: driver?.personalInfo?.email || '',
        mobile: driver?.personalInfo?.phone || '',
        category: ''
    });

    // Force 'enquiry' view for landing page (unauthenticated users)
    useEffect(() => {
        if (!isAuthenticated) {
            setView('enquiry');
        } else if (driver) {
            // Update branchId if driver is loaded
            const bId = typeof driver.branch === 'object' ? driver.branch?._id : driver.branch;
            const bName = typeof driver.branch === 'object' ? driver.branch?.name : undefined;
            if (bId) {
                setFormData(prev => ({ 
                    ...prev, 
                    branchId: bId, 
                    branchArea: bName || prev.branchArea,
                    idValue: driver.personalInfo?.licenseNumber || '' 
                }));
            }
        }
    }, [isAuthenticated, driver]);

    const fetchBranches = useCallback(async () => {
        try {
            const response = await api.get('/branch/public/list');
            if (response.data.success && response.data.data?.length > 0) {
                setBranches(response.data.data);
                setFormData(prev => ({
                    ...prev,
                    branchId: prev.branchId || response.data.data[0]._id,
                    branchArea: prev.branchArea || response.data.data[0].name
                }));
            }
        } catch (error) {
            console.error('Error fetching branches:', error);
        }
    }, []);

    const fetchHistory = useCallback(async () => {
        if (!isAuthenticated) return;
        setFetchingHistory(true);
        try {
            const response = await api.get('/enquiries/my-complaints');
            if (response.data.status === 'success') {
                setHistory(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching history:', error);
        } finally {
            setFetchingHistory(false);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        fetchBranches();
    }, [fetchBranches]);

    useEffect(() => {
        if (view === 'history' && isAuthenticated) {
            fetchHistory();
        }
    }, [view, fetchHistory, isAuthenticated]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const isEnquiry = view === 'enquiry';
            
            // For drivers, we ensure branchId and idValue are correct from the driver object if not set
            const matchedBranch = branches.find(b => 
                b.name.toLowerCase() === (formData.branchArea || '').toLowerCase() ||
                b._id === formData.branchId
            );
            const branchId = matchedBranch?._id || formData.branchId || (typeof driver?.branch === 'object' ? driver.branch?._id : driver?.branch) || (branches.length > 0 ? branches[0]._id : undefined);
            const idValue = isEnquiry ? formData.mobile : (formData.idValue || driver?.personalInfo?.licenseNumber || formData.mobile);

            const payload: any = {
                type: isEnquiry ? 'ENQUIRY' : 'COMPLAINT',
                name: formData.name || driver?.personalInfo?.fullName,
                mobile: isEnquiry ? formData.mobile : idValue,
                email: formData.email || driver?.personalInfo?.email,
                category: isEnquiry ? formData.category : 'COMPLAINT',
                branchId: branchId || (branches[0]?._id),
                branchArea: formData.branchArea,
                message: formData.branchArea 
                    ? `[Service Area: ${formData.branchArea}]\n${formData.message}`
                    : formData.message,
                ...(!isEnquiry && {
                    identificationType: 'LICENSE',
                    identificationValue: idValue
                })
            };

            // If branchId is still missing, fallback to first available branch or default identifier
            if (!payload.branchId && branches.length > 0) {
                payload.branchId = branches[0]._id;
            }

            await api.post('/enquiries/register', payload);
            setShowSuccess(true);
            setFormData(prev => ({
                ...prev,
                message: '',
                category: ''
            }));
        } catch (error: any) {
            console.error('Submission failed:', error);
            alert(error.response?.data?.message || error.message || 'Failed to send. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'RESOLVED': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'IN_PROGRESS': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            default: return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
        }
    };

    return (
        <section className={`relative ${isAuthenticated ? 'py-4 bg-transparent' : 'py-14 sm:py-24 bg-[#0A0A0A] overflow-hidden'}`} id={isAuthenticated ? undefined : 'support'}>
            {!isAuthenticated && (
                <>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-lime/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-lime/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
                </>
            )}

            <SuccessModal 
                isOpen={showSuccess} 
                onClose={() => setShowSuccess(false)} 
                message={`Your ${view === 'enquiry' ? 'enquiry' : 'complaint'} has been logged. Our team will review it and respond shortly.`} 
            />

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                {!isAuthenticated && (
                    <div className="text-center mb-8 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 sm:mb-4 tracking-tight uppercase">
                            Connect <span className="text-lime">With Us</span>
                        </h2>
                        <p className="text-gray-400 text-xs sm:text-base md:text-lg max-w-2xl mx-auto font-medium">
                            Have questions about our fleet or leasing options? Send us a message.
                        </p>
                    </div>
                )}

                <div className="bg-dark-card border border-white/10 rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl">
                    {/* Navigation Tabs - Only show if authenticated */}
                    {isAuthenticated && (
                        <div className="flex border-b border-white/10 p-2 gap-2">
                        <button
                            onClick={() => setView('new')}
                            className={`flex-1 py-4 flex items-center justify-center gap-2 rounded-2xl transition-all ${
                                view === 'new' ? 'bg-lime text-black font-black' : 'text-gray-500 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <AlertCircle size={18} />
                            <span className="uppercase tracking-widest text-[10px] font-black">New Complaint</span>
                        </button>
                        <button
                            onClick={() => setView('history')}
                            className={`flex-1 py-4 flex items-center justify-center gap-2 rounded-2xl transition-all ${
                                view === 'history' ? 'bg-lime text-black font-black' : 'text-gray-500 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <History size={18} />
                            <span className="uppercase tracking-widest text-[10px] font-black">Track Status</span>
                        </button>
                        <button
                            onClick={() => setView('enquiry')}
                            className={`flex-1 py-4 flex items-center justify-center gap-2 rounded-2xl transition-all ${
                                view === 'enquiry' ? 'bg-lime text-black font-black' : 'text-gray-500 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <HelpCircle size={18} />
                            <span className="uppercase tracking-widest text-[10px] font-black">Enquiry</span>
                        </button>
                        </div>
                    )}

                    <div className="p-4 sm:p-8 md:p-10">
                        {view === 'history' ? (
                            <div className="space-y-6">
                                {fetchingHistory ? (
                                    <div className="py-20 flex flex-col items-center justify-center text-gray-500 gap-4">
                                        <Loader2 size={32} className="animate-spin text-lime" />
                                        <p className="text-xs font-black uppercase tracking-widest">Fetching your history...</p>
                                    </div>
                                ) : history.length === 0 ? (
                                    <div className="py-20 flex flex-col items-center justify-center text-gray-500 gap-4 opacity-50">
                                        <History size={48} />
                                        <p className="text-sm font-medium">No history found</p>
                                    </div>
                                ) : (
                                    <div className="grid gap-4">
                                        {history.map((item) => (
                                            <div key={item._id} className="bg-brand-black/40 border border-white/5 rounded-2xl p-6 transition-all hover:border-white/10">
                                                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusStyle(item.status)}`}>
                                                            {item.status.replace('_', ' ')}
                                                        </div>
                                                        <span className="text-[10px] text-gray-500 font-bold">{new Date(item.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-gray-500">
                                                        <MapPin size={12} />
                                                        <span className="text-[10px] font-bold">{item.branchId?.name}</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-4">
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-lime mb-2 flex items-center gap-2">
                                                            <MessageSquare size={12} />
                                                            Your Issue
                                                        </p>
                                                        <p className="text-sm text-gray-300 leading-relaxed">{item.message}</p>
                                                    </div>

                                                    {item.response && (
                                                        <div className="bg-lime/5 border border-lime/10 rounded-xl p-4 mt-4">
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-lime mb-2 flex items-center gap-2">
                                                                <CheckCircle2 size={12} />
                                                                Official Response
                                                            </p>
                                                            <p className="text-sm text-white italic">"{item.response}"</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-8">
                                {(!isAuthenticated || view === 'enquiry') && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                                        {!isAuthenticated && (
                                            <>
                                                <div className="space-y-1.5 sm:space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-lime ml-1">Full Name</label>
                                                    <div className="relative group">
                                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-lime transition-colors" size={16} />
                                                        <input
                                                            required
                                                            type="text"
                                                            placeholder="Name"
                                                            className="w-full bg-brand-black border border-white/10 rounded-xl py-3 sm:py-3.5 pl-11 pr-4 text-white text-xs sm:text-sm focus:outline-none focus:border-lime transition-all"
                                                            value={formData.name}
                                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5 sm:space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-lime ml-1">Email</label>
                                                    <div className="relative group">
                                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-lime transition-colors" size={16} />
                                                        <input
                                                            required
                                                            type="email"
                                                            placeholder="Email"
                                                            className="w-full bg-brand-black border border-white/10 rounded-xl py-3 sm:py-3.5 pl-11 pr-4 text-white text-xs sm:text-sm focus:outline-none focus:border-lime transition-all"
                                                            value={formData.email}
                                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5 sm:space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-lime ml-1">Mobile</label>
                                                    <div className="relative group">
                                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-lime transition-colors" size={16} />
                                                        <input
                                                            required
                                                            type="tel"
                                                            placeholder="Phone"
                                                            className="w-full bg-brand-black border border-white/10 rounded-xl py-3 sm:py-3.5 pl-11 pr-4 text-white text-xs sm:text-sm focus:outline-none focus:border-lime transition-all"
                                                            value={formData.mobile}
                                                            onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        <div className={`space-y-1.5 sm:space-y-2 ${isAuthenticated ? 'md:col-span-3' : 'md:col-span-3'}`}>
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-lime ml-1">Your Branch / Area</label>
                                            <div className="relative group">
                                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-lime transition-colors" size={16} />
                                                <input
                                                    required
                                                    type="text"
                                                    list="panama-branches-list"
                                                    placeholder="e.g. Panama City - Tocumen Intl Airport / Costa del Este"
                                                    className="w-full bg-brand-black border border-white/10 rounded-xl py-3 sm:py-3.5 pl-11 pr-4 text-white text-xs sm:text-sm focus:outline-none focus:border-lime transition-all font-medium placeholder-gray-600"
                                                    value={formData.branchArea}
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        const matched = branches.find(b => b.name.toLowerCase() === val.toLowerCase());
                                                        setFormData({
                                                            ...formData,
                                                            branchArea: val,
                                                            branchId: matched ? matched._id : formData.branchId
                                                        });
                                                    }}
                                                />
                                                <datalist id="panama-branches-list">
                                                    {branches.length > 0 
                                                        ? branches.map(b => <option key={b._id} value={b.name} />)
                                                        : [
                                                            'Panama City - Tocumen Intl Airport (PTY)',
                                                            'Panama City - Costa del Este Hub',
                                                            'Panama City - Casco Viejo Downtown',
                                                            'Panama City - Multiplaza Pacific / Punta Pacifica',
                                                            'Panama City - Marbella / Calle 50 Financial District',
                                                            'Panama City - Albrook Terminal & Clayton',
                                                          ].map(area => <option key={area} value={area} />)
                                                    }
                                                </datalist>
                                            </div>
                                            <p className="text-[10px] text-gray-500 ml-1">Type or select your nearest Panama City branch or service area</p>
                                        </div>
                                    </div>
                                )}

                                {(!isAuthenticated || view === 'enquiry') && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                        {view === 'enquiry' ? (
                                            <div className="space-y-1.5 sm:space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-lime ml-1">Category</label>
                                                <div className="relative group">
                                                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-lime transition-colors" size={16} />
                                                    <select
                                                        required
                                                        className="w-full bg-brand-black border border-white/10 rounded-xl py-3 sm:py-3.5 pl-11 pr-10 text-white text-xs sm:text-sm appearance-none focus:outline-none focus:border-lime transition-all"
                                                        value={formData.category}
                                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                                    >
                                                        <option value="" disabled>What is this about?</option>
                                                        {ENQUIRY_CATEGORIES.map(cat => (
                                                            <option key={cat} value={cat}>{cat}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 rotate-90" size={14} />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-1.5 sm:space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-lime ml-1">Relates To</label>
                                                <div className="flex gap-2">
                                                    {[
                                                        { id: 'license', label: 'License', icon: FileText },
                                                        { id: 'vehicle', label: 'Vehicle', icon: Car },
                                                        { id: 'mobile', label: 'Mobile', icon: Phone }
                                                    ].map((item) => (
                                                        <button
                                                            key={item.id}
                                                            type="button"
                                                            onClick={() => setIdType(item.id as any)}
                                                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-xl border transition-all ${
                                                                idType === item.id 
                                                                ? 'bg-lime border-lime text-black font-black' 
                                                                : 'bg-brand-black border-white/10 text-gray-500 hover:border-white/30'
                                                            }`}
                                                        >
                                                            <item.icon size={14} />
                                                            <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {(!isAuthenticated && view === 'new') && (
                                    <div className="space-y-1.5 sm:space-y-2 animate-in fade-in slide-in-from-top-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-lime ml-1">
                                            {idType === 'license' ? 'License Number' : idType === 'vehicle' ? 'Registration / Plate' : 'Contact Number'}
                                        </label>
                                        <div className="relative">
                                            <AlertTriangle size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                            <input
                                                required
                                                type="text"
                                                placeholder={`Enter ${idType} details for verification`}
                                                className="w-full bg-brand-black border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white text-xs sm:text-sm focus:outline-none focus:border-lime transition-all font-bold"
                                                value={formData.idValue}
                                                onChange={(e) => setFormData({...formData, idValue: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-1.5 sm:space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-lime ml-1">
                                        {view === 'new' ? 'Detailed Description' : 'Your Question'}
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder={view === 'new' ? "Please explain the issue clearly..." : "How can we assist you today?"}
                                        className="w-full bg-brand-black border border-white/10 rounded-xl sm:rounded-2xl py-3.5 sm:py-4 px-4 sm:px-5 text-white text-xs sm:text-sm focus:outline-none focus:border-lime transition-all resize-none font-medium leading-relaxed"
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-lime hover:bg-[#E2FF00] text-black font-black uppercase tracking-[0.2em] text-xs py-3.5 sm:py-5 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-lime/10 disabled:opacity-50 cursor-pointer"
                                >
                                    {loading ? <Loader2 size={18} className="animate-spin" /> : (
                                        <>
                                            <span>Submit {view === 'new' ? 'Complaint' : 'Enquiry'}</span>
                                            <Send size={15} />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-6 opacity-40">
                    <div className="flex items-center gap-2">
                        <Clock size={14} className="text-gray-400" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">24/7 Support</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-600 rounded-full" />
                    <div className="flex items-center gap-2">
                        <Shield size={14} className="text-gray-400" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Encrypted</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComplaintPortal;
