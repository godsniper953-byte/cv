import React, { useEffect, useRef, useState } from 'react';

interface Node3D {
  baseX: number;
  baseY: number;
  baseZ: number;
  cluster: 'economics' | 'ai' | 'analytics' | 'creative';
  size: number;
  label?: string;
}

const CLUSTER_COLORS: Record<Node3D['cluster'], string> = {
  economics: '#60A5FA', // Electric Blue
  ai: '#A78BFA',        // Violet
  analytics: '#38BDF8', // Sky Cyan
  creative: '#818CF8',  // Indigo
};

// 12 key domain nodes distributed 360° around the entire globe (every 30° of longitude + varied latitudes)
const KEY_NODES: { label: string; cluster: Node3D['cluster']; latDeg: number; lonDeg: number }[] = [
  { label: 'Macroeconomic Systems', cluster: 'economics', latDeg: 22, lonDeg: 0 },
  { label: 'Vertex AI & Gemini', cluster: 'ai', latDeg: -18, lonDeg: 30 },
  { label: 'ArthNiti Analytics', cluster: 'analytics', latDeg: 38, lonDeg: 60 },
  { label: 'Creative Synthesis', cluster: 'creative', latDeg: -32, lonDeg: 90 },
  { label: 'Prompt Engineering', cluster: 'ai', latDeg: 12, lonDeg: 120 },
  { label: 'GDP & CPI Indicators', cluster: 'economics', latDeg: -24, lonDeg: 150 },
  { label: 'Data Visualization', cluster: 'analytics', latDeg: 30, lonDeg: 180 },
  { label: 'Motion & Video Design', cluster: 'creative', latDeg: -14, lonDeg: 210 },
  { label: 'Monetary & Repo Policy', cluster: 'economics', latDeg: 42, lonDeg: 240 },
  { label: 'Generative AI Agents', cluster: 'ai', latDeg: -36, lonDeg: 270 },
  { label: 'Quantitative Research', cluster: 'analytics', latDeg: 16, lonDeg: 300 },
  { label: 'UI/UX & 3D Web', cluster: 'creative', latDeg: -22, lonDeg: 330 },
];

export const InteractiveSphereCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeCluster, setActiveCluster] = useState<'all' | Node3D['cluster']>('all');
  const activeClusterRef = useRef<'all' | Node3D['cluster']>('all');

  useEffect(() => {
    activeClusterRef.current = activeCluster;
  }, [activeCluster]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const nodes: Node3D[] = [];
    const clusters: Node3D['cluster'][] = ['economics', 'ai', 'analytics', 'creative'];

    // 1. Place the 12 key labeled nodes explicitly across all 360° of longitude and varied latitudes
    KEY_NODES.forEach((kn) => {
      const lat = (kn.latDeg * Math.PI) / 180;
      const lon = (kn.lonDeg * Math.PI) / 180;
      // Y is vertical axis (poles at top/bottom), X and Z span the 360° horizontal equator
      const baseX = Math.cos(lat) * Math.sin(lon);
      const baseY = Math.sin(lat);
      const baseZ = Math.cos(lat) * Math.cos(lon);

      nodes.push({
        baseX,
        baseY,
        baseZ,
        cluster: kn.cluster,
        size: 3.6,
        label: kn.label,
      });
    });

    // 2. Distribute 120 geodesic lattice nodes uniformly across all 360° of the sphere using Y-axis Fibonacci spiral
    const numLatticePoints = 120;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < numLatticePoints; i++) {
      // y goes smoothly from +1 (North Pole) to -1 (South Pole)
      const baseY = 1 - (2 * (i + 0.5)) / numLatticePoints;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - baseY * baseY));
      const theta = (2 * Math.PI * i) / goldenRatio;

      const baseX = radiusAtY * Math.sin(theta);
      const baseZ = radiusAtY * Math.cos(theta);

      nodes.push({
        baseX,
        baseY,
        baseZ,
        cluster: clusters[i % clusters.length],
        size: 1.65 + (i % 3) * 0.4,
      });
    }

    let animationFrameId: number;
    let rotY = 0.4;
    let rotX = 0.14;
    let targetVelY = prefersReducedMotion ? 0 : 0.0038;
    let targetVelX = 0;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      if (isDragging) {
        const dx = e.clientX - lastMouseX;
        const dy = e.clientY - lastMouseY;
        rotY += dx * 0.008;
        rotX = Math.max(-1.05, Math.min(1.05, rotX + dy * 0.008));
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      } else if (!prefersReducedMotion) {
        targetVelY = 0.0038 + relX * 0.0055;
        targetVelX = relY * 0.0035;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.35;

      ctx.clearRect(0, 0, width, height);

      // Subtle core ambient radial glow
      const radialGrad = ctx.createRadialGradient(cx, cy, radius * 0.08, cx, cy, radius * 1.3);
      radialGrad.addColorStop(0, 'rgba(59, 130, 246, 0.14)');
      radialGrad.addColorStop(0.55, 'rgba(139, 92, 246, 0.05)');
      radialGrad.addColorStop(1, 'rgba(5, 5, 7, 0)');
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // Equator & meridian orbital guide rings
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.22);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.18, radius * 0.36, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.14)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 6]);
      ctx.stroke();
      ctx.restore();

      if (!isDragging && !prefersReducedMotion) {
        rotY += targetVelY;
        rotX += (targetVelX - rotX * 0.04) * 0.08;
      }

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Project 3D coordinates around the full 360° globe
      const projected = nodes.map((node) => {
        // Rotate 360° around vertical Y-axis
        const x1 = node.baseX * cosY + node.baseZ * sinY;
        const z1 = node.baseZ * cosY - node.baseX * sinY;
        // Tilt around horizontal X-axis
        const y2 = node.baseY * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.baseY * sinX;

        const perspective = 2.7 / (2.7 - z2 * 0.82);
        const px = cx + x1 * radius * perspective;
        const py = cy + y2 * radius * perspective;

        return {
          ...node,
          px,
          py,
          z2,
          perspective,
        };
      });

      // Sort back-to-front (z2 from -1 at back of globe to +1 at front of globe)
      projected.sort((a, b) => a.z2 - b.z2);

      const currentFilter = activeClusterRef.current;

      // Draw 360° geodesic connections across both back and front hemispheres
      ctx.lineWidth = 0.8;
      for (let i = 0; i < projected.length; i++) {
        const a = projected[i];
        const aMatch = currentFilter === 'all' || a.cluster === currentFilter;

        for (let j = i + 1; j < projected.length; j++) {
          const b = projected[j];
          const dx = a.baseX - b.baseX;
          const dy = a.baseY - b.baseY;
          const dz = a.baseZ - b.baseZ;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < 0.21) {
            const bMatch = currentFilter === 'all' || b.cluster === currentFilter;
            const avgZ = (a.z2 + b.z2) / 2;
            const depthAlpha = ((avgZ + 1.35) / 2.35) * 0.24;
            const highlightFactor = aMatch && bMatch ? 1 : 0.16;
            ctx.strokeStyle = `rgba(147, 197, 253, ${Math.max(0.025, depthAlpha * highlightFactor)})`;
            ctx.beginPath();
            ctx.moveTo(a.px, a.py);
            ctx.lineTo(b.px, b.py);
            ctx.stroke();
          }
        }
      }

      // Draw nodes and 360° distributed labels (front hemisphere bright, back hemisphere subtle depth)
      projected.forEach((p) => {
        const isMatched = currentFilter === 'all' || p.cluster === currentFilter;
        // Smooth depth alpha from back of globe (z2 = -1 -> 0.22) to front of globe (z2 = +1 -> 1.0)
        const depthAlpha = Math.max(0.2, (p.z2 + 1.35) / 2.35);
        const finalAlpha = isMatched ? depthAlpha : depthAlpha * 0.18;
        const color = CLUSTER_COLORS[p.cluster];

        // Subtle outer halo on key labeled nodes
        if (p.label && isMatched) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, p.size * p.perspective * 2.1, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = finalAlpha * 0.18;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(
          p.px,
          p.py,
          p.size * p.perspective * (isMatched ? 1 : 0.75),
          0,
          Math.PI * 2
        );
        ctx.fillStyle = color;
        ctx.globalAlpha = finalAlpha;
        ctx.fill();

        // Render labels across the entire 360° sphere with depth-scaled opacity and font size
        if (p.label && isMatched && p.z2 > -0.65) {
          const isFrontHemisphere = p.z2 >= 0;
          const labelAlpha = isFrontHemisphere
            ? Math.min(0.96, 0.55 + p.z2 * 0.45)
            : Math.max(0.22, (p.z2 + 0.65) * 0.65);

          const fontSize = isFrontHemisphere ? 11 : 9.5;
          ctx.globalAlpha = labelAlpha;
          ctx.font = `${isFrontHemisphere ? '500' : '400'} ${fontSize}px "JetBrains Mono", monospace`;
          ctx.fillStyle = isFrontHemisphere ? '#F4F4F5' : '#94A3B8';

          // Place text slightly offset from node center
          const textX = p.px + 8 * p.perspective;
          const textY = p.py + 3;
          ctx.fillText(p.label, textX, textY);
        }
      });

      ctx.globalAlpha = 1;

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[380px] lg:min-h-[460px] flex flex-col justify-between rounded-2xl bg-[#0B0D14]/90 border border-zinc-800/80 p-5 overflow-hidden select-none">
      {/* Top interactive domain filter bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/70 pb-3">
        <span className="text-xs font-mono text-zinc-400 tracking-wide">
          INTERACTIVE 3D DOMAIN TOPOLOGY · 360°
        </span>
        <div
          className="flex items-center gap-1 bg-zinc-900/90 p-1 rounded-lg border border-zinc-800"
          role="group"
          aria-label="Filter 3D sphere nodes by discipline"
        >
          {(
            [
              { id: 'all', label: 'All' },
              { id: 'economics', label: 'Economics' },
              { id: 'ai', label: 'AI' },
              { id: 'analytics', label: 'Data' },
              { id: 'creative', label: 'Creative' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCluster(tab.id)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeCluster === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive 3D Canvas */}
      <div className="relative flex-1 w-full min-h-[280px] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          aria-label="Interactive 360-degree 3D sphere visualizing the intersection of Economics, Artificial Intelligence, Data Analytics, and Creative Design"
        />
      </div>

      {/* Bottom Legend & Drag Instruction */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800/70 text-xs text-zinc-400">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-blue-400 font-medium">Economics</span>
          <span aria-hidden="true">·</span>
          <span className="text-violet-400 font-medium">Artificial Intelligence</span>
          <span aria-hidden="true">·</span>
          <span className="text-sky-400 font-medium">Data Analytics</span>
          <span aria-hidden="true">·</span>
          <span className="text-indigo-400 font-medium">Creative Design</span>
        </div>
        <span className="font-mono text-[11px] text-zinc-500">Drag 360° to inspect globe</span>
      </div>
    </div>
  );
};
