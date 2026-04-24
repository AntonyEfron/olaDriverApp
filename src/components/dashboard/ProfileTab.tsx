import { User, Mail, Phone, Calendar, Globe, MapPin, FileText, ShieldCheck, Clock } from 'lucide-react';
import type { Driver } from '../../types/driver';

interface Props {
    driver: Driver;
    onLogout: () => void;
}

const InfoCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: string | undefined | null }) => (
    <div className="py-3 border-b border-dark-border last:border-0">
        <div className="flex items-center gap-2 mb-1">
            <Icon size={12} className="text-lime" />
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{label}</p>
        </div>
        <p className="text-sm font-bold text-white pl-5">{value || 'N/A'}</p>
    </div>
);

const ProfileTab = ({ driver, onLogout }: Props) => {
    const p = driver.personalInfo;
    const dl = driver.drivingLicense;
    const bg = driver.backgroundCheck;
    const ec = driver.emergencyContact;
    const branch = typeof driver.branch === 'object' ? driver.branch?.name : driver.branch;

    return (
        <div className="space-y-6">
            {/* Profile Header */}
            <div className="bg-dark-card border border-dark-border rounded-3xl p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-lime/5 to-transparent" />
                <div className="relative z-10">
                    {p?.photograph ? (
                        <img
                            src={p.photograph.startsWith('http') ? p.photograph : `${import.meta.env.VITE_S3_BASE_URL || ''}/${p.photograph}`}
                            alt="Profile"
                            className="w-20 h-20 rounded-2xl object-cover mx-auto border-3 border-lime/30 mb-4"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-2xl bg-lime/10 flex items-center justify-center mx-auto mb-4">
                            <User size={32} className="text-lime" />
                        </div>
                    )}
                    <h2 className="text-xl font-black text-white tracking-tight">{p?.fullName}</h2>
                    <p className="text-sm text-gray-500 mt-1">{p?.email}</p>
                    <div className="mt-3 flex items-center justify-center gap-2">
                        <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-lg border ${
                            driver.status === 'ACTIVE' ? 'bg-lime/10 text-lime border-lime/20' :
                            driver.status === 'SUSPENDED' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                            'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        }`}>
                            {driver.status}
                        </span>
                    </div>
                </div>
            </div>

            {/* Personal Details */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-lime/10 rounded-lg"><User size={16} className="text-lime" /></div>
                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-wider">Personal Info</h3>
                </div>
                <InfoCard icon={Mail} label="Email" value={p?.email} />
                <InfoCard icon={Phone} label="Phone" value={p?.phone} />
                <InfoCard icon={Phone} label="WhatsApp" value={p?.whatsappNumber} />
                <InfoCard icon={Calendar} label="Date of Birth" value={p?.dateOfBirth ? new Date(p.dateOfBirth).toLocaleDateString() : undefined} />
                <InfoCard icon={Globe} label="Nationality" value={p?.nationality} />
                <InfoCard icon={MapPin} label="Branch" value={branch} />
                <InfoCard icon={Calendar} label="Joined" value={new Date(driver.createdAt).toLocaleDateString()} />
            </div>

            {/* Driving License */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-lime/10 rounded-lg"><FileText size={16} className="text-lime" /></div>
                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-wider">Driving License</h3>
                </div>
                <InfoCard icon={FileText} label="License Number" value={dl?.licenseNumber} />
                <InfoCard icon={Globe} label="Country" value={dl?.licenseCountry} />
                <InfoCard icon={ShieldCheck} label="Verification" value={dl?.verificationStatus} />
                <InfoCard icon={FileText} label="Categories" value={dl?.categories?.join(', ')} />
            </div>

            {/* Emergency Contact */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-red-500/10 rounded-lg"><ShieldCheck size={16} className="text-red-400" /></div>
                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-wider">Emergency Contact</h3>
                </div>
                <InfoCard icon={User} label="Name" value={ec?.name} />
                <InfoCard icon={Phone} label="Phone" value={ec?.phone} />
                <InfoCard icon={User} label="Relationship" value={ec?.relationship} />
            </div>

            {/* Background Check */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-purple-500/10 rounded-lg"><ShieldCheck size={16} className="text-purple-400" /></div>
                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-wider">Background Check</h3>
                </div>
                <InfoCard icon={ShieldCheck} label="Status" value={bg?.status} />
            </div>

            {/* Status History */}
            {driver.statusHistory && driver.statusHistory.length > 0 && (
                <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-blue-500/10 rounded-lg"><Clock size={16} className="text-blue-400" /></div>
                        <h3 className="text-xs font-black text-gray-500 uppercase tracking-wider">Application History</h3>
                    </div>
                    <div className="space-y-3">
                        {[...driver.statusHistory].reverse().map((entry, i) => (
                            <div key={i} className="flex items-start gap-3 py-2 border-b border-dark-border last:border-0">
                                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${i === 0 ? 'bg-lime' : 'bg-gray-600'}`} />
                                <div>
                                    <p className="text-sm font-bold text-white">{entry.status}</p>
                                    <p className="text-[10px] text-gray-500">
                                        {new Date(entry.timestamp).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                    {entry.notes && <p className="text-[10px] text-gray-400 mt-0.5">{entry.notes}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Logout */}
            <button
                onClick={onLogout}
                className="w-full py-4 bg-red-500/10 border border-red-500/20 text-red-400 font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-red-500/20 transition-all active:scale-[0.98]"
            >
                Log Out
            </button>
        </div>
    );
};

export default ProfileTab;
