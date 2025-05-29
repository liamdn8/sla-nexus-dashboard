
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';

export const ProgressChecklist = () => {
  const navigate = useNavigate();

  const slaProgress = [
    { 
      id: 'SLA-001', 
      title: 'User Authentication System', 
      category: "Development", 
      completed: 7, 
      total: 9, 
      percentage: 78,
      priority: 'High',
      status: 'In Progress'
    },
    { 
      id: 'SLA-002', 
      title: 'Payment Integration', 
      category: "Development", 
      completed: 2, 
      total: 8, 
      percentage: 25,
      priority: 'High',
      status: 'Planning'
    },
    { 
      id: 'SLA-003', 
      title: 'Mobile Security Features', 
      category: "Testing", 
      completed: 5, 
      total: 8, 
      percentage: 63,
      priority: 'Critical',
      status: 'In Progress'
    },
    { 
      id: 'SLA-004', 
      title: 'Patient Portal', 
      category: "Documentation", 
      completed: 6, 
      total: 7, 
      percentage: 86,
      priority: 'Medium',
      status: 'Done'
    },
    { 
      id: 'SLA-005', 
      title: 'Course Management', 
      category: "Deployment", 
      completed: 4, 
      total: 6, 
      percentage: 67,
      priority: 'Medium',
      status: 'To Do'
    }
  ];

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Planning': return 'bg-yellow-100 text-yellow-800';
      case 'To Do': return 'bg-gray-100 text-gray-800';
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

  const handleSLAClick = (slaId: string) => {
    navigate(`/sla-detail/${slaId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Project Progress Overview</h2>
        <Badge variant="outline" className="text-green-600">
          {Math.round((overallStats.completedIssues / overallStats.totalIssues) * 100)}% Complete
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active SLAs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{slaProgress.length}</div>
            <p className="text-sm text-green-600">{slaProgress.filter(sla => sla.status === 'Done').length} completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalIssues}</div>
            <p className="text-sm text-blue-600">{overallStats.inProgressIssues} in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round((overallStats.completedIssues / overallStats.totalIssues) * 100)}%
            </div>
            <Progress value={(overallStats.completedIssues / overallStats.totalIssues) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Overdue Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overallStats.overdueTasks}</div>
            <p className="text-sm text-gray-600">Needs attention</p>
          </CardContent>
        </Card>
      </div>

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

      {/* SLA Progress Details */}
      <Card>
        <CardHeader>
          <CardTitle>SLA Progress Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {slaProgress.map((sla, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSLAClick(sla.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    sla.percentage >= 80 ? 'bg-green-500' : 
                    sla.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <div className="font-medium">{sla.title}</div>
                    <div className="text-sm text-gray-500">{sla.category} • {sla.completed}/{sla.total} tasks</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getPriorityColor(sla.priority)} variant="outline">
                    {sla.priority}
                  </Badge>
                  <Badge className={getStatusColor(sla.status)}>
                    {sla.status}
                  </Badge>
                  <div className="w-32">
                    <Progress value={sla.percentage} />
                  </div>
                  <div className="text-sm font-medium text-gray-600 min-w-12">
                    {sla.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Category Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryProgress.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="font-medium">{category.category}</div>
                  <Badge variant="outline">
                    {category.completed}/{category.total}
                  </Badge>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32">
                    <Progress value={category.percentage} />
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    {category.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
