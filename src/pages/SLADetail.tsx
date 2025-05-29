
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
  type: string;
  title: string;
  status: string;
  assignee: string;
  estimate: string;
  worklog: string;
  subtasks: number;
  completedSubtasks: number;
  epic: string;
  epicId: string;
  category: string;
  completed: number;
  total: number;
  percentage: number;
  priority: string;
}

const SLADetail = () => {
  const { id } = useParams();
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

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

  // Mock issues data with all required properties
  const allIssues: Issue[] = [
    {
      id: 'ISS-001',
      type: 'Bug',
      title: 'Login page not responsive on mobile',
      status: 'In Progress',
      assignee: 'John Doe',
      estimate: '4h',
      worklog: '2h',
      subtasks: 3,
      completedSubtasks: 1,
      epic: 'Mobile Optimization',
      epicId: 'EPIC-001',
      category: 'Frontend',
      completed: 1,
      total: 3,
      percentage: 33,
      priority: 'High'
    },
    {
      id: 'ISS-002',
      type: 'Story',
      title: 'Implement user dashboard',
      status: 'Done',
      assignee: 'Jane Smith',
      estimate: '8h',
      worklog: '8h',
      subtasks: 5,
      completedSubtasks: 5,
      epic: 'User Experience',
      epicId: 'EPIC-002',
      category: 'Frontend',
      completed: 5,
      total: 5,
      percentage: 100,
      priority: 'Medium'
    },
    {
      id: 'ISS-003',
      type: 'Task',
      title: 'Database migration script',
      status: 'To Do',
      assignee: 'Bob Johnson',
      estimate: '6h',
      worklog: '0h',
      subtasks: 2,
      completedSubtasks: 0,
      epic: 'Infrastructure',
      epicId: 'EPIC-003',
      category: 'Backend',
      completed: 0,
      total: 2,
      percentage: 0,
      priority: 'Low'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'done':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'to do':
        return 'bg-gray-100 text-gray-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleIssueSelect = (issue: Issue) => {
    setSelectedIssue(issue);
  };

  const totalPages = Math.ceil(allIssues.length / 5);

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
              allIssues={allIssues}
              selectedIssue={selectedIssue}
              onIssueSelect={handleIssueSelect}
              getStatusColor={getStatusColor}
              getPriorityColor={getPriorityColor}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SLADetail;
