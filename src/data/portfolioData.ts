export interface PortfolioData {
  personalInfo: {
    name: string;
    title: string;
    headline: string;
    subHeadline: string;
    bio: string;
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    portfolioUrl: string;
    resumeUrl: string;
    availability: string;
    responseTime: string;
  };
  roles: string[];
  skills: {
    title: string;
    category: string;
    iconName: string;
    skills: {
      name: string;
      level: number;
      badge: string;
      description: string;
    }[];
  }[];
  experiences: {
    id: string;
    role: string;
    company: string;
    period: string;
    location: string;
    type: 'Full-time' | 'Contract' | 'Internship' | 'Freelance';
    description: string;
    achievements: string[];
    techStack: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    location: string;
    period: string;
    details?: string;
  }[];
  certifications: {
    title: string;
    issuer: string;
    year: string;
  }[];
  softSkills: string[];
}

export const PORTFOLIO_DATA: PortfolioData = {
  personalInfo: {
    name: 'Aliyan Gohar',
    title: 'Software Engineer & IT Systems Specialist',
    headline: 'Engineering Scalable Web Apps & Resilient IT Infrastructure',
    subHeadline:
      'Versatile technology professional specializing in modern React & Three.js frontend engineering, AI agent orchestration, enterprise Fortinet network security, and rapid software prototyping.',
    bio: "Dynamic and versatile technology professional with a robust background spanning IT infrastructure, enterprise network security, and modern web software development. Demonstrated expertise in deploying and configuring Fortinet FortiGate 40F enterprise firewalls, optimizing multi-site network operations, and pioneering high-velocity 'vibe coding' workflows and AI orchestration tools to radically compress software delivery timelines.",
    location: 'Lahore, Pakistan',
    email: 'aliyangohar00@outlook.com',
    phone: '+92 318 4321695',
    linkedin: 'https://www.linkedin.com/in/allygohar/',
    github: 'https://github.com/aliyannn',
    portfolioUrl: 'https://aliyannn.vercel.app',
    resumeUrl: '/Aliyan_Gohar_Software_Engineer_Resume.pdf',
    availability: 'Available for New Roles & High-Impact Projects',
    responseTime: '< 2 Hours',
  },
  roles: [
    'Software Engineer',
    'Frontend & React Specialist',
    'IT Support & Network Engineer',
    'AI Workflow Architect',
    'Three.js / Creative Developer',
  ],
  skills: [
    {
      title: 'Frontend Development',
      category: 'frontend',
      iconName: 'LayoutGrid',
      skills: [
        { name: 'React.js', level: 95, badge: 'Core Stack', description: 'Advanced architectures, custom hooks, reusable component libraries' },
        { name: 'JavaScript (ES6+)', level: 94, badge: 'Language', description: 'Modern asynchronous programming, DOM APIs, clean code standards' },
        { name: 'TailwindCSS & CSS3', level: 96, badge: 'Styling', description: 'Pixel-perfect responsive design, dark mode, glassmorphic UI tokens' },
        { name: 'Three.js & WebGL', level: 86, badge: '3D Graphics', description: 'Interactive 3D canvas rendering, scene lighting, custom UI meshes' },
        { name: 'Framer Motion', level: 92, badge: 'Animation', description: 'Smooth layout transitions, scroll triggers, interactive micro-interactions' },
        { name: 'Axios & REST APIs', level: 92, badge: 'Integration', description: 'RESTful API consumption, state synchronization, error handling' },
      ],
    },
    {
      title: 'AI & Modern Workflows',
      category: 'ai_workflows',
      iconName: 'Cpu',
      skills: [
        { name: 'Vibe Coding & Agentic AI', level: 96, badge: 'High Velocity', description: 'AI-assisted rapid prototyping and autonomous development workflows' },
        { name: 'AI Agent Orchestration', level: 90, badge: 'Automation', description: 'Multi-agent frameworks, LLM tool calling, structured outputs' },
        { name: 'Prompt Engineering', level: 94, badge: 'LLM Systems', description: 'Context window optimization, chain-of-thought system prompts' },
        { name: 'No-Code / Low-Code', level: 92, badge: 'Integration', description: 'Make.com, Voiceflow, VAPI voice agents, webhook automations' },
      ],
    },
    {
      title: 'Networking & Security',
      category: 'security',
      iconName: 'ShieldCheck',
      skills: [
        { name: 'Fortinet FortiGate 40F', level: 95, badge: 'Enterprise Firewall', description: 'Firewall configuration, branch deployments, perimeter security' },
        { name: 'pfSense & VPNs', level: 90, badge: 'Security', description: 'IPSec/OpenVPN tunnels, stateful firewall rules, network traffic isolation' },
        { name: 'TCP/IP, Routing & Switching', level: 92, badge: 'Infrastructure', description: 'Subnetting, VLAN configuration, packet analysis, gateway routing' },
        { name: 'LAN/WAN & On-Site Support', level: 96, badge: 'Operations', description: 'Hardware diagnostics, mission-critical 24/7 bank branch support' },
      ],
    },
    {
      title: 'CMS, Databases & Tools',
      category: 'cms_tools',
      iconName: 'Layers',
      skills: [
        { name: 'WordPress & WooCommerce', level: 94, badge: 'E-Commerce', description: 'Custom themes, plugin customization, catalog architecture' },
        { name: 'MySQL & phpMyAdmin', level: 88, badge: 'Database', description: 'Relational data modeling, query optimization, backend debugging' },
        { name: 'Git, GitHub & Vercel', level: 94, badge: 'DevOps', description: 'Branch management, CI/CD automated deployments, code reviews' },
        { name: 'VS Code & Excel', level: 96, badge: 'Productivity', description: 'Modern IDE development workflows, advanced data analysis' },
      ],
    },
  ],
  experiences: [
    {
      id: 'exp-mnt-halan',
      role: 'IT Support Officer',
      company: 'MNT Halan Microfinance Bank',
      period: 'Sept 2025 – Present',
      location: 'Lahore, Pakistan',
      type: 'Full-time',
      description:
        'Managing enterprise network perimeter security and mission-critical branch infrastructure for nationwide banking operations.',
      achievements: [
        'Configure, deploy, and manage Fortinet FortiGate 40F firewalls across enterprise networks and branch sites to ensure robust perimeter security and data protection.',
        'Provide hands-on, high-priority on-site technical support to remote and local bank branches, resolving critical IT infrastructure, hardware, and network connectivity issues.',
        'Deliver comprehensive IT and network support to guarantee seamless, 24/7 uninterrupted daily banking and financial operations.',
        'Maintain and optimize core network infrastructure, including TCP/IP protocols, routing/switching, pfSense firewall rules, and LAN/WAN setups.',
        'Proactively diagnose system bottlenecks, minimizing operational downtime and ensuring end-user systems comply with security standards.',
      ],
      techStack: ['Fortinet FortiGate 40F', 'pfSense', 'TCP/IP', 'Routing & Switching', 'VPNs', 'LAN/WAN', 'Perimeter Security'],
    },
    {
      id: 'exp-calibre-media',
      role: 'Software Engineer',
      company: 'Calibre Media Co.',
      period: 'Nov 2024 – Aug 2025',
      location: 'Lahore, Pakistan',
      type: 'Full-time',
      description:
        'Developed real-time interactive user interfaces, modular 3D web features, and high-performance frontend architectures.',
      achievements: [
        'Developed highly interactive, responsive, and performance-optimized user interfaces using React.js for real-time dashboards and product applications.',
        'Engineered reusable UI component libraries and seamlessly integrated complex 3D interactive elements using Three.js.',
        'Collaborated with cross-functional design teams to execute pixel-perfect UI/UX designs using TailwindCSS and Framer Motion.',
        'Managed RESTful API integrations using Axios and successfully deployed scalable web applications on Vercel.',
      ],
      techStack: ['React.js', 'Three.js', 'TailwindCSS', 'Framer Motion', 'Axios', 'JavaScript', 'Vercel'],
    },
    {
      id: 'exp-equinox-devs',
      role: 'Software Engineer Intern',
      company: 'Equinox Devs LLP.',
      period: 'Sept 2024 – Nov 2024',
      location: 'Lahore, Pakistan',
      type: 'Internship',
      description:
        'Engineered responsive landing pages and modular frontend components for full-stack MERN web applications.',
      achievements: [
        'Built and maintained modular frontend components for scalable MERN/MEAN stack web applications.',
        'Utilized JavaScript and TailwindCSS to build responsive landing pages, ensuring high cross-browser compatibility.',
        'Leveraged Git and GitHub for team-based version control and peer code reviews.',
      ],
      techStack: ['React.js', 'JavaScript', 'TailwindCSS', 'MERN Stack', 'Git', 'GitHub'],
    },
    {
      id: 'exp-techlogix',
      role: 'Software Engineer Intern',
      company: 'Techlogix (PVT.) Ltd.',
      period: 'June 2024 – Aug 2024',
      location: 'Lahore, Pakistan',
      type: 'Internship',
      description:
        'Intensive engineering internship focused on advanced React.js architectures and production-level codebases.',
      achievements: [
        'Completed an intensive engineering internship focused on advanced modern React.js architectures.',
        'Contributed directly to production-level codebases under the direct mentorship of senior software engineers.',
        'Participated in daily standups, sprint planning, and architectural reviews.',
      ],
      techStack: ['React.js', 'JavaScript', 'State Management', 'Architecture Patterns', 'Agile/Scrum'],
    },
    {
      id: 'exp-systechware',
      role: 'WordPress Developer',
      company: 'Systechware',
      period: 'May 2023 – May 2024',
      location: 'Lahore, Pakistan',
      type: 'Full-time',
      description:
        'Engineered full-scale enterprise e-commerce platforms and handled database performance optimization.',
      achievements: [
        'Engineered and managed full-scale enterprise e-commerce platforms using WordPress and WooCommerce.',
        'Handled database optimization, product catalog management, and backend debugging utilizing PHP and phpMyAdmin.',
        'Maintained a 100% customer satisfaction rate by rapidly diagnosing and resolving complex plugin and theme bugs.',
      ],
      techStack: ['WordPress', 'WooCommerce', 'PHP', 'MySQL', 'phpMyAdmin', 'JavaScript'],
    },
    {
      id: 'exp-fawzan-zoraiz',
      role: 'WordPress Developer',
      company: 'Fawzan & Zoraiz',
      period: 'Dec 2022 – Mar 2023',
      location: 'Lahore, Pakistan',
      type: 'Contract',
      description:
        'Designed custom responsive client websites and spearheaded transition into full-stack modern JavaScript.',
      achievements: [
        'Designed, customized, and deployed responsive WordPress websites tailored to specific client specifications.',
        'Transitioned into full-stack JavaScript development, gaining deep hands-on familiarity with core vanilla JS methodologies.',
      ],
      techStack: ['WordPress', 'JavaScript', 'HTML5', 'CSS3', 'Responsive UI'],
    },
    {
      id: 'exp-developers-alley',
      role: 'Software Engineer Intern',
      company: "Developer's Alley",
      period: 'July 2022 – Sept 2022',
      location: 'Lahore, Pakistan',
      type: 'Internship',
      description:
        'Mastered frontend engineering foundations and built independent JavaScript and React applications.',
      achievements: [
        'Mastered core foundations of frontend development (HTML5, CSS3, JavaScript, and React.js).',
        'Built independent JavaScript applications and assisted senior engineers with frontend feature releases.',
      ],
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Git'],
    },
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Science (BSCS)',
      institution: 'University of Central Punjab',
      location: 'Lahore, Pakistan',
      period: '2018 – 2022',
      details: 'Core curriculum: Algorithms, Data Structures, Computer Networks, Database Systems, Software Engineering.',
    },
    {
      degree: 'FSc Pre-Engineering',
      institution: 'Government College of Science',
      location: 'Lahore, Pakistan',
      period: '2016 – 2018',
      details: 'Mathematics, Physics, Chemistry.',
    },
  ],
  certifications: [
    {
      title: 'Microsoft Certified: DevOps Azure Engineer',
      issuer: 'Microsoft',
      year: '2022',
    },
    {
      title: 'The Complete Web Development Course (MERN Stack)',
      issuer: 'Udemy',
      year: '2023',
    },
  ],
  softSkills: [
    'AI-Augmented Workflows & Vibe Coding',
    'Rapid Prototyping & MVPs',
    'Mission-Critical On-Site Branch Support',
    'Technical Leadership & Collaboration',
    'Acute Attention to Detail & UI Precision',
    'Adaptive Continuous Learner',
  ],
};
