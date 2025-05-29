
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
import { FileText, List, Smartphone, Rocket, Server } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navigationItems = [
  {
    title: "SLA List",
    url: "/sla-list",
    icon: List,
  },
  {
    title: "Applications",
    url: "/applications",
    icon: Smartphone,
  },
  {
    title: "Releases",
    url: "/releases",
    icon: Rocket,
  },
  {
    title: "Build History",
    url: "/build-history",
    icon: FileText,
  },
  {
    title: "Environment Management",
    url: "/environment-management",
    icon: Server,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();

  const handleNavClick = (url: string) => {
    navigate(url);
  };

  return (
    <Sidebar className="border-r border-gray-200 bg-gray-900">
      <SidebarHeader className="px-6 py-6 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">SLA Dashboard</h2>
        <p className="text-sm text-gray-400 mt-1">Project Management</p>
      </SidebarHeader>
      <SidebarContent className="bg-gray-900">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => handleNavClick(item.url)}
                    className="cursor-pointer text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
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
