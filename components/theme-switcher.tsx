"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Spinner } from "@heroui/react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const currentTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Spinner className="" color="secondary" classNames={{label: "text-foreground mt-4"}} variant="wave" />;

  return <div className="cursor-pointer bg-gray-200 dark:bg-purple-300 rounded-lg p-2" onClick={() => setTheme(currentTheme)}>{theme === "light" ? <Moon size={21} /> : <Sun size={21} color="#fff" />}</div>;
}