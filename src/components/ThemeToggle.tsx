import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemePreference } from "@/hooks/useThemePreference";
// Disable dark mode
const ThemeToggle = () => {
  const [theme, setTheme] = useThemePreference();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "light" : "light");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      // onClick={toggleTheme}
      className="w-9 h-9 border-primary/30 dark:border-primary/50 dark:hover:bg-primary/20"
      aria-label="Toggle theme"
      disabled
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5 text-primary" />
      )}
    </Button>
  );
};

export default ThemeToggle;
