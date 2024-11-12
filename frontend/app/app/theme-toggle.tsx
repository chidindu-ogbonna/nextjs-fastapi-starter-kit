import { useTheme } from "next-themes";
import { IconSun, IconMoon } from "@tabler/icons-react";
import Link from "next/link";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Link
      href="#"
      // label={`${theme === "dark" ? "Light" : "Dark"} Mode`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <IconSun className="w-5 h-5" />
      ) : (
        <IconMoon className="w-5 h-5" />
      )}
    </Link>
  );
}
