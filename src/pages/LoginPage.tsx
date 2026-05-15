import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            // [TEST BYPASS] Automatically verify any email for testing
            await login(email, '000000'); 
            navigate('/dashboard', { replace: true });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed. Please check your email.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[60%] bg-lime/8 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-15%] left-[-8%] w-[35%] h-[50%] bg-lime/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-white tracking-tighter">OLA <span className="text-lime">CARS</span></h1>
                    <p className="text-xs text-gray-500 uppercase tracking-[4px] mt-1 font-bold">Driver Portal</p>
                </div>

                <div className="bg-dark-card border border-dark-border rounded-3xl p-8 shadow-2xl">
                    <h2 className="text-2xl font-black text-white mb-1 tracking-tight">Welcome Back</h2>
                    <p className="text-sm text-gray-500 mb-8">Sign in to your driver account (Test Mode)</p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    placeholder="driver@example.com"
                                    className="w-full pl-12 pr-4 py-3.5 bg-brand-black border-2 border-dark-border rounded-xl text-white placeholder-gray-600 focus:border-lime focus:outline-none focus:ring-2 focus:ring-lime/20 transition-all text-sm"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-lime text-brand-black font-black text-sm uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:shadow-[0_8px_32px_rgba(210,238,0,0.3)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 size={20} className="animate-spin" /> : <><span>Login</span><ArrowRight size={18} /></>}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-dark-border text-center">
                        <p className="text-sm text-gray-500">Don't have an account? <button type="button" onClick={() => navigate('/signup')} className="text-lime font-bold hover:underline">Sign Up</button></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
