import { titleFont } from "@/config"
import Link from "next/link"

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link href={"/"}>
        <span className={`${titleFont.className} antialiased font-bold`}>Tienda </span>
        <span>| Carlos Diaz </span>
        <span>© { new Date().getFullYear()}</span>
      </Link>
    </div>
  )
}
