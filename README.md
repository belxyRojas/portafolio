# bkrojas.dev

Portafolio de **Belxy Katheryn Rojas** — Next.js, React Three Fiber y GSAP. Pensado para desplegarse en Vercel.

## Local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Formulario de contacto (Resend)

1. Crea una cuenta en [Resend](https://resend.com).
2. Copia `.env.example` a `.env.local` y llena:

```
RESEND_API_KEY=
RESEND_FROM="bkrojas.dev <onboarding@resend.dev>"
CONTACT_TO_EMAIL="belxy.rojas18@gmail.com"
```

En Vercel: Project → Settings → Environment Variables. En producción cambia `RESEND_FROM` a un dominio verificado.

Sin API key el formulario no se cae: muestra el correo directo.

## Deploy

```bash
npx vercel
```

O conecta el repo en [vercel.com/new](https://vercel.com/new). El PDF de la HV queda en `/BelxyRojas.pdf`.
