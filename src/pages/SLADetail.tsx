
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SLADetailHeader } from "@/components/sla/SLADetailHeader";
import { SLAOverviewSection } from "@/components/sla/SLAOverviewSection";
import { SLAApplicationVersions } from "@/components/sla/SLAApplicationVersions";
import { SLADocumentsSection } from "@/components/sla/SLADocumentsSection";
import { IssuesManagementContainer } from "@/components/sla/IssuesManagementContainer";

interface ApplicationVersion {
  id: string;
  application: string;
  version: string;
  status: string;
  releaseDate: string;
  environment: string;
}

interface Issue {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  assignee: string;
  createdDate: string;
  category: string;
}

const SLADetail = () => {
  const { id } = useParams();
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  // Mock SLA data
  const sla = {
    id: id || 'SLA-001',
    title: 'E-commerce Platform SLA',
    customer: 'Acme Corporation',
    status: 'Active',
    priority: 'High',
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    progress: 75,
    description: 'Service Level Agreement for the main e-commerce platform including uptime guarantees, performance metrics, and support response times.',
    requirements: [
      'Minimum 99.9% uptime',
      'Response time < 2 seconds',
      'Support response within 4 hours',
      'Monthly performance reports'
    ],
    metrics: {
      uptime: 99.8,
      responseTime: 1.8,
      issuesResolved: 45,
      totalIssues: 50
    }
  };

  // Mock application versions data with the required 'application' property
  const applicationVersions: ApplicationVersion[] = [
    { id: 'v1', application: 'Frontend App', version: '2.1.0', status: 'Active', releaseDate: '2024-01-15', environment: 'Production' },
    { id: 'v2', application: 'Backend API', version: '1.8.5', status: 'Active', releaseDate: '2024-01-10', environment: 'Production' },
    { id: 'v3', application: 'Payment Service', version: '3.2.1', status: 'Staging', releaseDate: '2024-01-20', environment: 'Staging' },
  ];

  const developmentVersions: ApplicationVersion[] = [
    { id: 'dv1', application: 'Frontend App', version: '2.2.0-beta', status: 'Development', releaseDate: '2024-01-25', environment: 'Development' },
    { id: 'dv2', application: 'Backend API', version: '1.9.0-alpha', status: 'Development', releaseDate: '2024-01-22', environment: 'Development' },
  ];

  const handleIssueSelect = (issue: Issue) => {
    setSelectedIssue(issue);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <SidebarTrigger />
          <div className="p-6 space-y-6">
            <SLADetailHeader sla={sla} />
            
            <div className="grid grid-cols-3 gap-6">
              {/* Left Column - Overview and Application Versions */}
              <div className="col-span-2 space-y-6">
                <SLAOverviewSection sla={sla} />
                <SLAApplicationVersions 
                  applicationVersions={applicationVersions}
                  developmentVersions={developmentVersions}
                />
              </div>

              {/* Right Column - Documents */}
              <div className="space-y-6">
                <SLADocumentsSection />
              </div>
            </div>

            {/* Issues Management Section */}
            <IssuesManagementContainer 
              selectedIssue={selectedIssue}
              onIssueSelect={handleIssueSelect}
            />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SLADetail;
