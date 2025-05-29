
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ProgressChecklist } from "@/components/ProgressChecklist";
import { BookmarkNavigation } from "@/components/sla/BookmarkNavigation";
import { SummaryStats } from "@/components/sla/SummaryStats";
import { IssuesTable } from "@/components/sla/IssuesTable";
import { IssueDetails } from "@/components/sla/IssueDetails";
import { DocumentManager } from "@/components/DocumentManager";
import { ArrowLeft, Calendar, Users, Clock, Target } from "lucide-react";

const SLADetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedIssue, setSelectedIssue] = useState(null);

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

  const epicStories = [
    { id: 'EPIC-001', title: 'User Registration Epic', status: 'Done', assignee: 'John Doe', issues: 8, completed: 8 },
    { id: 'EPIC-002', title: 'Authentication Epic', status: 'In Progress', assignee: 'Jane Smith', issues: 12, completed: 9 },
    { id: 'EPIC-003', title: 'Security Epic', status: 'To Do', assignee: 'Bob Johnson', issues: 6, completed: 2 },
  ];

  const issues = [
    { id: 'AUTH-001', type: 'Story', title: 'Login Form Implementation', status: 'Done', assignee: 'John Doe', estimate: '8h', worklog: '7h', subtasks: 3, epic: 'Authentication Epic', epicId: 'EPIC-002' },
    { id: 'AUTH-002', type: 'Task', title: 'Registration Flow', status: 'Done', assignee: 'Jane Smith', estimate: '12h', worklog: '11h', subtasks: 4, epic: 'User Registration Epic', epicId: 'EPIC-001' },
    { id: 'AUTH-003', type: 'Bug', title: 'Password Reset Issue', status: 'In Progress', assignee: 'Bob Johnson', estimate: '4h', worklog: '2h', subtasks: 2, epic: 'Authentication Epic', epicId: 'EPIC-002' },
    { id: 'AUTH-004', type: 'Story', title: 'Multi-Factor Authentication', status: 'To Do', assignee: 'Alice Brown', estimate: '16h', worklog: '0h', subtasks: 5, epic: 'Security Epic', epicId: 'EPIC-003' },
  ];

  const summary = {
    totalIssues: issues.length,
    doneIssues: issues.filter(issue => issue.status === 'Done').length,
    inProgressIssues: issues.filter(issue => issue.status === 'In Progress').length,
    todoIssues: issues.filter(issue => issue.status === 'To Do').length,
    totalWorklog: issues.reduce((total, issue) => total + parseInt(issue.worklog.replace('h', '')), 0),
  };

  const applicationVersions = [
    { version: 'v1.0.0', status: 'Released', releaseDate: '2024-01-15', environment: 'Production' },
    { version: 'v1.1.0', status: 'Delivered', releaseDate: '2024-02-20', environment: 'Production' },
    { version: 'v1.2.0', status: 'Pending Release', releaseDate: '2024-03-15', environment: 'Staging' },
    { version: 'v1.3.0', status: 'In Progress', releaseDate: '2024-04-10', environment: 'Development' },
  ];

  // Set first issue as default selection
  React.useEffect(() => {
    if (issues.length > 0 && !selectedIssue) {
      setSelectedIssue(issues[0]);
    }
  }, [issues, selectedIssue]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'To Do': return 'bg-gray-100 text-gray-800';
      case 'Released': return 'bg-green-100 text-green-800';
      case 'Delivered': return 'bg-blue-100 text-blue-800';
      case 'Pending Release': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-white">
          <div className="bg-white border-b border-gray-200 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/sla-list')}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to SLA List</span>
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{slaDetail.title}</h1>
                  <p className="text-gray-600 mt-1">{slaDetail.project}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getPriorityColor(slaDetail.priority)}>
                  {slaDetail.priority}
                </Badge>
                <Badge className={getStatusColor(slaDetail.status)}>
                  {slaDetail.status}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="flex-1 container mx-auto px-8 py-6 space-y-8">
              {/* Overview Cards */}
              <div id="overview" className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Progress</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{slaDetail.progress}%</div>
                    <Progress value={slaDetail.progress} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{slaDetail.actualHours}h</div>
                    <p className="text-xs text-muted-foreground">of {slaDetail.estimatedHours}h estimated</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Team</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold">{slaDetail.assignedTeam}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Deadline</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold">{new Date(slaDetail.deadline).toLocaleDateString()}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{slaDetail.description}</p>
                </CardContent>
              </Card>

              {/* Progress Checklist */}
              <div id="progress-checklist">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Progress Checklist</h1>
                <ProgressChecklist />
              </div>

              {/* Epic Stories */}
              <div id="epic-stories">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Epic Stories</h1>
                <Card>
                  <CardHeader>
                    <CardTitle>Epic Stories Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {epicStories.map((epic) => (
                        <div key={epic.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{epic.title}</p>
                            <p className="text-sm text-gray-500">{epic.id} • {epic.assignee}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-sm">
                              <span className="font-medium">{epic.completed}/{epic.issues}</span> issues
                            </div>
                            <Progress value={(epic.completed / epic.issues) * 100} className="w-24" />
                            <Badge className={getStatusColor(epic.status)}>
                              {epic.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Issues Status Summary */}
              <div id="issues-summary">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Issues Summary</h1>
                <SummaryStats summary={summary} />
              </div>

              {/* Issues Management */}
              <div id="issues-management">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Issues Management</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <IssuesTable 
                    issues={issues}
                    selectedIssue={selectedIssue}
                    onIssueSelect={setSelectedIssue}
                    getStatusColor={getStatusColor}
                  />
                  <IssueDetails 
                    selectedIssue={selectedIssue}
                    getStatusColor={getStatusColor}
                  />
                </div>
              </div>

              {/* Application Versions */}
              <div id="application-versions">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Application Versions</h1>
                <Card>
                  <CardHeader>
                    <CardTitle>Version History & Development Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-4">Version</th>
                            <th className="text-left p-4">Status</th>
                            <th className="text-left p-4">Release Date</th>
                            <th className="text-left p-4">Environment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {applicationVersions.map((version, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                              <td className="p-4 font-medium">{version.version}</td>
                              <td className="p-4">
                                <Badge className={getStatusColor(version.status)}>
                                  {version.status}
                                </Badge>
                              </td>
                              <td className="p-4 text-sm text-gray-600">{version.releaseDate}</td>
                              <td className="p-4 text-sm text-gray-600">{version.environment}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Document Management */}
              <div id="documents">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Documents</h1>
                <DocumentManager />
              </div>
            </div>

            {/* Bookmark Navigation */}
            <div className="w-80">
              <BookmarkNavigation 
                onNavigate={handleNavigate}
                activeSection={activeSection}
              />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SLADetail;
