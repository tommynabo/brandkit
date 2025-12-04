import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Menu, X, Hexagon } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    return (
        <nav className="fixed w-full z-50 bg-[#0B0B1E]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            {/* NEW LOGO */}
            <div className="w-10 h-10 relative flex items-center justify-center">
                <Hexagon className="w-10 h-10 text-blue-600 fill-blue-600/20" strokeWidth={1.5} />
                <div className="absolute inset-0 m-auto w-4 h-4 bg-purple-500 rounded-full blur-[2px]"></div>
            </div>
            <span className="font-bold text-xl tracking-tight text-white hidden sm:block">BrandKit.io</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
             <Link to="/features" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Características</Link>
             <Link to="/pricing" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Precios</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button 
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 bg-white text-[#0B0B1E] px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
            >
                Empezar <ArrowRight size={16} />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 w-full bg-[#0B0B1E] border-b border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
                <Link to="/features" className="text-slate-300 hover:text-white py-2" onClick={() => setMobileMenuOpen(false)}>Características</Link>
                <Link to="/pricing" className="text-slate-300 hover:text-white py-2" onClick={() => setMobileMenuOpen(false)}>Precios</Link>
                <button 
                    onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold"
                >
                    Empezar Gratis
                </button>
            </div>
        )}
      </nav>
    );
};

export default function PricingPage() {
    return (
        <div className="min-h-screen pt-32 px-6 bg-[#0B0B1E]">
            <Navbar />
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Planes simples y transparentes</h1>
                <p className="text-slate-400">Comienza gratis, paga solo si te enamoras de tu marca.</p>
            </div>
            
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 pb-20 items-center">
                {/* Free Tier */}
                <div className="glass-card p-8 rounded-3xl border-white/5 relative bg-[#0f1021]">
                    <h3 className="text-2xl font-bold mb-2 text-white">Explorador</h3>
                    <div className="text-4xl font-bold mb-6 text-white">$0</div>
                    <ul className="space-y-4 mb-8 text-slate-300">
                        <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-400"/> Generaciones ilimitadas</li>
                        <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-400"/> Previsualización en pantalla</li>
                        <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-400"/> Generador de Landing Page Demo</li>
                    </ul>
                    <Link to="/login" className="block w-full text-center bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-bold transition-colors">
                        Probar Gratis
                    </Link>
                </div>

                {/* Pro Tier */}
                <div className="p-8 rounded-3xl bg-gradient-to-b from-blue-900 to-[#1e1e40] border border-blue-500/30 relative shadow-2xl shadow-blue-900/40 scale-105">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        Más Popular
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white">Brand Kit Pro</h3>
                    <div className="text-4xl font-bold mb-6 text-white">$29 <span className="text-lg font-normal text-blue-200">/ único</span></div>
                    <ul className="space-y-4 mb-8 text-blue-100">
                        <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-white"/> Descarga completa (SVG, PNG, PDF)</li>
                        <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-white"/> Derechos comerciales completos</li>
                        <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-white"/> Archivos editables</li>
                        <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-white"/> Código React de Landing Page</li>
                    </ul>
                    <button className="block w-full text-center bg-white text-blue-900 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                        Comprar Ahora
                    </button>
                </div>
            </div>
        </div>
    );
}
