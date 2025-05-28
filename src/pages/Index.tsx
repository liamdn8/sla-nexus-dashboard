
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ProgressChecklist } from "@/components/ProgressChecklist";
import { SLAOverview } from "@/components/SLAOverview";
import { SLAReportBoard } from "@/components/SLAReportBoard";
import { ApplicationStatus } from "@/components/ApplicationStatus";
import { DocumentManager } from "@/components/DocumentManager";
import { BookmarkNavigation } from "@/components/sla/BookmarkNavigation";

const Index = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        {/* Bookmark Navigation - Pinned to left */}
        <div className="w-64 flex-shrink-0 bg-white border-r border-gray-200">
          <div className="sticky top-0 h-screen overflow-y-auto">
            <BookmarkNavigation 
              onNavigate={handleNavigate}
              activeSection={activeSection}
            />
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <DashboardHeader />
          <div className="container mx-auto px-6 py-8 space-y-8">
            <section id="overview">
              <ProgressChecklist />
            </section>
            
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
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
