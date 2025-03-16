import Link from "next/link"
import Image from "next/image"

export function NavbarLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src="/logo.png" alt="Atrevity Logo" width={80} height={32} className="rounded-full" />
      <span className="text-xl font-bold text-white">RetoTotal</span>
      <span className="text-sm text-gray-300 hidden sm:inline">| Desafíos</span>
    </Link>
  )
}

