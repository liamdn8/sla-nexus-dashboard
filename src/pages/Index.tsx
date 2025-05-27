
import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { SLAOverview } from "@/components/SLAOverview";
import { SLAReportBoard } from "@/components/SLAReportBoard";
import { ApplicationStatus } from "@/components/ApplicationStatus";
import { DocumentManager } from "@/components/DocumentManager";
import { ProgressChecklist } from "@/components/ProgressChecklist";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <DashboardHeader />
          <div className="container mx-auto px-6 py-8 space-y-8">
            <section id="sla-overview">
              <SLAOverview />
            </section>
            
            <section id="sla-board">
              <SLAReportBoard />
            </section>
            
            <section id="applications">
              <ApplicationStatus />
            </section>
            
            <section id="documents">
              <DocumentManager />
            </section>
            
            <section id="progress">
              <ProgressChecklist />
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
