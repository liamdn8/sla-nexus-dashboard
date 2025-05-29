
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BookmarkNavigation } from "@/components/sla/BookmarkNavigation";
import { SummaryStats } from "@/components/sla/SummaryStats";
import { IssuesTable } from "@/components/sla/IssuesTable";
import { IssueDetails } from "@/components/sla/IssueDetails";
import { DocumentManager } from "@/components/DocumentManager";
import { ArrowLeft, Calendar, Users, Clock, Target, MoreHorizontal, Play, Pause, Download } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const SLADetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);

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

  // Merged issues from SLA Progress Details and Issues
  const issues = [
    { id: 'AUTH-001', type: 'Story', title: 'User Authentication System', status: 'In Progress', assignee: 'John Doe', estimate: '8h', worklog: '7h', subtasks: 3, epic: 'Authentication Epic', epicId: 'EPIC-002', category: 'Development', completed: 7, total: 9, percentage: 78, priority: 'High' },
    { id: 'AUTH-002', type: 'Task', title: 'Payment Integration', status: 'Planning', assignee: 'Jane Smith', estimate: '12h', worklog: '0h', subtasks: 4, epic: 'Payment Epic', epicId: 'EPIC-003', category: 'Development', completed: 2, total: 8, percentage: 25, priority: 'High' },
    { id: 'AUTH-003', type: 'Bug', title: 'Mobile Security Features', status: 'In Progress', assignee: 'Bob Johnson', estimate: '4h', worklog: '2h', subtasks: 2, epic: 'Security Epic', epicId: 'EPIC-004', category: 'Testing', completed: 5, total: 8, percentage: 63, priority: 'Critical' },
    { id: 'AUTH-004', type: 'Story', title: 'Patient Portal', status: 'Done', assignee: 'Alice Brown', estimate: '16h', worklog: '15h', subtasks: 5, epic: 'Portal Epic', epicId: 'EPIC-005', category: 'Documentation', completed: 6, total: 7, percentage: 86, priority: 'Medium' },
    { id: 'AUTH-005', type: 'Task', title: 'Course Management', status: 'To Do', assignee: 'Charlie Wilson', estimate: '10h', worklog: '0h', subtasks: 3, epic: 'Management Epic', epicId: 'EPIC-006', category: 'Deployment', completed: 4, total: 6, percentage: 67, priority: 'Medium' },
  ];

  const summary = {
    totalIssues: issues.length,
    doneIssues: issues.filter(issue => issue.status === 'Done').length,
    inProgressIssues: issues.filter(issue => issue.status === 'In Progress').length,
    todoIssues: issues.filter(issue => issue.status === 'To Do').length,
    totalWorklog: issues.reduce((total, issue) => total + parseInt(issue.worklog.replace('h', '')), 0),
  };

  const applicationVersions = [
    { id: 'app-1', version: 'v1.0.0', status: 'Released', releaseDate: '2024-01-15', environment: 'Production' },
    { id: 'app-2', version: 'v1.1.0', status: 'Delivered', releaseDate: '2024-02-20', environment: 'Production' },
    { id: 'app-3', version: 'v1.2.0', status: 'Pending Release', releaseDate: '2024-03-15', environment: 'Staging' },
    { id: 'app-4', version: 'v1.3.0', status: 'In Progress', releaseDate: '2024-04-10', environment: 'Development' },
    { id: 'app-5', version: 'v1.4.0', status: 'In Progress', releaseDate: '2024-05-01', environment: 'Development' },
  ];

  // App status summary
  const appStatusSummary = {
    released: applicationVersions.filter(app => app.status === 'Released').length,
    delivered: applicationVersions.filter(app => app.status === 'Delivered').length,
    pendingRelease: applicationVersions.filter(app => app.status === 'Pending Release').length,
    inProgress: applicationVersions.filter(app => app.status === 'In Progress').length,
  };

  // Progress checklist data merged into overview
  const overallStats = {
    totalEpics: 12,
    completedEpics: 8,
    totalIssues: 156,
    completedIssues: 98,
    inProgressIssues: 42,
    pendingIssues: 16,
    overdueTasks: 3
  };

  const categoryProgress = [
    { category: "Development", completed: 9, total: 17, percentage: 53 },
    { category: "Testing", completed: 5, total: 8, percentage: 63 },
    { category: "Documentation", completed: 6, total: 7, percentage: 86 },
    { category: "Deployment", completed: 4, total: 6, percentage: 67 }
  ];

  const chartData = categoryProgress.map(item => ({
    name: item.category,
    completed: item.completed,
    remaining: item.total - item.completed,
    percentage: item.percentage
  }));

  const pieData = [
    { name: 'Completed', value: overallStats.completedIssues, color: '#10b981' },
    { name: 'In Progress', value: overallStats.inProgressIssues, color: '#3b82f6' },
    { name: 'Pending', value: overallStats.pendingIssues, color: '#f59e0b' }
  ];

  const chartConfig = {
    completed: { label: "Completed", color: "#10b981" },
    remaining: { label: "Remaining", color: "#e5e7eb" }
  };

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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-white" style={{ marginRight: '320px' }}>
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

          <div className="container mx-auto px-8 py-6 space-y-8">
            {/* Overview - Merged with Progress Checklist */}
            <div id="overview">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Overview</h1>
              
              {/* Overview Cards - Simplified */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
              </div>

              {/* Description */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{slaDetail.description}</p>
                </CardContent>
              </Card>

              {/* Charts Section - From Progress Checklist */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Category Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig}>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="completed" fill="var(--color-completed)" />
                          <Bar dataKey="remaining" fill="var(--color-remaining)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Issue Status Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig}>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="value"
                            label={({ name, percentage }) => `${name}: ${percentage}%`}
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Issues Management - Merged Issues Overview and Issues Management */}
            <div id="issues-management">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Issues Management</h1>
              
              {/* Issues Status Summary */}
              <div className="mb-8">
                <SummaryStats summary={summary} />
              </div>

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
              
              {/* App Status Summary */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="text-sm text-green-600 font-medium">Released</div>
                  <div className="text-xl font-bold text-green-700">{appStatusSummary.released}</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="text-sm text-blue-600 font-medium">Delivered</div>
                  <div className="text-xl font-bold text-blue-700">{appStatusSummary.delivered}</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="text-sm text-yellow-600 font-medium">Pending Release</div>
                  <div className="text-xl font-bold text-yellow-700">{appStatusSummary.pendingRelease}</div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="text-sm text-gray-600 font-medium">In Progress</div>
                  <div className="text-xl font-bold text-gray-700">{appStatusSummary.inProgress}</div>
                </div>
              </div>

              {/* Bulk Actions */}
              {selectedApps.length > 0 && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-700">
                      {selectedApps.length} application(s) selected
                    </span>
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => handleBulkAction('deploy')}>
                        <Play className="h-4 w-4 mr-1" />
                        Deploy
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleBulkAction('pause')}>
                        <Pause className="h-4 w-4 mr-1" />
                        Pause
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleBulkAction('export')}>
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Version History & Development Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4">
                            <Checkbox 
                              checked={selectedApps.length === applicationVersions.length}
                              onCheckedChange={handleSelectAll}
                            />
                          </th>
                          <th className="text-left p-4">Version</th>
                          <th className="text-left p-4">Status</th>
                          <th className="text-left p-4">Release Date</th>
                          <th className="text-left p-4">Environment</th>
                          <th className="text-left p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applicationVersions.map((version, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="p-4">
                              <Checkbox 
                                checked={selectedApps.includes(version.id)}
                                onCheckedChange={(checked) => handleAppSelection(version.id, checked)}
                              />
                            </td>
                            <td className="p-4 font-medium">{version.version}</td>
                            <td className="p-4">
                              <Badge className={getStatusColor(version.status)}>
                                {version.status}
                              </Badge>
                            </td>
                            <td className="p-4 text-sm text-gray-600">{version.releaseDate}</td>
                            <td className="p-4 text-sm text-gray-600">{version.environment}</td>
                            <td className="p-4">
                              <Button size="sm" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Documents */}
            <div id="documents">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Documents</h1>
              <DocumentManager />
            </div>
          </div>
        </main>

        {/* Bookmark Navigation */}
        <BookmarkNavigation 
          onNavigate={handleNavigate}
          activeSection={activeSection}
        />
      </div>
    </SidebarProvider>
  );
};

export default SLADetail;
