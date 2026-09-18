"use client";

import { useEffect, useRef } from "react";

const PALETTE = [
  [122, 59, 255],
  [255, 59, 122],
  [206, 255, 26],
  [61, 124, 255],
] as const;

type Ring = {
  x: number;
  y: number;
  rx: number;
  ry: number;
  rot: number;
  r: number;
  g: number;
  b: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function mixColor(t: number) {
  const scaled = clamp(t) * (PALETTE.length - 1);
  const index = Math.min(PALETTE.length - 2, Math.floor(scaled));
  const f = scaled - index;
  const a = PALETTE[index];
  const b = PALETTE[index + 1];
  return [
    Math.round(lerp(a[0], b[0], f)),
    Math.round(lerp(a[1], b[1], f)),
    Math.round(lerp(a[2], b[2], f)),
  ] as const;
}

const PERM = new Uint8Array(512);
(() => {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i += 1) p[i] = i;
  let seed = 0x9e3779b9;
  for (let i = 255; i > 0; i -= 1) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const j = seed % (i + 1);
    const tmp = p[i];
    p[i] = p[j];
    p[j] = tmp;
  }
  for (let i = 0; i < 512; i += 1) PERM[i] = p[i & 255];
})();

function fade(t: number) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function grad(hash: number, x: number, y: number) {
  switch (hash & 3) {
    case 0:
      return x + y;
    case 1:
      return -x + y;
    case 2:
      return x - y;
    default:
      return -x - y;
  }
}

function noise2(x: number, y: number) {
  const xi = Math.floor(x) & 255;
  const yi = Math.floor(y) & 255;
  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);
  const u = fade(xf);
  const v = fade(yf);
  const aa = PERM[PERM[xi] + yi];
  const ab = PERM[PERM[xi] + yi + 1];
  const ba = PERM[PERM[xi + 1] + yi];
  const bb = PERM[PERM[xi + 1] + yi + 1];
  return lerp(
    lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u),
    lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u),
    v,
  );
}

function buildRings(count: number, width: number, height: number): Ring[] {
  const rings: Ring[] = [];
  const step = 2.15;
  for (let i = 0; i < count; i += 1) {
    const n1 = noise2(i * 0.012, i * 0.009);
    const n2 = noise2(i * 0.006, i * 0.0045 + 8.2);
    const [r, g, b] = mixColor(i / Math.max(1, count - 1));
    rings.push({
      x: width * 0.28 + n2 * width * 0.38,
      y: i * step,
      rx: 16 + (0.6 + n1) * 18,
      ry: 12 + (0.6 + n2) * 14,
      rot: n2 * Math.PI * 0.85,
      r,
      g,
      b,
    });
  }
  return rings;
}

export function ScrollRibbon() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const track = trackRef.current;
    if (!canvas || !track) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lite =
      window.innerWidth < 768 ||
      (navigator.hardwareConcurrency ?? 8) <= 4 ||
      reduced;

    let rings: Ring[] = [];
    let width = 0;
    let height = 0;
    let progress = 0;
    let frame = 0;
    let dirty = true;

    const resize = () => {
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
      const nextWidth = canvas.clientWidth;
      const nextHeight = canvas.clientHeight;
      if (!nextWidth || !nextHeight) return;
      width = nextWidth;
      height = nextHeight;
      canvas.width = Math.round(nextWidth * nextDpr);
      canvas.height = Math.round(nextHeight * nextDpr);
      ctx.setTransform(nextDpr, 0, 0, nextDpr, 0, 0);
      rings = buildRings(lite ? 420 : 980, nextWidth, nextHeight);
      dirty = true;
    };

    const measure = () => {
      const total = Math.max(1, track.offsetHeight - window.innerHeight);
      const next = clamp(-track.getBoundingClientRect().top / total);
      if (Math.abs(next - progress) > 0.001) {
        progress = next;
        dirty = true;
      }
    };

    const draw = () => {
      if (!dirty) return;
      dirty = false;
      ctx.clearRect(0, 0, width, height);

      const dark = document.documentElement.classList.contains("dark");
      const reveal = reduced ? 0.72 : 0.42 + progress * 0.58;
      const travel = Math.max(0, (rings.at(-1)?.y ?? 0) - height * 0.4);
      const shift = (reduced ? 0.2 : progress) * travel * 0.82;
      const baseAlpha = dark ? 0.72 : 0.5;

      for (let i = 0; i < rings.length; i += 1) {
        const ring = rings[i];
        const t = i / Math.max(1, rings.length - 1);
        const appear = smoothstep(t - 0.1, t + 0.02, reveal);
        if (appear < 0.02) continue;

        const y = ring.y - shift + height * 0.06;
        if (y < -90 || y > height + 90) continue;

        const edgeX = smoothstep(width * 0.98, width * 0.55, ring.x);
        const edgeY = smoothstep(-10, 48, y) * smoothstep(height + 10, height - 56, y);
        const alpha = appear * edgeX * edgeY * baseAlpha;
        if (alpha < 0.02) continue;

        ctx.save();
        ctx.translate(ring.x, y);
        ctx.rotate(ring.rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, ring.rx, ring.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ring.r},${ring.g},${ring.b},${alpha})`;
        ctx.lineWidth = dark ? 1.05 : 0.9;
        ctx.stroke();
        ctx.restore();
      }
    };

    const tick = () => {
      measure();
      draw();
      frame = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      measure();
      if (reduced) draw();
    };

    resize();
    measure();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);

    if (!reduced) frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[min(52vw,620px)] md:block"
    >
      <div className="sticky top-0 h-dvh">
        <canvas
          ref={canvasRef}
          data-scroll-ribbon
          className="h-full w-full mix-blend-multiply dark:mix-blend-screen"
        />
      </div>
    </div>
  );
}
