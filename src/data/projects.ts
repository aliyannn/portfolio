export type ProjectCategory = 'Full Stack & Frontend' | 'WordPress & CMS' | 'Vibe Coding & 3D';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  secondaryCategory?: string;
  tags: string[];
  image: string;
  demoUrl: string;
  githubUrl?: string;
  featured: boolean;
  metrics?: { label: string; value: string }[];
  accentColor?: string;
  domainName: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'it-vision-networks',
    title: 'IT Vision Networks',
    subtitle: 'Enterprise IT & Networking Infrastructure',
    description: 'Enterprise IT solutions and networking infrastructure portal engineered for high-performance service delivery and client onboarding.',
    longDescription: 'A comprehensive enterprise IT platform designed for client service delivery, network hardware management, and high-performance business onboarding. Optimized with high-speed CDN delivery, responsive architecture, and secure client communication pipelines.',
    category: 'Full Stack & Frontend',
    tags: ['React / Next.js', 'Tailwind CSS', 'Enterprise Networks', 'Cloud Infrastructure'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'https://itvisionnetworks.com/',
    domainName: 'itvisionnetworks.com',
    accentColor: '#06B6D4',
    featured: true,
    metrics: [
      { label: 'Deployment', value: 'Production Live' },
      { label: 'Network Delivery', value: 'Fast CDN' },
    ],
  },
  {
    id: 'cyber-portfolio-v2',
    title: 'Interactive Cyber Portfolio (v2)',
    subtitle: 'Real-Time 3D WebGL & Next.js Architecture',
    description: 'Next-gen 3D developer portfolio featuring real-time Three.js WebGL rendering, Resend email architecture, and dynamic system telemetry.',
    longDescription: 'Cutting-edge creative technologist portfolio engineered with Three.js, React Three Fiber, Framer Motion, and Next.js App Router. Features interactive 3D WebGL meshes, sub-50ms email routing with Resend API, zero-re-render RAF cursor tracking, and 60 FPS viewport auto-pausing.',
    category: 'Vibe Coding & 3D',
    secondaryCategory: 'Full Stack & Frontend',
    tags: ['Next.js 14', 'Three.js / R3F', 'Tailwind CSS', 'Resend API'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'https://aliyannn.vercel.app/',
    githubUrl: 'https://github.com/aliyannn/portfolio',
    domainName: 'aliyannn.vercel.app',
    accentColor: '#38BDF8',
    featured: true,
    metrics: [
      { label: 'Latency', value: 'Sub-50ms' },
      { label: 'Graphics Pipeline', value: '60 FPS WebGL' },
    ],
  },
  {
    id: 'calibre-media',
    title: 'Calibre Media',
    subtitle: 'Digital Agency & Dynamic Lead Platform',
    description: 'High-impact digital agency platform featuring custom layouts, responsive UI optimization, and dynamic lead capture workflows.',
    longDescription: 'Custom-architected digital agency website delivering high-converting landing pages, tailored media presentation, dynamic client inquiry systems, and automated email notifications.',
    category: 'WordPress & CMS',
    tags: ['WordPress', 'Custom CMS', 'PHP', 'Performance Tuning'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'https://calibremedia.co/',
    domainName: 'calibremedia.co',
    accentColor: '#8B5CF6',
    featured: true,
    metrics: [
      { label: 'Site Status', value: 'Live Client Site' },
      { label: 'Conversion', value: 'Optimized' },
    ],
  },
  {
    id: 'digi-links',
    title: 'Digi-Links',
    subtitle: 'Digital Marketing & SEO Platform',
    description: 'Full-service digital marketing and link-building platform designed for conversion optimization and multi-service showcasing.',
    longDescription: 'A high-performance digital marketing agency platform featuring custom Elementor architectures, advanced SEO metadata structuring, conversion funnels, and enterprise client onboarding.',
    category: 'WordPress & CMS',
    tags: ['WordPress', 'Elementor / Custom CSS', 'SEO Architecture', 'Lead Gen'],
    image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'https://digi-links.com/',
    domainName: 'digi-links.com',
    accentColor: '#10B981',
    featured: true,
    metrics: [
      { label: 'Environment', value: 'Live Production' },
      { label: 'SEO Architecture', value: '95+ Score' },
    ],
  },
  {
    id: 'systechware',
    title: 'Systechware',
    subtitle: 'UAE Enterprise IT & Hardware Portal',
    description: 'UAE-based enterprise technology and IT hardware solutions portal built for business inquiries and scalable product catalogs.',
    longDescription: 'Enterprise IT hardware and technology infrastructure portal serving the UAE and Middle East region. Engineered for scalable B2B service catalogs, quotation requests, and fast cloud hosting delivery.',
    category: 'WordPress & CMS',
    tags: ['WordPress', 'Custom Architecture', 'B2B UI', 'Cloud Delivery'],
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'https://systechware.ae/',
    domainName: 'systechware.ae',
    accentColor: '#3B82F6',
    featured: true,
    metrics: [
      { label: 'Region', value: 'UAE Enterprise' },
      { label: 'B2B Catalog', value: 'Live' },
    ],
  },
  {
    id: 'xpovibes',
    title: 'XpoVibes',
    subtitle: 'Creative Media & Lifestyle Content Engine',
    description: 'Creative media and lifestyle portal tailored for immersive content consumption, fast media rendering, and dynamic brand positioning.',
    longDescription: 'High-traffic digital media and event publication hub built for immersive editorial reading, lightning-fast content caching, high-resolution media rendering, and social distribution.',
    category: 'WordPress & CMS',
    tags: ['WordPress', 'Custom Theming', 'Responsive UI', 'Content Engine'],
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'https://xpovibes.com/',
    domainName: 'xpovibes.com',
    accentColor: '#F59E0B',
    featured: false,
    metrics: [
      { label: 'Traffic Tier', value: 'High-Traffic Ready' },
      { label: 'Edge Cache', value: 'Active' },
    ],
  },
  {
    id: 'ecom-technologies',
    title: 'Ecom Technologies',
    subtitle: 'E-Commerce Infrastructure & Digital Solutions',
    description: 'E-commerce infrastructure and digital solutions site built for scalability, client consultation, and seamless service booking.',
    longDescription: 'Comprehensive digital commerce and consulting hub equipped with WooCommerce capabilities, custom booking funnels, global payment integrations, and responsive performance tuning.',
    category: 'WordPress & CMS',
    tags: ['WordPress CMS', 'WooCommerce Engine', 'Payment Gateways', 'Speed Optimized'],
    image: 'https://images.unsplash.com/photo-1556742049-0a67e55722c0?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'https://ecom-technologies.com/',
    domainName: 'ecom-technologies.com',
    accentColor: '#EC4899',
    featured: false,
    metrics: [
      { label: 'E-Commerce', value: 'Production Ready' },
      { label: 'Speed Score', value: 'Optimized' },
    ],
  },
  {
    id: 'dev-showcase-v1',
    title: 'Minimalist Dev Showcase (v1)',
    subtitle: 'Foundational Responsive Portfolio',
    description: 'Clean, responsive developer portfolio showcasing foundational web applications and client engineering work.',
    longDescription: 'A sleek, minimalist developer portfolio designed for crisp typography, smooth page transitions, and structured presentation of full-stack client deliverables and software experiments.',
    category: 'Full Stack & Frontend',
    tags: ['React', 'Tailwind CSS', 'Vercel Deployment', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'https://aliyannn-portfolio.vercel.app/',
    domainName: 'aliyannn-portfolio.vercel.app',
    accentColor: '#6366F1',
    featured: false,
    metrics: [
      { label: 'Deployment', value: 'Production Live' },
      { label: 'Infrastructure', value: 'Vercel Edge' },
    ],
  },
];
