"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type WebGLRevealProps = {
  children: ReactNode;
  className?: string;
};

const VERT = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aPos;
out vec2 vUv;
void main () {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform vec2 uResolution;
uniform float uProgress;
uniform float uTime;
uniform vec3 uColor;

float hash (vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main () {
  float sweep = vUv.x * 0.55 + vUv.y * 0.85;
  float threshold = clamp(1.0 - uProgress * 1.9 + sweep * 0.55, 0.0, 1.4);
  float grain = hash(vUv * uResolution * 2.7 + uTime * 3.0);
  float veil = 1.0 - smoothstep(threshold, threshold + 0.08, grain + 0.05);
  veil *= 1.0 - smoothstep(0.95, 1.0, uProgress);
  outColor = vec4(uColor, veil);
}`;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function isLowPowerDevice(): boolean {
  if (typeof navigator === "undefined") return true;
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    hardwareConcurrency?: number;
  };
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4) return true;
  if (
    typeof nav.hardwareConcurrency === "number" &&
    nav.hardwareConcurrency <= 2
  )
    return true;
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches &&
    window.matchMedia("(max-width: 640px)").matches
  )
    return true;
  return false;
}

function parseColor(color: string): [number, number, number] | null {
  const value = color.trim();

  const rgb = value.match(
    /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)$/i,
  );
  if (rgb && Number(rgb[4] ?? 1) > 0) {
    return [Number(rgb[1]) / 255, Number(rgb[2]) / 255, Number(rgb[3]) / 255];
  }

  const hex6 = value.match(/^#([0-9a-f]{6})$/i);
  if (hex6) {
    const n = parseInt(hex6[1], 16);
    return [
      ((n >> 16) & 255) / 255,
      ((n >> 8) & 255) / 255,
      (n & 255) / 255,
    ];
  }

  const hex3 = value.match(/^#([0-9a-f]{3})$/i);
  if (hex3) {
    const n = parseInt(hex3[1], 16);
    const r = (n >> 8) & 15;
    const g = (n >> 4) & 15;
    const b = n & 15;
    return [((r << 4) | r) / 255, ((g << 4) | g) / 255, ((b << 4) | b) / 255];
  }

  // The palette is grayscale; for oklch(L C H) the lightness alone is enough.
  const oklch = value.match(/^oklch\(\s*([\d.]+)%?\s+[\d.]+\s+[\d.]+\)$/i);
  if (oklch) {
    const raw = oklch[1].includes("%") ? Number(oklch[1]) / 100 : Number(oklch[1]);
    const gray = Math.min(1, Math.max(0, raw));
    return [gray, gray, gray];
  }

  return null;
}

function readVeilColor(root: HTMLElement): [number, number, number] {
  const candidates = [
    root.firstElementChild as HTMLElement | null,
    root,
    document.body,
    document.documentElement,
  ];
  for (const el of candidates) {
    if (!el) continue;
    const parsed = parseColor(getComputedStyle(el).backgroundColor);
    if (parsed) return parsed;
  }
  return [1, 1, 1];
}

type RevealHandle = {
  start: () => void;
  destroy: () => void;
};

function createReveal(
  gl: WebGL2RenderingContext,
  root: HTMLElement,
  canvas: HTMLCanvasElement,
): RevealHandle | null {
  function compile(type: number, source: string): WebGLShader | null {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("WebGLReveal shader error:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vertexShader = compile(gl.VERTEX_SHADER, VERT);
  const fragmentShader = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("WebGLReveal program error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  const aPos = gl.getAttribLocation(program, "aPos");
  const uResolution = gl.getUniformLocation(program, "uResolution");
  const uProgress = gl.getUniformLocation(program, "uProgress");
  const uTime = gl.getUniformLocation(program, "uTime");
  const uColor = gl.getUniformLocation(program, "uColor");

  const quad = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  );

  const color = readVeilColor(root);
  let destroyed = false;
  let raf = 0;
  let started = false;
  let progress = 0;
  let lastTime = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(root.clientWidth * dpr));
    const height = Math.max(1, Math.round(root.clientHeight * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  }

  function draw(p: number) {
    resize();
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(uResolution, canvas.width, canvas.height);
    gl.uniform1f(uProgress, p);
    gl.uniform1f(uTime, performance.now() / 1000);
    gl.uniform3f(uColor, color[0], color[1], color[2]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  function frame(now: number) {
    if (destroyed) return;
    if (!lastTime) lastTime = now;
    const delta = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    progress = Math.min(1, progress + delta / 1.6);
    const eased = 1 - Math.pow(1 - progress, 3);
    draw(eased);
    if (progress >= 1) return;
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (destroyed || started) return;
    started = true;
    draw(0);
    raf = requestAnimationFrame(frame);
  }

  draw(0);

  return {
    start,
    destroy() {
      destroyed = true;
      cancelAnimationFrame(raf);
      gl.deleteBuffer(quad);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    },
  };
}

export function WebGLReveal({ children, className }: WebGLRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || isLowPowerDevice()) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
    });
    if (!gl || gl.isContextLost()) return;
    setCapable(true);
  }, []);

  useEffect(() => {
    if (!capable) return;
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const gl = canvas.getContext("webgl2");
    if (!gl) return;

    const handle = createReveal(gl, root, canvas);
    if (!handle) {
      setCapable(false);
      return;
    }

    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            handle.start();
            observer?.disconnect();
          }
        },
        { threshold: 0.4 },
      );
      observer.observe(root);
    } else {
      handle.start();
    }

    const resizeObserver = new ResizeObserver(() => {
      const ctx = canvas.getContext("webgl2");
      if (!ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.canvas.width = Math.max(1, Math.round(root.clientWidth * dpr));
      ctx.canvas.height = Math.max(1, Math.round(root.clientHeight * dpr));
    });
    resizeObserver.observe(root);

    const onEnter = () => handle.start();
    const onContextLost = (event: Event) => {
      event.preventDefault();
      observer?.disconnect();
      resizeObserver.disconnect();
      root.removeEventListener("pointerenter", onEnter);
      handle.destroy();
      setCapable(false);
    };
    canvas.addEventListener("webglcontextlost", onContextLost);
    root.addEventListener("pointerenter", onEnter);

    return () => {
      observer?.disconnect();
      resizeObserver.disconnect();
      root.removeEventListener("pointerenter", onEnter);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      handle.destroy();
    };
  }, [capable]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      {children}
      <canvas
        ref={canvasRef}
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full bg-background",
          !capable && "hidden",
        )}
      />
    </div>
  );
}
