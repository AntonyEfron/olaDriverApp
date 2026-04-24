import { useState, useRef } from 'react';
import { FileCheck, Loader2, Camera } from 'lucide-react';
import type { Driver } from '../../types/driver';

interface Props {
    driver: Driver;
    onUpload: (formData: FormData) => Promise<void>;
}

const DOCUMENT_FIELDS = [
    { key: 'photograph', label: 'Photograph', desc: 'Clear headshot photo', icon: Camera, check: (d: Driver) => !!d.personalInfo?.photograph },
    { key: 'idFrontImage', label: 'ID Front', desc: 'National ID or Passport front', icon: FileCheck, check: (d: Driver) => !!d.identityDocs?.idFrontImage },
    { key: 'idBackImage', label: 'ID Back', desc: 'National ID or Passport back', icon: FileCheck, check: (d: Driver) => !!d.identityDocs?.idBackImage },
    { key: 'licenseFront', label: 'License Front', desc: 'Driving license front side', icon: FileCheck, check: (d: Driver) => !!d.drivingLicense?.frontImage },
    { key: 'licenseBack', label: 'License Back', desc: 'Driving license back side', icon: FileCheck, check: (d: Driver) => !!d.drivingLicense?.backImage },
    { key: 'backgroundCheckDocument', label: 'Background Check', desc: 'Police clearance certificate', icon: FileCheck, check: (d: Driver) => !!d.backgroundCheck?.document },
    { key: 'addressProofDocument', label: 'Address Proof', desc: 'Utility bill or bank statement (< 3 months)', icon: FileCheck, check: (d: Driver) => !!d.addressProof?.document },
    { key: 'consentForm', label: 'Credit Consent', desc: 'Signed credit check consent form', icon: FileCheck, check: (d: Driver) => !!d.creditCheck?.consentForm },
];

const DocumentUploadForm = ({ driver, onUpload }: Props) => {
    const [uploading, setUploading] = useState<string | null>(null);
    const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

    const handleFileSelect = async (fieldKey: string, file: File) => {
        setUploading(fieldKey);
        try {
            const formData = new FormData();
            formData.append(fieldKey, file);
            await onUpload(formData);
        } catch (err) {
            console.error(`Upload failed for ${fieldKey}:`, err);
        } finally {
            setUploading(null);
        }
    };

    const uploaded = DOCUMENT_FIELDS.filter(f => f.check(driver)).length;
    const total = DOCUMENT_FIELDS.length;
    const progress = (uploaded / total) * 100;

    return (
        <div className="space-y-6">
            {/* Progress */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">Documents Progress</h3>
                    <span className="text-xs font-black text-lime">{uploaded}/{total}</span>
                </div>
                <div className="w-full h-2 bg-dark-border rounded-full overflow-hidden">
                    <div className="h-full bg-lime rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
                </div>
            </div>

            {/* Document Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DOCUMENT_FIELDS.map((field) => {
                    const isUploaded = field.check(driver);
                    const isCurrentlyUploading = uploading === field.key;
                    const Icon = field.icon;

                    return (
                        <div
                            key={field.key}
                            className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer group ${
                                isUploaded
                                    ? 'bg-lime/5 border-lime/30 hover:border-lime/50'
                                    : 'bg-dark-card border-dark-border hover:border-gray-600'
                            }`}
                            onClick={() => !isCurrentlyUploading && fileRefs.current[field.key]?.click()}
                        >
                            <input
                                type="file"
                                accept="image/*,.pdf"
                                ref={el => { fileRefs.current[field.key] = el; }}
                                className="hidden"
                                onChange={e => {
                                    const f = e.target.files?.[0];
                                    if (f) handleFileSelect(field.key, f);
                                    e.target.value = '';
                                }}
                            />

                            <div className="flex items-start gap-3">
                                <div className={`p-2.5 rounded-xl shrink-0 ${isUploaded ? 'bg-lime/10 text-lime' : 'bg-white/5 text-gray-500'}`}>
                                    {isCurrentlyUploading ? <Loader2 size={20} className="animate-spin text-lime" /> : <Icon size={20} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h4 className={`text-sm font-bold ${isUploaded ? 'text-lime' : 'text-white'}`}>{field.label}</h4>
                                        {isUploaded && <FileCheck size={14} className="text-lime shrink-0" />}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-0.5">{field.desc}</p>
                                    <p className={`text-[10px] font-bold uppercase mt-2 ${isUploaded ? 'text-lime/70' : 'text-gray-600'}`}>
                                        {isCurrentlyUploading ? 'Uploading...' : isUploaded ? '✓ Uploaded — tap to replace' : 'Tap to upload'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DocumentUploadForm;
