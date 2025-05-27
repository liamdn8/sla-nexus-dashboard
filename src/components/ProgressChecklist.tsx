
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const ProgressChecklist = () => {
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
    { category: "Development", completed: 7, total: 9, percentage: 78 },
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
            <CardTitle className="text-sm font-medium text-gray-600">Active Epics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalEpics}</div>
            <p className="text-sm text-green-600">{overallStats.completedEpics} completed</p>
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

      {/* Category Details */}
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
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
