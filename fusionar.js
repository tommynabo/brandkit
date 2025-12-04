import fs from 'fs-extra'; // Necesitaremos instalar fs-extra
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLANTILLA_DIR = __dirname;
const AI_STUDIO_DIR_NAME = 'ai-studio-output'; // NOMBRE DE LA CARPETA QUE DESCARGAS

async function fusionar() {
  console.log('🚀 Iniciando Fusión de Proyectos...');

  const sourceDir = path.join(PLANTILLA_DIR, '..', AI_STUDIO_DIR_NAME);
  
  if (!fs.existsSync(sourceDir)) {
    console.error(`❌ ERROR: No encuentro la carpeta "${AI_STUDIO_DIR_NAME}" al lado de la plantilla.`);
    console.log('   Asegúrate de descomprimir tu app de AI Studio y renombrar la carpeta a "ai-studio-output".');
    return;
  }

  // 1. Mover Dashboard (Tool)
  console.log('📦 Importando Dashboard a src/tool...');
  // Borramos tool antiguo para limpiar
  await fs.emptyDir(path.join(PLANTILLA_DIR, 'src/tool'));
  
  // Copiamos todo lo de AI Studio a tool
  // (Excluimos archivos raíz basura luego)
  await fs.copy(sourceDir, path.join(PLANTILLA_DIR, 'src/tool'));

  // 2. Organizar Tool (Limpieza)
  // AI Studio suele darlo todo suelto. Vamos a meter componentes en su sitio si no lo están.
  // Nota: Este script asume que AI Studio te da una estructura base. 
  // Si AI Studio te da una carpeta 'components', ya se habrá copiado dentro de tool/components.

  // 3. Mover Landing (Si existe)
  // *Truco*: Como AI Studio te da la Landing en otro ZIP o mezcla, 
  // asumiremos que la Landing la tienes en una carpeta llamada 'landing' dentro del output, 
  // O que tienes que ejecutar este script dos veces (una para dash, una para landing).
  
  // PARA SIMPLIFICAR TU VIDA:
  // Este script fusiona LA APP (Dashboard). La Landing suele ser un solo archivo.
  // Vamos a limpiar la basura que se ha colado en src/tool
  
  const basura = ['package.json', 'package-lock.json', 'vite.config.ts', 'vite.config.js', 'index.html', 'tsconfig.json', 'README.md', '.gitignore', '.eslintrc.cjs'];
  
  for (const file of basura) {
    const filePath = path.join(PLANTILLA_DIR, 'src/tool', file);
    if (fs.existsSync(filePath)) {
      await fs.remove(filePath);
      console.log(`   🗑️ Borrado archivo basura: ${file}`);
    }
  }

  console.log('✅ Fusión completada.');
  console.log('👉 Siguientes pasos:');
  console.log('1. Ejecuta: npm install fs-extra (solo una vez)');
  console.log('2. Pídele a Antigravity: "Analiza src/tool y src/pages, instala las dependencias que falten y conecta los componentes en App.jsx"');
}

fusionar();