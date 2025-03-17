
"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

export function NavbarLogo() {
  const { t } = useLanguage()

  return (
    <Link href="/" className="flex items-center gap-2">
    <Image src="/logo.png" alt="Atrevity Logo" width={90} height={32} className="rounded-full" />
      
      <span className="text-sm text-gray-300 hidden sm:inline">| {t("app.subtitle")}</span>
    </Link>
  )
}

