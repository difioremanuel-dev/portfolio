"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const emptySubscribe = () => () => {};

function getHydratedSnapshot(): boolean {
  return true;
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getHydratedSnapshot,
    () => false,
  );

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted
          ? isDark
            ? "Cambiar a modo claro"
            : "Cambiar a modo oscuro"
          : "Cambiar tema"
      }
    >
      <span className="relative flex size-4 items-center justify-center">
        <Sun className="absolute size-4 scale-90 opacity-0 transition-[opacity,transform] duration-150 ease-out dark:scale-100 dark:opacity-100" />
        <Moon className="absolute size-4 scale-100 opacity-100 transition-[opacity,transform] duration-150 ease-out dark:scale-90 dark:opacity-0" />
      </span>
    </Button>
  );
}
