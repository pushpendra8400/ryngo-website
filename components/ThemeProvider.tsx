"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  resolved: "light" | "dark";
  eyeComfort: boolean;
  setEyeComfort: (v: boolean) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  setTheme: () => { },
  resolved: "light",
  eyeComfort: false,
  setEyeComfort: () => { },
});

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [eyeComfort, setEyeComfortState] = useState(false);
  const [resolved, setResolved] = useState<"light" | "dark">("light");

  // Load saved preferences
  useEffect(() => {
    const saved = (localStorage.getItem("ryngo-theme") as Theme) || "light";
    const savedEye = localStorage.getItem("ryngo-eye-comfort") === "true";
    setThemeState(saved);
    setEyeComfortState(savedEye);
  }, []);

  // Apply theme to <html>
  useEffect(() => {
    const html = document.documentElement;
    let actual: "light" | "dark" = "light";

    if (theme === "system") {
      actual = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } else {
      actual = theme as "light" | "dark";
    }

    setResolved(actual);
    html.classList.remove("light", "dark");
    html.classList.add(actual);
    html.dataset.theme = actual;

    // Eye comfort overlay
    html.classList.toggle("eye-comfort", eyeComfort);
  }, [theme, eyeComfort]);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("ryngo-theme", t);
  };

  const setEyeComfort = (v: boolean) => {
    setEyeComfortState(v);
    localStorage.setItem("ryngo-eye-comfort", String(v));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolved, eyeComfort, setEyeComfort }}>
      {children}
    </ThemeContext.Provider>
  );
}
