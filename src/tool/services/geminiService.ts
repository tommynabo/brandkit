
import { GoogleGenAI, Schema, Type } from "@google/genai";
import { BrandKitData, UserInput } from "../types";

// Helper to sanitize the SVG string returned by the AI
const cleanSvg = (svg: string) => {
  const start = svg.indexOf('<svg');
  const end = svg.lastIndexOf('</svg>');
  if (start === -1 || end === -1) return svg;
  return svg.substring(start, end + 6);
};

const BRAND_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    styleProfile: {
      type: Type.STRING,
      description: "Un breve análisis del estilo visual (ej: 'Tech Minimalista'). En Español.",
    },
    businessName: {
      type: Type.STRING,
      description: "Un nombre corto y pegadizo.",
    },
    colors: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          hex: { type: Type.STRING, description: "Código Hex" },
          name: { type: Type.STRING, description: "Nombre creativo" },
          usage: { type: Type.STRING, description: "Uso (Primario, etc)" },
        },
        required: ["hex", "name", "usage"],
      },
      description: "Paleta de 5 colores.",
    },
    typography: {
      type: Type.OBJECT,
      properties: {
        primaryFont: {
          type: Type.STRING,
          description: "One of: Inter, Roboto, Playfair Display, Montserrat, Poppins, Raleway, Open Sans, Lato",
        },
        secondaryFont: {
          type: Type.STRING,
          description: "One of: Inter, Roboto, Playfair Display, Montserrat, Poppins, Raleway, Open Sans, Lato",
        },
        reasoning: { type: Type.STRING, description: "Breve justificación." },
      },
      required: ["primaryFont", "secondaryFont", "reasoning"],
    },
    logo: {
      type: Type.OBJECT,
      properties: {
        svgContent: {
          type: Type.STRING,
          description: "A VERY SIMPLE geometric SVG icon. No text. ViewBox '0 0 100 100'.",
        },
        description: { type: Type.STRING, description: "Breve descripción." },
      },
      required: ["svgContent", "description"],
    },
    socials: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          copy: { type: Type.STRING },
          type: { type: Type.STRING, description: "One of: instagram_post, linkedin_banner, twitter_header" },
        },
        required: ["title", "copy", "type"],
      },
      description: "Contenido para SOLO 3 assets de redes sociales.",
    },
    web: {
      type: Type.OBJECT,
      properties: {
        headline: { type: Type.STRING, description: "H1 impactante para landing page" },
        subheadline: { type: Type.STRING, description: "Subtítulo persuasivo" },
        ctaButton: { type: Type.STRING, description: "Texto corto de botón" },
        featureTitle1: { type: Type.STRING },
        featureDesc1: { type: Type.STRING },
        featureTitle2: { type: Type.STRING },
        featureDesc2: { type: Type.STRING },
      },
      required: ["headline", "subheadline", "ctaButton", "featureTitle1", "featureDesc1"],
      description: "Contenido para una landing page demo.",
    }
  },
  required: ["styleProfile", "businessName", "colors", "typography", "logo", "socials", "web"],
};

export const generateBrandKit = async (input: UserInput): Promise<BrandKitData> => {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) {
    throw new Error("Falta la API Key.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Crea una identidad visual para: "${input.mission}".
    Refs: ${input.references.join(", ")}.
    Idioma: ESPAÑOL.
    
    1. Arquetipo de marca.
    2. Paleta 5 colores HEX.
    3. Fuentes (Google Fonts).
    4. LOGO: SVG Geométrico SIMPLE y abstracto. Sin texto.
    5. 3 Posts de redes sociales.
    6. Contenido para Landing Page (Hero section).
    
    Responde en JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: BRAND_SCHEMA,
        temperature: 0.7, 
      },
    });

    if (!response.text) {
      throw new Error("No se generó contenido.");
    }

    const data = JSON.parse(response.text);

    return {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      mission: input.mission,
      ...data,
      logo: {
        ...data.logo,
        svgContent: cleanSvg(data.logo.svgContent),
      }
    };

  } catch (error) {
    console.error("Fallo en la generación:", error);
    throw error;
  }
};

export const refineMissionText = async (currentText: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) return currentText;
  
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
      Mejora esta misión de negocio para branding en Español. Hazla inspiradora pero breve.
      Texto: "${currentText}"
    `;
  
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      return response.text?.trim() || currentText;
    } catch (e) {
      console.error(e);
      return currentText;
    }
  };
