import React from 'react';
import { Printer, FileDown, Github, Mail, Linkedin, ExternalLink } from 'lucide-react';
import {
  PortfolioConfig,
  SkillCategory,
  CredentialItem,
  EducationEntry,
  ProjectItem,
} from '../data/portfolioData';

interface ResumeSectionProps {
  config: PortfolioConfig;
  skills: SkillCategory[];
  credentials: CredentialItem[];
  education: EducationEntry[];
  projects: ProjectItem[];
  onOpenConfigModal: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({
  config,
  skills,
  credentials,
  education,
  projects,
  onOpenConfigModal,
}) => {
  const handlePrintResume = () => {
    window.print();
  };

  const certificationsOnly = credentials.filter(
    (c) => c.credentialType === 'Certification / Badge'
  );
  const coursesOnly = credentials.filter(
    (c) => c.credentialType === 'Course / Learning Module'
  );

  return (
    <section
      id="resume"
      className="py-24 border-t border-zinc-900/90 relative"
      aria-labelledby="resume-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header (Hidden when printing) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 no-print">
          <div>
            <p className="text-xs font-mono text-blue-400 tracking-wide mb-3">
              07. CURRICULUM VITAE &amp; PROFILE
            </p>
            <h2
              id="resume-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              Resume &amp; Professional Profile
            </h2>
            <p className="mt-3 text-base text-zinc-400 max-w-2xl leading-relaxed">
              Structured for recruiters, internship coordinators, and academic collaborators.
              Formatted for direct print-to-PDF export with verified academic and credential records.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenConfigModal}
              className="px-3.5 py-2 text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-lg hover:text-white hover:border-zinc-700 transition-colors whitespace-nowrap shrink-0"
            >
              Configure Contact / PDF Links
            </button>

            {config.verifiedResumePdfUrl ? (
              <a
                href={config.verifiedResumePdfUrl}
                download="Ahmed_Ali_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Resume PDF</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={handlePrintResume}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save Resume as PDF</span>
              </button>
            )}
          </div>
        </div>

        {/* Print-Friendly Executive Document Container */}
        <div className="print-only-resume rounded-2xl bg-[#0B0D14] border border-zinc-800/85 p-8 sm:p-12">
          {/* Resume Document Header */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-8 border-b border-zinc-800/80">
            <div>
              <h3 className="text-3xl font-bold tracking-tight text-white">
                {config.name}
              </h3>
              <p className="text-sm sm:text-base text-blue-400 font-medium mt-1.5">
                {config.identities.join(' · ')}
              </p>
              <p className="text-xs font-mono text-zinc-400 mt-2">
                {config.degree} · {config.university} · Expected Graduation {config.expectedGraduation}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300 font-mono">
              <a
                href={config.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-blue-400 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>github.com/{config.githubUsername}</span>
              </a>

              {config.verifiedEmail && (
                <>
                  <span aria-hidden="true" className="text-zinc-600">
                    ·
                  </span>
                  <a
                    href={`mailto:${config.verifiedEmail}`}
                    className="inline-flex items-center gap-1.5 hover:text-blue-400 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{config.verifiedEmail}</span>
                  </a>
                </>
              )}

              {config.linkedinUrl && (
                <>
                  <span aria-hidden="true" className="text-zinc-600">
                    ·
                  </span>
                  <a
                    href={config.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-blue-400 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* 1. Professional Summary */}
          <div className="py-7 border-b border-zinc-800/80">
            <h4 className="text-xs font-mono text-zinc-400 tracking-wider mb-3">
              PROFESSIONAL SUMMARY
            </h4>
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed max-w-4xl">
              {config.aboutBiography}
            </p>
          </div>

          {/* 2. Education & Professional Development */}
          <div className="py-7 border-b border-zinc-800/80 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3">
              <h4 className="text-xs font-mono text-zinc-400 tracking-wider">
                EDUCATION &amp; DEVELOPMENT
              </h4>
            </div>
            <div className="lg:col-span-9 space-y-6">
              {education.map((entry) => (
                <div key={entry.id}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h5 className="text-base font-semibold text-white">
                      {entry.institution}
                    </h5>
                    <span className="text-xs font-mono text-blue-400 tabular-nums">
                      {entry.period}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-300 font-medium mt-0.5">
                    {entry.program}
                  </p>
                  <p className="text-sm text-zinc-400 mt-1.5 leading-relaxed">
                    {entry.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 mt-2">
                    <span className="text-zinc-500">Focus:</span>
                    {entry.focusPoints.map((fp, i) => (
                      <React.Fragment key={fp}>
                        <span>{fp}</span>
                        {i < entry.focusPoints.length - 1 && (
                          <span aria-hidden="true">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Technical & Creative Skills */}
          <div className="py-7 border-b border-zinc-800/80 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3">
              <h4 className="text-xs font-mono text-zinc-400 tracking-wider">
                SKILLS &amp; CAPABILITIES
              </h4>
            </div>
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skills.map((cat) => (
                <div key={cat.id}>
                  <h5 className="text-sm font-semibold text-white mb-2">
                    {cat.title}
                  </h5>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {cat.skills.map((s) => s.name).join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Certifications & Coursework */}
          <div className="py-7 border-b border-zinc-800/80 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3">
              <h4 className="text-xs font-mono text-zinc-400 tracking-wider">
                CERTIFICATIONS &amp; LEARNING
              </h4>
            </div>
            <div className="lg:col-span-9 space-y-5">
              <div>
                <h5 className="text-sm font-semibold text-white mb-2">
                  Completed Certifications &amp; Recognition Badges
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {certificationsOnly.map((cert) => (
                    <div key={cert.id} className="text-xs text-zinc-300">
                      <span className="font-semibold text-white">{cert.title}</span>
                      <span className="mx-1.5 text-zinc-500" aria-hidden="true">
                        ·
                      </span>
                      <span className="text-zinc-400">{cert.issuer}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-sm font-semibold text-white mb-2">
                  Specialized AI &amp; Cloud Learning Modules
                </h5>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {coursesOnly.map((c) => `${c.title} (${c.issuer})`).join(' · ')}
                </p>
              </div>
            </div>
          </div>

          {/* 5. Selected Projects & Concepts */}
          <div className="pt-7 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3">
              <h4 className="text-xs font-mono text-zinc-400 tracking-wider">
                PROJECTS &amp; CONCEPTS
              </h4>
            </div>
            <div className="lg:col-span-9 space-y-5">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h5 className="text-sm font-semibold text-white">
                        {proj.title}
                      </h5>
                      {proj.liveDemoUrl && (
                        <a
                          href={proj.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-mono text-blue-400 hover:text-blue-300"
                        >
                          <span>({proj.liveDemoUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')})</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <span className="text-xs font-mono text-blue-400">
                      {proj.status} · {proj.category}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
                    {proj.shortDescription}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    Technologies: {proj.technologies.join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
