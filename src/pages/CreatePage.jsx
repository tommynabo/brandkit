import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wand2, Loader2, Sparkles, Globe } from 'lucide-react';
import { generateBrandKit, refineMissionText } from '../tool/services/geminiService';

export default function CreatePage({ onGenerate }) {
  const navigate = useNavigate();
  const [mission, setMission] = useState('');
  const [urls, setUrls] = useState(['', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [step, setStep] = useState(0); 
  const [loadingText, setLoadingText] = useState("Analizando tu misión...");

  const updateUrl = (index, val) => {
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
      if (onGenerate) {
        onGenerate(data);
      }
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
      
      <div className="glass-card max-w-3xl w-full rounded-[40px] shadow-2xl p-8 md:p-14 fade-in relative z-10 bg-[#0f1021]">
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
                className="w-full h-40 p-6 rounded-2xl bg-[#0B0B1E] border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none text-white placeholder-slate-600 text-lg leading-relaxed"
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
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#0B0B1E] border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all text-white placeholder-slate-700"
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
}
