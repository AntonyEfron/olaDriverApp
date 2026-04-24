import { Gauge, MapPin, Star, Zap, AlertTriangle, CreditCard, TrendingUp, Shield } from 'lucide-react';
import type { Driver, Invoice, Vehicle } from '../../types/driver';

interface Props {
    driver: Driver;
    vehicle: Vehicle | null;
    invoices: Invoice[];
}

const DashboardHome = ({ driver, vehicle, invoices }: Props) => {
    const performance = driver.performance;
    const pendingInvoices = invoices.filter(i => i.status === 'PENDING' || i.status === 'PARTIAL' || i.status === 'OVERDUE');
    const overdueInvoices = invoices.filter(i => i.status !== 'PAID' && i.dueDate && new Date(i.dueDate) < new Date());
    const totalOutstanding = pendingInvoices.reduce((acc, i) => acc + (i.balance || 0), 0);
    const overdueAmount = overdueInvoices.reduce((acc, i) => acc + (i.balance || 0), 0);

    // Next payment
    const nextPayment = pendingInvoices
        .filter(i => i.dueDate && new Date(i.dueDate) >= new Date())
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0];

    // Vehicle alerts
    const odometer = vehicle?.basicDetails?.odometer || 0;
    const threshold = vehicle?.maintenanceDetails?.maintenanceThresholdKm || 0;
    const lastMaintenance = vehicle?.maintenanceDetails?.lastMaintenanceOdometer || 0;
    const kmSinceService = odometer - lastMaintenance;
    const maintenanceAlert = threshold > 0 && kmSinceService >= threshold;

    const insuranceExpiry = vehicle?.insuranceDetails?.toDate;
    const daysToInsurance = insuranceExpiry
        ? Math.ceil((new Date(insuranceExpiry).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        : null;
    const insuranceAlert = daysToInsurance !== null && daysToInsurance <= 30;

    return (
        <div className="space-y-6">
            {/* Welcome */}
            <div className="bg-gradient-to-br from-lime/10 to-transparent border border-lime/20 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-lime/10 rounded-full blur-2xl -mr-10 -mt-10" />
                <div className="relative z-10">
                    <p className="text-xs text-lime font-black uppercase tracking-widest mb-1">Welcome back</p>
                    <h2 className="text-2xl font-black text-white tracking-tight">{driver.personalInfo?.fullName}</h2>
                    <p className="text-sm text-gray-400 mt-1">
                        {vehicle ? `${vehicle.basicDetails?.make} ${vehicle.basicDetails?.model}` : 'No vehicle assigned'}
                    </p>
                </div>
            </div>

            {/* Alerts */}
            {overdueAmount > 0 && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-500/20">
                        <AlertTriangle size={22} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-red-400">Overdue Payment</p>
                        <p className="text-sm font-bold text-white">${overdueAmount.toLocaleString()} overdue across {overdueInvoices.length} invoice(s)</p>
                    </div>
                </div>
            )}

            {maintenanceAlert && (
                <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0">
                        <Zap size={22} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-orange-400">Maintenance Due</p>
                        <p className="text-sm font-bold text-white">{kmSinceService.toLocaleString()} km since last service (threshold: {threshold.toLocaleString()} km)</p>
                    </div>
                </div>
            )}

            {insuranceAlert && (
                <div className="p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500 text-black flex items-center justify-center shrink-0">
                        <Shield size={22} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-yellow-400">Insurance Expiring</p>
                        <p className="text-sm font-bold text-white">
                            {daysToInsurance! <= 0 ? 'Insurance has expired!' : `Insurance expires in ${daysToInsurance} day(s)`}
                            {insuranceExpiry && ` — ${new Date(insuranceExpiry).toLocaleDateString()}`}
                        </p>
                    </div>
                </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-dark-card border border-dark-border rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <Star size={16} className="text-lime" />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Driving Score</span>
                    </div>
                    <p className="text-3xl font-black text-white tracking-tighter">{performance?.drivingScore || 0}<span className="text-sm text-gray-500">/100</span></p>
                </div>

                <div className="bg-dark-card border border-dark-border rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <MapPin size={16} className="text-lime" />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Total Distance</span>
                    </div>
                    <p className="text-3xl font-black text-white tracking-tighter">{(performance?.totalDistance || 0).toLocaleString()}<span className="text-sm text-gray-500"> km</span></p>
                </div>

                <div className="bg-dark-card border border-dark-border rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <Gauge size={16} className="text-lime" />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Avg Speed</span>
                    </div>
                    <p className="text-3xl font-black text-white tracking-tighter">{performance?.avgSpeed || 0}<span className="text-sm text-gray-500"> km/h</span></p>
                </div>

                <div className="bg-dark-card border border-dark-border rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <TrendingUp size={16} className="text-lime" />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Fuel Efficiency</span>
                    </div>
                    <p className="text-3xl font-black text-white tracking-tighter">{performance?.fuelEfficiency || 0}<span className="text-sm text-gray-500"> km/L</span></p>
                </div>
            </div>

            {/* Next Payment */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                    <CreditCard size={16} className="text-lime" />
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Payment Overview</span>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500 font-bold">Total Outstanding</p>
                        <p className="text-2xl font-black text-white tracking-tighter">${totalOutstanding.toLocaleString()}</p>
                    </div>
                    {nextPayment && (
                        <div className="text-right">
                            <p className="text-xs text-gray-500 font-bold">Next Due</p>
                            <p className="text-lg font-black text-lime">{new Date(nextPayment.dueDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}</p>
                            <p className="text-[10px] text-gray-500 font-bold">${(nextPayment.balance || 0).toLocaleString()}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Safety Events */}
            {performance?.safetyEvents && (
                <div className="bg-dark-card border border-dark-border rounded-2xl p-5">
                    <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-wider mb-4">Safety Events</h3>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                            <p className="text-xl font-black text-red-400">{performance.safetyEvents.braking}</p>
                            <p className="text-[9px] font-bold text-gray-500 uppercase mt-1">Hard Braking</p>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-orange-500/5 border border-orange-500/10">
                            <p className="text-xl font-black text-orange-400">{performance.safetyEvents.speeding}</p>
                            <p className="text-[9px] font-bold text-gray-500 uppercase mt-1">Speeding</p>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
                            <p className="text-xl font-black text-yellow-400">{performance.safetyEvents.acceleration}</p>
                            <p className="text-[9px] font-bold text-gray-500 uppercase mt-1">Acceleration</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardHome;
