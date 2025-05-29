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
import { IssuesManagement } from "@/components/sla/IssuesManagement";
import { IssueDetails } from "@/components/sla/IssueDetails";
import { DocumentManager } from "@/components/DocumentManager";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { ArrowLeft, Calendar, Users, Clock, Target, Play, Pause, Download, Plus, Truck, Upload } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const SLADetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  // Pagination for issues
  const totalPages = Math.ceil(allIssues.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const issues = allIssues.slice(startIndex, startIndex + itemsPerPage);

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

  // Updated category progress to include bugs
  const categoryProgress = [
    { category: "Development", completed: 9, total: 17, percentage: 53 },
    { category: "Testing", completed: 5, total: 8, percentage: 63 },
    { category: "Documentation", completed: 6, total: 7, percentage: 86 },
    { category: "Deployment", completed: 4, total: 6, percentage: 67 },
    { category: "Bugs", completed: bugs.filter(bug => bug.status === 'Done').length, total: bugs.length, percentage: Math.round((bugs.filter(bug => bug.status === 'Done').length / bugs.length) * 100) }
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
              {/* Overview */}
              <div id="overview">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Overview</h1>
                
                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
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
                      <CardTitle className="text-sm font-medium">Deadline</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{slaDetail.deadline}</div>
                      <p className="text-xs text-muted-foreground">Target completion date</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
                      <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-600">3</div>
                      <p className="text-xs text-muted-foreground">Needs attention</p>
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

                {/* Charts Section */}
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
                            <ChartLegend content={<ChartLegendContent />} />
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
                            <ChartLegend content={<ChartLegendContent />} />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Issues Management - using the new refactored component */}
              <IssuesManagement
                allIssues={allIssues}
                selectedIssue={selectedIssue}
                onIssueSelect={setSelectedIssue}
                getStatusColor={getStatusColor}
                getPriorityColor={getPriorityColor}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />

              {/* Issue Details - only show if there's a selected issue */}
              {selectedIssue && (
                <div className="grid grid-cols-1 gap-6">
                  <IssueDetails 
                    selectedIssue={selectedIssue}
                    getStatusColor={getStatusColor}
                  />
                </div>
              )}

              {/* Application Versions */}
              <div id="application-versions">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Application Versions</h1>
                  <div className="flex items-center space-x-2">
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                    <Button size="sm" variant="outline">
                      <Truck className="h-4 w-4 mr-1" />
                      Delivery
                    </Button>
                  </div>
                </div>
                
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
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Version History & Development Status</CardTitle>
                    <div className="text-sm text-gray-600">
                      Page {currentAppPage} of {totalAppPages} ({allApplicationVersions.length} total apps)
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-4">
                              <Checkbox 
                                checked={selectedApps.length === applicationVersions.length}
                                onCheckedChange={(checked) => handleSelectAll(!!checked)}
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
                                  onCheckedChange={(checked) => handleAppSelection(version.id, !!checked)}
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
                                <div className="flex space-x-1">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button 
                                        size="sm" 
                                        variant="ghost"
                                        onClick={() => handleAppAction(version.id, 'propose-release')}
                                      >
                                        <Upload className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Propose Release</p>
                                    </TooltipContent>
                                  </Tooltip>
                                  
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button 
                                        size="sm" 
                                        variant="ghost"
                                        onClick={() => handleAppAction(version.id, 'release')}
                                      >
                                        <Play className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Release</p>
                                    </TooltipContent>
                                  </Tooltip>
                                  
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button 
                                        size="sm" 
                                        variant="ghost"
                                        onClick={() => handleAppAction(version.id, 'delivery')}
                                      >
                                        <Truck className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Delivery</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentAppPage(prev => Math.max(1, prev - 1))}
                        disabled={currentAppPage === 1}
                      >
                        Previous
                      </Button>
                      <span className="text-sm text-gray-600">
                        Page {currentAppPage} of {totalAppPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentAppPage(prev => Math.min(totalAppPages, prev + 1))}
                        disabled={currentAppPage === totalAppPages}
                      >
                        Next
                      </Button>
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
    </TooltipProvider>
  );
};

export default SLADetail;
