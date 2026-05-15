import { useState, useRef } from 'react';
import {
    ShieldAlert, MessageSquare, HelpCircle, ChevronRight,
    Camera, X, MapPin, Phone, Mail, Car, AlertTriangle,
    CheckCircle2, Loader2, Upload, FileText, History, Eye, ChevronDown
} from 'lucide-react';
import { submitAccidentReport, getMyAccidentReports } from '../../services/accidentService';
import type { AccidentReport } from '../../services/accidentService';
import { useAuth } from '../../context/AuthContext';
import ComplaintPortal from '../ComplaintPortal';
import api from '../../api';
import type { Driver, Vehicle } from '../../types/driver';

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        SUBMITTED: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        UNDER_REVIEW: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        RESOLVED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        CLOSED: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    };
    return (
        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ${styles[status] || styles.SUBMITTED}`}>
            {status.replace('_', ' ')}
        </span>
    );
};

// ─── Accident Report Form ─────────────────────────────────────────────────────
const AccidentReportForm = ({ onSuccess, driver, vehicle }: { onSuccess: () => void, driver: Driver, vehicle: Vehicle | null }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [submitting, setSubmitting] = useState(false);
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    
    const branchId = typeof driver.branch === 'object' ? driver.branch._id : driver.branch;
    const branchName = typeof driver.branch === 'object' ? driver.branch.name : 'Your Branch';
    const initialVehicleNumber = vehicle?.legalDocs?.registrationNumber || '';

    const [form, setForm] = useState({
        vehicleNumber: initialVehicleNumber,
        branch: branchId,
        alternativeMobile: driver?.personalInfo?.phone || '',
        alternativeEmail: driver?.personalInfo?.email || '',
        accidentLocation: '',
        accidentDate: new Date().toISOString().slice(0, 16),
        description: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const remaining = 5 - images.length;
        const toAdd = files.slice(0, remaining);
        setImages(prev => [...prev, ...toAdd]);
        const newPreviews = toAdd.map(f => URL.createObjectURL(f));
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    const removeImage = (idx: number) => {
        setImages(prev => prev.filter((_, i) => i !== idx));
        setPreviews(prev => prev.filter((_, i) => i !== idx));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!form.vehicleNumber || !form.branch || !form.alternativeMobile || !form.accidentLocation || !form.description) {
            setError('Please fill in all required fields.');
            return;
        }
        if (images.length === 0) {
            setError('Please provide at least 1 image of the accident scene.');
            return;
        }
        setSubmitting(true);
        try {
            await submitAccidentReport({ ...form, images });
            setSuccess(true);
            onSuccess();
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Submission failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                <div className="w-20 h-20 bg-lime/10 rounded-2xl flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="text-lime" />
                </div>
                <h3 className="text-xl font-black text-white mb-2">Report Submitted!</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Your accident report has been submitted successfully. Our team will review it and get back to you shortly.</p>
                <button onClick={() => { setSuccess(false); setImages([]); setPreviews([]); setForm(f => ({ ...f, vehicleNumber: '', branch: '', accidentLocation: '', description: '' })); }} className="mt-8 px-8 py-3 bg-lime text-black font-black rounded-xl text-sm uppercase tracking-widest">
                    Submit Another
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                    <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                    {error}
                </div>
            )}

            {/* Driver Name (Read-only Display) */}
            <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-1.5">
                    <ShieldAlert size={12} /> Driver Name
                </label>
                <div className="w-full bg-dark-card/50 border border-dark-border/50 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-400">
                    {driver.personalInfo?.fullName || 'Unknown Driver'}
                </div>
            </div>

            {/* Vehicle Number & Branch (Read-only) */}
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-1.5">
                        <Car size={12} /> Vehicle Number
                    </label>
                    <input
                        type="text"
                        value={form.vehicleNumber}
                        onChange={e => setForm(f => ({ ...f, vehicleNumber: e.target.value.toUpperCase() }))}
                        readOnly={!!initialVehicleNumber}
                        className={`w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3.5 text-sm font-bold text-white uppercase tracking-widest focus:outline-none focus:border-lime/50 transition-colors ${initialVehicleNumber ? 'opacity-70 cursor-not-allowed' : ''}`}
                        placeholder="e.g. KA01AB1234"
                        required
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-1.5">
                        <MapPin size={12} /> Branch
                    </label>
                    <div className="w-full bg-dark-card/50 border border-dark-border/50 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-400 truncate">
                        {branchName}
                    </div>
                </div>
            </div>

            {/* Contact Row */}
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-1.5">
                        <Phone size={12} /> Alt. Mobile <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="tel"
                        value={form.alternativeMobile}
                        onChange={e => setForm(f => ({ ...f, alternativeMobile: e.target.value }))}
                        className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3.5 text-sm font-medium text-white focus:outline-none focus:border-lime/50 transition-colors"
                        placeholder="+91 9876543210"
                        required
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-1.5">
                        <Mail size={12} /> Alt. Email
                    </label>
                    <input
                        type="email"
                        value={form.alternativeEmail}
                        onChange={e => setForm(f => ({ ...f, alternativeEmail: e.target.value }))}
                        className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3.5 text-sm font-medium text-white focus:outline-none focus:border-lime/50 transition-colors"
                        placeholder="alt@email.com"
                    />
                </div>
            </div>

            {/* Location & Date */}
            <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-1.5">
                    <MapPin size={12} /> Accident Location <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    value={form.accidentLocation}
                    onChange={e => setForm(f => ({ ...f, accidentLocation: e.target.value }))}
                    className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3.5 text-sm font-medium text-white focus:outline-none focus:border-lime/50 transition-colors"
                    placeholder="Street, Area, City"
                    required
                />
            </div>

            <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Date & Time of Accident
                </label>
                <input
                    type="datetime-local"
                    value={form.accidentDate}
                    onChange={e => setForm(f => ({ ...f, accidentDate: e.target.value }))}
                    className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3.5 text-sm font-medium text-white focus:outline-none focus:border-lime/50 transition-colors"
                />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-1.5">
                    <FileText size={12} /> Description <span className="text-red-400">*</span>
                </label>
                <textarea
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3.5 text-sm font-medium text-white focus:outline-none focus:border-lime/50 transition-colors resize-none min-h-[100px]"
                    placeholder="Describe what happened, road conditions, other parties involved..."
                    required
                />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-1.5">
                    <Camera size={12} /> Scene Photos ({images.length}/5)
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {previews.map((src, idx) => (
                        <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-dark-border">
                            <img src={src} alt={`scene-${idx}`} className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => removeImage(idx)}
                                className="absolute top-1 right-1 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center text-white"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    ))}
                    {images.length < 5 && (
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="aspect-square rounded-xl border-2 border-dashed border-dark-border flex flex-col items-center justify-center gap-1 text-gray-500 hover:border-lime/40 hover:text-lime transition-colors"
                        >
                            <Upload size={20} />
                            <span className="text-[9px] font-bold">Add Photo</span>
                        </button>
                    )}
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageAdd}
                    className="hidden"
                />
            </div>

            <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-red-600 text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-red-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-60 mt-2"
            >
                {submitting ? <Loader2 size={18} className="animate-spin" /> : <ShieldAlert size={18} />}
                {submitting ? 'Submitting Report...' : 'Submit Accident Report'}
            </button>
        </form>
    );
};

// ─── My Accident Reports ──────────────────────────────────────────────────────
const MyAccidentReports = () => {
    const [reports, setReports] = useState<AccidentReport[]>([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState<string | null>(null);

    const load = async () => {
        setLoading(true);
        try {
            const data = await getMyAccidentReports();
            setReports(data);
        } catch {
            setReports([]);
        } finally {
            setLoading(false);
        }
    };

    useState(() => { load(); });

    if (loading) {
        return <div className="flex justify-center py-16"><Loader2 size={28} className="animate-spin text-gray-500" /></div>;
    }

    if (reports.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center mb-4">
                    <History size={28} className="text-gray-500" />
                </div>
                <p className="text-gray-500 text-sm font-bold">No accident reports filed</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {reports.map(r => (
                <div key={r._id} className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
                    <button
                        onClick={() => setExpanded(expanded === r._id ? null : r._id)}
                        className="w-full p-4 flex items-start justify-between gap-3 text-left"
                    >
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-black text-white uppercase tracking-tight">{r.vehicleNumber}</span>
                                <StatusBadge status={r.status} />
                            </div>
                            <p className="text-[11px] text-gray-400 truncate">{r.accidentLocation}</p>
                            <p className="text-[9px] text-gray-600 font-bold mt-0.5">{new Date(r.createdAt).toLocaleDateString()}</p>
                        </div>
                        <Eye size={16} className={`text-gray-500 mt-1 shrink-0 transition-transform ${expanded === r._id ? 'rotate-180' : ''}`} />
                    </button>

                    {expanded === r._id && (
                        <div className="px-4 pb-4 border-t border-dark-border space-y-3 pt-3">
                            <p className="text-xs text-gray-400 leading-relaxed">{r.description}</p>
                            {r.images?.length > 0 && (
                                <div className="grid grid-cols-3 gap-2">
                                    {r.images.map((img, i) => (
                                        <img key={i} src={img} alt={`scene-${i}`} className="aspect-square object-cover rounded-lg border border-dark-border" />
                                    ))}
                                </div>
                            )}
                            {r.reviewNotes && (
                                <div className="p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-indigo-400 mb-1">Review Notes</p>
                                    <p className="text-xs text-gray-300 italic">"{r.reviewNotes}"</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

// ─── Help Desk Main Tab ───────────────────────────────────────────────────────
type HelpSection = 'menu' | 'accident-new' | 'accident-history' | 'complaint';

const HelpDeskTab = ({ driver, vehicle }: { driver: Driver, vehicle: Vehicle | null }) => {
    const [section, setSection] = useState<HelpSection>('menu');

    const menuItems = [
        {
            id: 'accident-new' as HelpSection,
            icon: ShieldAlert,
            iconBg: 'bg-red-500/10',
            iconColor: 'text-red-400',
            title: 'Report an Accident',
            subtitle: 'Submit a new accident report with evidence photos',
            badge: 'Emergency',
            badgeColor: 'bg-red-500/20 text-red-400',
        },
        {
            id: 'accident-history' as HelpSection,
            icon: History,
            iconBg: 'bg-orange-500/10',
            iconColor: 'text-orange-400',
            title: 'My Accident Reports',
            subtitle: 'View status and review notes on filed reports',
            badge: null,
            badgeColor: '',
        },
        {
            id: 'complaint' as HelpSection,
            icon: MessageSquare,
            iconBg: 'bg-indigo-500/10',
            iconColor: 'text-indigo-400',
            title: 'Complaints & Enquiries',
            subtitle: 'Submit a complaint or general enquiry to our team',
            badge: null,
            badgeColor: '',
        },
    ];

    if (section !== 'menu') {
        return (
            <div>
                {/* Back Header */}
                <div className="flex items-center gap-3 mb-6">
                    <button
                        onClick={() => setSection('menu')}
                        className="p-2.5 rounded-xl bg-dark-card border border-dark-border text-gray-400 hover:text-white transition-colors"
                    >
                        <ChevronRight size={18} className="rotate-180" />
                    </button>
                    <div>
                        <h2 className="text-base font-black text-white">
                            {section === 'accident-new' && 'Report an Accident'}
                            {section === 'accident-history' && 'My Accident Reports'}
                            {section === 'complaint' && 'Complaints & Enquiries'}
                        </h2>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Help Desk</p>
                    </div>
                </div>

                {section === 'accident-new' && (
                    <AccidentReportForm onSuccess={() => {}} driver={driver} vehicle={vehicle} />
                )}
                {section === 'accident-history' && <MyAccidentReports />}
                {section === 'complaint' && <ComplaintPortal />}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="bg-gradient-to-br from-orange-500/10 via-red-500/5 to-transparent border border-orange-500/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl -mr-6 -mt-6" />
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <ShieldAlert size={18} className="text-red-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Help Desk</span>
                    </div>
                    <h2 className="text-xl font-black text-white tracking-tight">How can we help?</h2>
                    <p className="text-xs text-gray-400 mt-1">Report accidents, file complaints, or submit general enquiries.</p>
                </div>
            </div>

            {/* Menu Items */}
            {menuItems.map(item => {
                const Icon = item.icon;
                return (
                    <button
                        key={item.id}
                        onClick={() => setSection(item.id)}
                        className="w-full flex items-center gap-4 p-5 bg-dark-card border border-dark-border rounded-2xl hover:border-white/10 transition-all group text-left"
                    >
                        <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center ${item.iconColor} shrink-0 group-hover:scale-110 transition-transform`}>
                            <Icon size={22} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                                <p className="text-sm font-black text-white group-hover:text-lime transition-colors">{item.title}</p>
                                {item.badge && (
                                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${item.badgeColor}`}>{item.badge}</span>
                                )}
                            </div>
                            <p className="text-[11px] text-gray-500">{item.subtitle}</p>
                        </div>
                        <ChevronRight size={18} className="text-gray-600 group-hover:text-gray-400 group-hover:translate-x-1 transition-all shrink-0" />
                    </button>
                );
            })}

            {/* Emergency Note */}
            <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/15 flex items-start gap-3">
                <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-gray-400 leading-relaxed">
                    <span className="text-red-400 font-bold">In case of an emergency,</span> always contact local emergency services (100/112) first before filing a report.
                </p>
            </div>
        </div>
    );
};

export default HelpDeskTab;
