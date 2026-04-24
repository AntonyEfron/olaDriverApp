import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, Loader2, CheckCircle } from 'lucide-react';

const SignupPage = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ fullName: '', email: '', phone: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (error) setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!form.fullName.trim()) { setError('Full name is required'); return; }
        if (!form.email) { setError('Email is required'); return; }
        if (!form.phone) { setError('Phone number is required'); return; }

        setLoading(true);
        try {
            await signup({ fullName: form.fullName, email: form.email, phone: form.phone });
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2500);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-brand-black flex items-center justify-center p-4">
                <div className="text-center animate-fadeInUp">
                    <div className="w-20 h-20 bg-lime/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} className="text-lime" />
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tight mb-2">Account Created!</h2>
                    <p className="text-gray-500 text-sm">Redirecting you to login...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-black flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] bg-lime/8 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-15%] right-[-8%] w-[35%] h-[50%] bg-lime/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-white tracking-tighter">OLA <span className="text-lime">CARS</span></h1>
                    <p className="text-xs text-gray-500 uppercase tracking-[4px] mt-1 font-bold">Driver Portal</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-dark-card border border-dark-border rounded-3xl p-8 shadow-2xl">
                    <h2 className="text-2xl font-black text-white mb-1 tracking-tight">Create Account</h2>
                    <p className="text-sm text-gray-500 mb-8">Join Ola Cars as a driver partner</p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                            <div className="relative">
                                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input name="fullName" type="text" value={form.fullName} onChange={handleChange} required placeholder="John Doe"
                                    className="w-full pl-12 pr-4 py-3.5 bg-brand-black border-2 border-dark-border rounded-xl text-white placeholder-gray-600 focus:border-lime focus:outline-none focus:ring-2 focus:ring-lime/20 transition-all text-sm" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="driver@example.com"
                                    className="w-full pl-12 pr-4 py-3.5 bg-brand-black border-2 border-dark-border rounded-xl text-white placeholder-gray-600 focus:border-lime focus:outline-none focus:ring-2 focus:ring-lime/20 transition-all text-sm" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Phone Number</label>
                            <div className="relative">
                                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="+1 234 567 8900"
                                    className="w-full pl-12 pr-4 py-3.5 bg-brand-black border-2 border-dark-border rounded-xl text-white placeholder-gray-600 focus:border-lime focus:outline-none focus:ring-2 focus:ring-lime/20 transition-all text-sm" />
                            </div>
                        </div>
                    </div>

                    <button type="submit" disabled={loading}
                        className="w-full mt-8 py-4 bg-lime text-brand-black font-black text-sm uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:shadow-[0_8px_32px_rgba(210,238,0,0.3)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? <Loader2 size={20} className="animate-spin" /> : <><span>Create Account</span><ArrowRight size={18} /></>}
                    </button>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">Already have an account? <button type="button" onClick={() => navigate('/login')} className="text-lime font-bold hover:underline">Log In</button></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
