
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Target } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface SLA {
  id: string;
  title: string;
  customer: string;
  status: string;
  priority: string;
  startDate: string;
  endDate: string;
  progress: number;
  description: string;
  requirements: string[];
  metrics: {
    uptime: number;
    responseTime: number;
    issuesResolved: number;
    totalIssues: number;
  };
}

interface SLAOverviewSectionProps {
  sla: SLA;
}

export const SLAOverviewSection = ({ sla }: SLAOverviewSectionProps) => {
  // Mock chart data - in a real app this would come from props or API
  const chartData = [
    { name: 'Development', completed: 80, remaining: 20 },
    { name: 'Testing', completed: 60, remaining: 40 },
    { name: 'Deployment', completed: 45, remaining: 55 },
    { name: 'Documentation', completed: 90, remaining: 10 },
  ];

  const pieData = [
    { name: 'Resolved', value: sla.metrics.issuesResolved, color: '#10b981', percentage: Math.round((sla.metrics.issuesResolved / sla.metrics.totalIssues) * 100) },
    { name: 'Open', value: sla.metrics.totalIssues - sla.metrics.issuesResolved, color: '#f59e0b', percentage: Math.round(((sla.metrics.totalIssues - sla.metrics.issuesResolved) / sla.metrics.totalIssues) * 100) },
  ];

  const chartConfig = {
    completed: {
      label: "Completed",
      color: "#10b981",
    },
    remaining: {
      label: "Remaining", 
      color: "#f59e0b",
    },
  };

  return (
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
            <div className="text-2xl font-bold">{sla.progress}%</div>
            <Progress value={sla.progress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sla.metrics.uptime}%</div>
            <p className="text-xs text-muted-foreground">Current uptime</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">End Date</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sla.endDate}</div>
            <p className="text-xs text-muted-foreground">Target completion date</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{sla.metrics.totalIssues - sla.metrics.issuesResolved}</div>
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
          <p className="text-gray-700">{sla.description}</p>
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            {sla.requirements.map((requirement, index) => (
              <li key={index} className="text-gray-700">{requirement}</li>
            ))}
          </ul>
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
  );
};
