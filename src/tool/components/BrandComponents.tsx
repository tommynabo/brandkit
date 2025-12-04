
import React from 'react';
import { ColorPalette, LogoData, SocialTemplate, Typography, WebContent } from '../types';
import { Download, Copy, Check, Instagram, Linkedin, Youtube, Twitter, Info, MousePointer2 } from 'lucide-react';

/* --- LOGO DISPLAY --- */
interface LogoProps {
  data: LogoData;
  colors: ColorPalette[];
  fontFamily: string;
  businessName: string;
  className?: string; // Allow custom styling for reuse
}

export const LogoDisplay: React.FC<LogoProps> = ({ data, colors, fontFamily, businessName, className }) => {
  const primaryColor = colors[0]?.hex || '#fff';
  const accentColor = colors[1]?.hex || '#ccc';

  const downloadLogo = () => {
    const blob = new Blob([data.svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${businessName.replace(/\s+/g, '_')}_logo.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`glass-card p-8 rounded-3xl flex flex-col items-center justify-center gap-8 h-full min-h-[400px] relative group overflow-hidden ${className}`}>
      {/* Fondo decorativo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -z-10"></div>
      
      <div className="flex justify-between w-full items-start">
         <h3 className="text-xs font-bold text-blue-300 tracking-widest uppercase mb-2">Logo Principal</h3>
         <button 
           onClick={downloadLogo}
           className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full flex items-center gap-1 transition-colors z-20"
         >
           <Download size={12} /> SVG
         </button>
      </div>
      
      {/* Icono SVG */}
      <div 
        className="w-40 h-40 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        style={{ color: primaryColor }}
        dangerouslySetInnerHTML={{ __html: data.svgContent }} 
      />
      
      {/* Tipografía / Nombre */}
      <div className="text-center z-10">
        <h1 style={{ fontFamily: fontFamily }} className="text-4xl font-bold tracking-tight text-white mb-2">
          {businessName}
        </h1>
        <p className="text-slate-400 text-xs tracking-[0.3em] uppercase">Est. 2024</p>
      </div>

      {/* Variantes */}
      <div className="mt-4 flex gap-4 opacity-50 group-hover:opacity-100 transition-opacity z-10">
        <div className="w-10 h-10 rounded-full border border-slate-700 p-2 bg-[#0B0B1E]">
            <div className="w-full h-full" style={{ color: accentColor }} dangerouslySetInnerHTML={{ __html: data.svgContent }} />
        </div>
        <div className="w-10 h-10 rounded-full bg-white p-2">
            <div className="w-full h-full text-black" dangerouslySetInnerHTML={{ __html: data.svgContent }} />
        </div>
      </div>
    </div>
  );
};

/* --- COLOR PALETTE --- */
interface ColorCardProps {
  color: ColorPalette;
}

export const ColorCard: React.FC<ColorCardProps> = ({ color }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="group relative h-32 rounded-2xl cursor-pointer transition-transform hover:-translate-y-2 overflow-hidden border border-white/5"
      style={{ backgroundColor: color.hex }}
      onClick={copyToClipboard}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity">
        {copied ? <Check className="text-white w-6 h-6" /> : <Copy className="text-white w-6 h-6" />}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md p-3 text-xs border-t border-white/10">
        <p className="font-bold text-white font-mono">{color.hex}</p>
        <p className="text-white/80 truncate">{color.name}</p>
        <p className="text-[10px] text-white/60 uppercase tracking-wider mt-1">{color.usage}</p>
      </div>
    </div>
  );
};

/* --- TYPOGRAPHY --- */
interface TypeProps {
  typography: Typography;
  className?: string;
}

export const TypographyPreview: React.FC<TypeProps> = ({ typography, className }) => {
  return (
    <div className={`glass-card p-8 rounded-3xl h-full flex flex-col justify-between ${className}`}>
       <div>
         <h3 className="text-xs font-bold text-blue-300 tracking-widest uppercase mb-8">Tipografía</h3>
         
         <div className="space-y-8">
           <div>
             <div className="flex justify-between items-end mb-2 border-b border-white/10 pb-2">
                <span className="text-xs text-slate-400">Principal (Títulos)</span>
                <span className="text-xs font-mono text-blue-400">{typography.primaryFont}</span>
             </div>
             <div className="text-5xl leading-tight text-white" style={{ fontFamily: typography.primaryFont, fontWeight: 700 }}>
               Aa Bb Cc
             </div>
           </div>

           <div>
             <div className="flex justify-between items-end mb-2 border-b border-white/10 pb-2">
                <span className="text-xs text-slate-400">Secundaria (Cuerpo)</span>
                <span className="text-xs font-mono text-purple-400">{typography.secondaryFont}</span>
             </div>
             <p className="text-lg text-slate-300 leading-relaxed" style={{ fontFamily: typography.secondaryFont }}>
               El veloz zorro marrón salta sobre el perro perezoso. Una identidad visual es el embajador silencioso de tu marca.
             </p>
           </div>
         </div>
       </div>

       <div className="mt-8 bg-white/5 p-4 rounded-xl border border-white/5">
         <p className="text-xs text-slate-400 italic">" {typography.reasoning} "</p>
       </div>
    </div>
  );
};

/* --- SOCIAL MOCKUPS --- */
interface SocialProps {
  template: SocialTemplate;
  logoSvg: string;
  colors: ColorPalette[];
  fonts: Typography;
  businessName: string;
}

export const SocialMockup: React.FC<SocialProps> = ({ template, logoSvg, colors, fonts, businessName }) => {
  const bg = colors[0]?.hex; 
  const accent = colors[1]?.hex;
  
  let aspectClass = "aspect-square";
  let Icon = Instagram;
  let usageDescription = "Ideal para feed general.";
  let prettyType = "Instagram Post";

  if (template.type === 'instagram_story') {
    aspectClass = "aspect-[9/16]"; 
    usageDescription = "Para contenido efímero y anuncios.";
    prettyType = "Historia / Story";
  }
  if (template.type === 'linkedin_banner') {
    aspectClass = "aspect-[4/1]"; 
    Icon = Linkedin;
    usageDescription = "Cabecera profesional para perfil.";
    prettyType = "Banner LinkedIn";
  }
  if (template.type === 'youtube_thumb') {
    aspectClass = "aspect-video"; 
    Icon = Youtube;
    usageDescription = "Portada para atraer clics en video.";
    prettyType = "Miniatura YouTube";
  }
  if (template.type === 'twitter_header') {
    aspectClass = "aspect-[3/1]"; 
    Icon = Twitter;
    usageDescription = "Imagen de portada para perfil.";
    prettyType = "Cabecera X/Twitter";
  }
  
  return (
    <div className="flex flex-col gap-3 group">
        {/* Preview Container */}
        <div className="relative overflow-hidden rounded-2xl shadow-lg border border-white/10 bg-slate-900 transition-all duration-300 group-hover:ring-2 ring-blue-500/50">
           <div className={`w-full ${aspectClass} relative p-6 flex flex-col justify-between transition-transform duration-700 group-hover:scale-105`}
                style={{ backgroundColor: bg }}>
              
              {/* Pattern overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-32 h-32 opacity-30 rounded-full blur-3xl mix-blend-overlay" style={{ backgroundColor: accent }} />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="w-8 h-8 mb-4 opacity-90 drop-shadow-md" style={{ color: '#fff' }} dangerouslySetInnerHTML={{ __html: logoSvg }} />
                <h3 style={{ fontFamily: fonts.primaryFont, color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }} className="text-xl md:text-2xl font-bold leading-tight mb-2">
                  {template.title}
                </h3>
              </div>

              <div className="relative z-10 mt-auto">
                 <p style={{ fontFamily: fonts.secondaryFont, color: 'rgba(255,255,255,0.9)' }} className="text-xs md:text-sm drop-shadow-sm line-clamp-3">
                   {template.copy}
                 </p>
                 <span className="block mt-3 text-[10px] uppercase tracking-widest opacity-70 text-white mix-blend-overlay">@{businessName.replace(/\s/g, '').toLowerCase()}</span>
              </div>
           </div>

           <div className="absolute top-2 right-2 bg-black/40 p-1.5 rounded-full backdrop-blur-md border border-white/10">
             <Icon className="w-3 h-3 text-white" />
           </div>
        </div>

        {/* Explanation Card */}
        <div className="bg-white/5 p-3 rounded-xl border border-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1">
                <Info size={12} className="text-blue-400" />
                <span className="text-sm font-semibold text-white">{prettyType}</span>
            </div>
            <p className="text-xs text-slate-400">{usageDescription}</p>
        </div>
    </div>
  );
};

/* --- WEB PREVIEW (WOW FEATURE) --- */
interface WebPreviewProps {
  web: WebContent;
  logoSvg: string;
  colors: ColorPalette[];
  fonts: Typography;
  businessName: string;
}

export const WebPreview: React.FC<WebPreviewProps> = ({ web, logoSvg, colors, fonts, businessName }) => {
  const primary = colors[0]?.hex || '#333';
  const secondary = colors[1]?.hex || '#555';
  const textFont = fonts.secondaryFont;
  const titleFont = fonts.primaryFont;

  return (
    <div className="w-full h-full bg-[#111] rounded-2xl border border-white/10 overflow-hidden flex flex-col shadow-2xl">
        {/* Browser Header */}
        <div className="h-8 bg-[#222] border-b border-white/5 flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
            </div>
            <div className="ml-4 flex-1 h-5 bg-[#333] rounded-md text-[10px] text-gray-400 flex items-center px-2 font-mono">
                {businessName.toLowerCase().replace(/\s/g, '')}.com
            </div>
        </div>

        {/* Browser Content */}
        <div className="flex-1 overflow-y-auto bg-white relative">
            
            {/* Nav */}
            <nav className="flex justify-between items-center p-6 border-b border-gray-100" style={{ fontFamily: textFont }}>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 text-black" style={{ color: primary }} dangerouslySetInnerHTML={{ __html: logoSvg }}></div>
                    <span className="font-bold text-lg text-gray-900">{businessName}</span>
                </div>
                <div className="flex gap-4 text-sm font-medium text-gray-600">
                    <span>Inicio</span>
                    <span>Servicios</span>
                    <span>Contacto</span>
                </div>
            </nav>

            {/* Hero */}
            <header className="px-6 py-16 md:py-24 text-center" style={{ backgroundColor: `${primary}10` }}>
                 <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight" style={{ fontFamily: titleFont }}>
                    {web.headline}
                 </h1>
                 <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10" style={{ fontFamily: textFont }}>
                    {web.subheadline}
                 </p>
                 <button 
                    className="px-8 py-4 rounded-full font-bold text-white transition-transform hover:scale-105"
                    style={{ backgroundColor: primary, fontFamily: textFont }}
                 >
                    {web.ctaButton}
                 </button>
            </header>

            {/* Features Mini */}
            <section className="py-16 px-6 max-w-4xl mx-auto grid grid-cols-2 gap-8">
                 <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center text-white" style={{ backgroundColor: secondary }}>1</div>
                    <h3 className="font-bold text-xl mb-2 text-gray-900" style={{ fontFamily: titleFont }}>{web.featureTitle1}</h3>
                    <p className="text-gray-600 text-sm" style={{ fontFamily: textFont }}>{web.featureDesc1}</p>
                 </div>
                 <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center text-white" style={{ backgroundColor: secondary }}>2</div>
                    <h3 className="font-bold text-xl mb-2 text-gray-900" style={{ fontFamily: titleFont }}>{web.featureTitle2}</h3>
                    <p className="text-gray-600 text-sm" style={{ fontFamily: textFont }}>{web.featureDesc2}</p>
                 </div>
            </section>
        </div>
        
        {/* Overlay Badge */}
        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10 pointer-events-none">
            <MousePointer2 size={12} className="text-blue-400" />
            Vista Previa Interactiva
        </div>
    </div>
  );
};
