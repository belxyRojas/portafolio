export const site = {
  name: "Belxy Katheryn Rojas",
  shortName: "BR",
  domain: "bkrojas.dev",
  email: "belxy.rojas18@gmail.com",
  linkedin:
    "https://www.linkedin.com/in/belxy-katheryn-rojas-beltran-26894ab8",
  resume: "/BelxyRojas.pdf",
  resumeFileName: "Belxy-Rojas-HV.pdf",
  location: {
    en: "Colombia · Remote · Clients",
    es: "Colombia · Remoto · Clientes",
  },
} as const;

export const navItems = [
  { id: "home", href: "#home" },
  { id: "about", href: "#about" },
  { id: "stack", href: "#stack" },
  { id: "projects", href: "#projects" },
  { id: "experience", href: "#experience" },
  { id: "contact", href: "#contact" },
] as const;

export const systemLayers = ["frontend", "backend", "infra", "security"] as const;

/** Sticky hero length: 1 viewport pinned + 3 extra screens so each layer gets a beat. */
export const HERO_SCROLL_VH = 400;

export const layerSkills = {
  frontend: ["Next.js", "React", "TypeScript", "Astro"],
  backend: ["Node.js", "Python", "Java", "C# / .NET", "PostgreSQL", "GraphQL"],
  infra: ["AWS", "Docker", "CI/CD", "Microservices"],
  security: ["Auth", "Testing", "Code review", "Secure APIs"],
} as const;
