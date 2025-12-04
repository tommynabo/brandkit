import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Hexagon } from 'lucide-react';

export default function LoginDashboard() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    
    const handleLogin = (e) => {
        e.preventDefault();
        // Mock login - redirect to create
        navigate('/create');
    };

    return (
        <div className="min-h-screen bg-[#0B0B1E] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>

            <div className="glass-card w-full max-w-md p-8 rounded-3xl relative z-10 border-t border-white/10 bg-[#0f1021]">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-white/5 rounded-xl mx-auto flex items-center justify-center mb-4 border border-white/10">
                        <Hexagon className="text-blue-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Bienvenido de nuevo</h2>
                    <p className="text-slate-400 text-sm">Entra para gestionar tus marcas.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 text-slate-500 w-4 h-4" />
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tu@email.com"
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0B0B1E] border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all text-white placeholder-slate-600 text-sm"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 text-slate-500 w-4 h-4" />
                            <input 
                                type="password" 
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0B0B1E] border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all text-white placeholder-slate-600 text-sm"
                                required
                            />
                        </div>
                    </div>
                    
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition-all mt-4">
                        Entrar al Dashboard
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-xs text-slate-500">¿No tienes cuenta? <span className="text-blue-400 cursor-pointer hover:underline">Regístrate gratis</span></p>
                </div>
            </div>
        </div>
    );
}
