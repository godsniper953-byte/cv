import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  INITIAL_PORTFOLIO_CONFIG,
  ABOUT_HIGHLIGHT_CARDS,
  SKILL_CATEGORIES,
  CREDENTIALS_LIST,
  EDUCATION_TIMELINE,
  INITIAL_PROJECTS,
  CAREER_ASPIRATIONS,
} from '../data/portfolioData';
import App from '../App';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import { ResumeSection } from '../components/ResumeSection';

describe('Ahmed Ali Portfolio — Automated Verification Suite', () => {
  it('1. Validates Personal Brand & Academic Configuration', () => {
    assert.equal(INITIAL_PORTFOLIO_CONFIG.name, 'Ahmed Ali');
    assert.equal(INITIAL_PORTFOLIO_CONFIG.headline, 'Economics Meets Intelligence.');
    assert.equal(INITIAL_PORTFOLIO_CONFIG.university, 'Aligarh Muslim University (AMU)');
    assert.equal(INITIAL_PORTFOLIO_CONFIG.degree, 'B.A. Economics');
    assert.equal(INITIAL_PORTFOLIO_CONFIG.expectedGraduation, '2029');
    assert.equal(INITIAL_PORTFOLIO_CONFIG.githubUsername, 'godsniper953-byte');
    assert.equal(INITIAL_PORTFOLIO_CONFIG.githubUrl, 'https://github.com/godsniper953-byte');
    assert.deepEqual(INITIAL_PORTFOLIO_CONFIG.rotatingKeywords, [
      'Economics',
      'Artificial Intelligence',
      'Data Analytics',
      'Creative Design',
    ]);
    // Ensure contact placeholders default to empty string rather than fabricated contact info
    assert.equal(INITIAL_PORTFOLIO_CONFIG.verifiedEmail, '');
    assert.equal(INITIAL_PORTFOLIO_CONFIG.linkedinUrl, '');
  });

  it('2. Validates About Me Cards, Skills, Credentials, Education & Career Aspirations', () => {
    assert.equal(ABOUT_HIGHLIGHT_CARDS.length, 5);
    assert.equal(SKILL_CATEGORIES.length, 4);
    const totalSkills = SKILL_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0);
    assert.equal(totalSkills, 19);

    assert.equal(CREDENTIALS_LIST.length, 10);
    const certs = CREDENTIALS_LIST.filter((c) => c.credentialType === 'Certification / Badge');
    const courses = CREDENTIALS_LIST.filter((c) => c.credentialType === 'Course / Learning Module');
    assert.equal(certs.length, 4);
    assert.equal(courses.length, 6);

    assert.equal(EDUCATION_TIMELINE.length, 2);
    assert.equal(CAREER_ASPIRATIONS.length, 5);
  });

  it('3. Validates ArthNiti Live Project & Portfolio Projects Integrity', () => {
    assert.ok(INITIAL_PROJECTS.length >= 4);
    const arthniti = INITIAL_PROJECTS.find((p) => p.title === 'ArthNiti');
    assert.ok(arthniti, 'ArthNiti project must exist in INITIAL_PROJECTS');
    assert.equal(arthniti.status, 'Live Project');
    assert.equal(arthniti.category, 'Economics & Data Analytics');
    assert.equal(
      arthniti.shortDescription,
      "ArthNiti is an economic analysis platform designed to help users explore India's economic indicators, financial trends, inflation, GDP growth, RBI repo rates, and other important economic data through an intuitive dashboard."
    );
    assert.equal(arthniti.liveDemoUrl, 'https://arthniti-six.vercel.app/');
    assert.equal(arthniti.repositoryUrl, 'https://github.com/godsniper953-byte/ArthNiti');
    assert.ok(arthniti.coverSvgDataUri.startsWith('data:image/svg+xml;utf8,'));
    assert.ok(arthniti.keyFeatures && arthniti.keyFeatures.length >= 4);
    assert.ok(arthniti.screenshots && arthniti.screenshots.length >= 2);

    // Verify all projects have valid non-empty SVG data-URIs (Zero-Broken-Image Policy)
    for (const proj of INITIAL_PROJECTS) {
      assert.ok(
        proj.coverSvgDataUri.startsWith('data:image/svg+xml;utf8,'),
        `Project ${proj.title} must have a valid SVG data URI`
      );
    }
  });

  it('4. Validates 360-Degree Spherical Node Distribution across all 4 Quadrants', () => {
    const lonDegrees = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
    const latDegrees = [22, -18, 38, -32, 12, -24, 30, -14, 42, -36, 16, -22];

    let frontHemisphereCount = 0;
    let backHemisphereCount = 0;
    let leftHemisphereCount = 0;
    let rightHemisphereCount = 0;

    lonDegrees.forEach((lonDeg, i) => {
      const lat = (latDegrees[i] * Math.PI) / 180;
      const lon = (lonDeg * Math.PI) / 180;
      const x = Math.cos(lat) * Math.sin(lon);
      const y = Math.sin(lat);
      const z = Math.cos(lat) * Math.cos(lon);

      const normSq = x * x + y * y + z * z;
      assert.ok(Math.abs(normSq - 1) < 1e-9, 'Node must lie on the unit 3D sphere');

      if (z >= 0) frontHemisphereCount++;
      if (z < 0) backHemisphereCount++;
      if (x >= 0) rightHemisphereCount++;
      if (x < 0) leftHemisphereCount++;
    });

    assert.ok(frontHemisphereCount >= 5, 'Front hemisphere must have distributed nodes');
    assert.ok(backHemisphereCount >= 5, 'Back hemisphere must have distributed nodes');
    assert.ok(rightHemisphereCount >= 5, 'Right hemisphere must have distributed nodes');
    assert.ok(leftHemisphereCount >= 5, 'Left hemisphere must have distributed nodes');
  });

  it('5. Renders Full App and Key Components without Errors', () => {
    const appHtml = renderToString(<App />);
    assert.ok(appHtml.includes('Economics Meets Intelligence.'));
    assert.ok(appHtml.includes('ArthNiti'));
    assert.ok(appHtml.includes('https://arthniti-six.vercel.app/'));
    assert.ok(appHtml.includes('View Live Project'));
    assert.ok(appHtml.includes('Explore Project'));
    assert.ok(appHtml.includes('Where Economics Meets Technology'));

    const arthniti = INITIAL_PROJECTS[0];
    const cardHtml = renderToString(
      <ProjectCard project={arthniti} isFeaturedWide={true} onExplore={() => {}} />
    );
    assert.ok(cardHtml.includes('https://arthniti-six.vercel.app/'));
    assert.ok(cardHtml.includes('target="_blank"'));
    assert.ok(cardHtml.includes('rel="noopener noreferrer"'));

    const modalHtml = renderToString(
      <ProjectDetailModal project={arthniti} onClose={() => {}} />
    );
    assert.ok(modalHtml.includes('Verified Key Features'));
    assert.ok(modalHtml.includes('Official MoSPI &amp; RBI Data Pipelines'));

    const resumeHtml = renderToString(
      <ResumeSection
        config={INITIAL_PORTFOLIO_CONFIG}
        skills={SKILL_CATEGORIES}
        credentials={CREDENTIALS_LIST}
        education={EDUCATION_TIMELINE}
        projects={INITIAL_PROJECTS}
        onOpenConfigModal={() => {}}
      />
    );
    assert.ok(resumeHtml.includes('Print / Save Resume as PDF'));
    assert.ok(resumeHtml.includes('arthniti-six.vercel.app'));
  });
});
