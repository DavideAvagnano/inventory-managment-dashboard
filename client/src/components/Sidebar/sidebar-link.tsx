import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

interface SidebarLinksProps {
  href: string;
  label: string;
  icon: LucideIcon;
  isCollapsed: boolean;
}

export const SidebarLink = ({
  href,
  label,
  icon: Icon,
  isCollapsed,
}: SidebarLinksProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={clsx(
          "cursor-pointer flex items-center hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors",
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4",
          isActive && "bg-blue-200 text-white"
        )}
      >
        <Icon className="size-6 !text-gray-700" />
        <span
          className={clsx(
            isCollapsed ? "hidden" : "block",
            "font-medium text-gray-700"
          )}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};
