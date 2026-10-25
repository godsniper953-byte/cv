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

export interface ProjectScreenshot {
  title: string;
  caption: string;
  svgDataUri: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  status: 'Live Project' | 'Concept Project' | 'In Development';
  category:
    | 'Economics & Data Analytics'
    | 'Web & 3D Concept'
    | 'AI & Creative Workflows'
    | 'Economics & Analytics';
  shortDescription: string;
  detailedOverview: string;
  problemStatement: string;
  proposedArchitecture: string[];
  keyFeatures?: ProjectFeature[];
  developmentProcess?: string[];
  screenshots?: ProjectScreenshot[];
  technologies: string[];
  coverSvgDataUri: string;
  visualType: 'arthniti' | 'orbiter' | 'ai-creative' | 'econ-dashboard' | 'custom';
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

// High-resolution dashboard preview for ArthNiti — Indian Economic Intelligence
const arthnitiCoverSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" fill="none">
  <rect width="1200" height="675" fill="#060B16"/>
  <defs>
    <radialGradient id="arthGlow" cx="62%" cy="35%" r="55%">
      <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.22"/>
      <stop offset="50%" stop-color="#10B981" stop-opacity="0.09"/>
      <stop offset="100%" stop-color="#060B16" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gdpArea" x1="0" y1="240" x2="0" y2="540" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#10B981" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="#10B981" stop-opacity="0.0"/>
    </linearGradient>
    <linearGradient id="cpiArea" x1="0" y1="280" x2="0" y2="540" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.26"/>
      <stop offset="100%" stop-color="#3B82F6" stop-opacity="0.0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#arthGlow)"/>

  <!-- App Window Frame -->
  <rect x="36" y="28" width="1128" height="619" rx="16" fill="#080E1C" stroke="#1E293B" stroke-width="1.5"/>
  
  <!-- Top Bar -->
  <line x1="36" y1="78" x2="1164" y2="78" stroke="#1E293B" stroke-width="1"/>
  <circle cx="64" cy="53" r="5" fill="#334155"/>
  <circle cx="82" cy="53" r="5" fill="#334155"/>
  <circle cx="100" cy="53" r="5" fill="#334155"/>
  <text x="128" y="58" fill="#F8FAFC" font-family="sans-serif" font-weight="700" font-size="15" letter-spacing="0.5">ArthNiti — Indian Economic Intelligence</text>
  <text x="935" y="57" fill="#38BDF8" font-family="monospace" font-size="12">MoSPI &amp; RBI DATA TERMINAL</text>

  <!-- Left Sidebar Navigation -->
  <line x1="248" y1="78" x2="248" y2="647" stroke="#1E293B" stroke-width="1"/>
  <rect x="52" y="102" width="180" height="34" rx="8" fill="#1E293B" fill-opacity="0.7"/>
  <text x="68" y="124" fill="#38BDF8" font-family="sans-serif" font-weight="600" font-size="12">Overview Terminal</text>
  <text x="68" y="164" fill="#94A3B8" font-family="sans-serif" font-size="12">GDP Growth (MoSPI)</text>
  <text x="68" y="200" fill="#94A3B8" font-family="sans-serif" font-size="12">Inflation &amp; CPI</text>
  <text x="68" y="236" fill="#94A3B8" font-family="sans-serif" font-size="12">RBI Policy Repo Rate</text>
  <text x="68" y="272" fill="#94A3B8" font-family="sans-serif" font-size="12">Labour Market</text>
  <text x="68" y="308" fill="#94A3B8" font-family="sans-serif" font-size="12">Currency &amp; Crude Oil</text>
  <text x="68" y="344" fill="#94A3B8" font-family="sans-serif" font-size="12">Financial Markets</text>
  <text x="68" y="380" fill="#94A3B8" font-family="sans-serif" font-size="12">Comparisons &amp; GVA</text>
  <text x="68" y="416" fill="#94A3B8" font-family="sans-serif" font-size="12">Official Data Sources</text>

  <!-- KPI Summary Strip -->
  <g transform="translate(274, 102)">
    <rect width="268" height="96" rx="12" fill="#0B1325" stroke="#1E293B"/>
    <text x="20" y="28" fill="#94A3B8" font-family="monospace" font-size="11">INDIA REAL GDP GROWTH</text>
    <text x="20" y="62" fill="#F8FAFC" font-family="monospace" font-weight="700" font-size="26">7.2%</text>
    <text x="108" y="61" fill="#10B981" font-family="monospace" font-size="12">MoSPI Series</text>
    <text x="20" y="82" fill="#64748B" font-family="sans-serif" font-size="11">Quarterly YoY Real Expansion</text>
  </g>

  <g transform="translate(560, 102)">
    <rect width="268" height="96" rx="12" fill="#0B1325" stroke="#1E293B"/>
    <text x="20" y="28" fill="#94A3B8" font-family="monospace" font-size="11">CPI HEADLINE INFLATION</text>
    <text x="20" y="62" fill="#F8FAFC" font-family="monospace" font-weight="700" font-size="26">4.85%</text>
    <text x="122" y="61" fill="#38BDF8" font-family="monospace" font-size="12">Target 4±2%</text>
    <text x="20" y="82" fill="#64748B" font-family="sans-serif" font-size="11">Consumer Price Index Combined</text>
  </g>

  <g transform="translate(846, 102)">
    <rect width="290" height="96" rx="12" fill="#0B1325" stroke="#1E293B"/>
    <text x="20" y="28" fill="#94A3B8" font-family="monospace" font-size="11">RBI POLICY REPO RATE</text>
    <text x="20" y="62" fill="#F8FAFC" font-family="monospace" font-weight="700" font-size="26">6.50%</text>
    <text x="122" y="61" fill="#A78BFA" font-family="monospace" font-size="12">MPC Benchmark</text>
    <text x="20" y="82" fill="#64748B" font-family="sans-serif" font-size="11">Reserve Bank of India Monetary Policy</text>
  </g>

  <!-- Main Interactive Chart Panel -->
  <rect x="274" y="218" width="862" height="398" rx="12" fill="#0B1325" stroke="#1E293B"/>
  <text x="302" y="254" fill="#F8FAFC" font-family="sans-serif" font-weight="600" font-size="15">Macroeconomic Trajectory — GDP Growth, CPI Inflation &amp; RBI Repo Rate</text>
  <text x="302" y="274" fill="#64748B" font-family="monospace" font-size="11">OFFICIAL MOSPI &amp; RBI CSV PIPELINE · MULTI-INDICATOR TIME SERIES</text>

  <!-- Chart Grid Lines -->
  <g stroke="#1E293B" stroke-width="1" stroke-dasharray="4 4">
    <line x1="302" y1="315" x2="1104" y2="315"/>
    <line x1="302" y1="380" x2="1104" y2="380"/>
    <line x1="302" y1="445" x2="1104" y2="445"/>
    <line x1="302" y1="510" x2="1104" y2="510"/>
    <line x1="302" y1="565" x2="1104" y2="565"/>
  </g>

  <!-- GDP Curve (Emerald) -->
  <path d="M302,485 C395,465 460,410 550,420 C640,430 715,355 815,335 C915,315 1010,295 1104,280 L1104,565 L302,565 Z" fill="url(#gdpArea)"/>
  <path d="M302,485 C395,465 460,410 550,420 C640,430 715,355 815,335 C915,315 1010,295 1104,280" stroke="#10B981" stroke-width="3" fill="none"/>

  <!-- CPI Curve (Electric Blue) -->
  <path d="M302,430 C395,440 470,465 565,455 C660,445 740,470 835,460 C930,450 1015,435 1104,425 L1104,565 L302,565 Z" fill="url(#cpiArea)"/>
  <path d="M302,430 C395,440 470,465 565,455 C660,445 740,470 835,460 C930,450 1015,435 1104,425" stroke="#3B82F6" stroke-width="2.5" fill="none"/>

  <!-- RBI Repo Step Line (Violet) -->
  <path d="M302,400 L520,400 L520,382 L840,382 L840,382 L1104,382" stroke="#A78BFA" stroke-width="2" stroke-dasharray="6 4" fill="none"/>

  <!-- Data Points -->
  <circle cx="550" cy="420" r="5" fill="#10B981"/>
  <circle cx="815" cy="335" r="5" fill="#10B981"/>
  <circle cx="1104" cy="280" r="6" fill="#34D399"/>
  <circle cx="565" cy="455" r="4.5" fill="#3B82F6"/>
  <circle cx="835" cy="460" r="4.5" fill="#3B82F6"/>
  <circle cx="1104" cy="425" r="5.5" fill="#60A5FA"/>
</svg>
`)}`;

const arthnitiPipelineSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" fill="none">
  <rect width="1200" height="675" fill="#060B16"/>
  <rect x="48" y="42" width="1104" height="591" rx="16" fill="#091020" stroke="#1E293B" stroke-width="1.5"/>
  <text x="88" y="96" fill="#F8FAFC" font-family="sans-serif" font-weight="700" font-size="20">ArthNiti — Official MoSPI &amp; RBI CSV Data Pipelines</text>
  <text x="88" y="122" fill="#94A3B8" font-family="monospace" font-size="12">VERIFIED DATA SERVICES · CUSTOM CSV UPLOAD &amp; FALLBACK RESILIENCE</text>

  <!-- 3 Service Modules -->
  <g transform="translate(88, 165)">
    <rect width="320" height="210" rx="12" fill="#0D172A" stroke="#10B981" stroke-opacity="0.45"/>
    <text x="24" y="42" fill="#10B981" font-family="monospace" font-size="12">01 · gdpDataService.ts</text>
    <text x="24" y="74" fill="#F8FAFC" font-family="sans-serif" font-weight="600" font-size="17">MoSPI GDP Growth Pipeline</text>
    <text x="24" y="106" fill="#94A3B8" font-family="sans-serif" font-size="13">Parses official GDP time series,</text>
    <text x="24" y="126" fill="#94A3B8" font-family="sans-serif" font-size="13">sector GVA breakdowns, and</text>
    <text x="24" y="146" fill="#94A3B8" font-family="sans-serif" font-size="13">supports user CSV uploads.</text>
    <text x="24" y="185" fill="#38BDF8" font-family="monospace" font-size="11">Origin: official_mospi_csv</text>
  </g>

  <g transform="translate(440, 165)">
    <rect width="320" height="210" rx="12" fill="#0D172A" stroke="#3B82F6" stroke-opacity="0.45"/>
    <text x="24" y="42" fill="#60A5FA" font-family="monospace" font-size="12">02 · cpiDataService.ts</text>
    <text x="24" y="74" fill="#F8FAFC" font-family="sans-serif" font-weight="600" font-size="17">CPI Inflation Analytics</text>
    <text x="24" y="106" fill="#94A3B8" font-family="sans-serif" font-size="13">Tracks headline &amp; core inflation</text>
    <text x="24" y="126" fill="#94A3B8" font-family="sans-serif" font-size="13">trajectories with live CSV</text>
    <text x="24" y="146" fill="#94A3B8" font-family="sans-serif" font-size="13">validation and error recovery.</text>
    <text x="24" y="185" fill="#38BDF8" font-family="monospace" font-size="11">Origin: official_mospi_csv</text>
  </g>

  <g transform="translate(792, 165)">
    <rect width="320" height="210" rx="12" fill="#0D172A" stroke="#A78BFA" stroke-opacity="0.45"/>
    <text x="24" y="42" fill="#A78BFA" font-family="monospace" font-size="12">03 · repoDataService.ts</text>
    <text x="24" y="74" fill="#F8FAFC" font-family="sans-serif" font-weight="600" font-size="17">RBI Monetary Policy Rate</text>
    <text x="24" y="106" fill="#94A3B8" font-family="sans-serif" font-size="13">Monitors RBI Monetary Policy</text>
    <text x="24" y="126" fill="#94A3B8" font-family="sans-serif" font-size="13">Committee repo rate cycles</text>
    <text x="24" y="146" fill="#94A3B8" font-family="sans-serif" font-size="13">against inflation bands.</text>
    <text x="24" y="185" fill="#38BDF8" font-family="monospace" font-size="11">Origin: official_rbi_csv</text>
  </g>

  <!-- Bottom Domain Modules Bar -->
  <rect x="88" y="410" width="1024" height="175" rx="12" fill="#0D172A" stroke="#1E293B"/>
  <text x="116" y="448" fill="#F8FAFC" font-family="sans-serif" font-weight="600" font-size="15">9 Dedicated Analytical Workspace Views</text>
  <text x="116" y="482" fill="#94A3B8" font-family="monospace" font-size="12">OverviewPage · GdpGrowthPage · InflationPage · LabourMarketPage · CurrencyOilPage</text>
  <text x="116" y="512" fill="#94A3B8" font-family="monospace" font-size="12">FinancialMarketsPage · ComparisonsPage · DataSourcesPage · AboutPage</text>
  <text x="116" y="552" fill="#10B981" font-family="monospace" font-size="12">Deployed Live at https://arthniti-six.vercel.app/</text>
</svg>
`)}`;

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
    id: 'arthniti-economic-intelligence',
    title: 'ArthNiti',
    status: 'Live Project',
    category: 'Economics & Data Analytics',
    shortDescription:
      "ArthNiti is an economic analysis platform designed to help users explore India's economic indicators, financial trends, inflation, GDP growth, RBI repo rates, and other important economic data through an intuitive dashboard.",
    detailedOverview:
      'ArthNiti ("Indian Economic Intelligence") is a live, interactive macroeconomic research terminal and data storytelling platform built to make India\'s core economic indicators accessible, comparable, and transparent. Deployed on Vercel and backed by modular TypeScript data services, it synthesizes official MoSPI and Reserve Bank of India (RBI) time-series data into an intuitive multi-page analytical workspace.',
    problemStatement:
      'Public macroeconomic data releases across GDP growth, Consumer Price Index (CPI) inflation, and RBI monetary policy rates are often distributed across separate statistical tables and CSV files, making unified trend comparison and exploratory analysis challenging for students, researchers, and market observers.',
    keyFeatures: [
      {
        title: 'Official MoSPI & RBI Data Pipelines',
        description:
          'Dedicated TypeScript services (gdpDataService, cpiDataService, repoDataService) that load official MoSPI GDP & CPI datasets and RBI policy repo rate histories, complete with user-uploaded CSV support and fallback resilience.',
      },
      {
        title: '9 Specialized Analytical Views',
        description:
          'Structured navigation across Overview, GDP Growth, CPI Inflation, Labour Market, Currency & Crude Oil, Financial Markets, Cross-Indicator Comparisons, Official Data Sources, and Platform Methodology.',
      },
      {
        title: 'Interactive Time-Series & Sector GVA Visualization',
        description:
          'Responsive Recharts visualizations for quarterly and annual economic trajectories, Gross Value Added (GVA) sectoral breakdowns, and latest statistical release tracking.',
      },
      {
        title: 'Accessible Research Terminal Interface',
        description:
          'Engineered with dark and light theme toggling, collapsible workspace sidebar, focused indicator drill-down modals, and reduced-motion accessibility compliance.',
      },
    ],
    developmentProcess: [
      'Designed a domain-separated architecture in TypeScript (`src/services/`, `src/pages/`, `src/types/economy.ts`) to decouple CSV parsing and indicator normalization from UI rendering.',
      'Implemented interactive data pipelines supporting three distinct data origins (`official_mospi_csv`, `official_rbi_csv`, and `user_uploaded_csv`) so users can inspect default datasets or upload custom CSV series.',
      'Built responsive Recharts visual modules and deployed the production build on Vercel (`https://arthniti-six.vercel.app/`) with public source code on GitHub.',
    ],
    proposedArchitecture: [
      'Modular TypeScript service layer (`economyService`, `gdpDataService`, `cpiDataService`, `repoDataService`) managing asynchronous CSV ingestion and validation',
      'Multi-view SPA workspace covering GDP Growth, Inflation, RBI Repo Rates, Labour Market, Currency/Oil, and Financial Markets',
      'Interactive Recharts time-series engine with custom CSV upload overrides and theme-aware styling',
    ],
    screenshots: [
      {
        title: 'Macroeconomic Overview & Multi-Indicator Terminal',
        caption:
          'Primary dashboard view tracking India Real GDP Growth, CPI Headline Inflation, and RBI Policy Repo Rate trajectories.',
        svgDataUri: arthnitiCoverSvg,
      },
      {
        title: 'MoSPI & RBI CSV Data Pipeline Architecture',
        caption:
          'Service architecture supporting official MoSPI/RBI datasets, custom CSV uploads, and 9 specialized analytical pages.',
        svgDataUri: arthnitiPipelineSvg,
      },
    ],
    technologies: [
      'TypeScript',
      'React 19',
      'Tailwind CSS',
      'Recharts',
      'Three.js',
      'Motion',
      'MoSPI & RBI Data Pipelines',
      'Vite',
    ],
    coverSvgDataUri: arthnitiCoverSvg,
    visualType: 'arthniti',
    liveDemoUrl: 'https://arthniti-six.vercel.app/',
    repositoryUrl: 'https://github.com/godsniper953-byte/ArthNiti',
  },
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
    repositoryUrl: 'https://github.com/godsniper953-byte/amu-orbiter',
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
    category: 'Economics & Data Analytics',
    shortDescription:
      'A proposed project exploring economic indicators, market trends, data visualization, and financial analysis.',
    detailedOverview:
      'Early conceptual foundation exploring how macroeconomic indicators—such as GDP growth trajectories, inflation indices, and sectoral shifts—can be synthesized into comparative visual views for students and researchers (which helped inspire the full production deployment of ArthNiti).',
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
