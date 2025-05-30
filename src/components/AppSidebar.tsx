
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
import { FileText, List, Smartphone, Rocket, Server, Building, Database, Settings, Users, Link, GitBranch, User, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const mainItems = [
  {
    title: "Dashboard Home",
    url: "/dashboard",
    icon: Home,
  },
];

const developmentItems = [
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
];

const deploymentItems = [
  {
    title: "Customers",
    url: "/customers",
    icon: Building,
  },
  {
    title: "Environment Management",
    url: "/environment-management",
    icon: Server,
  },
  {
    title: "CNF List",
    url: "/cnf-list",
    icon: Database,
  },
  {
    title: "Environment Mapping",
    url: "/settings/environment-mapping",
    icon: Link,
  },
];

const settingsItems = [
  {
    title: "External Tools",
    url: "/settings/external-tools",
    icon: Link,
  },
  {
    title: "Development Mapping",
    url: "/settings/development-mapping",
    icon: GitBranch,
  },
  {
    title: "System Settings",
    url: "/settings/system",
    icon: Settings,
  },
  {
    title: "Account Settings",
    url: "/settings/account",
    icon: User,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (url: string) => {
    navigate(url);
  };

  const isActive = (url: string) => {
    return location.pathname === url;
  };

  return (
    <Sidebar className="border-r border-gray-200 bg-gray-900">
      <SidebarHeader className="px-6 py-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">SLA Dashboard</h2>
        <p className="text-sm text-gray-400 mt-1">Project Management</p>
      </SidebarHeader>
      <SidebarContent className="bg-gray-900">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => handleNavClick(item.url)}
                    className={`cursor-pointer text-gray-300 hover:text-white hover:bg-gray-800 transition-colors ${
                      isActive(item.url) ? 'bg-gray-800 text-white' : ''
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider">Development</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {developmentItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => handleNavClick(item.url)}
                    className={`cursor-pointer text-gray-300 hover:text-white hover:bg-gray-800 transition-colors ${
                      isActive(item.url) ? 'bg-gray-800 text-white' : ''
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider">Deployment</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {deploymentItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => handleNavClick(item.url)}
                    className={`cursor-pointer text-gray-300 hover:text-white hover:bg-gray-800 transition-colors ${
                      isActive(item.url) ? 'bg-gray-800 text-white' : ''
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider">Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => handleNavClick(item.url)}
                    className={`cursor-pointer text-gray-300 hover:text-white hover:bg-gray-800 transition-colors ${
                      isActive(item.url) ? 'bg-gray-800 text-white' : ''
                    }`}
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
