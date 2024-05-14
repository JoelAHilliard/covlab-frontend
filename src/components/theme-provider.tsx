import { createContext } from "preact";
import { useEffect, useContext, useState } from "preact/hooks";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: preact.ComponentChildren;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add("light");
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      // Ensure theme is always "light"
      localStorage.setItem(storageKey, "light");
      setTheme("light");
    },
  };

  return (
    <ThemeProviderContext.Provider value={value} {...props}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === initialState) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
