import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Monitor, Palette } from 'lucide-react';
import { LogoDisplay, ColorCard } from '../tool/components/BrandComponents';

const Navbar = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const { ArrowRight, Menu, X, Hexagon } = require('lucide-react');

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

export default function FeaturesPage() {
    return (
        <div className="min-h-screen pt-32 px-6 bg-[#0B0B1E] pb-20">
            <Navbar />
            <div className="max-w-4xl mx-auto text-center mb-20">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Tu estudio de diseño en la nube</h1>
                <p className="text-xl text-slate-400">Cada funcionalidad está construida para ahorrarte horas de trabajo y miles de dólares en agencias.</p>
            </div>

            <div className="max-w-7xl mx-auto space-y-32">
                
                {/* Feature 1: Logos */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1 relative">
                        <div className="absolute inset-0 bg-blue-600/20 blur-3xl -z-10 rounded-full"></div>
                        <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/10">
                            <LogoDisplay 
                                data={{ svgContent: '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="8"/></svg>', description: 'Demo' }}
                                colors={[{hex: '#60A5FA', name: 'Blue', usage: 'P'}, {hex: '#fff', name: 'White', usage: 'S'}]}
                                fontFamily="Inter"
                                businessName="Tu Marca"
                                className="min-h-[300px]"
                            />
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                            <Layout className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Logos Vectoriales (SVG)</h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Olvídate de imágenes pixeladas. Nuestra IA genera logos basados en geometría pura (SVG), listos para imprimirse en una tarjeta de visita o en una valla publicitaria gigante.
                        </p>
                    </div>
                </div>

                {/* Feature 2: Landing Page Generator */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                            <Monitor className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Generador de Landing Page</h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            <span className="text-purple-400 font-bold">¡Nuevo!</span> No solo te damos el logo. Te damos la estructura visual de tu web. Visualiza cómo quedaría tu marca en una página de aterrizaje real al instante.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-purple-600/20 blur-3xl -z-10 rounded-full"></div>
                        <div className="bg-slate-900/50 p-4 rounded-3xl border border-white/10 overflow-hidden h-[400px]">
                            <div className="bg-white text-center flex flex-col items-center justify-center h-full">
                                <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>
                                <div className="h-8 w-1/2 bg-gray-900 rounded mb-4"></div>
                                <div className="h-3 w-2/3 bg-gray-300 rounded mb-6"></div>
                                <div className="h-8 w-24 bg-purple-600 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature 3: Colors & Fonts */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1 relative grid grid-cols-2 gap-4">
                        <ColorCard color={{ hex: '#FF5733', name: 'Sunset Orange', usage: 'Primary' }} />
                        <ColorCard color={{ hex: '#33FF57', name: 'Lime Green', usage: 'Secondary' }} />
                        <ColorCard color={{ hex: '#3357FF', name: 'Electric Blue', usage: 'Accent' }} />
                        <ColorCard color={{ hex: '#F0F0F0', name: 'Paper White', usage: 'Background' }} />
                    </div>
                    <div className="order-1 md:order-2">
                        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-6">
                            <Palette className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Ciencia del Color</h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Nuestros algoritmos aseguran que tu paleta tenga suficiente contraste para ser accesible y armonía visual para ser atractiva.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
