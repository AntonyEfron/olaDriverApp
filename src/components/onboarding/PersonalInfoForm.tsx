import { useState } from 'react';
import { User, Save, Loader2, CheckCircle, Globe, Users } from 'lucide-react';
import type { Driver } from '../../types/driver';

interface Props {
    driver: Driver;
    onSave: (data: any) => Promise<void>;
}

const PersonalInfoForm = ({ driver, onSave }: Props) => {
    const [form, setForm] = useState({
        fullName: driver.personalInfo?.fullName || '',
        email: driver.personalInfo?.email || '',
        phone: driver.personalInfo?.phone || '',
        whatsappNumber: driver.personalInfo?.whatsappNumber || '',
        dateOfBirth: driver.personalInfo?.dateOfBirth?.split('T')[0] || '',
        nationality: driver.personalInfo?.nationality || '',
        idType: driver.identityDocs?.idType || '',
        idNumber: driver.identityDocs?.idNumber || '',
        emergencyName: driver.emergencyContact?.name || '',
        emergencyPhone: driver.emergencyContact?.phone || '',
        emergencyRelationship: driver.emergencyContact?.relationship || '',
        licenseNumber: driver.drivingLicense?.licenseNumber || '',
        licenseCountry: driver.drivingLicense?.licenseCountry || '',
    });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (saved) setSaved(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await onSave({
                personalInfo: {
                    fullName: form.fullName,
                    email: form.email,
                    phone: form.phone,
                    whatsappNumber: form.whatsappNumber,
                    dateOfBirth: form.dateOfBirth || undefined,
                    nationality: form.nationality,
                },
                identityDocs: {
                    idType: form.idType || undefined,
                    idNumber: form.idNumber,
                },
                emergencyContact: {
                    name: form.emergencyName,
                    phone: form.emergencyPhone,
                    relationship: form.emergencyRelationship,
                },
                drivingLicense: {
                    licenseNumber: form.licenseNumber,
                    licenseCountry: form.licenseCountry,
                },
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch {
            // error handled by parent
        } finally {
            setSaving(false);
        }
    };

    const inputClass = "w-full px-4 py-3 bg-brand-black border-2 border-dark-border rounded-xl text-white placeholder-gray-600 focus:border-lime focus:outline-none focus:ring-2 focus:ring-lime/20 transition-all text-sm";

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Details */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                    <div className="p-2 bg-lime/10 rounded-lg"><User size={18} className="text-lime" /></div>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">Personal Details</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Full Name *</label>
                        <input name="fullName" value={form.fullName} onChange={handleChange} required placeholder="John Doe" className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Email *</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} required disabled className={`${inputClass} opacity-60`} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Phone *</label>
                        <input name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="+1 234 567 8900" className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">WhatsApp</label>
                        <input name="whatsappNumber" type="tel" value={form.whatsappNumber} onChange={handleChange} placeholder="Optional" className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Date of Birth</label>
                        <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Nationality</label>
                        <input name="nationality" value={form.nationality} onChange={handleChange} placeholder="e.g. South African" className={inputClass} />
                    </div>
                </div>
            </div>

            {/* Identity Documents */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                    <div className="p-2 bg-lime/10 rounded-lg"><Globe size={18} className="text-lime" /></div>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">Identity & License</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">ID Type</label>
                        <select name="idType" value={form.idType} onChange={handleChange} className={inputClass}>
                            <option value="">Select</option>
                            <option value="National ID">National ID</option>
                            <option value="Passport">Passport</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">ID Number</label>
                        <input name="idNumber" value={form.idNumber} onChange={handleChange} placeholder="ID / Passport number" className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">License Number *</label>
                        <input name="licenseNumber" value={form.licenseNumber} onChange={handleChange} required placeholder="DL-1234567" className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">License Country</label>
                        <input name="licenseCountry" value={form.licenseCountry} onChange={handleChange} placeholder="e.g. South Africa" className={inputClass} />
                    </div>
                </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                    <div className="p-2 bg-red-500/10 rounded-lg"><Users size={18} className="text-red-500" /></div>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">Emergency Contact</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Contact Name *</label>
                        <input name="emergencyName" value={form.emergencyName} onChange={handleChange} required placeholder="Jane Doe" className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Contact Phone *</label>
                        <input name="emergencyPhone" type="tel" value={form.emergencyPhone} onChange={handleChange} required placeholder="+1 234 567 8900" className={inputClass} />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Relationship</label>
                        <input name="emergencyRelationship" value={form.emergencyRelationship} onChange={handleChange} placeholder="e.g. Spouse, Parent" className={inputClass} />
                    </div>
                </div>
            </div>

            <button type="submit" disabled={saving}
                className="w-full py-4 bg-lime text-brand-black font-black text-sm uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:shadow-[0_8px_32px_rgba(210,238,0,0.3)] transition-all active:scale-[0.98] disabled:opacity-50">
                {saving ? <Loader2 size={20} className="animate-spin" /> : saved ? <><CheckCircle size={20} /><span>Saved!</span></> : <><Save size={18} /><span>Save & Continue</span></>}
            </button>
        </form>
    );
};

export default PersonalInfoForm;
