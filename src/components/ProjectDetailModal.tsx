import React, { useEffect, useState } from 'react';
import {
  X,
  ExternalLink,
  Layers,
  CheckCircle2,
  Sliders,
  Github,
  Code2,
  Sparkles,
  Image as ImageIcon,
} from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

const ARTHNITI_MODULE_EXPLORER = {
  gdp: {
    moduleName: 'GdpGrowthPage · gdpDataService.ts',
    dataOrigin: 'official_mospi_csv | user_uploaded_csv',
    summary:
      'Explores India Real GDP growth trajectories and Gross Value Added (GVA) across Agriculture, Industry, and Services using official MoSPI time-series data.',
    metrics: [
      { label: 'Data Pipeline', value: 'MoSPI Official CSV' },
      { label: 'Custom Upload', value: 'Supported (.csv)' },
      { label: 'Sector Breakdown', value: 'GVA Composition' },
      { label: 'Visualization', value: 'Recharts Time-Series' },
    ],
  },
  cpi: {
    moduleName: 'InflationPage · cpiDataService.ts',
    dataOrigin: 'official_mospi_csv | user_uploaded_csv',
    summary:
      'Tracks Consumer Price Index (CPI) headline and component inflation trends relative to the Reserve Bank of India tolerance band.',
    metrics: [
      { label: 'Data Pipeline', value: 'MoSPI CPI Series' },
      { label: 'Custom Upload', value: 'Supported (.csv)' },
      { label: 'Policy Reference', value: 'RBI 4% (±2%) Band' },
      { label: 'Error Recovery', value: 'Fallback Verified' },
    ],
  },
  repo: {
    moduleName: 'Overview & Comparisons · repoDataService.ts',
    dataOrigin: 'official_rbi_csv | user_uploaded_csv',
    summary:
      'Monitors Reserve Bank of India (RBI) Monetary Policy Committee repo rate decisions alongside labour market, currency/crude oil, and financial market views.',
    metrics: [
      { label: 'Data Pipeline', value: 'Official RBI CSV' },
      { label: 'Workspace Pages', value: '9 Analytical Views' },
      { label: 'Theme Support', value: 'Dark & Light Modes' },
      { label: 'Deployment', value: 'Live on Vercel' },
    ],
  },
};

const ECON_PREVIEW_SERIES = {
  gdp: {
    label: 'Real GDP Growth Index (Illustrative Concept Series)',
    unit: 'Annual % Change',
    points: [
      { period: 'Q1', value: 6.2, benchmark: 5.8 },
      { period: 'Q2', value: 6.7, benchmark: 6.0 },
      { period: 'Q3', value: 6.5, benchmark: 6.1 },
      { period: 'Q4', value: 7.1, benchmark: 6.3 },
    ],
  },
  cpi: {
    label: 'Consumer Price Index Stability (Illustrative Concept Series)',
    unit: 'YoY % Variance',
    points: [
      { period: 'Q1', value: 5.1, benchmark: 4.5 },
      { period: 'Q2', value: 4.8, benchmark: 4.5 },
      { period: 'Q3', value: 4.4, benchmark: 4.3 },
      { period: 'Q4', value: 4.2, benchmark: 4.0 },
    ],
  },
};

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [arthModule, setArthModule] = useState<'gdp' | 'cpi' | 'repo'>('gdp');
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState<number>(0);
  const [selectedMetric, setSelectedMetric] = useState<'gdp' | 'cpi'>('gdp');
  const [promptStage, setPromptStage] = useState<'prompt' | 'synthesis' | 'post'>('prompt');

  useEffect(() => {
    setActiveScreenshotIdx(0);
    setArthModule('gdp');
  }, [project?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  const screenshots = project.screenshots && project.screenshots.length > 0
    ? project.screenshots
    : [
        {
          title: `${project.title} Preview`,
          caption: project.shortDescription,
          svgDataUri: project.coverSvgDataUri,
        },
      ];

  const currentScreenshot = screenshots[activeScreenshotIdx] || screenshots[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md no-print"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0B0D14] border border-zinc-800 p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-zinc-800/80">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 mb-2">
              <span
                className={
                  project.status === 'Live Project'
                    ? 'text-emerald-400 font-semibold'
                    : 'text-blue-400 font-medium'
                }
              >
                {project.status}
              </span>
              <span aria-hidden="true">·</span>
              <span>{project.category}</span>
              {project.liveDemoUrl && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-zinc-300">arthniti-six.vercel.app</span>
                </>
              )}
            </div>
            <h3
              id="modal-project-title"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-white"
            >
              {project.title}
            </h3>
          </div>

          <div className="flex items-center gap-2.5 self-start">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0"
              >
                <span>View Live Project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-zinc-200 bg-zinc-900 border border-zinc-700 rounded-lg hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repo</span>
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/70 transition-colors shrink-0"
              aria-label="Close project details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Visual Banner & Screenshot Gallery Switcher */}
        <div className="mt-6 space-y-3">
          {screenshots.length > 1 && (
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>DASHBOARD &amp; ARCHITECTURE PREVIEWS</span>
              </span>
              <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                {screenshots.map((shot, idx) => (
                  <button
                    key={shot.title}
                    type="button"
                    onClick={() => setActiveScreenshotIdx(idx)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      activeScreenshotIdx === idx
                        ? 'bg-blue-600 text-white'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Preview 0{idx + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="relative rounded-xl overflow-hidden border border-zinc-800/80 bg-[#060B16] aspect-video">
            <img
              src={currentScreenshot.svgDataUri}
              alt={currentScreenshot.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end justify-between gap-4 p-5">
              <div>
                <p className="text-xs font-semibold text-white">{currentScreenshot.title}</p>
                <p className="text-xs text-zinc-300 mt-0.5">{currentScreenshot.caption}</p>
              </div>
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-blue-300 bg-blue-950/70 border border-blue-500/40 rounded-lg hover:bg-blue-900/80 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Open Live Terminal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Narrative */}
        <div className="mt-6 space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-zinc-200 mb-2">
              Project Purpose &amp; Overview
            </h4>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {project.detailedOverview}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <h4 className="text-sm font-semibold text-zinc-200 mb-1.5">
              Objective &amp; Problem Statement
            </h4>
            <p className="text-sm text-zinc-400 leading-relaxed">{project.problemStatement}</p>
          </div>

          {/* Verified Key Features Grid (for projects like ArthNiti) */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>Verified Key Features</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.keyFeatures.map((feat) => (
                  <div
                    key={feat.title}
                    className="p-4 rounded-xl bg-[#080A11] border border-zinc-800/80"
                  >
                    <h5 className="text-sm font-semibold text-white">{feat.title}</h5>
                    <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ArthNiti Interactive Module Architecture Inspector */}
          {project.visualType === 'arthniti' && (
            <div className="p-5 rounded-xl bg-[#080A11] border border-zinc-800/90 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>ARTHNITI VERIFIED MODULE INSPECTOR</span>
                </div>
                <div className="flex flex-wrap items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                  {(
                    [
                      { id: 'gdp', label: 'GDP Growth (MoSPI)' },
                      { id: 'cpi', label: 'CPI Inflation' },
                      { id: 'repo', label: 'RBI Repo & Markets' },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setArthModule(tab.id)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                        arthModule === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/70">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-zinc-400 mb-1.5">
                  <span className="text-zinc-200 font-semibold">
                    {ARTHNITI_MODULE_EXPLORER[arthModule].moduleName}
                  </span>
                  <span className="text-blue-400">
                    Origin: {ARTHNITI_MODULE_EXPLORER[arthModule].dataOrigin}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {ARTHNITI_MODULE_EXPLORER[arthModule].summary}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ARTHNITI_MODULE_EXPLORER[arthModule].metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-3 rounded-lg bg-zinc-900/70 border border-zinc-800/70"
                  >
                    <span className="block text-[11px] font-mono text-zinc-500">{m.label}</span>
                    <span className="block text-xs font-mono font-semibold text-zinc-100 mt-1">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Concept Preview for Economics Concept Card */}
          {project.visualType === 'econ-dashboard' && (
            <div className="p-5 rounded-xl bg-[#080A11] border border-zinc-800/90 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>INTERACTIVE CONCEPT PREVIEW · INDICATOR COMPARISON</span>
                </div>
                <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setSelectedMetric('gdp')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      selectedMetric === 'gdp'
                        ? 'bg-blue-600 text-white'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    GDP Trajectory
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMetric('cpi')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      selectedMetric === 'cpi'
                        ? 'bg-blue-600 text-white'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    CPI Variance
                  </button>
                </div>
              </div>
              <p className="text-xs text-zinc-400">
                {ECON_PREVIEW_SERIES[selectedMetric].label} (
                {ECON_PREVIEW_SERIES[selectedMetric].unit})
              </p>
              <div className="grid grid-cols-4 gap-3 pt-1">
                {ECON_PREVIEW_SERIES[selectedMetric].points.map((pt) => (
                  <div
                    key={pt.period}
                    className="p-3 rounded-lg bg-zinc-900/70 border border-zinc-800/70 flex flex-col justify-between"
                  >
                    <span className="text-xs font-mono text-zinc-500">{pt.period}</span>
                    <span className="text-lg font-mono font-semibold text-zinc-100 tabular-nums mt-1">
                      {pt.value.toFixed(1)}%
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 tabular-nums mt-1">
                      Baseline: {pt.benchmark.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.visualType === 'ai-creative' && (
            <div className="p-5 rounded-xl bg-[#080A11] border border-zinc-800/90 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono text-violet-400">
                  WORKFLOW PIPELINE EXPLORER
                </span>
                <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                  {(
                    [
                      { id: 'prompt', label: '1. Prompt Design' },
                      { id: 'synthesis', label: '2. AI Synthesis' },
                      { id: 'post', label: '3. Visual Editing' },
                    ] as const
                  ).map((step) => (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => setPromptStage(step.id)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                        promptStage === step.id
                          ? 'bg-violet-600 text-white'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {step.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                {promptStage === 'prompt' &&
                  'Stage 1 (Google Gemini & Vertex AI): Formulate structured system instructions defining camera framing, tonal contrast, and thematic constraints before generating concept assets.'}
                {promptStage === 'synthesis' &&
                  'Stage 2 (Google Flow & Multimodal Iteration): Generate visual variations and motion sequences while maintaining consistent lighting and stylistic coherence.'}
                {promptStage === 'post' &&
                  'Stage 3 (Canva, CapCut Pro & InShot): Assemble generated sequences on a multi-track timeline, adding typographic hierarchy, pacing cuts, and color grading.'}
              </div>
            </div>
          )}

          {/* Development Process (when available) */}
          {project.developmentProcess && project.developmentProcess.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-violet-400" />
                <span>Development Process &amp; Implementation</span>
              </h4>
              <ul className="space-y-2.5">
                {project.developmentProcess.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <span className="font-mono text-xs text-blue-400 mt-0.5 shrink-0">
                      0{idx + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Architecture & Key Elements */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Architecture &amp; Technical Highlights</span>
            </h4>
            <ul className="space-y-2.5">
              {project.proposedArchitecture.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology & Domain Metadata (Unboxed per Zero-Pill Discipline) */}
          <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-zinc-400">
              <span className="text-zinc-500 mr-2">Verified Technologies:</span>
              {project.technologies.map((tech, idx) => (
                <React.Fragment key={tech}>
                  <span className="text-zinc-200 font-medium">{tech}</span>
                  {idx < project.technologies.length - 1 && (
                    <span className="mx-2 text-zinc-600" aria-hidden="true">
                      ·
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {project.repositoryUrl && (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-zinc-200 bg-zinc-900 border border-zinc-700 rounded-lg hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Source Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>View Live Project</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-lg hover:text-white hover:border-zinc-700 transition-colors whitespace-nowrap shrink-0"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
