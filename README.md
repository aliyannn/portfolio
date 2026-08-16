# ⚡ Aliyan Portfolio

A modern, high-performance developer portfolio website built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, **Framer Motion**, and **Three.js / React Three Fiber**.

Features interactive 3D elements, smooth momentum scrolling, a dynamic Bento grid layout, custom interactive project modals, and interactive UI micro-animations.

---

## ✨ Features

- 🎨 **Modern Dark Aesthetics**: Deep space palette (`#030712`) with vibrant glowing accents, glassmorphism, and background noise textures.
- ⚡ **Lightning Fast Performance**: Built with Vite and React 18 for instant HMR and optimized production builds.
- 📜 **Smooth Scrolling**: Powered by `@studio-freight/lenis` (Lenis) for fluid, physics-based momentum scrolling.
- 🧊 **Interactive 3D Visuals**: Powered by `@react-three/fiber` and `@react-three/drei`.
- 🍱 **Bento Grid Layout**: Sleek, responsive layout showcasing experience, bio, and key statistics.
- 💼 **Interactive Projects Showcase**: Detailed project modal popups with tags, feature lists, live links, and demo triggers.
- 🛠️ **Skills & Experience**: Interactive technology pills, categorized skill matrix, and career timeline.
- 📬 **Interactive Contact Section**: Functional form interface with interactive animations and celebratory feedback effects (canvas-confetti).
- 🖱️ **Dynamic Cursor Spotlight**: Custom ambient spotlight tracking mouse position across the screen.

---

## 🛠️ Tech Stack

- **Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer, Lucide Icons
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Smooth Scroll**: Lenis (`lenis`)
- **Utilities**: `clsx`, `tailwind-merge`, `canvas-confetti`

---

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js (v18.0.0 or higher) and npm installed on your machine.

- Node.js: `node -v`
- npm: `npm -v`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/aliyan-portfolio.git
   cd aliyan-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser to view the application.

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode with HMR. |
| `npm run build` | Compiles TypeScript & builds the app for production in `dist/`. |
| `npm run lint` | Runs TypeScript type checking without emitting files. |
| `npm run preview` | Locally previews the production build. |

---

## 📁 Directory Structure

```text
aliyan-portfolio/
├── public/                 # Static public assets
├── src/
│   ├── components/
│   │   ├── 3d/             # 3D Fiber canvases & geometries
│   │   ├── layout/         # Navbar, Footer, CursorSpotlight
│   │   ├── sections/       # Hero, BentoAbout, Projects, ExperienceSkills, Contact
│   │   └── ui/             # Reusable UI components & modals
│   ├── data/               # Portfolio data (projects, skills, experience)
│   ├── hooks/              # Custom React hooks (useLenis, useMousePosition)
│   ├── App.tsx             # Root application component
│   ├── index.css           # Global CSS, Tailwind directives & noise background
│   └── main.tsx            # Entry point
├── index.html              # Main HTML file
├── package.json            # Project dependencies & scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
