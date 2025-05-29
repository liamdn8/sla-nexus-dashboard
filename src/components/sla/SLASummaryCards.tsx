
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, CheckCircle, AlertTriangle } from "lucide-react";

interface SLAData {
  id: string;
  title: string;
  project: string;
  priority: string;
  status: string;
  progress: number;
  totalStories: number;
  completedStories: number;
  totalTasks: number;
  completedTasks: number;
  estimatedHours: number;
  actualHours: number;
  deadline: string;
}

interface SLASummaryCardsProps {
  slaData: SLAData[];
}

export const SLASummaryCards = ({ slaData }: SLASummaryCardsProps) => {
  const totalSLAs = slaData.length;
  const completedSLAs = slaData.filter(sla => sla.status === 'Done').length;
  const inProgressSLAs = slaData.filter(sla => sla.status === 'In Progress').length;
  const overdueSLAs = slaData.filter(sla => {
    const deadline = new Date(sla.deadline);
    const today = new Date();
    return deadline < today && sla.status !== 'Done';
  }).length;

  const totalEstimatedHours = slaData.reduce((sum, sla) => sum + sla.estimatedHours, 0);
  const totalActualHours = slaData.reduce((sum, sla) => sum + sla.actualHours, 0);
  const totalStories = slaData.reduce((sum, sla) => sum + sla.totalStories, 0);
  const completedStories = slaData.reduce((sum, sla) => sum + sla.completedStories, 0);

  const averageProgress = totalSLAs > 0 
    ? Math.round(slaData.reduce((sum, sla) => sum + sla.progress, 0) / totalSLAs)
    : 0;

  const summaryCards = [
    {
      title: "Total SLAs",
      value: totalSLAs,
      description: `${completedSLAs} completed, ${inProgressSLAs} in progress`,
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Average Progress",
      value: `${averageProgress}%`,
      description: `${completedStories}/${totalStories} stories completed`,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Time Tracking",
      value: `${totalActualHours}h`,
      description: `${totalEstimatedHours}h estimated`,
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Overdue SLAs",
      value: overdueSLAs,
      description: overdueSLAs > 0 ? "Requires attention" : "All on track",
      icon: AlertTriangle,
      color: overdueSLAs > 0 ? "text-red-600" : "text-green-600",
      bgColor: overdueSLAs > 0 ? "bg-red-50" : "bg-green-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryCards.map((card, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {card.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${card.bgColor}`}>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {card.value}
            </div>
            <p className="text-sm text-gray-500">
              {card.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
