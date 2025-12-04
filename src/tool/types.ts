
export interface ColorPalette {
  hex: string;
  name: string;
  usage: string; // e.g., "Primary", "Accent", "Background"
}

export interface Typography {
  primaryFont: string;
  secondaryFont: string;
  reasoning: string;
}

export interface LogoData {
  svgContent: string; // The raw SVG string
  description: string;
}

export interface SocialTemplate {
  title: string;
  type: 'instagram_post' | 'instagram_story' | 'linkedin_banner' | 'youtube_thumb' | 'twitter_header';
  copy: string;
}

export interface WebContent {
  headline: string;
  subheadline: string;
  ctaButton: string;
  featureTitle1: string;
  featureDesc1: string;
  featureTitle2: string;
  featureDesc2: string;
}

export interface BrandKitData {
  id: string;
  businessName: string;
  mission: string;
  styleProfile: string;
  colors: ColorPalette[];
  typography: Typography;
  logo: LogoData;
  socials: SocialTemplate[];
  web: WebContent;
  createdAt: number;
}

export interface UserInput {
  mission: string;
  references: string[]; // URLs
}
