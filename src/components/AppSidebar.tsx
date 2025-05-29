
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
import { FileText, LayoutDashboard, ListCheck, Calendar, Book, List, Smartphone, Rocket } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
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
    title: "Progress Checklist",
    url: "/#overview",
    icon: ListCheck,
  },
  {
    title: "SLA Overview",
    url: "/#sla-overview",
    icon: LayoutDashboard,
  },
  {
    title: "SLA Board",
    url: "/#sla-board",
    icon: Calendar,
  },
  {
    title: "Documents",
    url: "/#documents",
    icon: FileText,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (url: string) => {
    if (url.startsWith('/#')) {
      // Handle anchor links for dashboard sections
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(url.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.querySelector(url.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // Handle regular navigation
      navigate(url);
    }
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
