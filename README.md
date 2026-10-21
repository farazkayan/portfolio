# Faraz Kayan Haque — Portfolio

> Personal portfolio of Faraz Kayan Haque — student, builder, and tinkerer based in Dhaka.  
> **Live Website:** [farazkh.dev](https://farazkh.dev)  
> **Source Repository:** [github.com/farazkayan/portfolio](https://github.com/farazkayan/portfolio)

---

## Overview

A personal portfolio built to reflect genuine experimentation, real-world learning, and hands-on software development. Rather than relying on generic developer templates or AI design clichés, the site focuses on restraint, editorial typography, subtle violet accents, and authentic case studies that document what was built, why it was built, and what broke along the way.

---

## Signature Features

- **Interactive Halftone Portrait:** A custom childhood photograph rendered as a 60+ FPS interactive halftone particle canvas. Built with GSAP and batched HTML5 `Path2D` operations, it morphs smoothly between photographic states with kinetic arcs, radial staggering, full DPR scaling, and reduced-motion fallback.
- **Detailed Project Case Studies:** In-depth breakdowns of real software including **SoundMesh** (a local-first zero-cloud audio sync pipeline), **Avero** (a private spatial memory vault), and **Nexus** (a native Windows workflow manager).
- **Homelab Section:** A chronicle of self-hosting experiments run on a repurposed Dell laptop with Ubuntu 24.04 and Docker, exploring services like Immich, Jellyfin, Open WebUI, and Nextcloud.
- **Interactive Cat Canvas:** A playful, lightweight Rive animation (`cat-following-the-mouse.riv`) tracking pointer movement within the hobbies section.
- **Halftone Wordmark Footer:** An interactive typographic dot-matrix footer that reacts to pointer movement and clicks with spring physics and warmth gradient dispersal.

---

## Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 8](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation & Canvas:**
  - [Motion](https://motion.dev/) (layout animations and transitions)
  - [GSAP](https://gsap.com/) (particle interpolation)
  - [@rive-app/react-canvas](https://rive.app/) (vector animation runtime)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## Project Structure

```text
├── index.html                   # HTML entry point with metadata & preconnect fonts
├── public/                      # Static assets, SVG logos, and Rive animations
│   ├── cat-following-the-mouse.riv
│   ├── soundmesh.png
│   ├── avero.png
│   ├── nexus.png
│   ├── mastermind.svg
│   └── yale.svg
├── src/
│   ├── components/
│   │   ├── HeroHome.tsx         # Hero section & core identity statement
│   │   ├── ChildhoodPortrait.tsx# Halftone morphing canvas component
│   │   ├── AboutSection.tsx     # Student narrative & feedback loop
│   │   ├── SkillsSection.tsx    # Interactive toolkit & details panel
│   │   ├── ProjectsSection.tsx  # Featured work overview
│   │   ├── ProjectCard.tsx      # Expandable project case-study card
│   │   ├── AllProjectsPage.tsx  # Dedicated project archive view
│   │   ├── HomelabSection.tsx   # Self-hosted infrastructure breakdown
│   │   ├── HobbiesSection.tsx   # Interests & Rive cat interaction
│   │   ├── ContactSection.tsx   # Contact channels & live Dhaka time radar
│   │   ├── Navbar.tsx           # Floating Limelight navigation bar
│   │   └── ui/                  # Reusable UI primitives (FlowButton, HalftoneFooter)
│   ├── data/
│   │   ├── halftoneMorphData.ts # Particle coordinate matrices for the portrait
│   │   └── projectsData.ts      # Comprehensive project case study data
│   ├── App.tsx                  # Root app layout and view switching
│   ├── index.css                # Tailwind CSS v4 design tokens & base rules
│   └── main.tsx                 # Client mount entry point
├── package.json                 # Project dependencies and npm scripts
├── tsconfig.json                # TypeScript compiler configuration
└── vite.config.ts               # Vite configuration with Tailwind CSS plugin
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or newer recommended)
- `npm` (packaged with Node.js)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/farazkayan/portfolio.git
cd portfolio
npm install
```

### Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server at `http://localhost:3000` |
| `npm run build` | Compiles TypeScript and creates an optimized production bundle in `dist/` |
| `npm run preview` | Locally serves the production build for testing |
| `npm run lint` | Runs TypeScript type checking (`tsc --noEmit`) |
| `npm run clean` | Removes build output directories (`dist/`, `server.js`) |

---

## Deployment

The project builds to a fully static web bundle (`npm run build`), ready for deployment on platforms such as Cloudflare Pages, Vercel, Netlify, or GitHub Pages.

---

## License

Personal project code and content &copy; 2026 Faraz Kayan Haque.
