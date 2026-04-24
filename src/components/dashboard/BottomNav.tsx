import { Home, Car, CreditCard, UserCircle } from 'lucide-react';

interface Props {
    active: string;
    onChange: (tab: string) => void;
}

const TABS = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'vehicle', label: 'Vehicle', icon: Car },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'profile', label: 'Profile', icon: UserCircle },
];

const BottomNav = ({ active, onChange }: Props) => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-dark-card/95 backdrop-blur-xl border-t border-dark-border safe-area-bottom">
            <div className="max-w-2xl mx-auto flex items-center justify-around py-2 px-2">
                {TABS.map(tab => {
                    const Icon = tab.icon;
                    const isActive = active === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onChange(tab.id)}
                            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                                isActive
                                    ? 'text-lime'
                                    : 'text-gray-500 hover:text-gray-300'
                            }`}
                        >
                            <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-lime/10' : ''}`}>
                                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
                            </div>
                            <span className={`text-[9px] font-black uppercase tracking-wider ${isActive ? 'text-lime' : ''}`}>
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNav;
