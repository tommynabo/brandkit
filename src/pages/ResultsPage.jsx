import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Share2, Sparkles, Grid, Monitor } from 'lucide-react';
import { LogoDisplay, ColorCard, TypographyPreview, SocialMockup, WebPreview } from '../tool/components/BrandComponents';

export default function ResultsPage({ data }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('board');

  useEffect(() => {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.log("Audio play failed", e));
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

  if (!data) return null;

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
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20"
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
                <div className="glass-card p-8 rounded-3xl h-full bg-[#0f1021]">
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
                    {data.socials && data.socials.slice(0, 4).map((s, i) => (
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
}
