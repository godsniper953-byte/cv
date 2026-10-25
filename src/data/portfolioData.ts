export interface AboutHighlightCard {
  id: string;
  title: string;
  category: string;
  summary: string;
  focusAreas: string[];
}

export interface SkillItem {
  name: string;
  context: string;
  type: 'Platform & Models' | 'Coursework & Methodology' | 'Creative Suite' | 'Developer Workflow';
}

export interface SkillCategory {
  id: 'ai' | 'economics' | 'creative' | 'tools';
  title: string;
  shortLabel: string;
  subtitle: string;
  skills: SkillItem[];
}

export interface CredentialItem {
  id: string;
  title: string;
  category: 'AI Fundamentals' | 'Prompt Engineering' | 'Generative AI' | 'Responsible AI';
  credentialType: 'Certification / Badge' | 'Course / Learning Module';
  issuer: string;
  completionDate: string; // Editable placeholder when exact date is not yet supplied
  verificationUrl: string; // Editable placeholder when URL is not yet supplied
  summary: string;
  keyTopics: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  program: string;
  period: string;
  type: 'University Degree' | 'Professional Development';
  location: string;
  description: string;
  focusPoints: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  status: 'Concept Project' | 'In Development';
  category: 'Web & 3D Concept' | 'AI & Creative Workflows' | 'Economics & Analytics';
  shortDescription: string;
  detailedOverview: string;
  problemStatement: string;
  proposedArchitecture: string[];
  technologies: string[];
  coverSvgDataUri: string;
  visualType: 'orbiter' | 'ai-creative' | 'econ-dashboard' | 'custom';
  liveDemoUrl?: string;
  repositoryUrl?: string;
}

export interface CareerAspiration {
  id: string;
  title: string;
  domain: string;
  description: string;
  alignmentPoints: string[];
}

export interface PortfolioConfig {
  name: string;
  headline: string;
  identities: string[];
  rotatingKeywords: string[];
  university: string;
  degree: string;
  expectedGraduation: string;
  githubUsername: string;
  githubUrl: string;
  /**
   * Editable Contact & Profile Placeholders:
   * Set `verifiedEmail` (e.g., "your.name@example.com") or `linkedinUrl` (e.g., "https://linkedin.com/in/yourprofile")
   * once ready to publish publicly. While empty (""), the email and LinkedIn buttons remain hidden.
   */
  verifiedEmail: string;
  linkedinUrl: string;
  verifiedResumePdfUrl: string;
  heroSupportingText: string;
  aboutBiography: string;
}

// High-contrast architectural SVG cover illustrations encoded as data URIs (Zero-Broken-Image Policy)
const orbiterSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" fill="none">
  <rect width="1200" height="675" fill="#070910"/>
  <defs>
    <radialGradient id="orbGlow" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#2563EB" stop-opacity="0.28"/>
      <stop offset="55%" stop-color="#4F46E5" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#070910" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#60A5FA" stop-opacity="0.7"/>
      <stop offset="50%" stop-color="#818CF8" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#3B82F6" stop-opacity="0.6"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#orbGlow)"/>
  <g stroke="#1E293B" stroke-width="1" opacity="0.55">
    <line x1="0" y1="135" x2="1200" y2="135"/>
    <line x1="0" y1="270" x2="1200" y2="270"/>
    <line x1="0" y1="405" x2="1200" y2="405"/>
    <line x1="0" y1="540" x2="1200" y2="540"/>
    <line x1="240" y1="0" x2="240" y2="675"/>
    <line x1="480" y1="0" x2="480" y2="675"/>
    <line x1="720" y1="0" x2="720" y2="675"/>
    <line x1="960" y1="0" x2="960" y2="675"/>
  </g>
  <g transform="translate(600, 338)">
    <ellipse rx="360" ry="130" transform="rotate(-18)" stroke="url(#ringGrad)" stroke-width="1.75" stroke-dasharray="8 6"/>
    <ellipse rx="280" ry="195" transform="rotate(24)" stroke="#3B82F6" stroke-opacity="0.45" stroke-width="1.25"/>
    <circle r="138" stroke="#60A5FA" stroke-opacity="0.5" stroke-width="1.5" fill="#0B101E" fill-opacity="0.75"/>
    <ellipse rx="138" ry="46" stroke="#3B82F6" stroke-opacity="0.4" stroke-width="1"/>
    <ellipse rx="46" ry="138" stroke="#818CF8" stroke-opacity="0.4" stroke-width="1"/>
    <circle r="6" cx="242" cy="-78" fill="#60A5FA"/>
    <circle r="4.5" cx="-210" cy="112" fill="#818CF8"/>
    <circle r="5" cx="-85" cy="-165" fill="#38BDF8"/>
  </g>
  <text x="64" y="612" fill="#94A3B8" font-family="monospace" font-size="15" letter-spacing="2">AMU ORBITER · SPATIAL WEB ARCHITECTURE CONCEPT</text>
</svg>
`)}`;

const aiCreativeSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none">
  <rect width="800" height="600" fill="#08080F"/>
  <defs>
    <radialGradient id="prismGlow" cx="50%" cy="45%" r="50%">
      <stop offset="0%" stop-color="#7C3AED" stop-opacity="0.26"/>
      <stop offset="50%" stop-color="#2563EB" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#08080F" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#60A5FA" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#A78BFA" stop-opacity="0.8"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#prismGlow)"/>
  <g stroke="#1E1B4B" stroke-width="1" opacity="0.6">
    <circle cx="400" cy="280" r="210"/>
    <circle cx="400" cy="280" r="150"/>
    <circle cx="400" cy="280" r="90"/>
  </g>
  <polygon points="400,130 535,365 265,365" stroke="url(#beamGrad)" stroke-width="2" fill="#0F1123" fill-opacity="0.7"/>
  <polygon points="400,175 495,340 305,340" stroke="#60A5FA" stroke-opacity="0.4" stroke-width="1"/>
  <line x1="140" y1="310" x2="332" y2="250" stroke="#60A5FA" stroke-width="2" stroke-opacity="0.75"/>
  <line x1="468" y1="250" x2="665" y2="205" stroke="#38BDF8" stroke-width="1.75" stroke-opacity="0.75"/>
  <line x1="468" y1="268" x2="665" y2="265" stroke="#818CF8" stroke-width="1.75" stroke-opacity="0.75"/>
  <line x1="468" y1="286" x2="665" y2="325" stroke="#A78BFA" stroke-width="1.75" stroke-opacity="0.75"/>
  <text x="48" y="548" fill="#94A3B8" font-family="monospace" font-size="13" letter-spacing="1.8">GENERATIVE WORKFLOWS · PROMPT &amp; VISUAL SYNTHESIS</text>
</svg>
`)}`;

const econDashboardSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none">
  <rect width="800" height="600" fill="#060911"/>
  <defs>
    <linearGradient id="areaFill" x1="0" y1="160" x2="0" y2="460" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="#3B82F6" stop-opacity="0.0"/>
    </linearGradient>
  </defs>
  <g stroke="#1E293B" stroke-width="1" opacity="0.65">
    <line x1="72" y1="120" x2="728" y2="120"/>
    <line x1="72" y1="205" x2="728" y2="205"/>
    <line x1="72" y1="290" x2="728" y2="290"/>
    <line x1="72" y1="375" x2="728" y2="375"/>
    <line x1="72" y1="460" x2="728" y2="460"/>
    <line x1="180" y1="100" x2="180" y2="460"/>
    <line x1="325" y1="100" x2="325" y2="460"/>
    <line x1="470" y1="100" x2="470" y2="460"/>
    <line x1="615" y1="100" x2="615" y2="460"/>
  </g>
  <path d="M72,395 C145,380 205,315 275,325 C345,335 395,245 470,225 C545,205 615,155 728,140 L728,460 L72,460 Z" fill="url(#areaFill)"/>
  <path d="M72,395 C145,380 205,315 275,325 C345,335 395,245 470,225 C545,205 615,155 728,140" stroke="#60A5FA" stroke-width="3" fill="none"/>
  <path d="M72,425 C160,410 230,375 315,355 C400,335 480,310 565,270 C635,238 680,225 728,210" stroke="#818CF8" stroke-width="2" stroke-dasharray="6 5" fill="none"/>
  <circle cx="275" cy="325" r="5" fill="#60A5FA"/>
  <circle cx="470" cy="225" r="5" fill="#60A5FA"/>
  <circle cx="728" cy="140" r="6" fill="#93C5FD"/>
  <text x="72" y="548" fill="#94A3B8" font-family="monospace" font-size="13" letter-spacing="1.8">MACROECONOMIC INDICATORS · ANALYTICAL SERIES</text>
</svg>
`)}`;

export const INITIAL_PORTFOLIO_CONFIG: PortfolioConfig = {
  name: 'Ahmed Ali',
  headline: 'Economics Meets Intelligence.',
  identities: [
    'Economics Student',
    'AI Enthusiast',
    'Aspiring Data Analyst',
    'Creative Designer',
  ],
  rotatingKeywords: [
    'Economics',
    'Artificial Intelligence',
    'Data Analytics',
    'Creative Design',
  ],
  university: 'Aligarh Muslim University (AMU)',
  degree: 'B.A. Economics',
  expectedGraduation: '2029',
  githubUsername: 'godsniper953-byte',
  githubUrl: 'https://github.com/godsniper953-byte',
  verifiedEmail: '', // Editable placeholder: Leave empty to hide the email button until verified address is supplied
  linkedinUrl: '', // Editable placeholder: Leave empty to hide the LinkedIn link until real profile URL is supplied
  verifiedResumePdfUrl: '', // Editable placeholder: Uses built-in print-to-PDF executive resume until static PDF path is supplied
  heroSupportingText:
    "I'm Ahmed Ali, an Economics student at Aligarh Muslim University exploring the intersection of economics, artificial intelligence, data analytics, and creative technology.",
  aboutBiography:
    'I am a B.A. Economics student at Aligarh Muslim University with a strong interest in understanding economic systems, emerging technologies, and data-driven decision-making. Alongside my academic studies, I am developing skills in artificial intelligence, prompt engineering, data analytics, graphic design, and video editing. I enjoy experimenting with digital tools, building creative projects, and exploring how technology can solve practical problems.',
};

export const ABOUT_HIGHLIGHT_CARDS: AboutHighlightCard[] = [
  {
    id: 'education',
    title: 'Education',
    category: 'Academic Foundation',
    summary:
      'Pursuing a Bachelor of Arts in Economics at Aligarh Muslim University (Expected 2029), studying microeconomic and macroeconomic structures and analytical reasoning.',
    focusAreas: ['Economic Systems', 'Analytical Reasoning', 'Policy & Market Dynamics'],
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    category: 'Emerging Technology',
    summary:
      'Exploring generative AI concepts, structured prompt design in Vertex AI and Google Gemini, AI agent workflows, and responsible AI frameworks.',
    focusAreas: ['Prompt Engineering', 'Generative AI Applications', 'Responsible AI Principles'],
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    category: 'Quantitative Inquiry',
    summary:
      'Developing skills in interpreting economic indicators, financial market trends, and structured datasets to support evidence-based decision-making.',
    focusAreas: ['Data Interpretation', 'Economic Research', 'Market Trend Analysis'],
  },
  {
    id: 'creative-tech',
    title: 'Creative Technology',
    category: 'Digital Design & Media',
    summary:
      'Combining visual design, video editing, and AI-assisted web development to translate complex ideas into clear, compelling digital experiences.',
    focusAreas: ['Graphic Design', 'Video Editing', 'AI-Assisted Web Design'],
  },
  {
    id: 'professional-dev',
    title: 'Professional Development',
    category: 'Continuous Learning',
    summary:
      'Actively completing industry-recognized learning modules across Google AI Essentials, Google Cloud Vertex AI, and Microsoft AI Skills initiatives.',
    focusAreas: ['Self-Directed Study', 'Applied AI Coursework', 'Cross-Disciplinary Synthesis'],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'ai',
    title: 'Artificial Intelligence and Prompt Engineering',
    shortLabel: 'AI & Prompting',
    subtitle: 'Foundational knowledge in large language models, structured prompting, and responsible AI workflows.',
    skills: [
      {
        name: 'Google Gemini',
        context: 'Multimodal reasoning, research synthesis, and workflow structuring',
        type: 'Platform & Models',
      },
      {
        name: 'Google AI Essentials',
        context: 'Core AI principles, practical productivity integration, and evaluation',
        type: 'Coursework & Methodology',
      },
      {
        name: 'Google Prompting Essentials',
        context: 'Structured prompt formulation, few-shot design, and iterative refinement',
        type: 'Coursework & Methodology',
      },
      {
        name: 'Prompt Design in Vertex AI',
        context: 'System instructions, parameter tuning, and enterprise prompt workflows',
        type: 'Platform & Models',
      },
      {
        name: 'Generative AI concepts and applications',
        context: 'Understanding foundation models, text/visual synthesis, and applied use cases',
        type: 'Coursework & Methodology',
      },
      {
        name: 'AI agents and responsible AI concepts',
        context: 'Autonomous task reasoning, safety guardrails, fairness, and transparency',
        type: 'Coursework & Methodology',
      },
    ],
  },
  {
    id: 'economics',
    title: 'Data and Economics',
    shortLabel: 'Data & Economics',
    subtitle: 'Academic grounding in economic analysis paired with practical data interpretation.',
    skills: [
      {
        name: 'Data analytics coursework',
        context: 'Foundational data cleaning, structured observation, and analytical reporting',
        type: 'Coursework & Methodology',
      },
      {
        name: 'Economic analysis and research interests',
        context: 'Evaluating macroeconomic indicators, resource allocation, and market behavior',
        type: 'Coursework & Methodology',
      },
      {
        name: 'Data interpretation and analytical thinking',
        context: 'Translating quantitative patterns into structured economic narratives',
        type: 'Coursework & Methodology',
      },
      {
        name: 'Interest in financial markets and economic trends',
        context: 'Following fiscal trends, market cycles, and emerging digital economies',
        type: 'Coursework & Methodology',
      },
    ],
  },
  {
    id: 'creative',
    title: 'Creative Design and Content',
    shortLabel: 'Creative Design',
    subtitle: 'Visual communication, digital layout composition, and short/long-form video production.',
    skills: [
      {
        name: 'Canva',
        context: 'Editorial presentations, visual identity assets, and social graphics',
        type: 'Creative Suite',
      },
      {
        name: 'Graphic design',
        context: 'Typography hierarchy, layout composition, and visual storytelling',
        type: 'Creative Suite',
      },
      {
        name: 'Video editing',
        context: 'Pacing, visual transitions, audio synchronization, and narrative flow',
        type: 'Creative Suite',
      },
      {
        name: 'CapCut Pro',
        context: 'Multi-track timeline editing, motion keyframes, and color grading',
        type: 'Creative Suite',
      },
      {
        name: 'InShot',
        context: 'Rapid mobile-first media assembly and social format optimization',
        type: 'Creative Suite',
      },
    ],
  },
  {
    id: 'tools',
    title: 'Digital Tools and Development',
    shortLabel: 'Digital Tools',
    subtitle: 'Modern development environments and AI-assisted workflows for building web concepts.',
    skills: [
      {
        name: 'GitHub',
        context: 'Version control, repository hosting, and open documentation',
        type: 'Developer Workflow',
      },
      {
        name: 'VS Code',
        context: 'Code editing, project organization, and web development environment',
        type: 'Developer Workflow',
      },
      {
        name: 'AI-assisted website development',
        context: 'Iterative UI prototyping, component architecture, and modern web design',
        type: 'Developer Workflow',
      },
      {
        name: 'Google Flow',
        context: 'AI-driven creative synthesis and experimental media workflows',
        type: 'Platform & Models',
      },
    ],
  },
];

export const CREDENTIALS_LIST: CredentialItem[] = [
  {
    id: 'google-ai-essentials',
    title: 'Google AI Essentials',
    category: 'AI Fundamentals',
    credentialType: 'Certification / Badge',
    issuer: 'Google',
    completionDate: 'Completed (Date configurable)',
    verificationUrl: '',
    summary:
      'Foundational credential covering core artificial intelligence concepts, generative AI productivity workflows, and responsible AI usage.',
    keyTopics: ['AI Fundamentals', 'Applied Generative AI', 'Workflow Integration'],
  },
  {
    id: 'google-prompting-essentials',
    title: 'Google Prompting Essentials',
    category: 'Prompt Engineering',
    credentialType: 'Certification / Badge',
    issuer: 'Google',
    completionDate: 'Completed (Date configurable)',
    verificationUrl: '',
    summary:
      'Specialized credential focused on designing effective prompts, chain-of-thought structuring, multimodal prompting, and output evaluation.',
    keyTopics: ['Prompt Design', 'Iterative Refinement', 'Output Verification'],
  },
  {
    id: 'microsoft-ai-skills-fest',
    title: 'Microsoft AI Skills Fest Badge',
    category: 'AI Fundamentals',
    credentialType: 'Certification / Badge',
    issuer: 'Microsoft',
    completionDate: 'Completed (Date configurable)',
    verificationUrl: '',
    summary:
      'Recognition badge from the Microsoft AI Skills Fest exploring modern AI capabilities, cloud AI ecosystems, and practical problem solving.',
    keyTopics: ['Microsoft AI Ecosystem', 'Applied AI Concepts', 'Digital Fluency'],
  },
  {
    id: 'prompt-design-vertex-ai',
    title: 'Prompt Design in Vertex AI',
    category: 'Prompt Engineering',
    credentialType: 'Certification / Badge',
    issuer: 'Google Cloud',
    completionDate: 'Completed (Date configurable)',
    verificationUrl: '',
    summary:
      'Hands-on Google Cloud credential covering prompt engineering, image analysis, and multimodal generative techniques within Vertex AI.',
    keyTopics: ['Vertex AI Studio', 'Multimodal Prompting', 'System Instructions'],
  },
  {
    id: 'generative-ai-agents',
    title: 'Generative AI Agents',
    category: 'Generative AI',
    credentialType: 'Course / Learning Module',
    issuer: 'Google Cloud Skills / Learning Path',
    completionDate: 'Completed Module (Date configurable)',
    verificationUrl: '',
    summary:
      'Learning module examining how autonomous and semi-autonomous AI agents combine foundation models with reasoning loops and external tools.',
    keyTopics: ['Agentic Workflows', 'Tool Use Concepts', 'Reasoning Loops'],
  },
  {
    id: 'generative-ai-applications',
    title: 'Generative AI Applications',
    category: 'Generative AI',
    credentialType: 'Course / Learning Module',
    issuer: 'Google Cloud Skills / Learning Path',
    completionDate: 'Completed Module (Date configurable)',
    verificationUrl: '',
    summary:
      'Exploration of how generative models are translated into practical end-user applications for summarization, synthesis, and discovery.',
    keyTopics: ['Application Architecture', 'Use-Case Selection', 'Model Grounding'],
  },
  {
    id: 'generative-ai-landscape',
    title: 'Generative AI Landscape',
    category: 'Generative AI',
    credentialType: 'Course / Learning Module',
    issuer: 'Google Cloud Skills / Learning Path',
    completionDate: 'Completed Module (Date configurable)',
    verificationUrl: '',
    summary:
      'Overview of the contemporary generative AI ecosystem, model modalities (text, code, imagery, audio), and industry adoption patterns.',
    keyTopics: ['Model Modalities', 'AI Ecosystem', 'Emerging Trends'],
  },
  {
    id: 'foundational-concepts-genai',
    title: 'Foundational Concepts of Generative AI',
    category: 'AI Fundamentals',
    credentialType: 'Course / Learning Module',
    issuer: 'Google Cloud Skills / Learning Path',
    completionDate: 'Completed Module (Date configurable)',
    verificationUrl: '',
    summary:
      'Core theoretical introduction to how large language models and diffusion models learn representations from data.',
    keyTopics: ['Foundation Models', 'Machine Learning Basics', 'Transformer Concepts'],
  },
  {
    id: 'beyond-chatbots',
    title: 'Beyond Chatbots',
    category: 'Generative AI',
    credentialType: 'Course / Learning Module',
    issuer: 'Google Cloud Skills / Learning Path',
    completionDate: 'Completed Module (Date configurable)',
    verificationUrl: '',
    summary:
      'Examines how generative AI extends beyond conversational interfaces into structured data extraction, creative synthesis, and decision support.',
    keyTopics: ['Structured Outputs', 'Workflow Automation', 'Decision Support'],
  },
  {
    id: 'responsible-ai-google-cloud',
    title: 'Responsible AI and related Google Cloud AI coursework',
    category: 'Responsible AI',
    credentialType: 'Course / Learning Module',
    issuer: 'Google Cloud',
    completionDate: 'Completed Coursework (Date configurable)',
    verificationUrl: '',
    summary:
      'Study of ethical AI deployment, bias mitigation, transparency, accountability, and safety evaluation in generative systems.',
    keyTopics: ['AI Ethics & Safety', 'Bias Mitigation', 'Governance Principles'],
  },
];

export const EDUCATION_TIMELINE: EducationEntry[] = [
  {
    id: 'amu-ba-economics',
    institution: 'Aligarh Muslim University (AMU)',
    program: 'Bachelor of Arts in Economics',
    period: 'Expected Graduation: 2029',
    type: 'University Degree',
    location: 'Aligarh, India',
    description:
      'Undergraduate study focused on economic theory, quantitative reasoning, market dynamics, and understanding complex economic systems.',
    focusPoints: [
      'Economics & Macroeconomic Systems',
      'Analytical Thinking & Problem Solving',
      'Understanding Market Structures & Policy',
    ],
  },
  {
    id: 'independent-ai-analytics-coursework',
    institution: 'Independent Professional Development',
    program: 'Artificial Intelligence, Prompt Engineering & Data Analytics Coursework',
    period: 'Ongoing · Parallel to Undergraduate Studies',
    type: 'Professional Development',
    location: 'Online & Self-Directed',
    description:
      'Structured coursework and practical experimentation across Google AI Essentials, Google Cloud Vertex AI, Microsoft AI Skills Fest, data analytics fundamentals, and digital media tools.',
    focusPoints: [
      'Prompt Engineering & Generative AI Systems',
      'Data Analytics Coursework & Economic Interpretation',
      'Creative Technology, Graphic Design & Video Production',
    ],
  },
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'amu-orbiter-website',
    title: 'AMU Orbiter Website',
    status: 'Concept Project',
    category: 'Web & 3D Concept',
    shortDescription:
      'A university club website concept exploring modern web design, immersive visuals, and 3D animations.',
    detailedOverview:
      'Designed as an architectural web concept for a university student organization at Aligarh Muslim University, the AMU Orbiter Website explores how spatial typography, dark-mode glass surfaces, and interactive 3D orbital graphics can elevate student community platforms.',
    problemStatement:
      'University club websites frequently rely on static, outdated templates that fail to communicate the curiosity and technical ambition of student communities.',
    proposedArchitecture: [
      'Interactive 3D orbital canvas header responding to cursor telemetry',
      'Modular event and research showcase grid with clean typographic hierarchy',
      'Accessible dark-theme design system optimized for both desktop and mobile viewports',
    ],
    technologies: ['Modern Web Design', '3D Animations', 'UI/UX Architecture', 'AI-Assisted Development'],
    coverSvgDataUri: orbiterSvg,
    visualType: 'orbiter',
  },
  {
    id: 'ai-powered-creative-projects',
    title: 'AI-Powered Creative Projects',
    status: 'In Development',
    category: 'AI & Creative Workflows',
    shortDescription:
      'A collection of experiments using AI tools for creative workflows, content creation, and visual concepts.',
    detailedOverview:
      'An ongoing laboratory of applied creative technology combining structured prompt engineering (Google Gemini, Vertex AI, Google Flow) with visual design and video editing tools (Canva, CapCut Pro, InShot) to prototype editorial visuals and short-form digital media.',
    problemStatement:
      'Bridging the gap between raw generative AI outputs and cohesive, human-directed visual storytelling requires disciplined prompt design and post-production craft.',
    proposedArchitecture: [
      'Structured prompt templates for consistent visual direction and narrative pacing',
      'Hybrid workflow combining generative concepting with timeline editing in CapCut Pro and Canva',
      'Iterative documentation of prompt parameters and creative outcomes',
    ],
    technologies: ['Google Gemini', 'Google Flow', 'Prompt Engineering', 'Canva', 'CapCut Pro'],
    coverSvgDataUri: aiCreativeSvg,
    visualType: 'ai-creative',
  },
  {
    id: 'economics-data-analytics-dashboard',
    title: 'Economics and Data Analytics Dashboard',
    status: 'Concept Project',
    category: 'Economics & Analytics',
    shortDescription:
      'A proposed project exploring economic indicators, market trends, data visualization, and financial analysis.',
    detailedOverview:
      'A proposed analytical workspace designed to synthesize macroeconomic indicators—such as GDP growth trajectories, inflation indices, and sectoral shifts—into clean, comparative visual views for students and researchers.',
    problemStatement:
      'Raw economic tables and public statistical releases are often dense and fragmented, making it difficult to compare multi-indicator trends at a glance.',
    proposedArchitecture: [
      'Comparative time-series visualization for macroeconomic indicators and inflation trends',
      'Structured commentary cards linking quantitative shifts to underlying economic theory',
      'Tabular data inspection view with clean filtering and indicator definitions',
    ],
    technologies: ['Economic Analysis', 'Data Visualization', 'Analytical Thinking', 'Dashboard Concept'],
    coverSvgDataUri: econDashboardSvg,
    visualType: 'econ-dashboard',
  },
];

export const CAREER_ASPIRATIONS: CareerAspiration[] = [
  {
    id: 'data-analytics-internships',
    title: 'Data Analytics Internships',
    domain: 'Quantitative & Business Intelligence',
    description:
      'Seeking entry-level internship opportunities where I can apply structured data interpretation, analytical thinking, and economic reasoning to real-world datasets.',
    alignmentPoints: ['Data Interpretation', 'Analytical Reporting', 'Problem Structuring'],
  },
  {
    id: 'ai-prompt-engineering',
    title: 'AI and Prompt Engineering Opportunities',
    domain: 'Applied Artificial Intelligence',
    description:
      'Interested in roles and research projects involving prompt design, LLM evaluation, generative workflow design, and responsible AI implementation.',
    alignmentPoints: ['Google Gemini & Vertex AI', 'Structured Prompting', 'Responsible AI'],
  },
  {
    id: 'economic-research',
    title: 'Economic Research and Analysis',
    domain: 'Macroeconomics & Market Trends',
    description:
      'Aspiring to contribute to academic and policy-oriented economic research examining market trends, digital transformation, and financial indicators.',
    alignmentPoints: ['B.A. Economics Foundation', 'Market Trend Tracking', 'Policy & Systems Thinking'],
  },
  {
    id: 'digital-content-creative-tech',
    title: 'Digital Content and Creative Technology',
    domain: 'Visual Design & Media Production',
    description:
      'Open to creative collaborations requiring graphic design, video editing, and AI-assisted media production that communicate complex ideas clearly.',
    alignmentPoints: ['Canva & Graphic Design', 'CapCut Pro & InShot', 'Google Flow'],
  },
  {
    id: 'tech-driven-collaborations',
    title: 'Technology-Driven Projects and Collaborations',
    domain: 'University & Open-Source Initiatives',
    description:
      'Eager to partner with university organizations, student founders, and interdisciplinary teams building modern web concepts and analytical tools.',
    alignmentPoints: ['AI-Assisted Web Development', 'GitHub Workflow', 'Cross-Disciplinary Teamwork'],
  },
];
