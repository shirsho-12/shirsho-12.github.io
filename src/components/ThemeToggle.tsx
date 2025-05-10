import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useThemePreference } from "@/hooks/useThemePreference";

const ThemeToggle = () => {
  const [theme, toggleTheme] = useThemePreference();

  return (
    <Button
      variant="outline"
      size="icon"
      className="w-9 h-9 border-primary/30 hover:bg-primary/20"
      onClick={toggleTheme}
      aria-label={
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-primary" />
      ) : (
        <Sun className="h-5 w-5 text-primary" />
      )}
    </Button>
  );
};

export default ThemeToggle;
