"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { useTheme } from "next-themes";

import {
  DecryptReveal,
  type DecryptRevealOptions,
} from "@/components/canvasui/DecryptReveal";

const THEME_VALUES = {
  light: {
    color: "#737373",
    background: "#ffffff",
  },
  dark: {
    color: "#a1a1a1",
    background: "#0a0a0a",
  },
} as const;

const EDGE_TINT = 0.25;
const EDGE_GLOW = 0.5;
const PASSTHROUGH_FINE = 0.15;
const PASSTHROUGH_COARSE = 0.7;

function subscribeCoarsePointer(onStoreChange: () => void) {
  const query = window.matchMedia("(pointer: coarse)");
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

function getCoarsePointerSnapshot(): boolean {
  return window.matchMedia("(pointer: coarse)").matches;
}

const emptySubscribe = () => () => {};

function getHydratedSnapshot(): boolean {
  return true;
}

type ThemedDecryptRevealProps = {
  children: ReactNode;
  className?: string;
} & Partial<
  Omit<
    DecryptRevealOptions,
    "color" | "background" | "edgeTint" | "edgeGlow" | "passthrough"
  >
>;

export function ThemedDecryptReveal({
  children,
  className,
  ...options
}: ThemedDecryptRevealProps) {
  const { resolvedTheme } = useTheme();
  const hydrated = useSyncExternalStore(
    emptySubscribe,
    getHydratedSnapshot,
    () => false,
  );
  const coarsePointer = useSyncExternalStore(
    subscribeCoarsePointer,
    getCoarsePointerSnapshot,
    () => false,
  );

  const isDark = hydrated && resolvedTheme === "dark";
  const values = isDark ? THEME_VALUES.dark : THEME_VALUES.light;

  return (
    <DecryptReveal
      className={className}
      color={values.color}
      background={values.background}
      edgeTint={EDGE_TINT}
      edgeGlow={EDGE_GLOW}
      passthrough={coarsePointer ? PASSTHROUGH_COARSE : PASSTHROUGH_FINE}
      {...options}
    >
      {children}
    </DecryptReveal>
  );
}