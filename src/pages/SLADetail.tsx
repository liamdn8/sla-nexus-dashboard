import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BookmarkNavigation } from "@/components/sla/BookmarkNavigation";
import { IssuesManagementContainer } from "@/components/sla/IssuesManagementContainer";
import { SLADetailHeader } from "@/components/sla/SLADetailHeader";
import { SLAOverviewSection } from "@/components/sla/SLAOverviewSection";
import { SLAApplicationVersions } from "@/components/sla/SLAApplicationVersions";
import { SLADocumentsSection } from "@/components/sla/SLADocumentsSection";
import { TooltipProvider } from "@/components/ui/tooltip";

const SLADetail = () => {
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentAppPage, setCurrentAppPage] = useState(1);
  const itemsPerPage = 5;

  // Mock data - in real app this would come from API
  const slaDetail = {
    id: 'SLA-001',
    title: 'User Authentication System',
    project: 'E-commerce Platform',
    priority: 'High',
    status: 'In Progress',
    progress: 78,
    startDate: '2024-01-15',
    deadline: '2024-06-15',
    assignedTeam: 'Frontend Team',
    estimatedHours: 120,
    actualHours: 95,
    description: 'Implement comprehensive user authentication system with multi-factor authentication, password reset functionality, and user session management.',
  };

  // Generate more issues data for paging
  const allIssues = [
    { id: 'AUTH-001', type: 'Story', title: 'User Authentication System', status: 'In Progress', assignee: 'John Doe', estimate: '8h', worklog: '7h', subtasks: 3, completedSubtasks: 2, epic: 'Authentication Epic', epicId: 'EPIC-002', category: 'Development', completed: 7, total: 9, percentage: 78, priority: 'High' },
    { id: 'AUTH-002', type: 'Task', title: 'Payment Integration', status: 'Planning', assignee: 'Jane Smith', estimate: '12h', worklog: '0h', subtasks: 4, completedSubtasks: 1, epic: 'Payment Epic', epicId: 'EPIC-003', category: 'Development', completed: 2, total: 8, percentage: 25, priority: 'High' },
    { id: 'AUTH-003', type: 'Bug', title: 'Mobile Security Features', status: 'In Progress', assignee: 'Bob Johnson', estimate: '4h', worklog: '2h', subtasks: 2, completedSubtasks: 1, epic: 'Security Epic', epicId: 'EPIC-004', category: 'Testing', completed: 5, total: 8, percentage: 63, priority: 'Critical' },
    { id: 'AUTH-004', type: 'Story', title: 'Patient Portal', status: 'Done', assignee: 'Alice Brown', estimate: '16h', worklog: '15h', subtasks: 5, completedSubtasks: 5, epic: 'Portal Epic', epicId: 'EPIC-005', category: 'Documentation', completed: 6, total: 7, percentage: 86, priority: 'Medium' },
    { id: 'AUTH-005', type: 'Task', title: 'Course Management', status: 'To Do', assignee: 'Charlie Wilson', estimate: '10h', worklog: '0h', subtasks: 3, completedSubtasks: 0, epic: 'Management Epic', epicId: 'EPIC-006', category: 'Deployment', completed: 4, total: 6, percentage: 67, priority: 'Medium' },
    { id: 'AUTH-006', type: 'Story', title: 'User Profile Management', status: 'In Progress', assignee: 'David Lee', estimate: '14h', worklog: '8h', subtasks: 6, completedSubtasks: 3, epic: 'Profile Epic', epicId: 'EPIC-007', category: 'Development', completed: 3, total: 6, percentage: 50, priority: 'High' },
    { id: 'AUTH-007', type: 'Bug', title: 'API Rate Limiting', status: 'Done', assignee: 'Eva Martinez', estimate: '6h', worklog: '5h', subtasks: 2, completedSubtasks: 2, epic: 'API Epic', epicId: 'EPIC-008', category: 'Development', completed: 2, total: 2, percentage: 100, priority: 'Critical' },
    { id: 'AUTH-008', type: 'Task', title: 'Database Optimization', status: 'Planning', assignee: 'Frank Chen', estimate: '20h', worklog: '0h', subtasks: 8, completedSubtasks: 0, epic: 'Performance Epic', epicId: 'EPIC-009', category: 'Development', completed: 0, total: 8, percentage: 0, priority: 'Medium' },
    { id: 'AUTH-009', type: 'Story', title: 'Email Notifications', status: 'In Progress', assignee: 'Grace Kim', estimate: '12h', worklog: '4h', subtasks: 4, completedSubtasks: 1, epic: 'Notification Epic', epicId: 'EPIC-010', category: 'Development', completed: 1, total: 4, percentage: 25, priority: 'Low' },
    { id: 'AUTH-010', type: 'Bug', title: 'Frontend Responsive Design', status: 'To Do', assignee: 'Henry Park', estimate: '8h', worklog: '0h', subtasks: 3, completedSubtasks: 0, epic: 'UI Epic', epicId: 'EPIC-011', category: 'Testing', completed: 0, total: 3, percentage: 0, priority: 'Medium' },
    { id: 'AUTH-011', type: 'Task', title: 'Security Audit', status: 'Done', assignee: 'Ivy Zhang', estimate: '16h', worklog: '16h', subtasks: 5, completedSubtasks: 5, epic: 'Security Epic', epicId: 'EPIC-004', category: 'Testing', completed: 5, total: 5, percentage: 100, priority: 'Critical' },
    { id: 'AUTH-012', type: 'Story', title: 'Third-party Integrations', status: 'Planning', assignee: 'Jack Wong', estimate: '24h', worklog: '0h', subtasks: 10, completedSubtasks: 0, epic: 'Integration Epic', epicId: 'EPIC-012', category: 'Development', completed: 0, total: 10, percentage: 0, priority: 'High' },
  ];

  // Separate bugs from other issues
  const bugs = allIssues.filter(issue => issue.type === 'Bug');
  const otherIssues = allIssues.filter(issue => issue.type !== 'Bug');

  const summary = {
    totalIssues: allIssues.length,
    doneIssues: allIssues.filter(issue => issue.status === 'Done').length,
    inProgressIssues: allIssues.filter(issue => issue.status === 'In Progress').length,
    todoIssues: allIssues.filter(issue => issue.status === 'To Do').length,
    totalWorklog: allIssues.reduce((total, issue) => total + parseInt(issue.worklog.replace('h', '')), 0),
    // Bug summary
    totalBugs: bugs.length,
    doneBugs: bugs.filter(bug => bug.status === 'Done').length,
    inProgressBugs: bugs.filter(bug => bug.status === 'In Progress').length,
    todoBugs: bugs.filter(bug => bug.status === 'To Do').length,
    // Other issues summary
    totalOtherIssues: otherIssues.length,
    doneOtherIssues: otherIssues.filter(issue => issue.status === 'Done').length,
    inProgressOtherIssues: otherIssues.filter(issue => issue.status === 'In Progress').length,
    todoOtherIssues: otherIssues.filter(issue => issue.status === 'To Do').length,
  };

  // Generate more application versions for paging
  const allApplicationVersions = [
    { id: 'app-1', version: 'v1.0.0', status: 'Released', releaseDate: '2024-01-15', environment: 'Production' },
    { id: 'app-2', version: 'v1.1.0', status: 'Delivered', releaseDate: '2024-02-20', environment: 'Production' },
    { id: 'app-3', version: 'v1.2.0', status: 'Pending Release', releaseDate: '2024-03-15', environment: 'Staging' },
    { id: 'app-4', version: 'v1.3.0', status: 'In Progress', releaseDate: '2024-04-10', environment: 'Development' },
    { id: 'app-5', version: 'v1.4.0', status: 'In Progress', releaseDate: '2024-05-01', environment: 'Development' },
    { id: 'app-6', version: 'v1.5.0', status: 'Released', releaseDate: '2024-05-15', environment: 'Production' },
    { id: 'app-7', version: 'v1.6.0', status: 'Delivered', releaseDate: '2024-05-20', environment: 'Production' },
    { id: 'app-8', version: 'v1.7.0', status: 'Pending Release', releaseDate: '2024-05-25', environment: 'Staging' },
    { id: 'app-9', version: 'v1.8.0', status: 'In Progress', releaseDate: '2024-06-01', environment: 'Development' },
    { id: 'app-10', version: 'v1.9.0', status: 'In Progress', releaseDate: '2024-06-10', environment: 'Development' },
  ];

  // Pagination for applications
  const totalAppPages = Math.ceil(allApplicationVersions.length / itemsPerPage);
  const appStartIndex = (currentAppPage - 1) * itemsPerPage;
  const applicationVersions = allApplicationVersions.slice(appStartIndex, appStartIndex + itemsPerPage);

  // App status summary
  const appStatusSummary = {
    released: allApplicationVersions.filter(app => app.status === 'Released').length,
    delivered: allApplicationVersions.filter(app => app.status === 'Delivered').length,
    pendingRelease: allApplicationVersions.filter(app => app.status === 'Pending Release').length,
    inProgress: allApplicationVersions.filter(app => app.status === 'In Progress').length,
  };

  // Updated category progress to include bugs and other issues
  const categoryProgress = [
    { category: "Development", completed: 9, total: 17, percentage: 53 },
    { category: "Testing", completed: 5, total: 8, percentage: 63 },
    { category: "Documentation", completed: 6, total: 7, percentage: 86 },
    { category: "Deployment", completed: 4, total: 6, percentage: 67 },
    { 
      category: "Bugs", 
      completed: bugs.filter(bug => bug.status === 'Done').length, 
      total: bugs.length, 
      percentage: bugs.length > 0 ? Math.round((bugs.filter(bug => bug.status === 'Done').length / bugs.length) * 100) : 0 
    },
    { 
      category: "Other Issues", 
      completed: otherIssues.filter(issue => issue.status === 'Done').length, 
      total: otherIssues.length, 
      percentage: otherIssues.length > 0 ? Math.round((otherIssues.filter(issue => issue.status === 'Done').length / otherIssues.length) * 100) : 0 
    }
  ];

  const chartData = categoryProgress.map(item => ({
    name: item.category,
    completed: item.completed,
    remaining: item.total - item.completed,
    percentage: item.percentage
  }));

  const pieData = [
    { name: 'Completed', value: summary.doneIssues + summary.doneBugs, color: '#10b981' },
    { name: 'In Progress', value: summary.inProgressIssues + summary.inProgressBugs, color: '#3b82f6' },
    { name: 'Pending', value: summary.todoIssues + summary.todoBugs, color: '#f59e0b' }
  ];

  const chartConfig = {
    completed: { label: "Completed", color: "#10b981" },
    remaining: { label: "Remaining", color: "#e5e7eb" }
  };

  // Set first issue as default selection
  React.useEffect(() => {
    if (allIssues.length > 0 && !selectedIssue) {
      setSelectedIssue(allIssues[0]);
    }
  }, [allIssues, selectedIssue]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Planning': return 'bg-yellow-100 text-yellow-800';
      case 'To Do': return 'bg-gray-100 text-gray-800';
      case 'Released': return 'bg-green-100 text-green-800';
      case 'Delivered': return 'bg-blue-100 text-blue-800';
      case 'Pending Release': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAppSelection = (appId: string, checked: boolean) => {
    if (checked) {
      setSelectedApps([...selectedApps, appId]);
    } else {
      setSelectedApps(selectedApps.filter(id => id !== appId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedApps(applicationVersions.map(app => app.id));
    } else {
      setSelectedApps([]);
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on apps:`, selectedApps);
    // Implement bulk actions here
  };

  const handleAppAction = (appId: string, action: string) => {
    console.log(`Performing ${action} on app:`, appId);
    // Implement individual app actions here
  };

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gray-50">
          <AppSidebar />
          
          <main className="flex-1 overflow-auto bg-white" style={{ marginRight: '320px' }}>
            <SLADetailHeader 
              slaDetail={slaDetail}
              getPriorityColor={getPriorityColor}
              getStatusColor={getStatusColor}
            />

            <div className="container mx-auto px-8 py-6 space-y-8">
              {/* Overview */}
              <SLAOverviewSection 
                slaDetail={slaDetail}
                chartData={chartData}
                pieData={pieData}
                chartConfig={chartConfig}
              />

              {/* Issues Management - now using the new container component */}
              <IssuesManagementContainer
                allIssues={allIssues}
                selectedIssue={selectedIssue}
                onIssueSelect={setSelectedIssue}
                getStatusColor={getStatusColor}
                getPriorityColor={getPriorityColor}
                currentPage={currentPage}
                totalPages={Math.ceil(allIssues.length / 5)}
                onPageChange={setCurrentPage}
              />

              {/* Application Versions */}
              <SLAApplicationVersions 
                allApplicationVersions={allApplicationVersions}
                applicationVersions={applicationVersions}
                appStatusSummary={appStatusSummary}
                selectedApps={selectedApps}
                currentAppPage={currentAppPage}
                totalAppPages={totalAppPages}
                getStatusColor={getStatusColor}
                onAppSelection={handleAppSelection}
                onSelectAll={handleSelectAll}
                onBulkAction={handleBulkAction}
                onAppAction={handleAppAction}
                onPageChange={setCurrentAppPage}
              />

              {/* Documents */}
              <SLADocumentsSection />
            </div>
          </main>

          {/* Bookmark Navigation */}
          <BookmarkNavigation 
            onNavigate={handleNavigate}
            activeSection={activeSection}
          />
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default SLADetail;
