export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: 'Full Stack' | '3D & Interactive' | 'UI/UX Design' | 'Mobile';
  tags: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  metrics?: { label: string; value: string }[];
}

export const PROJECTS: Project[] = [
  {
    id: 'nexus-3d',
    title: 'Nexus 3D Engine',
    subtitle: 'Interactive WebGL Product Configurator',
    description: 'An Awwwards-winning 3D product customizer built with React Three Fiber, custom GLSL shaders, and real-time PBR material rendering.',
    longDescription: 'Nexus 3D allows users to customize complex hardware products in real-time with photorealistic ray-traced shadows, lighting controls, dynamic color mixing, and instant 3D model export. Built with WebGL performance optimizations ensuring 60 FPS across mobile & desktop browsers.',
    category: '3D & Interactive',
    tags: ['React Three Fiber', 'Three.js', 'GLSL', 'TypeScript', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'https://aliyannn.vercel.app/',
    githubUrl: 'https://github.com/aliyan/nexus-3d',
    featured: true,
    metrics: [
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'Lighthouse', value: '98/100' },
    ],
  },
  {
    id: 'pulse-ai',
    title: 'Pulse AI SaaS Platform',
    subtitle: 'Next-Gen Analytics & Workflow Automation',
    description: 'Enterprise AI dashboard with real-time WebSocket metrics, predictive insights, drag-and-drop workflow builder, and dark obsidian aesthetic.',
    longDescription: 'Pulse AI synthesizes millions of analytics data points into actionable predictions. Features include custom chart components, live streaming data tables, role-based access control, and automated report generation powered by LLMs.',
    category: 'Full Stack',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Chart.js'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'https://aliyannn.vercel.app/',
    githubUrl: 'https://github.com/aliyan/pulse-ai',
    featured: true,
    metrics: [
      { label: 'Active Users', value: '45k+' },
      { label: 'Latency', value: '< 12ms' },
    ],
  },
  {
    id: 'hyperion-design-system',
    title: 'Hyperion Design System',
    subtitle: 'Accessible Glassmorphism UI Component Library',
    description: 'A comprehensive React component library focusing on accessible glassmorphism, micro-interactions, dark mode tokens, and smooth motion presets.',
    longDescription: 'Hyperion delivers over 40 zero-dependency, accessible, keyboard-navigable React components with tailwind integration, framer-motion presets, and dark mode themes engineered for enterprise scalability.',
    category: 'UI/UX Design',
    tags: ['React', 'Tailwind CSS', 'Framer Motion', 'Storybook', 'Figma'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'https://aliyannn.vercel.app/',
    githubUrl: 'https://github.com/aliyan/hyperion-ui',
    featured: true,
    metrics: [
      { label: 'Components', value: '40+' },
      { label: 'Downloads', value: '12k/mo' },
    ],
  },
  {
    id: 'zenith-finance',
    title: 'Zenith Crypto Dashboard',
    subtitle: 'Decentralized Finance & Portfolio Tracker',
    description: 'Real-time Web3 portfolio manager with live candlestick charts, wallet connection, gas fee estimators, and transaction history graph.',
    longDescription: 'Zenith connects directly with EVM wallets to display real-time asset yields, liquidity pool health, historical performance visualizers, and instant DEX swap triggers.',
    category: 'Full Stack',
    tags: ['React', 'Ethers.js', 'Tailwind CSS', 'Recharts', 'Zustand'],
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'https://aliyannn.vercel.app/',
    githubUrl: 'https://github.com/aliyan/zenith-finance',
    featured: false,
  },
  {
    id: 'aether-spatial',
    title: 'Aether Spatial Portfolio',
    subtitle: 'Immersive 3D Spatial Canvas',
    description: 'An exploratory 3D spatial web environment with physics-based floating nodes, spatial audio cues, and interactive camera orbits.',
    longDescription: 'Aether experiments with 3D spatial navigation in the browser. Users orbit through floating project planets with gravitational pull physics and shader particle clouds.',
    category: '3D & Interactive',
    tags: ['Three.js', 'R3F', 'GLSL Shaders', 'WebAudio API', 'Lenis'],
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'https://aliyannn.vercel.app/',
    githubUrl: 'https://github.com/aliyan/aether-spatial',
    featured: false,
  },
];
