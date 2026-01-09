import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/useTheme"; 

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative w-14 h-7 flex items-center bg-slate-200 dark:bg-slate-700 rounded-full p-1 cursor-pointer transition-colors duration-300"
    >
      <Sun size={14} className="absolute left-1.5 text-amber-500" />
      <Moon size={14} className="absolute right-1.5 text-slate-400" />
      
      <div
        className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 z-10 flex items-center justify-center ${
          isDark ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <Moon size={10} className="text-indigo-600" />
        ) : (
          <Sun size={10} className="text-amber-500" />
        )}
      </div>
    </button>
  );
}