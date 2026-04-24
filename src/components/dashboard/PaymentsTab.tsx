import { useState } from 'react';
import { CreditCard, AlertCircle, CheckCircle2, ChevronDown, ChevronUp, History } from 'lucide-react';
import type { Invoice } from '../../types/driver';

interface Props {
    invoices: Invoice[];
}

const PaymentsTab = ({ invoices }: Props) => {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');
    const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

    const pending = invoices
        .filter(i => i.status === 'PENDING' || i.status === 'PARTIAL' || i.status === 'OVERDUE')
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

    const paid = invoices
        .filter(i => i.status === 'PAID')
        .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());

    const totalBalance = invoices.reduce((acc, i) => acc + (i.balance || 0), 0);
    const overdueBalance = invoices
        .filter(i => i.status !== 'PAID' && i.dueDate && new Date(i.dueDate) < new Date())
        .reduce((acc, i) => acc + (i.balance || 0), 0);

    const nextDue = pending[0];

    const displayList = activeTab === 'upcoming' ? pending : paid;

    if (invoices.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-dark-card border border-dark-border rounded-3xl flex items-center justify-center mb-6">
                    <CreditCard size={36} className="text-gray-600" />
                </div>
                <h3 className="text-xl font-black text-white mb-2">No Invoices Yet</h3>
                <p className="text-sm text-gray-500 max-w-xs">Your payment invoices will appear here once a vehicle is assigned and rent is scheduled.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-lime/5 border border-lime/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-lime/10 rounded-full blur-2xl -mr-8 -mt-8" />
                    <p className="text-[10px] font-black uppercase text-lime/60 mb-2 flex items-center gap-1">
                        <AlertCircle size={10} /> Outstanding
                    </p>
                    <p className="text-2xl font-black text-white tracking-tighter">${totalBalance.toLocaleString()}</p>
                    {overdueBalance > 0 && (
                        <div className="mt-2 px-2 py-1 bg-red-500/10 text-red-400 text-[9px] font-black uppercase rounded border border-red-500/20 w-fit">
                            ${overdueBalance.toLocaleString()} overdue
                        </div>
                    )}
                </div>

                <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                    <p className="text-[10px] font-black uppercase text-blue-400/60 mb-2">Next Due</p>
                    {nextDue ? (
                        <>
                            <p className="text-xl font-black text-white tracking-tighter">
                                {new Date(nextDue.dueDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                            </p>
                            <p className="text-xs font-bold text-blue-400 mt-1">${(nextDue.balance || 0).toLocaleString()}</p>
                        </>
                    ) : (
                        <p className="text-sm font-bold text-gray-500">All paid</p>
                    )}
                </div>
            </div>

            {/* Overdue Alert */}
            {overdueBalance > 0 && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center shrink-0">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-red-400">Urgent</p>
                        <p className="text-sm font-bold text-white">You have overdue payments. Please contact your branch.</p>
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-dark-card border border-dark-border rounded-2xl w-fit">
                <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                        activeTab === 'upcoming' ? 'bg-lime text-brand-black' : 'text-gray-500 hover:text-white'
                    }`}
                >
                    Upcoming ({pending.length})
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                        activeTab === 'history' ? 'bg-lime text-brand-black' : 'text-gray-500 hover:text-white'
                    }`}
                >
                    History ({paid.length})
                </button>
            </div>

            {/* Invoice List */}
            <div className="space-y-3">
                {displayList.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-sm text-gray-500">{activeTab === 'upcoming' ? 'No pending payments' : 'No payment history'}</p>
                    </div>
                )}

                {displayList.map((inv, idx) => {
                    const isOverdue = inv.status !== 'PAID' && inv.dueDate && new Date(inv.dueDate) < new Date();
                    const totalDue = inv.totalAmountDue || inv.baseAmount;
                    const amountPaid = inv.amountPaid || 0;
                    const remaining = inv.balance ?? (totalDue - amountPaid);
                    const progressPct = totalDue > 0 ? Math.min(100, (amountPaid / totalDue) * 100) : 0;
                    const isExpanded = expandedWeek === inv.weekNumber;

                    return (
                        <div key={idx} className={`rounded-2xl border transition-all ${
                            isOverdue ? 'bg-red-500/5 border-red-500/20' :
                            inv.status === 'PAID' ? 'bg-lime/5 border-lime/10' :
                            'bg-dark-card border-dark-border'
                        }`}>
                            <div
                                className="flex items-center justify-between p-4 cursor-pointer"
                                onClick={() => setExpandedWeek(isExpanded ? null : inv.weekNumber)}
                            >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                                        inv.status === 'PAID' ? 'bg-lime/20 text-lime' :
                                        isOverdue ? 'bg-red-500/20 text-red-400' :
                                        inv.status === 'PARTIAL' ? 'bg-yellow-500/20 text-yellow-400' :
                                        'bg-white/5 text-gray-500'
                                    }`}>
                                        {inv.weekNumber}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <p className="text-sm font-black text-white">{inv.weekLabel || `Week ${inv.weekNumber}`}</p>
                                            {isOverdue && <span className="text-[8px] font-black text-red-400 uppercase bg-red-500/10 px-1.5 py-0.5 rounded">OVERDUE</span>}
                                            {inv.status === 'PARTIAL' && <span className="text-[8px] font-black text-yellow-400 uppercase bg-yellow-500/10 px-1.5 py-0.5 rounded">PARTIAL</span>}
                                            {inv.invoiceNumber && <span className="text-[8px] font-black text-gray-500 uppercase border border-dark-border px-1.5 py-0.5 rounded">{inv.invoiceNumber}</span>}
                                        </div>
                                        <div className="flex items-center gap-3 mt-1">
                                            <p className="text-[10px] text-gray-500 font-bold">Due: {new Date(inv.dueDate).toLocaleDateString()}</p>
                                            <p className="text-[10px] font-bold text-lime">${totalDue.toLocaleString()}</p>
                                            {inv.carryOverAmount > 0 && <p className="text-[10px] text-orange-400">(+${inv.carryOverAmount} carry over)</p>}
                                        </div>
                                        {inv.status !== 'PAID' && (
                                            <div className="mt-2">
                                                <div className="flex justify-between text-[9px] font-bold mb-1">
                                                    <span className="text-gray-500">Paid: ${amountPaid.toLocaleString()}</span>
                                                    <span className={remaining > 0 ? 'text-orange-400' : 'text-lime'}>Remaining: ${remaining.toLocaleString()}</span>
                                                </div>
                                                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                                                    <div className={`h-full rounded-full transition-all duration-500 ${progressPct >= 100 ? 'bg-lime' : progressPct > 0 ? 'bg-yellow-400' : 'bg-white/5'}`}
                                                        style={{ width: `${progressPct}%` }} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="ml-3 flex items-center gap-2">
                                    {inv.status === 'PAID' && <CheckCircle2 size={16} className="text-lime" />}
                                    {isExpanded ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
                                </div>
                            </div>

                            {/* Payment History Expanded */}
                            {isExpanded && inv.payments && inv.payments.length > 0 && (
                                <div className="px-4 pb-4">
                                    <div className="border-t border-dark-border pt-3 space-y-2">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-1">
                                            <History size={10} /> Payment History ({inv.payments.length})
                                        </p>
                                        {inv.payments.map((p, pIdx) => (
                                            <div key={pIdx} className="flex items-center justify-between p-2.5 rounded-lg bg-white/5">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-lime/10 text-lime flex items-center justify-center text-[9px] font-bold">{pIdx + 1}</div>
                                                    <div>
                                                        <p className="text-xs font-bold text-white">${p.amount.toLocaleString()}</p>
                                                        <p className="text-[9px] text-gray-500">{p.paymentMethod || 'Cash'}</p>
                                                    </div>
                                                </div>
                                                <span className="text-[9px] text-gray-500">{new Date(p.paidAt).toLocaleDateString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PaymentsTab;
