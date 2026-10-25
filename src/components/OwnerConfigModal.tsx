import React, { useState, useEffect } from 'react';
import { X, Plus, Settings, Award, RotateCcw } from 'lucide-react';
import { PortfolioConfig, ProjectItem, CredentialItem } from '../data/portfolioData';

interface OwnerConfigModalProps {
  isOpen: boolean;
  initialTab: 'contact' | 'add-project' | 'credentials';
  config: PortfolioConfig;
  credentials: CredentialItem[];
  onClose: () => void;
  onUpdateConfig: (updated: PortfolioConfig) => void;
  onAddProject: (newProject: ProjectItem) => void;
  onUpdateCredential: (id: string, completionDate: string, verificationUrl: string) => void;
  onResetDefaults: () => void;
}

const CUSTOM_PROJECT_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none">
  <rect width="800" height="600" fill="#070912"/>
  <circle cx="400" cy="300" r="190" stroke="#3B82F6" stroke-opacity="0.35" stroke-width="1.5"/>
  <circle cx="400" cy="300" r="110" stroke="#8B5CF6" stroke-opacity="0.45" stroke-width="1.5" stroke-dasharray="6 6"/>
  <line x1="120" y1="300" x2="680" y2="300" stroke="#1E293B" stroke-width="1"/>
  <line x1="400" y1="80" x2="400" y2="520" stroke="#1E293B" stroke-width="1"/>
  <text x="56" y="548" fill="#94A3B8" font-family="monospace" font-size="13" letter-spacing="1.8">PORTFOLIO PROJECT · VERIFIED ENTRY</text>
</svg>
`)}`;

export const OwnerConfigModal: React.FC<OwnerConfigModalProps> = ({
  isOpen,
  initialTab,
  config,
  credentials,
  onClose,
  onUpdateConfig,
  onAddProject,
  onUpdateCredential,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'contact' | 'add-project' | 'credentials'>(initialTab);

  // Contact & Profile form state
  const [emailInput, setEmailInput] = useState(config.verifiedEmail);
  const [linkedinInput, setLinkedinInput] = useState(config.linkedinUrl);
  const [resumePdfInput, setResumePdfInput] = useState(config.verifiedResumePdfUrl);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // New Project form state
  const [projTitle, setProjTitle] = useState('');
  const [projStatus, setProjStatus] = useState<'Live Project' | 'Concept Project' | 'In Development'>('Live Project');
  const [projCategory, setProjCategory] = useState<
    'Economics & Data Analytics' | 'Web & 3D Concept' | 'AI & Creative Workflows'
  >('Economics & Data Analytics');
  const [projShortDesc, setProjShortDesc] = useState('');
  const [projOverview, setProjOverview] = useState('');
  const [projTech, setProjTech] = useState('Google Gemini, Data Analysis, Web Design');
  const [projRepoUrl, setProjRepoUrl] = useState('');
  const [projLiveUrl, setProjLiveUrl] = useState('');

  // Credentials editor state
  const [selectedCredId, setSelectedCredId] = useState<string>(credentials[0]?.id || '');
  const [credDate, setCredDate] = useState<string>('');
  const [credUrl, setCredUrl] = useState<string>('');

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  useEffect(() => {
    setEmailInput(config.verifiedEmail);
    setLinkedinInput(config.linkedinUrl);
    setResumePdfInput(config.verifiedResumePdfUrl);
  }, [config]);

  useEffect(() => {
    const found = credentials.find((c) => c.id === selectedCredId);
    if (found) {
      setCredDate(found.completionDate);
      setCredUrl(found.verificationUrl);
    }
  }, [selectedCredId, credentials]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig({
      ...config,
      verifiedEmail: emailInput.trim(),
      linkedinUrl: linkedinInput.trim(),
      verifiedResumePdfUrl: resumePdfInput.trim(),
    });
    setSavedNotice('Contact & profile configuration updated.');
    setTimeout(() => setSavedNotice(null), 3000);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim() || !projShortDesc.trim()) return;

    const newProj: ProjectItem = {
      id: `custom-${Date.now()}`,
      title: projTitle.trim(),
      status: projStatus,
      category: projCategory,
      shortDescription: projShortDesc.trim(),
      detailedOverview: projOverview.trim() || projShortDesc.trim(),
      problemStatement:
        'Added via Portfolio Studio to document ongoing work in economics, AI, and creative technology.',
      proposedArchitecture: [
        'Structured design and analytical workflow',
        'Iterative validation and documentation',
      ],
      technologies: projTech
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      coverSvgDataUri: CUSTOM_PROJECT_SVG,
      visualType: 'custom',
      repositoryUrl: projRepoUrl.trim() || undefined,
      liveDemoUrl: projLiveUrl.trim() || undefined,
    };

    onAddProject(newProj);
    setProjTitle('');
    setProjShortDesc('');
    setProjOverview('');
    setProjRepoUrl('');
    setProjLiveUrl('');
    setSavedNotice('Project added to portfolio showcase.');
    setTimeout(() => setSavedNotice(null), 3000);
  };

  const handleSaveCredential = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCredId) return;
    onUpdateCredential(selectedCredId, credDate.trim(), credUrl.trim());
    setSavedNotice('Credential verification details updated.');
    setTimeout(() => setSavedNotice(null), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md no-print"
      role="dialog"
      aria-modal="true"
      aria-labelledby="owner-config-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0B0D14] border border-zinc-800 p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-zinc-800/80">
          <div>
            <p className="text-xs font-mono text-blue-400 mb-1">
              PORTFOLIO CONFIGURATION &amp; CONTENT STUDIO
            </p>
            <h3 id="owner-config-title" className="text-xl sm:text-2xl font-bold text-white">
              Manage Placeholders &amp; Projects
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/70 transition-colors"
            aria-label="Close configuration window"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="flex flex-wrap items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800 mt-5">
          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'contact' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Contact &amp; Resume Links</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('add-project')}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'add-project'
                ? 'bg-blue-600 text-white'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Genuine Project</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('credentials')}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'credentials'
                ? 'bg-blue-600 text-white'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Credential Placeholders</span>
          </button>
        </div>

        {savedNotice && (
          <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-xs text-blue-300">
            {savedNotice}
          </div>
        )}

        {/* Tab 1: Contact & Resume Placeholders */}
        {activeTab === 'contact' && (
          <form onSubmit={handleSaveContact} className="mt-6 space-y-4">
            <p className="text-xs text-zinc-400 leading-relaxed">
              Per portfolio integrity guidelines, email and LinkedIn buttons remain hidden until you
              supply your verified address or profile URL here (or in{' '}
              <code className="font-mono text-zinc-200">src/data/portfolioData.ts</code>).
            </p>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Verified Email Address (leave blank to hide email button)
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="e.g., ahmed.ali@example.com"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                LinkedIn Profile URL (leave blank to hide LinkedIn button)
              </label>
              <input
                type="url"
                value={linkedinInput}
                onChange={(e) => setLinkedinInput(e.target.value)}
                placeholder="https://www.linkedin.com/in/..."
                className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Verified Resume PDF Path/URL (leave blank to use Print-to-PDF Resume)
              </label>
              <input
                type="text"
                value={resumePdfInput}
                onChange={(e) => setResumePdfInput(e.target.value)}
                placeholder="Leave blank to use interactive Print-to-PDF export"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="pt-4 flex items-center justify-between gap-3 border-t border-zinc-800/80">
              <button
                type="button"
                onClick={onResetDefaults}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default Config</span>
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0"
              >
                Save Contact Settings
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Add Genuine Project */}
        {activeTab === 'add-project' && (
          <form onSubmit={handleCreateProject} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={projTitle}
                  onChange={(e) => setProjTitle(e.target.value)}
                  placeholder="e.g., Macroeconomic Time-Series Notebook"
                  className="w-full px-3.5 py-2 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Project Status
                </label>
                <select
                  value={projStatus}
                  onChange={(e) =>
                    setProjStatus(
                      e.target.value as 'Live Project' | 'Concept Project' | 'In Development'
                    )
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Live Project">Live Project</option>
                  <option value="In Development">In Development</option>
                  <option value="Concept Project">Concept Project</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Category
                </label>
                <select
                  value={projCategory}
                  onChange={(e) =>
                    setProjCategory(
                      e.target.value as
                        | 'Economics & Data Analytics'
                        | 'Web & 3D Concept'
                        | 'AI & Creative Workflows'
                    )
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Economics & Data Analytics">Economics &amp; Data Analytics</option>
                  <option value="AI & Creative Workflows">AI &amp; Creative Workflows</option>
                  <option value="Web & 3D Concept">Web &amp; 3D Concept</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Tools &amp; Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={projTech}
                  onChange={(e) => setProjTech(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Concise Summary *
              </label>
              <input
                type="text"
                required
                value={projShortDesc}
                onChange={(e) => setProjShortDesc(e.target.value)}
                placeholder="1–2 sentence summary of the project"
                className="w-full px-3.5 py-2 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Detailed Overview (Optional)
              </label>
              <textarea
                rows={2}
                value={projOverview}
                onChange={(e) => setProjOverview(e.target.value)}
                placeholder="Describe the objective, methodology, and findings..."
                className="w-full px-3.5 py-2 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  GitHub Repository URL (Optional)
                </label>
                <input
                  type="url"
                  value={projRepoUrl}
                  onChange={(e) => setProjRepoUrl(e.target.value)}
                  placeholder="https://github.com/godsniper953-byte/..."
                  className="w-full px-3.5 py-2 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Live Demo URL (Optional)
                </label>
                <input
                  type="url"
                  value={projLiveUrl}
                  onChange={(e) => setProjLiveUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0"
              >
                Add Project to Showcase
              </button>
            </div>
          </form>
        )}

        {/* Tab 3: Credential Verification Placeholders */}
        {activeTab === 'credentials' && (
          <form onSubmit={handleSaveCredential} className="mt-6 space-y-4">
            <p className="text-xs text-zinc-400 leading-relaxed">
              Where exact completion dates or verification URLs were not initially supplied,
              editable placeholders are used rather than fabricating dates or links. Select any
              credential below to update its date or verification link.
            </p>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Select Credential or Learning Module
              </label>
              <select
                value={selectedCredId}
                onChange={(e) => setSelectedCredId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-blue-500"
              >
                {credentials.map((cred) => (
                  <option key={cred.id} value={cred.id}>
                    {cred.title} ({cred.credentialType})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Completion Date / Status Label
              </label>
              <input
                type="text"
                value={credDate}
                onChange={(e) => setCredDate(e.target.value)}
                placeholder="e.g., Completed October 2026"
                className="w-full px-3.5 py-2 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Public Credential Verification URL (Optional)
              </label>
              <input
                type="url"
                value={credUrl}
                onChange={(e) => setCredUrl(e.target.value)}
                placeholder="https://www.cloudskillsboost.google/public_profiles/..."
                className="w-full px-3.5 py-2 text-sm rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0"
              >
                Update Credential Details
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
