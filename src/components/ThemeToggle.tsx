
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemePreference } from "@/hooks/useThemePreference";

const ThemeToggle = () => {
  const [theme, setTheme] = useThemePreference();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-9 h-9"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
};

export default ThemeToggle;
