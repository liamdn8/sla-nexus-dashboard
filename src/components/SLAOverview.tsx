
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export const SLAOverview = () => {
  const slaMetrics = [
    { 
      title: "Active SLAs (Epics)", 
      value: 12, 
      status: "active", 
      change: "+2",
      tooltip: "Total number of active SLA agreements mapped to Jira Epics"
    },
    { 
      title: "Stories & Tasks", 
      value: 156, 
      status: "info", 
      change: "+18",
      tooltip: "Total stories and tasks across all Epics (excluding sub-tasks)"
    },
    { 
      title: "In Progress Issues", 
      value: 42, 
      status: "warning", 
      change: "+8",
      tooltip: "Stories and tasks currently being worked on"
    },
    { 
      title: "Completed Issues", 
      value: 98, 
      status: "success", 
      change: "+15",
      tooltip: "Successfully completed stories and tasks"
    },
    { 
      title: "Overdue Epics", 
      value: 3, 
      status: "danger", 
      change: "+1",
      tooltip: "Epics that have exceeded their SLA timeline"
    },
    { 
      title: "Avg. Epic Completion", 
      value: "78%", 
      status: "success", 
      change: "+5%",
      tooltip: "Average completion percentage across all active Epics"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "bg-green-500";
      case "warning": return "bg-yellow-500";
      case "danger": return "bg-red-500";
      case "info": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getTextColor = (status: string) => {
    switch (status) {
      case "success": return "text-green-700";
      case "warning": return "text-yellow-700";
      case "danger": return "text-red-700";
      case "info": return "text-blue-700";
      default: return "text-gray-700";
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">SLA Overview</h2>
          <Badge variant="outline" className="text-blue-600">Jira Epic Mapping Active</Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slaMetrics.map((metric, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Card className="hover:shadow-lg transition-shadow cursor-help">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                      <div className={`flex items-center text-sm ${getTextColor(metric.status)}`}>
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(metric.status)} mr-2`}></div>
                        {metric.change}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>{metric.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};
