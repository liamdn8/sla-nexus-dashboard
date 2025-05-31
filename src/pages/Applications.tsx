
import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ApplicationStatus } from "@/components/ApplicationStatus";
import { ApplicationSummary } from "@/components/ApplicationSummary";

const Applications = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-white">
          <div className="bg-white border-b border-gray-200 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
                <p className="text-gray-600 mt-1">Manage and monitor application status and deployments</p>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-8 py-6 space-y-6">
            <ApplicationSummary />
            <ApplicationStatus />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Applications;
