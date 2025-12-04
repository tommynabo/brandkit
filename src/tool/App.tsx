
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import { generateBrandKit, refineMissionText } from './services/geminiService';
import { BrandKitData } from './types';
import { ArrowRight, Wand2, Loader2, Layout, Layers, ShieldCheck, Download, Share2, Sparkles, Globe, Palette, DollarSign, CheckCircle2, Zap, Play, Image as ImageIcon, Menu, X, Hexagon, Lock, Mail, Monitor, Grid } from 'lucide-react';

// Components
import { LogoDisplay, ColorCard, TypographyPreview, SocialMockup, WebPreview } from './components/BrandComponents';

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

/* --- LOGIN DASHBOARD --- */
const LoginDashboard = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login
        navigate('/create');
    };

    return (
        <div className="min-h-screen bg-[#0B0B1E] flex items-center justify-center p-6 relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>

             <div className="glass-card w-full max-w-md p-8 rounded-3xl relative z-10 border-t border-white/10">
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
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0f1021] border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all text-white placeholder-slate-600 text-sm"
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
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0f1021] border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all text-white placeholder-slate-600 text-sm"
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

/* --- FEATURES PAGE --- */
const FeaturesPage = () => (
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
                         <WebPreview 
                            web={{
                                headline: "El futuro es ahora",
                                subheadline: "Construye productos digitales que la gente ame con nuestra suite de herramientas.",
                                ctaButton: "Empezar Gratis",
                                featureTitle1: "Rápido", featureDesc1: "Velocidad luz", featureTitle2: "Seguro", featureDesc2: "Encriptación total"
                            }}
                            logoSvg='<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="25" y="25" width="50" height="50" rx="10" stroke="currentColor" stroke-width="8"/></svg>'
                            colors={[{hex: '#9333ea', name: 'Purple', usage: 'P'}, {hex: '#fff', name: 'White', usage: 'S'}]}
                            fonts={{primaryFont: 'Inter', secondaryFont: 'Roboto', reasoning: ''}}
                            businessName="Futuro"
                         />
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

/* --- PRICING PAGE --- */
const PricingPage = () => (
    <div className="min-h-screen pt-32 px-6">
        <Navbar />
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Planes simples y transparentes</h1>
            <p className="text-slate-400">Comienza gratis, paga solo si te enamoras de tu marca.</p>
        </div>
        
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 pb-20 items-center">
            {/* Free Tier */}
            <div className="glass-card p-8 rounded-3xl border-white/5 relative">
                <h3 className="text-2xl font-bold mb-2">Explorador</h3>
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
                <h3 className="text-2xl font-bold mb-2">Brand Kit Pro</h3>
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

/* --- CREATE WIZARD --- */
interface WizardProps {
  onGenerate: (data: BrandKitData) => void;
}

const CreateWizard: React.FC<WizardProps> = ({ onGenerate }) => {
  const [mission, setMission] = useState('');
  const [urls, setUrls] = useState(['', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [step, setStep] = useState(0); 
  const [loadingText, setLoadingText] = useState("Analizando tu misión...");

  const updateUrl = (index: number, val: string) => {
    const newUrls = [...urls];
    newUrls[index] = val;
    setUrls(newUrls);
  };

  const handleRefine = async () => {
      if (!mission) return;
      setIsRefining(true);
      const betterText = await refineMissionText(mission);
      setMission(betterText);
      setIsRefining(false);
  };

  const handleGenerate = async () => {
    if (!mission) return alert("Por favor describe tu misión.");
    
    setIsLoading(true);
    setStep(1);

    const steps = [
      "Analizando la esencia de tu marca...",
      "Extrayendo estilos...",
      "Calculando geometría vectorial...",
      "Mezclando paleta de colores...",
      "Redactando landing page...",
      "Finalizando..."
    ];
    
    let stepIndex = 0;
    const interval = setInterval(() => {
        setLoadingText(steps[stepIndex % steps.length]);
        stepIndex++;
    }, 1200);

    try {
      const data = await generateBrandKit({ mission, references: urls.filter(u => u.length > 0) });
      clearInterval(interval);
      onGenerate(data);
    } catch (error) {
      clearInterval(interval);
      setIsLoading(false);
      setStep(0);
      alert("Hubo un error con la IA. Por favor verifica tu API Key.");
    }
  };

  if (step === 1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B0B1E] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0B0B1E] to-[#0B0B1E]" />
        <div className="relative z-10 flex flex-col items-center text-center p-6">
           <div className="w-24 h-24 mb-8 relative">
             <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
             <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
             <Wand2 className="absolute inset-0 m-auto text-blue-500 animate-pulse w-8 h-8" />
           </div>
           <h2 className="text-3xl font-bold text-white mb-3">Diseñando tu Marca</h2>
           <p className="text-slate-400 animate-pulse text-lg">{loadingText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B1E] flex items-center justify-center p-6 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      
      <div className="glass-card max-w-3xl w-full rounded-[40px] shadow-2xl p-8 md:p-14 fade-in relative z-10">
        <div className="mb-10 text-center">
          <Link to="/" className="text-slate-400 hover:text-white text-sm mb-8 inline-flex items-center gap-1 transition-colors">&larr; Volver</Link>
          <h2 className="text-4xl font-bold text-white mb-4">Define tu Marca</h2>
          <p className="text-slate-400 text-lg">Cuéntanos sobre tu proyecto y la IA hará el resto.</p>
        </div>

        <div className="space-y-10">
          <div>
            <div className="flex justify-between items-center mb-3">
                 <label className="block text-sm font-bold text-blue-200 uppercase tracking-wider">¿Cuál es tu misión?</label>
                 <button 
                    onClick={handleRefine}
                    disabled={!mission || isRefining}
                    className="text-xs flex items-center gap-1 text-purple-300 hover:text-purple-100 transition-colors disabled:opacity-50"
                 >
                    {isRefining ? <Loader2 className="animate-spin w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                    Mejorar con IA
                 </button>
            </div>
            <div className="relative">
                <textarea 
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                placeholder="Ej: Soy coach de nutrición para profesionales ocupados que buscan energía sostenible sin dietas estrictas..."
                className="w-full h-40 p-6 rounded-2xl bg-[#0f1021] border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none text-white placeholder-slate-600 text-lg leading-relaxed"
                />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-blue-200 uppercase tracking-wider mb-3">Referencias Visuales (Opcional)</label>
            <p className="text-xs text-slate-500 mb-4">Pega URLs de webs cuyo estilo te inspire.</p>
            <div className="grid gap-4">
              {urls.map((url, i) => (
                <div key={i} className="relative group">
                  <Globe className="absolute left-4 top-4 text-slate-500 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    type="url" 
                    value={url}
                    onChange={(e) => updateUrl(i, e.target.value)}
                    placeholder={`https://sitio-inspiracion-${i+1}.com`}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#0f1021] border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all text-white placeholder-slate-700"
                  />
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={!mission}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 rounded-2xl font-bold text-xl hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            Generar Identidad Visual <Wand2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* --- RESULTS DASHBOARD --- */
interface ResultProps {
  data: BrandKitData;
}

const BrandKitResult: React.FC<ResultProps> = ({ data }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'board' | 'web'>('board');

  // Play sound on mount
  useEffect(() => {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.log("Audio play failed (interaction needed)", e));
  }, []);

  const downloadFullKit = () => {
      const element = document.createElement("a");
      const file = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
      element.href = URL.createObjectURL(file);
      element.download = `BrandKit-${data.businessName.replace(/\s+/g, '_')}.json`;
      document.body.appendChild(element);
      element.click();
      alert("¡Kit descargado! (Versión Demo: JSON Data + SVG Logos)");
  };

  return (
    <div className="min-h-screen bg-[#0B0B1E] text-white">
      {/* Dashboard Header */}
      <header className="bg-[#0B0B1E]/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white text-[#0B0B1E] rounded-xl flex items-center justify-center font-bold text-lg">B</div>
              <div className="h-8 w-px bg-white/10 mx-2 hidden md:block"></div>
              <div>
                <h1 className="font-bold text-white leading-none text-lg">{data.businessName}</h1>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">{data.styleProfile}</p>
              </div>
           </div>
           
           {/* Tab Switcher */}
           <div className="hidden md:flex bg-white/5 p-1 rounded-lg border border-white/10">
               <button 
                onClick={() => setActiveTab('board')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'board' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
               >
                   <div className="flex items-center gap-2"><Grid size={14} /> Tablero</div>
               </button>
               <button 
                onClick={() => setActiveTab('web')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'web' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
               >
                   <div className="flex items-center gap-2"><Monitor size={14} /> Vista Web</div>
               </button>
           </div>
           
           <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/create')}
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                Regenerar
              </button>
              <button className="hidden sm:flex items-center gap-2 bg-white/5 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors border border-white/10">
                <Share2 size={16} /> Compartir
              </button>
              <button 
                onClick={downloadFullKit}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors shadow-lg shadow-blue-600/20"
              >
                <Download size={16} /> Descargar
              </button>
           </div>
        </div>
        
        {/* Mobile Tabs */}
        <div className="md:hidden flex p-2 border-t border-white/10">
               <button 
                onClick={() => setActiveTab('board')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'board' ? 'bg-white/10 text-white' : 'text-slate-400'}`}
               >
                   Tablero
               </button>
               <button 
                onClick={() => setActiveTab('web')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'web' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
               >
                   Vista Web
               </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 md:p-8">
        
        {/* VIEW: BOARD */}
        {activeTab === 'board' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min animate-in fade-in duration-500">
            {/* 1. Primary Logo (Large) - Spans 4 columns */}
            <div className="md:col-span-5 md:row-span-2">
                <LogoDisplay 
                data={data.logo} 
                colors={data.colors} 
                fontFamily={data.typography.primaryFont} 
                businessName={data.businessName} 
                />
            </div>

            {/* 2. Color Palette - Spans 7 columns */}
            <div className="md:col-span-7">
                <div className="glass-card p-8 rounded-3xl h-full">
                <h3 className="text-xs font-bold text-blue-300 tracking-widest uppercase mb-6">Paleta de Colores</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {data.colors.map((c, i) => <ColorCard key={i} color={c} />)}
                </div>
                </div>
            </div>

            {/* 3. Typography - Spans 7 columns */}
            <div className="md:col-span-7 md:row-span-1">
                <TypographyPreview typography={data.typography} />
            </div>

            {/* 4. Brand Description / Vibe - Spans 12 columns */}
            <div className="md:col-span-12">
                <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-white/10 p-6 rounded-2xl flex items-center gap-4">
                    <div className="bg-yellow-400/20 p-3 rounded-full text-yellow-300">
                        <Sparkles size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-1">Concepto de Marca</h4>
                        <p className="text-slate-300 text-sm leading-relaxed">"{data.logo.description}"</p>
                    </div>
                </div>
            </div>

            {/* 5. Social Mockups - Grid of items */}
            <div className="md:col-span-12 mt-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white">Assets para Redes Sociales</h3>
                    <span className="text-xs text-slate-400 bg-white/5 px-3 py-1 rounded-full">Generado automáticamente</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {data.socials.slice(0, 4).map((s, i) => (
                    <SocialMockup 
                        key={i} 
                        template={s} 
                        logoSvg={data.logo.svgContent}
                        colors={data.colors}
                        fonts={data.typography}
                        businessName={data.businessName}
                    />
                    ))}
                </div>
            </div>
            </div>
        )}

        {/* VIEW: WEB (WOW FEATURE) */}
        {activeTab === 'web' && (
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-500 h-[80vh]">
                <WebPreview 
                    web={data.web}
                    logoSvg={data.logo.svgContent}
                    colors={data.colors}
                    fonts={data.typography}
                    businessName={data.businessName}
                />
            </div>
        )}
        
      </main>
    </div>
  );
};

/* --- MAIN APP --- */
const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [generatedKit, setGeneratedKit] = useState<BrandKitData | null>(null);

  // Recovery generated data from location state if available (for direct navigation or refresh handling logic if extended)
  useEffect(() => {
    if (location.state && location.state.data) {
        setGeneratedKit(location.state.data);
    }
  }, [location]);

  const handleGenerationSuccess = (data: BrandKitData) => {
    setGeneratedKit(data);
    // Use state to pass data to the route
    navigate(`/kit/${data.id}`, { state: { data } });
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/login" element={<LoginDashboard />} />
      <Route path="/create" element={<CreateWizard onGenerate={handleGenerationSuccess} />} />
      <Route 
        path="/kit/:id" 
        element={generatedKit ? <BrandKitResult data={generatedKit} /> : <CreateWizard onGenerate={handleGenerationSuccess} />} 
      />
    </Routes>
  );
};

export default App;
