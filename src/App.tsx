import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowDown,
  ArrowUpRight,
  ExternalLink,
  Github,
  Mail,
  Linkedin,
  Menu,
  X,
  Plus,
  FileText,
  GraduationCap,
  SlidersHorizontal,
} from 'lucide-react';
import {
  INITIAL_PORTFOLIO_CONFIG,
  ABOUT_HIGHLIGHT_CARDS,
  SKILL_CATEGORIES,
  CREDENTIALS_LIST,
  EDUCATION_TIMELINE,
  INITIAL_PROJECTS,
  CAREER_ASPIRATIONS,
  PortfolioConfig,
  ProjectItem,
  CredentialItem,
} from './data/portfolioData';
import { InteractiveSphereCanvas } from './components/InteractiveSphereCanvas';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ProjectCard } from './components/ProjectCard';
import { GitHubSection } from './components/GitHubSection';
import { ResumeSection } from './components/ResumeSection';
import { OwnerConfigModal } from './components/OwnerConfigModal';

const STORAGE_KEYS = {
  CONFIG: 'ahmed_ali_portfolio_config_v1',
  PROJECTS: 'ahmed_ali_portfolio_projects_v2',
  CREDENTIALS: 'ahmed_ali_portfolio_credentials_v1',
};

export default function App() {
  // Persisted configurable state so owner edits survive page reloads
  const [config, setConfig] = useState<PortfolioConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return saved ? { ...INITIAL_PORTFOLIO_CONFIG, ...JSON.parse(saved) } : INITIAL_PORTFOLIO_CONFIG;
    } catch {
      return INITIAL_PORTFOLIO_CONFIG;
    }
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [credentials, setCredentials] = useState<CredentialItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CREDENTIALS);
      return saved ? JSON.parse(saved) : CREDENTIALS_LIST;
    } catch {
      return CREDENTIALS_LIST;
    }
  });

  // Rotating hero keyword index
  const [keywordIndex, setKeywordIndex] = useState(0);

  // Active navigation section
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Interactive section filters
  const [skillFilter, setSkillFilter] = useState<'all' | 'ai' | 'economics' | 'creative' | 'tools'>('all');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [credCategoryFilter, setCredCategoryFilter] = useState<string>('all');
  const [credTypeFilter, setCredTypeFilter] = useState<
    'all' | 'Certification / Badge' | 'Course / Learning Module'
  >('all');

  // Modals
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [configModalTab, setConfigModalTab] = useState<'contact' | 'add-project' | 'credentials'>('contact');

  // Rotating text interval
  useEffect(() => {
    const interval = setInterval(() => {
      setKeywordIndex((prev) => (prev + 1) % config.rotatingKeywords.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [config.rotatingKeywords.length]);

  // IntersectionObserver for active nav indicator
  useEffect(() => {
    const sectionIds = [
      'home',
      'about',
      'skills',
      'projects',
      'certifications',
      'education',
      'github',
      'resume',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0.05 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleUpdateConfig = (updated: PortfolioConfig) => {
    setConfig(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  };

  const handleAddProject = (newProject: ProjectItem) => {
    const updated = [...projects, newProject];
    setProjects(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  };

  const handleUpdateCredential = (id: string, completionDate: string, verificationUrl: string) => {
    const updated = credentials.map((c) =>
      c.id === id ? { ...c, completionDate, verificationUrl } : c
    );
    setCredentials(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  };

  const handleResetDefaults = () => {
    setConfig(INITIAL_PORTFOLIO_CONFIG);
    setProjects(INITIAL_PROJECTS);
    setCredentials(CREDENTIALS_LIST);
    try {
      localStorage.removeItem(STORAGE_KEYS.CONFIG);
      localStorage.removeItem(STORAGE_KEYS.PROJECTS);
      localStorage.removeItem(STORAGE_KEYS.CREDENTIALS);
    } catch {
      // Ignore storage errors
    }
  };

  const openConfigStudio = (tab: 'contact' | 'add-project' | 'credentials') => {
    setConfigModalTab(tab);
    setConfigModalOpen(true);
  };

  const filteredSkillCategories =
    skillFilter === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === skillFilter);

  const filteredProjects =
    projectFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === projectFilter);

  const filteredCredentials = credentials.filter((cred) => {
    const matchesCat = credCategoryFilter === 'all' || cred.category === credCategoryFilter;
    const matchesType = credTypeFilter === 'all' || cred.credentialType === credTypeFilter;
    return matchesCat && matchesType;
  });

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Credentials' },
    { id: 'github', label: 'GitHub' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#050507] text-zinc-100 flex flex-col selection:bg-blue-500/30 selection:text-blue-200">
      {/* Sticky Top Bar (Strict 3-Zone Contract, <= 15% mobile viewport height) */}
      <header className="sticky top-0 z-40 h-16 bg-[#050507]/85 backdrop-blur-md border-b border-zinc-900 no-print">
        <div className="max-w-7xl mx-auto h-full px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 font-display focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          >
            {config.name}
          </a>

          {/* Zone 2: 5 concise single-line navigation links */}
          <nav
            className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400"
            aria-label="Primary Navigation"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                    isActive
                      ? 'text-white border-blue-500'
                      : 'border-transparent hover:text-zinc-100 hover:border-zinc-700'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action (plus mobile menu toggle on small screens) */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0"
            >
              Collaborate
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Responsive Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#080A11] border-b border-zinc-800 px-6 py-4 space-y-2">
            {[
              ...navItems,
              { id: 'education', label: 'Education' },
              { id: 'resume', label: 'Resume' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors ${
                  activeSection === item.id ? 'text-blue-400' : 'text-zinc-300 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section
          id="home"
          className="relative pt-12 pb-20 lg:pt-20 lg:pb-24 overflow-hidden no-print"
          aria-labelledby="hero-headline"
        >
          {/* Restrained ambient lighting */}
          <div
            className="pointer-events-none absolute -top-40 left-1/4 w-[520px] h-[520px] rounded-full bg-blue-600/10 blur-[130px]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute top-20 right-1/4 w-[440px] h-[440px] rounded-full bg-violet-600/10 blur-[130px]"
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Split-Screen Hero Grid (items-stretch for balanced 2-column height) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left Column: Typographic Hierarchy & CTAs */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                {/* Unboxed Kicker */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400 mb-5">
                  <span className="text-blue-400">{config.university}</span>
                  <span aria-hidden="true">·</span>
                  <span>{config.degree}</span>
                  <span aria-hidden="true">·</span>
                  <span>Class of {config.expectedGraduation}</span>
                </div>

                {/* Animated Name Reveal & Rotating Discipline */}
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="text-sm sm:text-base font-medium text-zinc-300"
                  >
                    {config.name} — Exploring
                  </motion.span>
                  <div className="inline-flex items-center min-w-[210px] h-7 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={config.rotatingKeywords[keywordIndex]}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                        className="text-sm sm:text-base font-semibold text-blue-400 font-mono"
                      >
                        {config.rotatingKeywords[keywordIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Primary Display Headline */}
                <h1
                  id="hero-headline"
                  className="font-display font-bold tracking-tight text-white text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.08]"
                  style={{ textWrap: 'balance' }}
                >
                  {config.headline}
                </h1>

                {/* Supporting Text */}
                <p className="mt-6 text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl">
                  {config.heroSupportingText}
                </p>

                {/* Unboxed Identity Strip */}
                <div className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-zinc-400">
                  {config.identities.map((role, idx) => (
                    <React.Fragment key={role}>
                      <span>{role}</span>
                      {idx < config.identities.length - 1 && (
                        <span aria-hidden="true" className="text-zinc-600">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Primary, Secondary, and GitHub Action Buttons */}
                <div className="mt-9 flex flex-wrap items-center gap-3.5">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Explore My Work</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <a
                    href="#resume"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-zinc-100 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 hover:border-zinc-700 transition-colors whitespace-nowrap shrink-0"
                  >
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>View My Resume</span>
                  </a>

                  <a
                    href={config.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-zinc-300 bg-[#0B0D14] border border-zinc-800/90 rounded-xl hover:text-white hover:border-zinc-700 transition-colors whitespace-nowrap shrink-0"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Profile</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive 3D Digital Sphere */}
              <div className="lg:col-span-5 flex">
                <InteractiveSphereCanvas />
              </div>
            </div>

            {/* Full-Width Key Academic & Focus Strip Below the Hero Split */}
            <div className="mt-12 pt-8 border-t border-zinc-900 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-xs font-mono text-zinc-500">ACADEMIC INSTITUTION</p>
                <p className="text-sm font-semibold text-zinc-100 mt-1">
                  Aligarh Muslim University (AMU)
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  B.A. Economics · Expected {config.expectedGraduation}
                </p>
              </div>
              <div>
                <p className="text-xs font-mono text-zinc-500">AI &amp; PROMPT SYSTEMS</p>
                <p className="text-sm font-semibold text-zinc-100 mt-1">
                  Google Gemini &amp; Vertex AI
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Prompt Engineering · Generative AI Agents
                </p>
              </div>
              <div>
                <p className="text-xs font-mono text-zinc-500">QUANTITATIVE FOCUS</p>
                <p className="text-sm font-semibold text-zinc-100 mt-1">
                  Economic &amp; Data Analysis
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Market Trends · Data-Driven Decisions
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono text-zinc-500">CREATIVE TECHNOLOGY</p>
                  <p className="text-sm font-semibold text-zinc-100 mt-1">
                    Design &amp; Video Production
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Canva · CapCut Pro · Google Flow
                  </p>
                </div>
                <a
                  href="#about"
                  aria-label="Scroll down to About section"
                  className="hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:border-blue-500/60 transition-colors shrink-0"
                >
                  <ArrowDown className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Subtle Editorial Section Ribbon */}
        <div className="border-y border-zinc-900 bg-[#07090F] py-3 overflow-hidden no-print">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-500">
            <span>ECONOMICS SYSTEMS</span>
            <span aria-hidden="true">·</span>
            <span>ARTIFICIAL INTELLIGENCE</span>
            <span aria-hidden="true">·</span>
            <span>PROMPT ENGINEERING</span>
            <span aria-hidden="true">·</span>
            <span>DATA ANALYTICS</span>
            <span aria-hidden="true">·</span>
            <span>CREATIVE DESIGN &amp; MEDIA</span>
          </div>
        </div>

        {/* 2. ABOUT ME SECTION */}
        <section
          id="about"
          className="py-24 relative no-print"
          aria-labelledby="about-heading"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Biography */}
              <div className="lg:col-span-5">
                <p className="text-xs font-mono text-blue-400 tracking-wide mb-3">
                  01. PERSONAL PROFILE
                </p>
                <h2
                  id="about-heading"
                  className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
                  style={{ textWrap: 'balance' }}
                >
                  Connecting Economic Reasoning with Emerging Intelligence
                </h2>
                <p className="mt-6 text-base text-zinc-300 leading-relaxed">
                  {config.aboutBiography}
                </p>

                <div className="mt-8 pt-6 border-t border-zinc-800/80 space-y-3 text-xs text-zinc-400">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-zinc-500">UNIVERSITY</span>
                    <span className="text-zinc-200 font-medium">{config.university}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-zinc-500">DEGREE PROGRAM</span>
                    <span className="text-zinc-200 font-medium">
                      {config.degree} (Expected {config.expectedGraduation})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-zinc-500">PRIMARY INTERESTS</span>
                    <span className="text-zinc-200 font-medium">
                      Economics · AI · Data · Design
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: 5 Information Cards */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {ABOUT_HIGHLIGHT_CARDS.map((card, index) => (
                  <div
                    key={card.id}
                    className={`p-6 rounded-2xl bg-[#0B0D14] border border-zinc-800/80 hover:border-zinc-700 transition-colors flex flex-col justify-between ${
                      index === 0 ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <div>
                      <p className="text-xs font-mono text-blue-400 mb-1.5">
                        {card.category}
                      </p>
                      <h3 className="text-lg font-semibold text-white">
                        {card.title}
                      </h3>
                      <p className="text-sm text-zinc-400 mt-2.5 leading-relaxed">
                        {card.summary}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-zinc-800/60 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-400">
                      {card.focusAreas.map((area, i) => (
                        <React.Fragment key={area}>
                          <span className="text-zinc-300">{area}</span>
                          {i < card.focusAreas.length - 1 && (
                            <span aria-hidden="true" className="text-zinc-600">
                              ·
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. SKILLS AND EXPERTISE SECTION */}
        <section
          id="skills"
          className="py-24 border-t border-zinc-900/90 relative no-print"
          aria-labelledby="skills-heading"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-xs font-mono text-blue-400 tracking-wide mb-3">
                  02. CAPABILITIES &amp; TOOLKIT
                </p>
                <h2
                  id="skills-heading"
                  className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
                  style={{ textWrap: 'balance' }}
                >
                  Skills and Expertise
                </h2>
                <p className="mt-3 text-base text-zinc-400 max-w-2xl leading-relaxed">
                  Organized across artificial intelligence, economic analysis, creative production,
                  and modern digital workflows—presented truthfully without arbitrary percentage
                  gauges.
                </p>
              </div>

              {/* Interactive Category Filter Tabs */}
              <div
                className="flex flex-wrap items-center gap-1 bg-zinc-900/90 p-1 rounded-xl border border-zinc-800"
                role="group"
                aria-label="Filter skills by category"
              >
                <button
                  type="button"
                  onClick={() => setSkillFilter('all')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    skillFilter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  All Domains
                </button>
                {SKILL_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSkillFilter(cat.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      skillFilter === cat.id
                        ? 'bg-blue-600 text-white'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {cat.shortLabel}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredSkillCategories.map((category) => (
                <div
                  key={category.id}
                  className="p-7 rounded-2xl bg-[#0B0D14] border border-zinc-800/80 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {category.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                          {category.subtitle}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-blue-400 tabular-nums shrink-0">
                        {category.skills.length} Focus Areas
                      </span>
                    </div>

                    <div className="mt-5 divide-y divide-zinc-800/60">
                      {category.skills.map((skill) => (
                        <div key={skill.name} className="py-3.5 first:pt-0 last:pb-0">
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <span className="text-sm font-semibold text-zinc-100">
                              {skill.name}
                            </span>
                            <span className="text-[11px] font-mono text-zinc-500">
                              {skill.type}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                            {skill.context}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. PROJECTS PORTFOLIO SECTION */}
        <section
          id="projects"
          className="py-24 border-t border-zinc-900/90 relative no-print"
          aria-labelledby="projects-heading"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-xs font-mono text-blue-400 tracking-wide mb-3">
                  03. SELECTED PROJECTS &amp; CONCEPTS
                </p>
                <h2
                  id="projects-heading"
                  className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
                  style={{ textWrap: 'balance' }}
                >
                  Projects Portfolio
                </h2>
                <p className="mt-3 text-base text-zinc-400 max-w-2xl leading-relaxed">
                  Featuring <span className="text-zinc-100 font-medium">ArthNiti</span>, a live
                  Indian economic intelligence and data analytics platform, alongside explorations in
                  3D web design and AI creative workflows.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <div
                  className="flex flex-wrap items-center gap-1 bg-zinc-900/90 p-1 rounded-xl border border-zinc-800"
                  role="group"
                  aria-label="Filter projects by category"
                >
                  {[
                    { id: 'all', label: 'All Projects' },
                    { id: 'Economics & Data Analytics', label: 'Economics & Data' },
                    { id: 'Web & 3D Concept', label: 'Web & 3D' },
                    { id: 'AI & Creative Workflows', label: 'AI & Creative' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setProjectFilter(tab.id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                        projectFilter === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => openConfigStudio('add-project')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-zinc-200 bg-zinc-900 border border-zinc-800 rounded-xl hover:text-white hover:border-zinc-700 transition-colors whitespace-nowrap shrink-0"
                >
                  <Plus className="w-3.5 h-3.5 text-blue-400" />
                  <span>Add Genuine Project</span>
                </button>
              </div>
            </div>

            {/* Dynamic Bento Grid (Wide showcase card for ArthNiti + compact project cards) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {filteredProjects.map((project, index) => {
                const isFeaturedWide = index === 0 && projectFilter === 'all';
                return (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isFeaturedWide={isFeaturedWide}
                    onExplore={(proj) => setSelectedProject(proj)}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. CERTIFICATIONS AND LEARNING SECTION */}
        <section
          id="certifications"
          className="py-24 border-t border-zinc-900/90 relative no-print"
          aria-labelledby="certifications-heading"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-xs font-mono text-blue-400 tracking-wide mb-3">
                  04. VERIFIED LEARNING &amp; CREDENTIALS
                </p>
                <h2
                  id="certifications-heading"
                  className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
                  style={{ textWrap: 'balance' }}
                >
                  Certifications and Learning
                </h2>
                <p className="mt-3 text-base text-zinc-400 max-w-2xl leading-relaxed">
                  Distinguishes completed certifications and recognition badges from specialized
                  learning modules across AI fundamentals, prompt engineering, generative AI, and
                  responsible AI.
                </p>
              </div>

              <button
                type="button"
                onClick={() => openConfigStudio('credentials')}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-xl hover:text-white hover:border-zinc-700 transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
                <span>Edit Dates / Verification URLs</span>
              </button>
            </div>

            {/* Dual Filter Row: Category + Credential Type */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-zinc-900">
              <div
                className="flex flex-wrap items-center gap-1 bg-zinc-900/90 p-1 rounded-xl border border-zinc-800"
                role="group"
                aria-label="Filter credentials by topic category"
              >
                {[
                  'all',
                  'AI Fundamentals',
                  'Prompt Engineering',
                  'Generative AI',
                  'Responsible AI',
                ].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCredCategoryFilter(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      credCategoryFilter === cat
                        ? 'bg-blue-600 text-white'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {cat === 'all' ? 'All Categories' : cat}
                  </button>
                ))}
              </div>

              <div
                className="flex flex-wrap items-center gap-1 bg-zinc-900/90 p-1 rounded-xl border border-zinc-800"
                role="group"
                aria-label="Filter by Certifications vs Courses"
              >
                {(
                  [
                    { id: 'all', label: 'All (10)' },
                    { id: 'Certification / Badge', label: 'Certifications & Badges (4)' },
                    { id: 'Course / Learning Module', label: 'Courses & Modules (6)' },
                  ] as const
                ).map((typeTab) => (
                  <button
                    key={typeTab.id}
                    type="button"
                    onClick={() => setCredTypeFilter(typeTab.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      credTypeFilter === typeTab.id
                        ? 'bg-violet-600 text-white'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {typeTab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Credentials Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCredentials.map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-[#0B0D14] border border-zinc-800/80 flex flex-col justify-between hover:border-zinc-700 transition-colors"
                >
                  <div>
                    {/* Unboxed Metadata Kicker */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-2">
                      <div className="flex flex-wrap items-center gap-2 text-zinc-400">
                        <span
                          className={
                            item.credentialType === 'Certification / Badge'
                              ? 'text-blue-400 font-medium'
                              : 'text-violet-400 font-medium'
                          }
                        >
                          {item.credentialType}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{item.category}</span>
                      </div>
                      <span className="font-mono text-zinc-400">{item.issuer}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-sm text-zinc-400 mt-2 leading-relaxed">{item.summary}</p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-zinc-800/70 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap items-center gap-1.5 text-zinc-400">
                      {item.keyTopics.map((topic, idx) => (
                        <React.Fragment key={topic}>
                          <span>{topic}</span>
                          {idx < item.keyTopics.length - 1 && (
                            <span aria-hidden="true" className="text-zinc-600">
                              ·
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 font-mono text-[11px]">
                      <span className="text-zinc-500">{item.completionDate}</span>
                      {item.verificationUrl ? (
                        <a
                          href={item.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300"
                        >
                          <span>Verify</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => openConfigStudio('credentials')}
                          className="text-zinc-500 hover:text-zinc-300 underline decoration-zinc-700 underline-offset-2"
                        >
                          Add URL
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. EDUCATION TIMELINE & 7. CAREER ASPIRATIONS ("Where Economics Meets Technology") */}
        <section
          id="education"
          className="py-24 border-t border-zinc-900/90 relative no-print"
          aria-labelledby="education-heading"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Part A: Education Timeline */}
            <div className="mb-20">
              <p className="text-xs font-mono text-blue-400 tracking-wide mb-3">
                05. ACADEMIC FOUNDATION
              </p>
              <h2
                id="education-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
                style={{ textWrap: 'balance' }}
              >
                Education &amp; Academic Timeline
              </h2>
              <p className="mt-3 text-base text-zinc-400 max-w-2xl leading-relaxed">
                Undergraduate study in Economics paired with ongoing self-directed coursework in
                artificial intelligence and data analytics.
              </p>

              <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {EDUCATION_TIMELINE.map((item) => (
                  <div
                    key={item.id}
                    className="p-7 rounded-2xl bg-[#0B0D14] border border-zinc-800/80 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono mb-3">
                        <span className="text-blue-400">{item.type}</span>
                        <span className="text-zinc-400 tabular-nums">{item.period}</span>
                      </div>

                      <div className="flex items-start gap-3.5">
                        <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0 mt-0.5">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{item.institution}</h3>
                          <p className="text-sm font-medium text-zinc-200 mt-0.5">{item.program}</p>
                        </div>
                      </div>

                      <p className="text-sm text-zinc-400 mt-4 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-800/70 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-300">
                      <span className="text-zinc-500 font-mono">Key Focus:</span>
                      {item.focusPoints.map((pt, idx) => (
                        <React.Fragment key={pt}>
                          <span>{pt}</span>
                          {idx < item.focusPoints.length - 1 && (
                            <span aria-hidden="true" className="text-zinc-600">
                              ·
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Part B: Career Aspirations — "Where Economics Meets Technology" */}
            <div id="aspirations" className="pt-16 border-t border-zinc-900">
              <div className="max-w-3xl mb-12">
                <p className="text-xs font-mono text-violet-400 tracking-wide mb-3">
                  FUTURE DIRECTION &amp; CAREER ASPIRATIONS
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
                  style={{ textWrap: 'balance' }}
                >
                  Where Economics Meets Technology
                </h2>
                <p className="mt-4 text-base text-zinc-300 leading-relaxed">
                  Modern economic systems are increasingly shaped by algorithmic decision-making,
                  artificial intelligence, and high-frequency data streams. My goal as an Economics
                  student is to bridge traditional economic reasoning with emerging AI and data
                  analytics tools—exploring internships, research collaborations, and creative
                  technology projects that address practical problems.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CAREER_ASPIRATIONS.map((aspiration, idx) => (
                  <div
                    key={aspiration.id}
                    className={`p-6 rounded-2xl bg-[#0B0D14] border border-zinc-800/80 flex flex-col justify-between ${
                      idx === 0 ? 'lg:col-span-2' : ''
                    }`}
                  >
                    <div>
                      <p className="text-xs font-mono text-blue-400 mb-2">
                        ASPIRATION · {aspiration.domain.toUpperCase()}
                      </p>
                      <h3 className="text-lg font-bold text-white">{aspiration.title}</h3>
                      <p className="text-sm text-zinc-400 mt-2.5 leading-relaxed">
                        {aspiration.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-zinc-800/70 flex flex-wrap items-center gap-2 text-xs text-zinc-300">
                      {aspiration.alignmentPoints.map((pt, i) => (
                        <React.Fragment key={pt}>
                          <span>{pt}</span>
                          {i < aspiration.alignmentPoints.length - 1 && (
                            <span aria-hidden="true" className="text-zinc-600">
                              ·
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. LIVE GITHUB INTEGRATION SECTION */}
        <GitHubSection username={config.githubUsername} profileUrl={config.githubUrl} />

        {/* 8. RESUME AND PROFESSIONAL PROFILE SECTION */}
        <ResumeSection
          config={config}
          skills={SKILL_CATEGORIES}
          credentials={credentials}
          education={EDUCATION_TIMELINE}
          projects={projects}
          onOpenConfigModal={() => openConfigStudio('contact')}
        />

        {/* 9. CONTACT SECTION */}
        <section
          id="contact"
          className="py-24 border-t border-zinc-900/90 relative no-print"
          aria-labelledby="contact-heading"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="rounded-2xl bg-[#0B0D14] border border-zinc-800/85 p-8 sm:p-12 lg:p-16">
              <div className="max-w-3xl">
                <p className="text-xs font-mono text-blue-400 tracking-wide mb-3">
                  08. CONNECT &amp; COLLABORATE
                </p>
                <h2
                  id="contact-heading"
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
                  style={{ textWrap: 'balance' }}
                >
                  Open to Internships, Research, and Creative Collaborations.
                </h2>
                <p className="mt-5 text-base sm:text-lg text-zinc-300 leading-relaxed">
                  Whether you are a recruiter looking for an analytical intern, a university
                  organization building a new digital initiative, or a collaborator exploring AI and
                  economics projects, I would be glad to connect through my verified channels below.
                </p>

                {/* Verified Action Channels */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={config.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-5 py-3 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0"
                  >
                    <Github className="w-4 h-4" />
                    <span>Connect on GitHub (@{config.githubUsername})</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  {config.verifiedEmail && (
                    <a
                      href={`mailto:${config.verifiedEmail}`}
                      className="inline-flex items-center gap-2.5 px-5 py-3 text-sm font-medium text-zinc-100 bg-zinc-900 border border-zinc-700 rounded-xl hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0"
                    >
                      <Mail className="w-4 h-4 text-blue-400" />
                      <span>Email {config.verifiedEmail}</span>
                    </a>
                  )}

                  {config.linkedinUrl && (
                    <a
                      href={config.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-5 py-3 text-sm font-medium text-zinc-100 bg-zinc-900 border border-zinc-700 rounded-xl hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0"
                    >
                      <Linkedin className="w-4 h-4 text-blue-400" />
                      <span>LinkedIn Profile</span>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => openConfigStudio('contact')}
                    className="inline-flex items-center gap-2 px-4 py-3 text-xs font-medium text-zinc-400 bg-zinc-900/60 border border-zinc-800 rounded-xl hover:text-zinc-200 hover:border-zinc-700 transition-colors whitespace-nowrap shrink-0"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>
                      {config.verifiedEmail || config.linkedinUrl
                        ? 'Update Contact Channels'
                        : 'Configure Email / LinkedIn Placeholder'}
                    </span>
                  </button>
                </div>

                {!config.verifiedEmail && !config.linkedinUrl && (
                  <p className="mt-4 text-xs font-mono text-zinc-500">
                    Note: Email and LinkedIn buttons are configured to remain hidden until verified
                    contact URLs are provided in portfolio settings or{' '}
                    <code className="text-zinc-400">src/data/portfolioData.ts</code>.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Tasteful Minimal Footer */}
      <footer className="border-t border-zinc-900 py-10 bg-[#050507] no-print">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-zinc-200">{config.name}</span>
            <span aria-hidden="true">·</span>
            <span>B.A. Economics, Aligarh Muslim University</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">© {currentYear}</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#home"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Back to Top
            </a>
            <a
              href="#resume"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Print Resume
            </a>
            <a
              href={config.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-blue-400 transition-colors whitespace-nowrap shrink-0"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Project Detail Lightbox / Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Portfolio Owner Studio Modal (for editable placeholders & adding genuine projects) */}
      <OwnerConfigModal
        isOpen={configModalOpen}
        initialTab={configModalTab}
        config={config}
        credentials={credentials}
        onClose={() => setConfigModalOpen(false)}
        onUpdateConfig={handleUpdateConfig}
        onAddProject={handleAddProject}
        onUpdateCredential={handleUpdateCredential}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
