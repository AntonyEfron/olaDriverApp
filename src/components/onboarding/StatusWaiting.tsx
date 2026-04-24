import { Clock, CheckCircle, XCircle, ShieldCheck, AlertTriangle } from 'lucide-react';
import type { DriverStatus } from '../../types/driver';

interface Props {
    status: DriverStatus;
}

const STATUS_CONFIG: Record<string, { title: string; description: string; icon: any; color: string; bgColor: string }> = {
    'PENDING REVIEW': {
        title: 'Application Under Review',
        description: 'Our team is reviewing your submitted documents and personal information. This usually takes 1-2 business days.',
        icon: Clock,
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/10 border-blue-500/20',
    },
    'VERIFICATION': {
        title: 'Document Verification',
        description: 'Your driving license and background check are being verified. We\'ll update you once the verification is complete.',
        icon: ShieldCheck,
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/10 border-purple-500/20',
    },
    'CREDIT CHECK': {
        title: 'Credit Assessment in Progress',
        description: 'Your credit assessment is currently being processed. This is a standard procedure and typically completes within 24 hours.',
        icon: Clock,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/10 border-yellow-500/20',
    },
    'MANAGER REVIEW': {
        title: 'Manager Review Required',
        description: 'Your application requires additional review by a branch manager. We\'ll notify you once a decision is made.',
        icon: AlertTriangle,
        color: 'text-orange-400',
        bgColor: 'bg-orange-500/10 border-orange-500/20',
    },
    'APPROVED': {
        title: 'Application Approved! 🎉',
        description: 'Congratulations! Your application has been approved. Our team will activate your account shortly and assign you a vehicle.',
        icon: CheckCircle,
        color: 'text-lime',
        bgColor: 'bg-lime/10 border-lime/20',
    },
    'CONTRACT PENDING': {
        title: 'Contract Pending',
        description: 'Your contract is being prepared. You\'ll receive it for review and signature soon.',
        icon: Clock,
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/10 border-blue-500/20',
    },
    'REJECTED': {
        title: 'Application Not Approved',
        description: 'Unfortunately, your application was not approved at this time. Please contact our support team for more information.',
        icon: XCircle,
        color: 'text-red-400',
        bgColor: 'bg-red-500/10 border-red-500/20',
    },
    'SUSPENDED': {
        title: 'Account Suspended',
        description: 'Your account has been temporarily suspended. Please contact support for assistance.',
        icon: AlertTriangle,
        color: 'text-red-400',
        bgColor: 'bg-red-500/10 border-red-500/20',
    },
};

const StatusWaiting = ({ status }: Props) => {
    const config = STATUS_CONFIG[status];
    if (!config) return null;

    const Icon = config.icon;

    return (
        <div className={`rounded-3xl border p-8 text-center ${config.bgColor}`}>
            <div className={`w-20 h-20 rounded-3xl ${config.bgColor} flex items-center justify-center mx-auto mb-6`}>
                <Icon size={36} className={config.color} />
            </div>
            <h2 className={`text-2xl font-black tracking-tight mb-3 ${config.color}`}>{config.title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">{config.description}</p>

            {status !== 'REJECTED' && status !== 'SUSPENDED' && status !== 'APPROVED' && (
                <div className="mt-8 flex items-center justify-center gap-2">
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-lime animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-lime animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full bg-lime animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-2">Processing</span>
                </div>
            )}
        </div>
    );
};

export default StatusWaiting;
