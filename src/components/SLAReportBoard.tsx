
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export const SLAReportBoard = () => {
  const slaEpics = [
    {
      id: "EPIC-001",
      title: "User Authentication System",
      status: "In Progress",
      stories: 8,
      tasks: 6,
      subtasks: 12,
      resolved: 11,
      estimation: "5 days",
      worklog: "32h",
      bugs: 2,
      priority: "High",
      slaDeadline: "2024-06-15"
    },
    {
      id: "EPIC-002", 
      title: "Payment Integration",
      status: "Planning",
      stories: 6,
      tasks: 4,
      subtasks: 8,
      resolved: 0,
      estimation: "8 days",
      worklog: "0h",
      bugs: 0,
      priority: "Medium",
      slaDeadline: "2024-07-01"
    },
    {
      id: "EPIC-003",
      title: "Mobile App Release",
      status: "Done",
      stories: 10,
      tasks: 8,
      subtasks: 15,
      resolved: 18,
      estimation: "12 days",
      worklog: "96h",
      bugs: 1,
      priority: "High",
      slaDeadline: "2024-05-30"
    },
    {
      id: "EPIC-004",
      title: "API Documentation",
      status: "In Progress",
      stories: 4,
      tasks: 3,
      subtasks: 5,
      resolved: 5,
      estimation: "3 days",
      worklog: "18h",
      bugs: 0,
      priority: "Low",
      slaDeadline: "2024-06-10"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Planning": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDeadlineStatus = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { status: "Overdue", color: "text-red-600" };
    if (diffDays <= 3) return { status: "Due Soon", color: "text-yellow-600" };
    return { status: "On Track", color: "text-green-600" };
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">SLA Report Board</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {slaEpics.map((epic) => {
            const totalIssues = epic.stories + epic.tasks;
            const progressPercentage = Math.round((epic.resolved / totalIssues) * 100);
            const deadlineInfo = getDeadlineStatus(epic.slaDeadline);
            
            return (
              <Card key={epic.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{epic.title}</CardTitle>
                    <div className="flex space-x-2">
                      <Badge className={getPriorityColor(epic.priority)}>{epic.priority}</Badge>
                      <Badge className={getStatusColor(epic.status)}>{epic.status}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">{epic.id}</p>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className={`text-sm font-medium ${deadlineInfo.color}`}>
                          {deadlineInfo.status}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>SLA Deadline: {epic.slaDeadline}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <span className="font-medium text-gray-700">Stories:</span>
                            <span className="ml-2">{epic.stories}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>User stories in this Epic</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <span className="font-medium text-gray-700">Tasks:</span>
                            <span className="ml-2">{epic.tasks}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Tasks in this Epic</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <span className="font-medium text-gray-700">Sub-tasks:</span>
                            <span className="ml-2 text-gray-500">{epic.subtasks}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Sub-tasks (not counted in main progress)</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Resolved:</span>
                      <span className="ml-2">{epic.resolved}/{totalIssues}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Estimation:</span>
                      <span className="ml-2">{epic.estimation}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Worklog:</span>
                      <span className="ml-2">{epic.worklog}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Bugs:</span>
                      <span className="ml-2 text-red-600">{epic.bugs}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">SLA Deadline:</span>
                      <span className="ml-2">{epic.slaDeadline}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Epic Progress (Stories + Tasks)</span>
                      <span>{progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
};
