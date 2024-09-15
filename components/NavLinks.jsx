'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/chat", label: "chat" },
  { href: "/tours", label: "tours" },
  { href: "/tours/new-tour", label: "new tour" },
  { href: "/profile", label: "profile" },
];

export default function NavLinks() {
  const pathname = usePathname();
  const isActive = (path) => pathname === path; 

  return (
    <ul className="menu  text-base-content">
      {links.map((link) => {
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={
                isActive(link.href) ? "active capitalize" : "capitalize"
              }
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
