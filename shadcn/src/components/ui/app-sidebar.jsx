import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./sidebar";

import {
  LayoutDashboard,
  Calendar,
  FileText,
  Contact,
  BarChart3,
  Logs,
  Settings,
  PlusSquare,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Schedules",
    url: "/schedulesList",
    icon: FileText,
  },
  {
    title: "Create Schedule",
    url: "/createSchedule",
    icon: PlusSquare,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Templates",
    url: "/templates",
    icon: FileText,
  },
  {
    title: "Contacts",
    url: "/contacts",
    icon: Contact,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Logs",
    url: "/logs",
    icon: Logs,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r bg-[#0B1120] text-white">
      {/* HEADER */}
      <SidebarHeader className="p-5 border-b border-zinc-800">
        <h1 className="text-xl font-bold text-violet-500">Text Scheduler</h1>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="p-3 text-black">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3 rounded-lg px-3 py-2 transition-all

                    ${
                      isActive
                        ? "bg-violet-600 text-white"
                        : "hover:bg-zinc-800 text-zinc-300"
                    }
                    `
                  }
                >
                  <item.icon size={18} />

                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="border-t border-zinc-800 p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-violet-600"></div>

          <div>
            <p className="text-sm font-medium">Himanshu</p>

            <p className="text-xs text-zinc-400">Developer</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
export function AppSidebar1() {
  return (
    <Sidebar>
      <SidebarHeader></SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
