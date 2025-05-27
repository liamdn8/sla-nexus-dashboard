
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const SLAReportBoard = () => {
  const slaEpics = [
    {
      id: "EPIC-001",
      title: "User Authentication System",
      status: "In Progress",
      issues: 12,
      resolved: 8,
      estimation: "5 days",
      worklog: "32h",
      bugs: 2,
      priority: "High"
    },
    {
      id: "EPIC-002", 
      title: "Payment Integration",
      status: "Planning",
      issues: 8,
      resolved: 0,
      estimation: "8 days",
      worklog: "0h",
      bugs: 0,
      priority: "Medium"
    },
    {
      id: "EPIC-003",
      title: "Mobile App Release",
      status: "Done",
      issues: 15,
      resolved: 15,
      estimation: "12 days",
      worklog: "96h",
      bugs: 1,
      priority: "High"
    },
    {
      id: "EPIC-004",
      title: "API Documentation",
      status: "In Progress",
      issues: 6,
      resolved: 4,
      estimation: "3 days",
      worklog: "18h",
      bugs: 0,
      priority: "Low"
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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">SLA Report Board</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {slaEpics.map((epic) => (
          <Card key={epic.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{epic.title}</CardTitle>
                <div className="flex space-x-2">
                  <Badge className={getPriorityColor(epic.priority)}>{epic.priority}</Badge>
                  <Badge className={getStatusColor(epic.status)}>{epic.status}</Badge>
                </div>
              </div>
              <p className="text-sm text-gray-600">{epic.id}</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Issues:</span>
                  <span className="ml-2">{epic.resolved}/{epic.issues}</span>
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
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{Math.round((epic.resolved / epic.issues) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(epic.resolved / epic.issues) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
