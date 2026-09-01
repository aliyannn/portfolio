# ⚡ Aliyan Gohar Portfolio (v2)

A modern, high-performance developer portfolio built with **Next.js 14 (App Router)**, **React 18**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Three.js / React Three Fiber**.

Engineered for 60 FPS WebGL rendering, sub-second hydration, zero garbage collection frame drops, and clean full-stack API architecture.

---

## ✨ Key Architectural Highlights

- 🎨 **Obsidian Cyber Aesthetics**: Deep dark-mode palette (`#030712`) with vibrant glowing accents, glassmorphism, and responsive noise grid overlays.
- 🧊 **Optimized 3D WebGL Hologram & Rubik's Cube**: Powered by `@react-three/fiber` and `@react-three/drei` with pre-allocated vector math, clamped DPR (`[1, 1.5]`), and IntersectionObserver viewport auto-pausing.
- ⚡ **Zero-Lag React Architecture**: Dynamic client telemetry and isolated 1-second clock updates to eliminate cascading re-renders across the main page.
- 🍱 **Responsive Bento Grid & Project Matrix**: Showcasing enterprise deployments, verifiable benchmarks, live uptime, and categorized filter tabs.
- 📬 **Full-Stack Resend Email Engine**: Server-side Next.js API route (`/api/send`) powered by Resend for instant lead delivery with direct reply headers.
- 🛡️ **Admin Reviews Management**: Dedicated PIN-authenticated admin dashboard (`/admin/reviews`) with dynamic status toggle and live moderation.
- 🖱️ **Zero-Overhead Cursor Spotlight**: RAF-throttled desktop ambient spotlight with automatic mobile/touch disabling.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router, Server & Client Components)
- **Core**: React 18, TypeScript (Strict Mode)
- **Styling**: Tailwind CSS, PostCSS, Lucide Icons
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Email & Delivery**: Resend SDK (`resend`), Canvas Confetti (`canvas-confetti`)
- **Linting & Code Quality**: ESLint (`eslint-config-next`)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js (v18.17.0 or higher) and npm installed.

```bash
node -v
npm -v
```

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/aliyannn/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables** (Optional for live email dispatch):
   Create a `.env.local` file:
   ```env
   RESEND_API_KEY=your_resend_api_key
   NEXT_PUBLIC_ADMIN_PIN=your_admin_pin
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server at `http://localhost:3000`. |
| `npm run build` | Compiles an optimized production build (`.next/`). |
| `npm run start` | Runs the production build locally. |
| `npm run lint` | Runs ESLint and TypeScript validation with strict hygiene. |

---

## 📁 Repository Structure

```text
portfolio/
├── app/
│   ├── admin/reviews/      # PIN-protected reviews management panel
│   ├── api/
│   │   ├── og/             # Open Graph metadata preview handler
│   │   ├── reviews/        # Public & admin reviews API endpoint
│   │   └── send/           # Resend email dispatch route
│   ├── globals.css         # Global design system & utility classes
│   ├── layout.tsx          # Root layout with fonts, JSON-LD Schema & metadata
│   ├── page.tsx            # Main single-page portfolio view
│   ├── robots.ts           # Dynamic robots.txt metadata generator
│   └── sitemap.ts          # Dynamic sitemap.xml metadata generator
├── components/
│   ├── 3d/
│   │   ├── 3DErrorBoundary.tsx  # WebGL hardware acceleration fallback
│   │   └── RubiksCube.tsx       # Zero-GC interactive 3D Rubik's Cube
│   ├── BentoGrid.tsx            # Systems overview & engineering metrics
│   ├── CyberHologram.tsx        # Geodesic core & telemetry satellite HUD
│   ├── Experience.tsx           # Work history & education timeline
│   ├── Hero.tsx                 # High-impact identity header & CTAs
│   ├── Logo.tsx                 # Custom SVG geometric monogram
│   ├── Navbar.tsx               # Floating glassmorphic navigation header
│   ├── Projects.tsx             # Filterable production projects showcase
│   ├── RubiksCubeCard.tsx       # 3D interactive stack card container
│   └── Testimonials.tsx         # Verified reviews feed & submission modal
├── public/                      # Static assets & PDF resume
├── src/
│   ├── components/
│   │   ├── layout/              # CursorSpotlight, Footer
│   │   ├── sections/            # Contact section
│   │   └── ProjectCard.tsx      # Individual project card with 3D tilt
│   └── data/
│       ├── portfolioData.ts     # Core bio, experience, skills data
│       └── projects.ts          # Production project registry & screenshots
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
