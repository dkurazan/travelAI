import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { SiOpenaigym } from "react-icons/si";

export default function SidebarHeader() {
  return (
    <div className="flex items-center mb-4 gap-4 px-4">
      <Link href={'/'} className="flex items-center gap-4 mr-auto">
        <SiOpenaigym className="w-10 h-10 text-primary" />
        <h2 className="text-xl font-extrabold text-primary">
          TravelAI
        </h2>
      </Link>
      <ThemeToggle />
    </div>
  );
}
