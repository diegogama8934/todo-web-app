"use client";
import Link from "next/link";
import { CiBookmarkCheck } from "react-icons/ci";
import { usePathname } from "next/navigation";

interface Props {
  href: string
  icon: React.ReactNode
  title: string
}

export function SidebarItem({ href, icon, title }: Props) {
  const pathname = usePathname();

  return (
    <li>
      <Link 
        href={href}
        className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400`}
      >
        {icon}
        <span className="-mr-1 font-medium">{title}</span>
      </Link>
    </li>
  );
}