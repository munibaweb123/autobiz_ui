"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  LayoutDashboard,
  Users,
  FileText,
  Package,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "CRM", icon: Users, path: "/crm" },
  { name: "Invoices", icon: FileText, path: "/invoices" },
  { name: "Inventory", icon: Package, path: "/inventory" },
  { name: "WhatsApp", icon: MessageSquare, path: "/whatsapp" },
  { name: "Analytics", icon: BarChart3, path: "/analytics" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export const NavigationContent = ({ setOpen }: { setOpen?: (open: boolean) => void }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
    if (setOpen) {
      setOpen(false);
    }
  };

  const logout = () => router.push("/signin");

  return (
    <>
      {/* Logo */}
      <div className="p-4 flex items-center gap-2 border-b bg-white/70 dark:bg-[#0f172a]/50 backdrop-blur-sm border-gray-200 dark:border-gray-800">
        <div
          className="h-10 w-10 rounded-full flex items-center justify-center bg-[#2563eb] text-white dark:bg-white dark:text-[#2563eb] hover:bg-[#1d4ed8] dark:hover:bg-gray-100 transition"
        >
          <Sparkles className="h-5 w-5" />
        </div>
        <span className="text-xl font-bold dark:text-blue-400 text-blue-600">
          BizzAuto
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Button
              key={item.name}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start gap-2 ${isActive ? "bg-[#2563eb] text-white hover:bg-[#1d4ed8]" : "text-gray-700 dark:text-gray-200 hover:bg-[#e8f1ff] dark:hover:bg-[#1e3a8a]/50 hover:text-[#2563eb] dark:hover:text-[#60a5fa]"}`}
              onClick={() => handleNavigation(item.path)}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Button>
          );
        })}
      </nav>

      {/* Profile Card + Logout */}
      <div className="p-3 mx-4 mb-4 rounded-xl bg-white/80 border border-gray-200 shadow-sm backdrop-blur-md dark:bg-[#1e293b]/70 dark:border-gray-700 dark:shadow-none">
        <div className="rounded-lg p-3 bg-muted/40 dark:bg-[#0d1117]">
          <div className="flex items-center gap-3 mb-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">Muniba</p>
              <p className="text-xs text-muted-foreground">
                muniba@gmail.com
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs text-blue-600 dark:text-blue-400">
            admin
          </Badge>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </>
  );
};

export default function Sidebar() {
  return (
    <aside
      className="hidden lg:flex w-64 flex-col fixed inset-y-0 bg-white/80 border-r border-gray-200 shadow-sm dark:bg-[#0f172a]/60 dark:border-gray-800 dark:shadow-none backdrop-blur-md"
    >
      <NavigationContent />
    </aside>
  );
}
