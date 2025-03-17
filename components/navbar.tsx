"use client"

import { NavbarLogo } from "./navbar-logo"
import { MoonIcon, SunIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { LanguageSwitcher } from "./language-switcher"

export function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="w-full bg-gradient-to-r from-gry-700 to-blue-700 text-white py-3 px-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <NavbarLogo />

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-white hover:bg-blue-700"
          >
            {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            <span className="sr-only">Cambiar tema</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

