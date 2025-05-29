
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ProgressChecklist } from "@/components/ProgressChecklist";
import { ArrowLeft, Calendar, Users, Clock, Target } from "lucide-react";

const SLADetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
    stories: [
      { id: 'AUTH-001', title: 'Login Form Implementation', status: 'Done', assignee: 'John Doe' },
      { id: 'AUTH-002', title: 'Registration Flow', status: 'Done', assignee: 'Jane Smith' },
      { id: 'AUTH-003', title: 'Password Reset', status: 'In Progress', assignee: 'Bob Johnson' },
      { id: 'AUTH-004', title: 'Multi-Factor Authentication', status: 'To Do', assignee: 'Alice Brown' },
    ],
    tasks: [
      { id: 'TASK-001', title: 'Setup authentication middleware', status: 'Done' },
      { id: 'TASK-002', title: 'Design login UI components', status: 'Done' },
      { id: 'TASK-003', title: 'Implement JWT token handling', status: 'In Progress' },
      { id: 'TASK-004', title: 'Add form validation', status: 'To Do' },
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'To Do': return 'bg-gray-100 text-gray-800';
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

          <div className="container mx-auto px-8 py-6 space-y-8">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
            <div>
              <ProgressChecklist />
            </div>

            {/* Stories and Tasks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Stories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {slaDetail.stories.map((story) => (
                      <div key={story.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{story.title}</p>
                          <p className="text-sm text-gray-500">{story.id} • {story.assignee}</p>
                        </div>
                        <Badge className={getStatusColor(story.status)}>
                          {story.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {slaDetail.tasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-gray-500">{task.id}</p>
                        </div>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SLADetail;
