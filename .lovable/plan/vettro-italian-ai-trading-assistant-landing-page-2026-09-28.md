# Vettro — Italian AI Trading Assistant Landing Page

Landing page in Italian for Vettro, an AI trading assistant that analyzes markets and manages risk, with a registration funnel built on a few smart qualifying questions. Design: "Frosted glass terminal" direction (dark glassmorphism, IBM Plex Sans/Mono, teal #2dd4bf + sky #38bdf8 accents on near-black #070c12), branded as **Vettro**.

## What gets built

1. **Landing page at `/` (replaces placeholder)** — full Italian copy:
   - Nav: Vettro logo, links (Funzionalità, Come funziona, Recensioni), "Inizia" CTA
   - Hero: badge, headline "Analizza i mercati. Gestisci il rischio. Trada con precisione.", subcopy, CTAs (Inizia gratis / Guarda la demo), stats (trader attivi, tempo di analisi, mercati coperti), live-analysis card with bar chart + AI signal + risk management tiles
   - Features: 3 glass cards (Analisi predittiva, Gestione del rischio, Portafoglio ottimizzato)
   - Come funziona: 3 numbered steps (Definisci il profilo, Collega i mercati, Trada con l'assistente)
   - Testimonials: 3 Italian trader quotes
   - Onboarding section: multi-step smart questions
   - Footer with risk disclaimer (Vettro is not financial advice)

2. **Registration funnel — 3 smart questions, step by step** (in-page wizard):
   - Q1: experience level (Principiante / Intermedio / Avanzato)
   - Q2: markets traded (multi-select: Azioni, Forex, Cripto, Materie prime, Indici)
   - Q3: main goal (Massimizzare i profitti / Proteggere il capitale / Apprendere / Automatizzare)
   - Then email + name → submit → save to database → navigate to thank-you page

3. **Personalized thank-you page at `/benvenuto`** — reads the stored answers and shows a tailored summary (suggested strategy name based on experience + goal, selected markets, risk profile) plus a confirmation message in Italian.

## Backend (Lovable Cloud)

- Enable Lovable Cloud.
- Table `public.signups`: id, name, email, experience, markets (array), goal, created_at.
- RLS: insert allowed for anon (public landing page), no public reads.
- Grants: INSERT to anon, service_role full access.
- Server function (createServerFn) validates input with zod (email format, max lengths, fixed option values) and inserts the signup.
- Thank-you page fetches the just-created signup by id passed in URL params.

## Design tokens

- Colors (oklch in src/styles.css): base #070c12, panel #0e1620, ink #eef2f6, muted #9fb0c0, brand #2dd4bf, accent #38bdf8.
- Fonts: IBM Plex Sans (body) + IBM Plex Mono (accents), loaded via `<link>` in `src/routes/__root.tsx`.
- Glass cards: white/[0.04–0.06] backgrounds, 1px white/10 rings, backdrop-blur, rounded-2xl/3xl, drifting blurred aurora blobs in the background.

## Head metadata

- `__root.tsx`: site defaults (og:site_name, og:type website, twitter:card).
- `/`: title "Vettro — Assistente AI per il trading", Italian description, og tags.
- `/benvenuto`: its own title/description, robots noindex (private confirmation page).

## Verification

- Check build errors log after edits.
- Playwright: complete the funnel end-to-end (answer questions, submit email) and confirm the row lands in the database and the thank-you page renders the personalized summary.
