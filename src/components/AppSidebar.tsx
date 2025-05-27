
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { FileText, LayoutDashboard, ListCheck, Calendar, Book } from "lucide-react";

const navigationItems = [
  {
    title: "Progress Checklist",
    url: "#progress",
    icon: ListCheck,
  },
  {
    title: "SLA Overview",
    url: "#sla-overview",
    icon: LayoutDashboard,
  },
  {
    title: "SLA Board",
    url: "#sla-board",
    icon: Calendar,
  },
  {
    title: "Applications",
    url: "#applications",
    icon: Book,
  },
  {
    title: "Documents",
    url: "#documents",
    icon: FileText,
  },
];

export function AppSidebar() {
  const handleNavClick = (url: string) => {
    const element = document.querySelector(url);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="px-6 py-4">
        <h2 className="text-xl font-bold text-gray-900">SLA Dashboard</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => handleNavClick(item.url)}
                    className="cursor-pointer"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
