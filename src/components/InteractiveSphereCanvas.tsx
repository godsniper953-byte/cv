import React, { useEffect, useRef, useState } from 'react';

interface Node3D {
  x: number;
  y: number;
  z: number;
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

const KEY_NODES: { label: string; cluster: Node3D['cluster']; lat: number; lon: number }[] = [
  { label: 'Macroeconomic Systems', cluster: 'economics', lat: 0.45, lon: 0.6 },
  { label: 'Vertex AI & Gemini', cluster: 'ai', lat: -0.35, lon: 1.8 },
  { label: 'Data Interpretation', cluster: 'analytics', lat: 0.65, lon: 3.1 },
  { label: 'Creative Synthesis', cluster: 'creative', lat: -0.55, lon: 4.5 },
  { label: 'Prompt Engineering', cluster: 'ai', lat: 0.15, lon: 5.2 },
  { label: 'Market Trends', cluster: 'economics', lat: -0.2, lon: 0.1 },
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

    // Generate Fibonacci sphere nodes for uniform 3D distribution
    const numPoints = 115;
    const nodes: Node3D[] = [];
    const clusters: Node3D['cluster'][] = ['economics', 'ai', 'analytics', 'creative'];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < numPoints; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / numPoints);
      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(phi);

      const matchedKey = KEY_NODES[i % KEY_NODES.length];
      const isKeyNode = i < KEY_NODES.length;

      nodes.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        cluster: isKeyNode ? matchedKey.cluster : clusters[i % clusters.length],
        size: isKeyNode ? 3.4 : 1.7 + (i % 3) * 0.45,
        label: isKeyNode ? matchedKey.label : undefined,
      });
    }

    let animationFrameId: number;
    let rotY = 0.35;
    let rotX = 0.18;
    let targetVelY = prefersReducedMotion ? 0 : 0.0032;
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
        rotY += dx * 0.007;
        rotX = Math.max(-0.8, Math.min(0.8, rotX + dy * 0.007));
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      } else if (!prefersReducedMotion) {
        targetVelY = 0.0032 + relX * 0.005;
        targetVelX = relY * 0.003;
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
      const radius = Math.min(width, height) * 0.34;

      ctx.clearRect(0, 0, width, height);

      // Subtle core ambient radial glow
      const radialGrad = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius * 1.25);
      radialGrad.addColorStop(0, 'rgba(59, 130, 246, 0.14)');
      radialGrad.addColorStop(0.55, 'rgba(139, 92, 246, 0.05)');
      radialGrad.addColorStop(1, 'rgba(5, 5, 7, 0)');
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // Outer orbital ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.28);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.22, radius * 0.42, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.16)';
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

      // Project 3D coordinates
      const projected = nodes.map((node) => {
        // Rotate around Y
        const x1 = node.baseX * cosY - node.baseZ * sinY;
        const z1 = node.baseZ * cosY + node.baseX * sinY;
        // Rotate around X
        const y2 = node.baseY * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.baseY * sinX;

        const perspective = 2.6 / (2.6 - z2 * 0.85);
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

      // Sort back-to-front
      projected.sort((a, b) => a.z2 - b.z2);

      const currentFilter = activeClusterRef.current;

      // Draw geodesic connections between nearby front-facing nodes
      ctx.lineWidth = 0.8;
      for (let i = 0; i < projected.length; i++) {
        const a = projected[i];
        const aMatch = currentFilter === 'all' || a.cluster === currentFilter;
        if (!aMatch && a.z2 < 0) continue;

        for (let j = i + 1; j < projected.length; j++) {
          const b = projected[j];
          const dx = a.baseX - b.baseX;
          const dy = nodeDist(a.baseY, b.baseY);
          const dz = a.baseZ - b.baseZ;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < 0.19) {
            const bMatch = currentFilter === 'all' || b.cluster === currentFilter;
            const depthAlpha = ((a.z2 + b.z2 + 2) / 4) * 0.26;
            const highlightFactor = aMatch && bMatch ? 1 : 0.18;
            ctx.strokeStyle = `rgba(147, 197, 253, ${Math.max(0.02, depthAlpha * highlightFactor)})`;
            ctx.beginPath();
            ctx.moveTo(a.px, a.py);
            ctx.lineTo(b.px, b.py);
            ctx.stroke();
          }
        }
      }

      // Draw nodes and key labels
      projected.forEach((p) => {
        const isMatched = currentFilter === 'all' || p.cluster === currentFilter;
        const depthAlpha = Math.max(0.15, (p.z2 + 1.25) / 2.25);
        const finalAlpha = isMatched ? depthAlpha : depthAlpha * 0.2;
        const color = CLUSTER_COLORS[p.cluster];

        ctx.beginPath();
        ctx.arc(p.px, p.py, p.size * p.perspective * (isMatched ? 1 : 0.75), 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = finalAlpha;
        ctx.fill();

        if (p.label && p.z2 > 0.15 && isMatched) {
          ctx.globalAlpha = Math.min(0.95, (p.z2 - 0.1) * 1.4);
          ctx.font = '500 11px "JetBrains Mono", monospace';
          ctx.fillStyle = '#E4E4E7';
          ctx.fillText(p.label, p.px + 8, p.py + 3);
        }
      });

      ctx.globalAlpha = 1;

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    function nodeDist(a: number, b: number) {
      return a - b;
    }

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
          INTERACTIVE 3D DOMAIN TOPOLOGY
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
          aria-label="Interactive 3D sphere visualizing the intersection of Economics, Artificial Intelligence, Data Analytics, and Creative Design"
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
        <span className="font-mono text-[11px] text-zinc-500">Drag or move cursor to rotate</span>
      </div>
    </div>
  );
};
