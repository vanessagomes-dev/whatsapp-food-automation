import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  // Verifica se o usuário já tinha uma preferência salva ou usa o padrão do sistema
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("@WhatsAppFood:theme");
    return saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("@WhatsAppFood:theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("@WhatsAppFood:theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="relative w-14 h-7 flex items-center bg-slate-200 dark:bg-slate-700 rounded-full p-1 cursor-pointer transition-colors duration-300"
    >
      {/* Ícones de fundo para dar contexto */}
      <Sun size={14} className="absolute left-1.5 text-amber-500" />
      <Moon size={14} className="absolute right-1.5 text-slate-400" />
      
      {/* Círculo deslizante */}
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