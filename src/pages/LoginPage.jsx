import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true); // Controla si estamos en Login o Registro
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let error;
      if (isLogin) {
        // Iniciar Sesión
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        error = signInError;
      } else {
        // Registrarse (Crear cuenta nueva)
        const { error: signUpError } = await supabase.auth.signUp({ email, password });
        error = signUpError;
      }

      if (error) throw error;
      
      toast.success(isLogin ? '¡Bienvenido!' : '¡Cuenta creada! Entrando...');
      navigate('/app'); // Te lleva directo al Dashboard
      
    } catch (error) {
      toast.error(error.message || 'Error de autenticación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#15161E] rounded-2xl border border-[#2A2B35] p-8 shadow-2xl">
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white">
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
          <p className="text-gray-400 mt-2">EmailSnipe</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0B0C10] border border-[#2A2B35] rounded-lg py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="tu@gmail.com"
                required
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0B0C10] border border-[#2A2B35] rounded-lg py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="Contraseña"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? 'Entrar' : 'Registrarse')}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-400">
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          </span>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-primary-400 hover:text-primary-300 font-medium transition"
          >
            {isLogin ? 'Regístrate gratis' : 'Inicia sesión'}
          </button>
        </div>

      </div>
    </div>
  );
}