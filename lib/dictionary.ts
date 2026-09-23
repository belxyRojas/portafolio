export type Locale = "en" | "es";

export const dictionary = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      stack: "Tech Stack",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
      vault: "Archive",
      resume: "Resume",
    },
    hero: {
      kicker: "Systems Engineer · Full-Stack",
      line1: "Intertwined",
      line2: "Systems",
      body: "I design and ship platforms where frontend, backend, infrastructure, and security are one connected system—fast, scalable, and built to last.",
      ctaPrimary: "View my work",
      ctaSecondary: "Get in touch",
      scroll: "Scroll the system",
      layers: {
        frontend: "Frontend",
        backend: "Backend",
        infra: "Infrastructure",
        security: "Security",
      },
      layerStories: {
        frontend:
          "Interfaces that stay fast, accessible, and coherent across every product surface.",
        backend:
          "APIs, data, and services that hold the product together when traffic and complexity show up.",
        infra:
          "Cloud, containers, and CI/CD so shipping is a habit—not a ceremony.",
        security:
          "Auth, review, and tests so the whole knot can be trusted in production.",
      },
    },
    about: {
      kicker: "About",
      title: "Quality engineering for products that cannot afford to break.",
      body: "Systems Engineer with a Master’s in Computer Science focused on cybersecurity and 8+ years of full-stack delivery. I analyze, design, and implement scalable digital platforms for finance, commerce, and enterprise clients.",
      body2:
        "I work across Next.js, React, Node.js, Python, Java, C# / .NET, and SQL/NoSQL data layers. I also integrate AI APIs (OpenAI, Anthropic) and automation pipelines (Make, Zapier, Supabase) when they reduce real operational friction—not as decoration.",
      body3:
        "The through-line is modular architecture, automated testing, CI/CD, and code review. Frontend, backend, infrastructure, and security are not separate tracks. They are one knot.",
      stats: [
        { value: "8+", label: "Years shipping" },
        { value: "15+", label: "Enterprise platforms" },
        { value: "M.Sc.", label: "Cybersecurity focus" },
        { value: "B2B", label: "Clients" },
      ],
      educationTitle: "Education",
    },
    stack: {
      kicker: "Tech Stack",
      title: "The tools I actually use to design, ship, and operate systems.",
      groups: [
        {
          title: "Languages & frameworks",
          items: [
            "TypeScript",
            "Next.js",
            "React",
            "Node.js",
            "Python",
            "Java",
            "C# / .NET",
            "Astro",
            "Angular",
          ],
        },
        {
          title: "Data",
          items: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "SQL", "NoSQL"],
        },
        {
          title: "Cloud & delivery",
          items: ["AWS", "Docker", "CI/CD", "Microservices", "REST", "GraphQL"],
        },
        {
          title: "AI & automation",
          items: ["OpenAI", "Anthropic", "Supabase", "Make", "Zapier"],
        },
        {
          title: "Engineering practice",
          items: [
            "Modular architecture",
            "Automated testing",
            "Code review",
            "Scrum",
            "User-centered design",
          ],
        },
      ],
    },
    projects: {
      kicker: "Projects",
      title: "Selected work — live product and client systems.",
      live: "Live",
      caseStudy: "Case study",
      featured: "Featured",
      vaultTeaser: {
        kicker: "Clients",
        title: "Live client work.",
        body: "Product sites shipped with Off-the-Record. Open any of them from the archive.",
        cta: "View the work",
      },
      items: [
        {
          id: "otr",
          title: "Off-the-Record",
          role: "Senior Systems Engineer",
          year: "2017 — Present",
          href: "https://isofftherecord.com/",
          description:
            "Engineering lead for a Miami studio shipping digital products to clients. Delivered 15+ enterprise web platforms across retail, fintech, and SaaS: architecture, implementation, CI/CD, and a team of three.",
          stack: [
            "React",
            "Next.js",
            "Astro",
            "TypeScript",
            "Node.js",
            "Angular",
            "PostgreSQL",
            "MongoDB",
            "Docker",
            "AWS",
          ],
        },
        {
          id: "fintech",
          title: "Investment & capital-markets platforms",
          role: "Full-stack engineer",
          year: "2016 — Present",
          href: null,
          description:
            "Secure interfaces and backend flows for investment, trading-adjacent, and data-management products. Architecture and security practices applied in capital-markets contexts—without treating the exchange as a single public brand.",
          stack: [
            "React",
            "TypeScript",
            "Node.js",
            "PostgreSQL",
            "PHP",
            "MySQL",
          ],
        },
        {
          id: "retail",
          title: "Retail & commerce platforms",
          role: "Full-stack engineer",
          year: "2017 — Present",
          href: null,
          description:
            "Enterprise storefronts and operations tools for retail clients: catalog, checkout-adjacent flows, and internal data surfaces. Built as modular systems that can scale without rewriting the core.",
          stack: ["Next.js", "React", "Node.js", "MongoDB", "AWS"],
        },
        {
          id: "saas",
          title: "SaaS enterprise systems",
          role: "Senior Systems Engineer",
          year: "2017 — Present",
          href: null,
          description:
            "Multi-tenant style product surfaces for SaaS clients: authentication boundaries, API integrations, and delivery pipelines. Emphasis on code review, automated tests, and architectures that stay maintainable after launch.",
          stack: ["TypeScript", "Next.js", "Node.js", "GraphQL", "Docker", "CI/CD"],
        },
      ],
    },
    experience: {
      kicker: "Experience",
      title: "Eight years connecting product, engineering, and delivery.",
      present: "Present",
      items: [
        {
          company: "Off-the-Record",
          role: "Senior Systems Engineer",
          period: "2017 — Present",
          href: "https://isofftherecord.com/",
          bullets: [
            "Delivered 15+ enterprise web platforms for clients in retail, fintech, and SaaS.",
            "Led a team of three: task coordination, code review, and engineering standards.",
            "Installed delivery hygiene: version control, CI pipelines, and functional testing.",
          ],
          stack:
            "React · Next.js · Astro · TypeScript · Node.js · Angular · PostgreSQL · MongoDB · Docker · AWS",
        },
        {
          company: "Damappa",
          role: "Software Developer",
          period: "2016 — 2017",
          href: null,
          bullets: [
            "Contributed to digital solutions for the capital-markets sector with architecture and security practices in the loop.",
            "Implemented dynamic interfaces for investment, commerce, and data-management platforms.",
          ],
          stack: "HTML · CSS3 · SASS · JavaScript · React · PHP · MySQL · WordPress",
        },
        {
          company: "Grupo A Estudio",
          role: "Developer",
          period: "2015 — 2016",
          href: null,
          bullets: [
            "Built custom web applications for companies across different industries.",
            "Adapted the stack to each client’s constraints instead of forcing a single template.",
          ],
          stack: "HTML · CSS3 · SASS · JavaScript · React · PHP · MySQL · WordPress",
        },
      ],
    },
    education: [
      {
        school: "Escuela Colombiana de Ingeniería Julio Garavito",
        program: "Master’s in Computer Science (cybersecurity emphasis)",
        period: "2023 — 2025",
      },
      {
        school: "Universidad ECCI",
        program: "Systems Engineering",
        period: "2017 — 2020",
      },
      {
        school: "Universidad ECCI",
        program: "Cybersecurity & Informatics seminar",
        period: "2020",
      },
      {
        school: "Universidad Autónoma de Bucaramanga",
        program: "Diploma in programming, mobile applications",
        period: "2021",
      },
      {
        school: "SENA",
        program: "Technology in Information Systems Analysis & Development",
        period: "2013 — 2015",
      },
      {
        school: "SENA",
        program: "Systems technician",
        period: "2011 — 2012",
      },
    ],
    contact: {
      kicker: "Contact",
      title: "Let’s talk about the system you need to ship.",
      body: "A product, a platform, or a messy integration between the two. Write with context—I read everything that arrives here.",
      name: "Name",
      email: "Email",
      message: "Message",
      submit: "Send message",
      sending: "Sending…",
      success: "Message received. I’ll get back to you soon.",
      error: "Could not send. Email me directly instead.",
      unconfigured:
        "The form is not connected yet. Use email and I’ll reply from there.",
      or: "or write directly",
      locationLabel: "Based",
    },
    footer: {
      rights: "All rights reserved.",
      knot: "The knot is the mark: frontend, backend, infrastructure, and security—intertwined.",
    },
    vault: {
      kicker: "Archive",
      galleryTitle: "Selected live work",
      galleryBody:
        "Ten live product sites. Interface, backend, and delivery.",
      sites: "sites",
      visit: "Open site",
      index: "Index",
      studio: "Shipped with Off-the-Record",
      focus: "In the work",
      scrollHint: "Scroll the archive",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      stack: "Stack",
      projects: "Proyectos",
      experience: "Experiencia",
      contact: "Contacto",
      vault: "Archivo",
      resume: "HV",
    },
    hero: {
      kicker: "Ingeniera de Sistemas · Full-Stack",
      line1: "Sistemas",
      line2: "entrelazados",
      body: "Diseño y entrego plataformas donde frontend, backend, infraestructura y seguridad son un solo sistema: rápido, escalable y construido para durar.",
      ctaPrimary: "Ver trabajo",
      ctaSecondary: "Hablemos",
      scroll: "Recorre el sistema",
      layers: {
        frontend: "Interfaz",
        backend: "Backend",
        infra: "Infraestructura",
        security: "Seguridad",
      },
      layerStories: {
        frontend:
          "Interfaces rápidas, accesibles y coherentes en todas las superficies del producto.",
        backend:
          "APIs, datos y servicios que sostienen el producto cuando aparece la carga y la complejidad.",
        infra:
          "Cloud, contenedores y CI/CD para que entregar sea un hábito, no una ceremonia.",
        security:
          "Auth, revisión y tests para que el nudo entero se pueda confiar en producción.",
      },
    },
    about: {
      kicker: "Sobre mí",
      title: "Ingeniería de calidad para productos que no se pueden romper.",
      body: "Ingeniera de Sistemas con Maestría en Informática con énfasis en ciberseguridad y más de 8 años de entrega full-stack. Analizo, diseño e implemento plataformas digitales escalables y seguras para clientes de finanzas, comercio y equipos enterprise.",
      body2:
        "Trabajo con Next.js, React, Node.js, Python, Java, C# / .NET y capas de datos SQL/NoSQL. Integro APIs de IA (OpenAI, Anthropic) y pipelines de automatización (Make, Zapier, Supabase) cuando reducen fricción operativa.",
      body3:
        "La línea conductora es arquitectura modular, testing automatizado, CI/CD y revisión de código. Frontend, backend, infraestructura y seguridad no son rieles separados. Son un nudo.",
      stats: [
        { value: "8+", label: "Años entregando" },
        { value: "15+", label: "Plataformas enterprise" },
        { value: "M.Sc.", label: "Énfasis ciberseguridad" },
        { value: "B2B", label: "Clientes" },
      ],
      educationTitle: "Educación",
    },
    stack: {
      kicker: "Tech Stack",
      title: "Las herramientas que sí uso para diseñar, entregar y operar sistemas.",
      groups: [
        {
          title: "Lenguajes y frameworks",
          items: [
            "TypeScript",
            "Next.js",
            "React",
            "Node.js",
            "Python",
            "Java",
            "C# / .NET",
            "Astro",
            "Angular",
          ],
        },
        {
          title: "Datos",
          items: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "SQL", "NoSQL"],
        },
        {
          title: "Cloud y entrega",
          items: ["AWS", "Docker", "CI/CD", "Microservicios", "REST", "GraphQL"],
        },
        {
          title: "IA y automatización",
          items: ["OpenAI", "Anthropic", "Supabase", "Make", "Zapier"],
        },
        {
          title: "Práctica de ingeniería",
          items: [
            "Arquitectura modular",
            "Testing automatizado",
            "Revisión de código",
            "Scrum",
            "Diseño centrado en el usuario",
          ],
        },
      ],
    },
    projects: {
      kicker: "Proyectos",
      title: "Trabajo seleccionado — producto en vivo y sistemas de clientes.",
      live: "En vivo",
      caseStudy: "Case study",
      featured: "Destacado",
      vaultTeaser: {
        kicker: "Clientes",
        title: "Trabajo de clientes en vivo.",
        body: "Sitios de producto entregados con Off-the-Record. Ábrelos desde el archivo.",
        cta: "Ver el trabajo",
      },
      items: [
        {
          id: "otr",
          title: "Off-the-Record",
          role: "Senior Systems Engineer",
          year: "2017 — Actualidad",
          href: "https://isofftherecord.com/",
          description:
            "Liderazgo de ingeniería en un estudio de Miami que entrega productos digitales a clientes. 15+ plataformas web enterprise en retail, fintech y SaaS: arquitectura, implementación, CI/CD y un equipo de tres personas.",
          stack: [
            "React",
            "Next.js",
            "Astro",
            "TypeScript",
            "Node.js",
            "Angular",
            "PostgreSQL",
            "MongoDB",
            "Docker",
            "AWS",
          ],
        },
        {
          id: "fintech",
          title: "Plataformas de inversión y mercado de capitales",
          role: "Ingeniera full-stack",
          year: "2016 — Actualidad",
          href: null,
          description:
            "Interfaces y flujos backend seguros para productos de inversión, entornos cercanos a trading y gestión de datos. Prácticas de arquitectura y seguridad en contextos bursátiles, sin tratar la plaza como una marca pública única.",
          stack: [
            "React",
            "TypeScript",
            "Node.js",
            "PostgreSQL",
            "PHP",
            "MySQL",
          ],
        },
        {
          id: "retail",
          title: "Plataformas retail y commerce",
          role: "Ingeniera full-stack",
          year: "2017 — Actualidad",
          href: null,
          description:
            "Vitrinas enterprise y herramientas de operación para clientes retail: catálogo, flujos de compra y superficies internas de datos. Sistemas modulares que escalan sin reescribir el núcleo.",
          stack: ["Next.js", "React", "Node.js", "MongoDB", "AWS"],
        },
        {
          id: "saas",
          title: "Sistemas SaaS enterprise",
          role: "Senior Systems Engineer",
          year: "2017 — Actualidad",
          href: null,
          description:
            "Superficies de producto para clientes SaaS: límites de autenticación, integraciones API y pipelines de entrega. Énfasis en code review, pruebas automatizadas y arquitecturas que se mantienen después del lanzamiento.",
          stack: ["TypeScript", "Next.js", "Node.js", "GraphQL", "Docker", "CI/CD"],
        },
      ],
    },
    experience: {
      kicker: "Experiencia",
      title: "Ocho años conectando producto, ingeniería y entrega.",
      present: "Actualidad",
      items: [
        {
          company: "Off-the-Record",
          role: "Senior Systems Engineer",
          period: "2017 — Actualidad",
          href: "https://isofftherecord.com/",
          bullets: [
            "Entregué 15+ plataformas web enterprise para clientes (retail, fintech, SaaS).",
            "Lideré un equipo de tres: coordinación, revisión de código y estándares de ingeniería.",
            "Implementé higiene de entrega: control de versiones, CI y pruebas funcionales.",
          ],
          stack:
            "React · Next.js · Astro · TypeScript · Node.js · Angular · PostgreSQL · MongoDB · Docker · AWS",
        },
        {
          company: "Damappa",
          role: "Desarrolladora de software",
          period: "2016 — 2017",
          href: null,
          bullets: [
            "Participé en soluciones digitales para el sector bursátil, con arquitectura y seguridad en el ciclo.",
            "Implementé interfaces dinámicas para plataformas de inversión, comercio y gestión de datos.",
          ],
          stack: "HTML · CSS3 · SASS · JavaScript · React · PHP · MySQL · WordPress",
        },
        {
          company: "Grupo A Estudio",
          role: "Desarrollador",
          period: "2015 — 2016",
          href: null,
          bullets: [
            "Desarrollé aplicaciones web a medida para empresas de distintos sectores.",
            "Adapté el stack a las restricciones de cada cliente en lugar de forzar una plantilla.",
          ],
          stack: "HTML · CSS3 · SASS · JavaScript · React · PHP · MySQL · WordPress",
        },
      ],
    },
    education: [
      {
        school: "Escuela Colombiana de Ingeniería Julio Garavito",
        program: "Maestría en Informática (énfasis en ciberseguridad)",
        period: "2023 — 2025",
      },
      {
        school: "Universidad ECCI",
        program: "Ingeniería de Sistemas",
        period: "2017 — 2020",
      },
      {
        school: "Universidad ECCI",
        program: "Seminario de profundización en ciberseguridad e informática",
        period: "2020",
      },
      {
        school: "Universidad Autónoma de Bucaramanga",
        program: "Diplomado en programación con énfasis en apps móviles",
        period: "2021",
      },
      {
        school: "SENA",
        program: "Tecnología en Análisis y Desarrollo de Sistemas de Información",
        period: "2013 — 2015",
      },
      {
        school: "SENA",
        program: "Técnico en sistemas",
        period: "2011 — 2012",
      },
    ],
    contact: {
      kicker: "Contacto",
      title: "Hablemos del sistema que necesitas poner en producción.",
      body: "Un producto, una plataforma o una integración entre ambos. Escribe con contexto: leo todo lo que llega aquí.",
      name: "Nombre",
      email: "Correo",
      message: "Mensaje",
      submit: "Enviar mensaje",
      sending: "Enviando…",
      success: "Mensaje recibido. Te respondo pronto.",
      error: "No se pudo enviar. Escríbeme directo al correo.",
      unconfigured:
        "El formulario aún no está conectado. Usa el correo y te respondo desde ahí.",
      or: "o escribe directo",
      locationLabel: "Ubicación",
    },
    footer: {
      rights: "Todos los derechos reservados.",
      knot: "El nudo es la marca: frontend, backend, infraestructura y seguridad—entrelazados.",
    },
    vault: {
      kicker: "Archivo",
      galleryTitle: "Trabajo en vivo seleccionado",
      galleryBody:
        "Diez sitios de producto en vivo. Interfaz, backend y entrega.",
      sites: "sitios",
      visit: "Abrir sitio",
      index: "Índice",
      studio: "Entregado con Off-the-Record",
      focus: "En el trabajo",
      scrollHint: "Recorre el archivo",
    },
  },
} as const;

export type Dictionary = (typeof dictionary)[Locale];
