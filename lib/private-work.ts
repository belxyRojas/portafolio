export type PrivateWorkItem = {
  id: string;
  href: string;
  host: string;
  title: string;
  accent: string;
  wash: string;
  ink: string;
  muted: string;
  word: string;
  category: { en: string; es: string };
  blurb: { en: string; es: string };
  focus: { en: string[]; es: string[] };
};

export const privateWork: PrivateWorkItem[] = [
  {
    id: "waterford",
    href: "https://waterfordbusinessdistrict.com/",
    host: "waterfordbusinessdistrict.com",
    title: "Waterford Business District",
    accent: "#7ec8c9",
    wash: "#0b3d4a",
    ink: "#e7f4f5",
    muted: "#9ec9ce",
    word: "WATERFORD",
    category: {
      en: "Place brand · Real estate",
      es: "Marca de lugar · Real estate",
    },
    blurb: {
      en: "250-acre professional campus in Miami. Identity, naming, production governance, and a web system for a district that had to feel like a destination—not a brochure.",
      es: "Campus profesional de 250 acres en Miami. Identidad, naming, gobierno de producción y un sistema web para que el distrito se sienta destino, no folleto.",
    },
    focus: {
      en: ["Identity", "Naming", "Web system", "Governance"],
      es: ["Identidad", "Naming", "Sistema web", "Gobierno"],
    },
  },
  {
    id: "dentalmonitoring",
    href: "https://dentalmonitoring.com/",
    host: "dentalmonitoring.com",
    title: "DentalMonitoring",
    accent: "#3ee0c5",
    wash: "#06282f",
    ink: "#e7fffb",
    muted: "#8dcdc2",
    word: "DM",
    category: {
      en: "Healthtech · AI platform",
      es: "Healthtech · plataforma de IA",
    },
    blurb: {
      en: "Global orthodontic AI product site—FDA De Novo / MDR positioning, multi-language surfaces, and a marketing system built to hold clinical claims without looking like a lab PDF.",
      es: "Sitio del producto global de IA ortodóntica: posicionamiento FDA De Novo / MDR, superficies multi-idioma y un sistema de marketing que sostiene claims clínicos sin verse como un PDF de laboratorio.",
    },
    focus: {
      en: ["Product site", "i18n", "Clinical claims", "Platform story"],
      es: ["Sitio de producto", "i18n", "Claims clínicos", "Relato de plataforma"],
    },
  },
  {
    id: "carnival",
    href: "https://www.carnivalmeetings.com/",
    host: "carnivalmeetings.com",
    title: "Carnival Meetings",
    accent: "#ff4b4b",
    wash: "#1b2a6b",
    ink: "#f4f6ff",
    muted: "#b7c0e8",
    word: "CARNIVAL",
    category: {
      en: "Hospitality · Events at sea",
      es: "Hospitalidad · eventos en el mar",
    },
    blurb: {
      en: "Meetings, incentives, and full-ship charters for Carnival Cruise Line. A conversion-minded site that still feels like a vacation—fleet, destinations, and quote flow in one system.",
      es: "Meetings, incentives y charters de barco completo para Carnival Cruise Line. Un sitio pensado para conversión que sigue sintiéndose vacación: flota, destinos y cotización en un solo sistema.",
    },
    focus: {
      en: ["Events", "Fleet", "Destinations", "Quote flow"],
      es: ["Eventos", "Flota", "Destinos", "Cotización"],
    },
  },
  {
    id: "otr",
    href: "https://madeotr.com/",
    host: "madeotr.com",
    title: "Off-the-Record",
    accent: "#ceff1a",
    wash: "#111111",
    ink: "#f3f3f0",
    muted: "#9a9a94",
    word: "OTR",
    category: {
      en: "Studio · Brand & web",
      es: "Estudio · marca y web",
    },
    blurb: {
      en: "The studio’s own site—formerly Nativo. Editorial pacing, work index, and a voice that had to feel like the room where the other projects were made.",
      es: "El sitio del estudio—antes Nativo. Ritmo editorial, índice de trabajo y una voz que tenía que sentirse como la sala donde se hicieron los otros proyectos.",
    },
    focus: {
      en: ["Editorial", "Work index", "Voice", "Studio site"],
      es: ["Editorial", "Índice", "Voz", "Sitio del estudio"],
    },
  },
  {
    id: "unikwax",
    href: "https://unikwax.com/",
    host: "unikwax.com",
    title: "Uni K Wax",
    accent: "#e8b4a2",
    wash: "#3a2a22",
    ink: "#f8eee6",
    muted: "#d4b8aa",
    word: "UNIK",
    category: {
      en: "Retail · Wellness",
      es: "Retail · wellness",
    },
    blurb: {
      en: "National natural-wax studio brand. Calm, high-hygiene storytelling, membership and services architecture, and a site that sells comfort before it sells a Brazilian.",
      es: "Marca nacional de estudios de cera natural. Relato calmado y de higiene alta, arquitectura de membresías y servicios, y un sitio que vende confort antes de vender un Brazilian.",
    },
    focus: {
      en: ["Brand site", "Memberships", "Services", "Hygiene story"],
      es: ["Sitio de marca", "Membresías", "Servicios", "Relato de higiene"],
    },
  },
  {
    id: "whistle",
    href: "https://whistleexpresscarwash.com/",
    host: "whistleexpresscarwash.com",
    title: "Whistle Express",
    accent: "#ff8a1e",
    wash: "#16120c",
    ink: "#fff4e8",
    muted: "#d2b394",
    word: "WHISTLE",
    category: {
      en: "Retail · Service network",
      es: "Retail · red de servicio",
    },
    blurb: {
      en: "Nationwide express car-wash network. Location finder, wash tiers, memberships, and a mobile-app push—operational content that still has to feel fun to use.",
      es: "Red nacional de autolavado express. Buscador de sedes, niveles de wash, membresías e impulso a la app: contenido operativo que igual tiene que ser agradable de usar.",
    },
    focus: {
      en: ["Locations", "Wash tiers", "Memberships", "App"],
      es: ["Sedes", "Niveles", "Membresías", "App"],
    },
  },
  {
    id: "wynwood-walls",
    href: "https://thewynwoodwalls.com/",
    host: "thewynwoodwalls.com",
    title: "Wynwood Walls",
    accent: "#ff3b7a",
    wash: "#120814",
    ink: "#ffe8f1",
    muted: "#d7a0b6",
    word: "WALLS",
    category: {
      en: "Culture · Museum",
      es: "Cultura · museo",
    },
    blurb: {
      en: "Miami’s open-air street-art museum. Tickets, artists, venue, and private events—an ever-evolving collection that needed a site as alive as the walls.",
      es: "El museo de arte urbano al aire libre de Miami. Tickets, artistas, venue y eventos privados: una colección que cambia y necesitaba un sitio tan vivo como los muros.",
    },
    focus: {
      en: ["Tickets", "Artists", "Venue", "Private events"],
      es: ["Tickets", "Artistas", "Venue", "Eventos privados"],
    },
  },
  {
    id: "core-wynwood",
    href: "https://corewynwood.com/",
    host: "corewynwood.com",
    title: "CORE Wynwood",
    accent: "#c4b48a",
    wash: "#2a2620",
    ink: "#f4efe4",
    muted: "#cfc6b4",
    word: "CORE",
    category: {
      en: "Real estate · Architecture",
      es: "Real estate · arquitectura",
    },
    blurb: {
      en: "Goldman Properties’ Class A workplace in Wynwood. Spatial storytelling, amenity systems, and an AR-adjacent presentation for a building that had to feel like the neighborhood it sits in.",
      es: "El workplace Class A de Goldman Properties en Wynwood. Relato espacial, sistema de amenities y una presentación cercana a AR para un edificio que tenía que sentirse del barrio.",
    },
    focus: {
      en: ["Workplace", "Amenities", "Presentation", "Neighborhood"],
      es: ["Workplace", "Amenities", "Presentación", "Barrio"],
    },
  },
  {
    id: "otowers",
    href: "https://otowers.com/",
    host: "otowers.com",
    title: "O Towers",
    accent: "#e11d3a",
    wash: "#14110f",
    ink: "#f6f1ea",
    muted: "#c9b8b0",
    word: "TOWERS",
    category: {
      en: "Place brand · Workplace campus",
      es: "Marca de lugar · campus workplace",
    },
    blurb: {
      en: "Aventura destination office campus: White, Red, and Onyx towers. Art, wellness, and LEED Platinum storytelling for a postmodern workplace that had to feel iconic, not generic Class A.",
      es: "Campus de oficinas en Aventura: torres White, Red y Onyx. Relato de arte, wellness y LEED Platinum para un workplace postmoderno que tenía que sentirse icónico, no un Class A genérico.",
    },
    focus: {
      en: ["Campus", "Three towers", "Amenities", "Leasing"],
      es: ["Campus", "Tres torres", "Amenities", "Leasing"],
    },
  },
  {
    id: "vocametrics",
    href: "https://www.vocametrics.com/",
    host: "vocametrics.com",
    title: "Vocametrics",
    accent: "#5ee0c8",
    wash: "#07151c",
    ink: "#e8fffa",
    muted: "#8fb8b2",
    word: "VOCA",
    category: {
      en: "SaaS · Voice AI",
      es: "SaaS · IA de voz",
    },
    blurb: {
      en: "AI call analytics on their own infrastructure—not a sample, every call. Product story, bilingual surface, and a conversion path that had to explain a hard idea without sounding like a lab.",
      es: "Analítica de llamadas con IA en su propia infraestructura: no una muestra, todas las llamadas. Relato de producto, superficie bilingüe y un camino de conversión que tenía que explicar una idea difícil sin sonar a laboratorio.",
    },
    focus: {
      en: ["Product site", "i18n", "Demo flow", "Platform story"],
      es: ["Sitio de producto", "i18n", "Demo", "Relato de plataforma"],
    },
  },
];

export function getPrivateWork() {
  return privateWork;
}
