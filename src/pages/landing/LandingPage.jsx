import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Wand2, Sparkles, Hexagon, Menu, X } from 'lucide-react';

/* --- NAVIGATION --- */
const Navbar = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

/* --- REAL DASHBOARD MOCKUP --- */
const DashboardMockup = () => (
    <div className="w-full aspect-[16/10] bg-[#0F1023] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col relative group">
        {/* Fake Browser Bar */}
        <div className="h-8 bg-[#1E2035] border-b border-white/5 flex items-center px-4 gap-2 justify-between">
             <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
             </div>
             <div className="flex gap-4 text-[10px] text-slate-400 font-medium">
                 <span className="text-white bg-white/10 px-2 py-0.5 rounded">Tablero</span>
                 <span>Vista Web</span>
                 <span>Social</span>
             </div>
             <div className="w-4"></div>
        </div>
        
        <div className="flex-1 flex overflow-hidden">
            {/* Sidebar */}
            <div className="w-16 md:w-56 bg-[#14152A] border-r border-white/5 p-4 flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-4">
                    <div className="h-8 w-8 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-500 text-xs font-bold">B</div>
                    <div className="hidden md:block h-3 w-20 bg-white/10 rounded"></div>
                </div>
                
                <div className="space-y-2">
                    <div className="h-8 w-full bg-blue-600/10 border border-blue-600/20 rounded-lg flex items-center px-3 gap-2">
                         <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                         <div className="hidden md:block h-2 w-16 bg-blue-200/20 rounded"></div>
                    </div>
                    <div className="h-8 w-full hover:bg-white/5 rounded-lg flex items-center px-3 gap-2 opacity-50">
                         <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                         <div className="hidden md:block h-2 w-12 bg-white/10 rounded"></div>
                    </div>
                </div>
            </div>

            {/* Main Content - Previewing the generated result */}
            <div className="flex-1 p-4 md:p-6 bg-[#0B0B1E] overflow-hidden relative flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <div className="h-5 w-32 bg-white/20 rounded mb-2"></div>
                        <div className="h-3 w-48 bg-white/5 rounded"></div>
                    </div>
                    <div className="bg-blue-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold">Descargar Kit</div>
                </div>

                <div className="flex-1 grid grid-cols-12 gap-4">
                     {/* Logo Mock */}
                     <div className="col-span-12 md:col-span-4 bg-[#1A1C30] rounded-xl border border-white/5 p-4 flex flex-col items-center justify-center">
                         <Hexagon className="text-purple-400 w-12 h-12 mb-3" />
                         <div className="h-4 w-24 bg-white/20 rounded"></div>
                     </div>
                     {/* Web Preview Mock (WOW Feature) */}
                     <div className="col-span-12 md:col-span-8 bg-white rounded-xl overflow-hidden relative border border-white/10">
                          {/* Mini Website Mockup inside the dashboard */}
                          <div className="bg-slate-50 w-full h-full p-6 text-center flex flex-col items-center justify-center">
                              <div className="h-4 w-3/4 bg-slate-900/10 rounded mb-3"></div>
                              <div className="h-8 w-1/2 bg-slate-900 rounded mb-4"></div>
                              <div className="h-3 w-2/3 bg-slate-900/20 rounded mb-6"></div>
                              <div className="h-8 w-24 bg-purple-600 rounded-full"></div>
                          </div>
                          {/* Badge */}
                          <div className="absolute top-2 right-2 bg-black/10 text-black text-[8px] px-2 py-0.5 rounded font-bold backdrop-blur">VISTA WEB</div>
                     </div>
                     {/* Colors */}
                     <div className="col-span-12 flex gap-2">
                         <div className="h-10 flex-1 bg-purple-500 rounded-lg"></div>
                         <div className="h-10 flex-1 bg-blue-500 rounded-lg"></div>
                         <div className="h-10 flex-1 bg-slate-800 rounded-lg"></div>
                         <div className="h-10 flex-1 bg-white rounded-lg"></div>
                     </div>
                </div>
            </div>
        </div>
    </div>
);

/* --- LANDING PAGE --- */
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-start">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-20 px-6 max-w-7xl mx-auto w-full text-center relative overflow-hidden flex-shrink-0">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/20 rounded-full blur-[80px] md:blur-[120px] -z-10"></div>
        <div className="absolute top-20 right-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-purple-600/10 rounded-full blur-[60px] md:blur-[100px] -z-10"></div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wide mb-8 animate-pulse">
          <Sparkles size={14} /> IA Generativa V2.0
        </div>
        <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-8">
          Tu identidad de marca <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">en 30 segundos.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Diseñado para creadores y solopreneurs. Simplemente describe tu misión y nuestra IA construirá tu logo, colores, assets sociales y tu sitio web al instante.
        </p>
        <button 
          onClick={() => navigate('/login')}
          className="group relative inline-flex items-center justify-center gap-3 bg-blue-600 text-white text-lg font-bold px-8 md:px-10 py-4 md:py-5 rounded-full shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:scale-105 transition-all duration-300 w-full md:w-auto"
        >
          Crear mi Kit Gratis
          <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        </button>
        
        {/* Visual Demo - Replaced Image with CSS Mockup */}
        <div className="mt-20 relative mx-auto max-w-5xl fade-in" style={{ animationDelay: '0.2s' }}>
          <DashboardMockup />
        </div>
      </section>

      <footer className="py-12 text-center text-slate-600 text-sm border-t border-white/5 bg-[#080816] mt-auto">
        <div className="flex justify-center gap-6 mb-4">
             <Link to="/features" className="hover:text-white transition-colors">Features</Link>
             <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
        </div>
        © 2024 BrandKit.io. Impulsado por Gemini.
      </footer>
    </div>
  );
};

export default LandingPage;
