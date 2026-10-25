import React, { useRef, useState } from 'react';
import { ArrowUpRight, ExternalLink, Github, Compass } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectCardProps {
  project: ProjectItem;
  isFeaturedWide: boolean;
  onExplore: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isFeaturedWide,
  onExplore,
}) => {
  const cardRef = useRef<HTMLElement | null>(null);
  const [tiltTransform, setTiltTransform] = useState<string>(
    'perspective(1200px) rotateX(0deg) rotateY(0deg)'
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (e.pointerType === 'touch') return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const maxTilt = isFeaturedWide ? 2.2 : 3.2;
    const rotateY = (x * maxTilt).toFixed(2);
    const rotateX = (-y * maxTilt).toFixed(2);

    setTiltTransform(`perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handlePointerLeave = () => {
    setTiltTransform('perspective(1200px) rotateX(0deg) rotateY(0deg)');
  };

  const isLive = project.status === 'Live Project';

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={() => onExplore(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onExplore(project);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Explore project details for ${project.title}`}
      style={{
        transform: tiltTransform,
        transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1), border-color 180ms ease, box-shadow 180ms ease',
      }}
      className={`group cursor-pointer rounded-2xl bg-[#0B0D14]/90 backdrop-blur-md border ${
        isLive
          ? 'border-blue-500/40 hover:border-blue-400/80 hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.35)]'
          : 'border-zinc-800/85 hover:border-blue-500/60 hover:shadow-[0_0_30px_-12px_rgba(59,130,246,0.22)]'
      } overflow-hidden flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
        isFeaturedWide ? 'lg:col-span-12 lg:grid lg:grid-cols-12' : 'lg:col-span-6'
      }`}
    >
      {/* Visual Dashboard / Artwork Preview Container */}
      <div
        className={`relative overflow-hidden bg-[#060B16] ${
          isFeaturedWide
            ? 'lg:col-span-7 aspect-video lg:aspect-auto lg:h-full lg:border-r border-zinc-800/80'
            : 'aspect-video border-b border-zinc-800/80'
        }`}
      >
        <img
          src={project.coverSvgDataUri}
          alt={`${project.title} — ${project.category} dashboard preview`}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between gap-4 p-5">
          <span className="text-xs font-mono text-zinc-300">
            {isLive
              ? 'Live Production Deployment · Interactive Economic Terminal'
              : 'Click to launch Interactive Concept Overview'}
          </span>
          {project.liveDemoUrl && (
            <span className="hidden sm:inline-block text-xs font-mono text-blue-300">
              arthniti-six.vercel.app
            </span>
          )}
        </div>
      </div>

      {/* Text Content & Interactive Buttons */}
      <div
        className={`p-6 sm:p-8 flex flex-col justify-between ${
          isFeaturedWide ? 'lg:col-span-5' : 'flex-1'
        }`}
      >
        <div>
          {/* Clean Unboxed Status & Category Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 mb-2.5">
            <span
              className={
                isLive ? 'text-emerald-400 font-semibold' : 'text-blue-400 font-medium'
              }
            >
              {project.status}
            </span>
            <span aria-hidden="true">·</span>
            <span>{project.category}</span>
          </div>

          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-blue-400 transition-colors shrink-0 mt-1" />
          </div>

          <p className="text-sm text-zinc-300 mt-3 leading-relaxed">
            {project.shortDescription}
          </p>

          {isFeaturedWide && (
            <p className="text-xs sm:text-sm text-zinc-400 mt-3 leading-relaxed">
              {project.detailedOverview}
            </p>
          )}
        </div>

        <div className="pt-6 mt-6 border-t border-zinc-800/70 space-y-5">
          {/* Unboxed Technology & Analytics Metadata */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-400">
            {project.technologies.map((tech, idx) => (
              <React.Fragment key={tech}>
                <span className="text-zinc-300 font-medium">{tech}</span>
                {idx < project.technologies.length - 1 && (
                  <span aria-hidden="true" className="text-zinc-600">
                    ·
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Interactive Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0"
                aria-label={`View live project ${project.title} in a new tab`}
              >
                <span>View Live Project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onExplore(project);
              }}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-xl transition-colors whitespace-nowrap shrink-0 ${
                project.liveDemoUrl
                  ? 'text-zinc-100 bg-zinc-900 border border-zinc-700/80 hover:bg-zinc-800 hover:border-zinc-600'
                  : 'text-white bg-zinc-900 border border-zinc-700/90 hover:bg-zinc-800 hover:border-blue-500/50'
              }`}
              aria-label={`Explore project details for ${project.title}`}
            >
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              <span>Explore Project</span>
            </button>

            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium text-zinc-400 hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0"
                aria-label={`View source repository for ${project.title} on GitHub`}
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
