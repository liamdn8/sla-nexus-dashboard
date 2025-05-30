
import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSummary } from "@/components/DashboardSummary";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-white">
          <DashboardHeader />
          <div className="container mx-auto px-8 py-6">
            <DashboardSummary />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
