import { Car, Gauge, Fuel, Calendar, MapPin, Hash, Palette, Settings, Shield, AlertTriangle } from 'lucide-react';
import type { Vehicle } from '../../types/driver';

interface Props {
    vehicle: Vehicle | null;
}

const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string | number | undefined }) => (
    <div className="flex items-center gap-3 py-3 border-b border-dark-border last:border-0">
        <div className="p-2 bg-lime/5 rounded-lg shrink-0"><Icon size={14} className="text-lime" /></div>
        <div className="flex-1">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{label}</p>
            <p className="text-sm font-bold text-white">{value || 'N/A'}</p>
        </div>
    </div>
);

const VehicleDetails = ({ vehicle }: Props) => {
    if (!vehicle) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-dark-card border border-dark-border rounded-3xl flex items-center justify-center mb-6">
                    <Car size={36} className="text-gray-600" />
                </div>
                <h3 className="text-xl font-black text-white mb-2">No Vehicle Assigned</h3>
                <p className="text-sm text-gray-500 max-w-xs">You haven't been assigned a vehicle yet. Contact your branch manager for more details.</p>
            </div>
        );
    }

    const b = vehicle.basicDetails;
    const l = vehicle.legalDocs;
    const ins = vehicle.insuranceDetails;
    const m = vehicle.maintenanceDetails;

    const odometer = b?.odometer || 0;
    const threshold = m?.maintenanceThresholdKm || 0;
    const lastMaintenance = m?.lastMaintenanceOdometer || 0;
    const kmSinceService = odometer - lastMaintenance;
    const maintenanceAlert = threshold > 0 && kmSinceService >= threshold;
    const maintenanceProgress = threshold > 0 ? Math.min(100, (kmSinceService / threshold) * 100) : 0;

    const daysToInsurance = ins?.toDate
        ? Math.ceil((new Date(ins.toDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        : null;

    return (
        <div className="space-y-6">
            {/* Vehicle Header Card */}
            <div className="bg-gradient-to-br from-dark-card to-dark-card border border-dark-border rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-lime/5 rounded-full blur-3xl -mr-16 -mt-16" />
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 bg-lime/10 rounded-xl"><Car size={22} className="text-lime" /></div>
                        <div className="px-2 py-1 bg-lime/10 rounded-lg text-lime text-[9px] font-black uppercase">{vehicle.status}</div>
                    </div>
                    <h2 className="text-2xl font-black text-white tracking-tight">{b?.make} {b?.model}</h2>
                    <p className="text-sm text-gray-400 mt-1">{b?.year} • {b?.fuelType} • {b?.transmission}</p>
                    {l?.registrationNumber && (
                        <div className="mt-4 inline-block px-4 py-2 bg-brand-black rounded-xl border border-dark-border">
                            <p className="text-xs font-black text-lime tracking-widest">{l.registrationNumber}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Specifications */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-wider mb-3">Specifications</h3>
                <InfoRow icon={MapPin} label="Branch" value={(vehicle.purchaseDetails?.branch as any)?.name} />
                <InfoRow icon={Hash} label="Fleet Number" value={b?.fleetNumber} />
                <InfoRow icon={Palette} label="Colour" value={b?.colour} />
                <InfoRow icon={Settings} label="Engine" value={b?.engineCapacity ? `${b.engineCapacity}cc` : undefined} />
                <InfoRow icon={Hash} label="VIN" value={b?.vin} />
                <InfoRow icon={Gauge} label="Odometer" value={odometer ? `${odometer.toLocaleString()} km` : undefined} />
                <InfoRow icon={Fuel} label="Fuel Type" value={b?.fuelType} />
                <InfoRow icon={Car} label="Body Type" value={b?.bodyType} />
            </div>

            {/* Legal & Compliance */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-wider mb-3">Legal & Compliance</h3>
                <InfoRow icon={Hash} label="Registration No." value={l?.registrationNumber} />
                <InfoRow icon={Calendar} label="Reg. Expiry" value={l?.registrationExpiry ? new Date(l.registrationExpiry).toLocaleDateString() : undefined} />
                <InfoRow icon={Calendar} label="Road Tax Expiry" value={l?.roadTaxExpiry ? new Date(l.roadTaxExpiry).toLocaleDateString() : undefined} />
                <InfoRow icon={Shield} label="Roadworthiness Expiry" value={l?.roadworthinessExpiry ? new Date(l.roadworthinessExpiry).toLocaleDateString() : undefined} />
            </div>

            {/* GPS & Security */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-wider mb-3">GPS & Security</h3>
                <InfoRow icon={MapPin} label="GPS Serial" value={b?.gpsSerialNumber} />
                <InfoRow icon={Shield} label="Geofence" value={vehicle.gpsConfiguration?.geofenceZone || 'Global'} />
                <InfoRow icon={Gauge} label="Speed Limit" value={vehicle.gpsConfiguration?.speedLimitThreshold ? `${vehicle.gpsConfiguration.speedLimitThreshold} km/h` : 'No Limit'} />
            </div>

            {/* Rental Info */}
            {b?.weeklyRent && (
                <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-wider mb-3">Rental Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-lime/5 border border-lime/10 rounded-2xl text-center">
                            <p className="text-2xl font-black text-lime">${b.weeklyRent.toLocaleString()}</p>
                            <p className="text-[9px] font-bold text-gray-500 uppercase mt-1">Weekly Rent</p>
                        </div>
                        <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl text-center">
                            <p className="text-2xl font-black text-blue-400">{b.leaseDurationWeeks || '--'}</p>
                            <p className="text-[9px] font-bold text-gray-500 uppercase mt-1">Lease Weeks</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Maintenance Status */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-wider">Maintenance</h3>
                    {maintenanceAlert && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                            <AlertTriangle size={10} className="text-orange-400" />
                            <span className="text-[9px] font-black text-orange-400 uppercase">Service Due</span>
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <div className="flex justify-between text-[10px] font-bold mb-1.5">
                        <span className="text-gray-500">{kmSinceService.toLocaleString()} km since service</span>
                        <span className={maintenanceAlert ? 'text-orange-400' : 'text-lime'}>{threshold > 0 ? `${threshold.toLocaleString()} km threshold` : 'No threshold set'}</span>
                    </div>
                    <div className="w-full h-2.5 bg-dark-border rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-700 ${maintenanceAlert ? 'bg-orange-500' : 'bg-lime'}`}
                            style={{ width: `${maintenanceProgress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Insurance */}
            {ins && (
                <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs font-black text-gray-500 uppercase tracking-wider">Insurance</h3>
                        {daysToInsurance !== null && daysToInsurance <= 30 && (
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg border ${daysToInsurance <= 0 ? 'bg-red-500/10 border-red-500/20' : 'bg-yellow-500/10 border-yellow-500/20'}`}>
                                <Shield size={10} className={daysToInsurance <= 0 ? 'text-red-400' : 'text-yellow-400'} />
                                <span className={`text-[9px] font-black uppercase ${daysToInsurance <= 0 ? 'text-red-400' : 'text-yellow-400'}`}>
                                    {daysToInsurance <= 0 ? 'Expired' : `${daysToInsurance}d left`}
                                </span>
                            </div>
                        )}
                    </div>
                    <InfoRow icon={Shield} label="Provider" value={ins.provider} />
                    <InfoRow icon={Hash} label="Policy Number" value={ins.insuranceNumber} />
                    <InfoRow icon={Calendar} label="Coverage Period" value={
                        ins.fromDate && ins.toDate
                            ? `${new Date(ins.fromDate).toLocaleDateString()} — ${new Date(ins.toDate).toLocaleDateString()}`
                            : undefined
                    } />
                    <InfoRow icon={Shield} label="Coverage Type" value={ins.coverageType} />
                </div>
            )}
        </div>
    );
};

export default VehicleDetails;
