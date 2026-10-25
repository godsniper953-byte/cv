import React, { useEffect, useState, useCallback } from 'react';
import { Github, ExternalLink, Star, GitFork, RefreshCw, AlertCircle, FolderGit2 } from 'lucide-react';

interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
}

interface GitHubSectionProps {
  username: string;
  profileUrl: string;
}

export const GitHubSection: React.FC<GitHubSectionProps> = ({ username, profileUrl }) => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [languageFilter, setLanguageFilter] = useState<string>('all');

  const fetchGitHubData = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setErrorMessage(null);

    const cacheKey = `github_portfolio_cache_${username}`;
    if (!forceRefresh) {
      try {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < 5 * 60 * 1000) {
            setUser(parsed.user);
            setRepos(parsed.repos);
            setLoading(false);
            return;
          }
        }
      } catch {
        // Ignore sessionStorage errors
      }
    }

    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
          headers: { Accept: 'application/vnd.github.v3+json' },
        }),
        fetch(
          `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=12`,
          {
            headers: { Accept: 'application/vnd.github.v3+json' },
          }
        ),
      ]);

      if (userRes.status === 403 || reposRes.status === 403) {
        throw new Error(
          'GitHub public API rate limit reached for this network. You can still view my complete profile and repositories directly on GitHub.'
        );
      }

      if (!userRes.ok) {
        throw new Error('Unable to reach the GitHub public profile endpoint at this moment.');
      }

      const userData: GitHubUser = await userRes.json();
      const reposData: GitHubRepo[] = reposRes.ok ? await reposRes.json() : [];

      setUser(userData);
      setRepos(Array.isArray(reposData) ? reposData : []);

      try {
        sessionStorage.setItem(
          cacheKey,
          JSON.stringify({
            timestamp: Date.now(),
            user: userData,
            repos: Array.isArray(reposData) ? reposData : [],
          })
        );
      } catch {
        // Ignore storage quota errors
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Unable to load live GitHub data right now. Explore the profile directly via the link below.'
      );
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchGitHubData(false);
  }, [fetchGitHubData]);

  const availableLanguages = Array.from(
    new Set(repos.map((r) => r.language).filter((lang): lang is string => Boolean(lang)))
  );

  const filteredRepos =
    languageFilter === 'all'
      ? repos
      : repos.filter((repo) => repo.language === languageFilter);

  const formatUpdatedDate = (isoDate: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date(isoDate));
    } catch {
      return '';
    }
  };

  return (
    <section
      id="github"
      className="py-24 border-t border-zinc-900/90 relative no-print"
      aria-labelledby="github-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-mono text-blue-400 tracking-wide mb-3">
              06. OPEN SOURCE &amp; REPOSITORIES
            </p>
            <h2
              id="github-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              Live GitHub Developer Profile
            </h2>
            <p className="mt-3 text-base text-zinc-400 max-w-2xl leading-relaxed">
              Connected directly to the official GitHub REST API for{' '}
              <span className="font-mono text-zinc-200">@{username}</span>. Displays verified public
              profile metadata and repositories without fabricated metrics.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => fetchGitHubData(true)}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-lg hover:text-white hover:border-zinc-700 transition-colors disabled:opacity-50 whitespace-nowrap shrink-0"
              aria-label="Refresh live GitHub data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Sync API</span>
            </button>

            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Explore All on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Profile Overview Banner */}
        <div className="rounded-2xl bg-[#0B0D14] border border-zinc-800/80 p-6 sm:p-8 mb-8">
          {loading ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 animate-pulse">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl bg-zinc-800 shrink-0" />
                <div className="space-y-2.5">
                  <div className="h-5 w-44 bg-zinc-800 rounded" />
                  <div className="h-4 w-32 bg-zinc-800/70 rounded" />
                  <div className="h-3.5 w-64 bg-zinc-800/50 rounded" />
                </div>
              </div>
              <div className="h-10 w-40 bg-zinc-800 rounded-lg" />
            </div>
          ) : errorMessage ? (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 shrink-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    GitHub Profile — @{username}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-1 max-w-xl leading-relaxed">
                    {errorMessage}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 mt-3">
                    <span>Ahmed Ali</span>
                    <span aria-hidden="true">·</span>
                    <span>Aligarh Muslim University</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{profileUrl}</span>
                  </div>
                </div>
              </div>
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-zinc-700 transition-colors whitespace-nowrap shrink-0"
              >
                <Github className="w-4 h-4" />
                <span>Open @{username} on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : user ? (
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <img
                  src={user.avatar_url}
                  alt={`${user.name || user.login} GitHub avatar`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-20 h-20 rounded-2xl object-cover border border-zinc-700/80 bg-zinc-900 shrink-0"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-xl font-bold text-white">
                      {user.name || 'Ahmed Ali'}
                    </h3>
                    <span className="text-sm font-mono text-blue-400">@{user.login}</span>
                  </div>
                  <p className="text-sm text-zinc-300 mt-1.5 max-w-2xl leading-relaxed">
                    {user.bio ||
                      'B.A. Economics Student at Aligarh Muslim University | Exploring AI, Data Analytics, and Creative Technology.'}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 mt-2.5 font-mono tabular-nums">
                    <span>Public Repositories: {user.public_repos}</span>
                    <span aria-hidden="true">·</span>
                    <span>Followers: {user.followers}</span>
                    <span aria-hidden="true">·</span>
                    <span>Following: {user.following}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={user.html_url || profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-zinc-100 bg-zinc-900 border border-zinc-700/80 rounded-lg hover:bg-zinc-800 hover:border-zinc-600 transition-colors whitespace-nowrap shrink-0"
                >
                  <Github className="w-4 h-4" />
                  <span>View GitHub Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : null}
        </div>

        {/* Language Filter Controls if multiple languages exist */}
        {!loading && !errorMessage && availableLanguages.length > 1 && (
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <span className="text-xs font-mono text-zinc-400">
              FILTER REPOSITORIES BY LANGUAGE
            </span>
            <div className="flex flex-wrap items-center gap-1 bg-zinc-900/90 p-1 rounded-lg border border-zinc-800">
              <button
                type="button"
                onClick={() => setLanguageFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  languageFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                All ({repos.length})
              </button>
              {availableLanguages.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguageFilter(lang)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    languageFilter === lang
                      ? 'bg-blue-600 text-white'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Public Repositories Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((skeleton) => (
              <div
                key={skeleton}
                className="p-6 rounded-2xl bg-[#0B0D14] border border-zinc-800/80 h-44 animate-pulse flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="h-4 w-1/2 bg-zinc-800 rounded" />
                  <div className="h-3.5 w-full bg-zinc-800/60 rounded" />
                  <div className="h-3.5 w-3/4 bg-zinc-800/60 rounded" />
                </div>
                <div className="h-3 w-1/3 bg-zinc-800/50 rounded" />
              </div>
            ))}
          </div>
        ) : !errorMessage && filteredRepos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-2xl bg-[#0B0D14] border border-zinc-800/80 hover:border-blue-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors break-all">
                      {repo.name}
                    </h4>
                    <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 transition-colors shrink-0 mt-0.5" />
                  </div>
                  <p className="text-sm text-zinc-400 mt-2.5 leading-relaxed line-clamp-3">
                    {repo.description || 'Public repository hosted on GitHub.'}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-zinc-800/70 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400 font-mono tabular-nums">
                  <div className="flex items-center gap-2">
                    {repo.language && (
                      <>
                        <span className="text-blue-400">{repo.language}</span>
                        <span aria-hidden="true">·</span>
                      </>
                    )}
                    <span className="inline-flex items-center gap-1" title="Stars">
                      <Star className="w-3.5 h-3.5 text-zinc-400" />
                      {repo.stargazers_count}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1" title="Forks">
                      <GitFork className="w-3.5 h-3.5 text-zinc-400" />
                      {repo.forks_count}
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-500">
                    Updated {formatUpdatedDate(repo.updated_at)}
                  </span>
                </div>
              </a>
            ))}
          </div>
        ) : !errorMessage && repos.length === 0 ? (
          <div className="rounded-2xl bg-[#0B0D14] border border-zinc-800/80 p-8 text-center">
            <FolderGit2 className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <h4 className="text-base font-semibold text-white">
              Public Repositories in Preparation
            </h4>
            <p className="text-sm text-zinc-400 max-w-lg mx-auto mt-1.5 leading-relaxed">
              The GitHub account <span className="font-mono text-zinc-200">@{username}</span> currently
              has 0 public repositories published or repositories are set to private while concept
              projects are in active development. Follow on GitHub for upcoming releases.
            </p>
            <div className="mt-5">
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Visit @{username} on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};
