# Vimal Selvaraj — Portfolio

Personal portfolio of **Vimal Selvaraj**, Full-Stack Developer (ReactJS · NodeJS · PostgreSQL).
A single-page, motion-driven site built with React 19, TypeScript, Vite and Motion.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build locally
npm run lint
```

## Editing content

All copy lives in **`src/data/portfolio.ts`** — profile, experience, projects, achievements,
learning and contact details. Components only render what is defined there, so most updates
never touch a component.

- **Resume:** replace `public/resume/Vimal_Selvaraj_Resume.pdf` (keep the file name, or update
  `profile.resume` / `profile.resumeFileName`).
- **Photo:** put an image in `public/` and set `profile.photo` (e.g. `'/profile.jpg'`); until then
  the hero shows a monogram.
- **Design tokens:** colours, type scale, spacing and motion timing are in `src/styles/tokens.css`.

## Project structure

```
src/
  data/portfolio.ts        single source of truth for content
  styles/                  tokens + global styles
  components/layout/       Navbar, Footer, BackgroundGrid
  components/ui/           SectionHeading, Reveal, ScrollText, MagneticLink
  sections/                Hero, About, Skills, Experience, Projects, Achievements, Learning, Contact
  hooks/useActiveSection   scroll-spy for the navigation
public/                    favicon, social image, resume, robots.txt
```

Project illustrations (`sections/Projects/ProjectVisual.tsx`) are abstract, brand-free compositions
built in CSS — they intentionally never reproduce real client product screens.

## Deploying

The build output in `dist/` is a fully static site with no client-side routes, so it can be served
from any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3…). Build command
`npm run build`, output directory `dist`.

Before deploying, set the public origin in **`.env`** so social previews (LinkedIn, X, Slack)
get absolute image URLs:

```bash
VITE_SITE_URL=https://your-domain.example
```

Most hosts also let you set `VITE_SITE_URL` as a build-time environment variable instead.

## Accessibility & motion

- Every animation honours `prefers-reduced-motion`; illustrations pause while off screen.
- Skip link, landmark sections, keyboard-operable tabs and accordions, visible focus styles.
- Checked with axe-core: the only reported items are the decorative, screen-reader-hidden
  skills marquee (intentionally low contrast).
