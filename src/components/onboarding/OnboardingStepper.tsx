import { CheckCircle, Circle } from 'lucide-react';
import type { DriverStatus } from '../../types/driver';

const STEPS = [
    { id: 'DRAFT' as const, label: 'Application', sub: 'Personal Details' },
    { id: 'PENDING REVIEW' as const, label: 'Under Review', sub: 'Staff Verification' },
    { id: 'VERIFICATION' as const, label: 'Verification', sub: 'Docs Check' },
    { id: 'CREDIT CHECK' as const, label: 'Credit Check', sub: 'Risk Assessment' },
    { id: 'APPROVED' as const, label: 'Approved', sub: 'Ready to Go' },
    { id: 'ACTIVE' as const, label: 'Active', sub: 'Onboarded' },
];

interface Props {
    currentStatus: DriverStatus;
}

const OnboardingStepper = ({ currentStatus }: Props) => {
    const statusOrder = ['DRAFT', 'PENDING REVIEW', 'VERIFICATION', 'CREDIT CHECK', 'MANAGER REVIEW', 'APPROVED', 'CONTRACT PENDING', 'ACTIVE'];
    const currentIdx = statusOrder.indexOf(currentStatus);

    let visualIdx = STEPS.findIndex(s => s.id === currentStatus);
    if (currentStatus === 'MANAGER REVIEW') visualIdx = 3;
    if (currentStatus === 'CONTRACT PENDING') visualIdx = 4;
    if (visualIdx === -1 && currentIdx > 0) visualIdx = STEPS.length - 1;

    const progress = visualIdx >= 0 ? (visualIdx / (STEPS.length - 1)) * 100 : 0;

    return (
        <div className="p-5 rounded-2xl bg-dark-card border border-dark-border">
            <div className="flex justify-between relative">
                {/* Background track */}
                <div className="absolute top-5 left-0 w-full h-0.5 bg-dark-border" />
                {/* Progress bar */}
                <div
                    className="absolute top-5 left-0 h-0.5 bg-lime transition-all duration-700 ease-out"
                    style={{ width: `${progress}%` }}
                />

                {STEPS.map((step, i) => {
                    const isCompleted = i < visualIdx;
                    const isCurrent = i === visualIdx;

                    return (
                        <div key={step.id} className="relative z-10 flex flex-col items-center" style={{ width: `${100 / STEPS.length}%` }}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                                isCompleted ? 'bg-lime border-lime text-brand-black' :
                                isCurrent ? 'bg-transparent border-lime text-lime shadow-lg shadow-lime/20' :
                                'bg-dark-card border-dark-border text-gray-600'
                            }`}>
                                {isCompleted ? <CheckCircle size={22} /> : <Circle size={16} className={isCurrent ? 'fill-lime' : ''} />}
                            </div>
                            <div className="mt-2 text-center">
                                <div className={`text-[10px] font-black uppercase tracking-wider ${isCurrent ? 'text-lime' : 'text-gray-500'}`}>
                                    {step.label}
                                </div>
                                {isCurrent && (
                                    <div className="text-[9px] font-bold text-lime/70 animate-pulse mt-0.5">In Progress</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OnboardingStepper;
