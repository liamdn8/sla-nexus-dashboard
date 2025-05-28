
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
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-white">
          <DashboardHeader />
          <div className="container mx-auto px-8 py-6 space-y-10">
            <section id="overview" className="scroll-mt-20">
              <ProgressChecklist />
            </section>
            
            <section id="sla-overview" className="scroll-mt-20">
              <SLAOverview />
            </section>
            
            <section id="sla-board" className="scroll-mt-20">
              <SLAReportBoard />
            </section>
            
            <section id="applications" className="scroll-mt-20">
              <ApplicationStatus />
            </section>
            
            <section id="documents" className="scroll-mt-20">
              <DocumentManager />
            </section>
          </div>
        </main>

        {/* Bookmark Navigation - Pinned to right */}
        <div className="w-80 flex-shrink-0 bg-white shadow-lg">
          <div className="sticky top-0 h-screen overflow-y-auto">
            <BookmarkNavigation 
              onNavigate={handleNavigate}
              activeSection={activeSection}
            />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
