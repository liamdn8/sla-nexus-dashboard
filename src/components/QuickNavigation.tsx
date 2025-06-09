
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Rocket, Smartphone, List, FileText, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const QuickNavigation = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Create SLA",
      icon: Plus,
      description: "Start a new SLA",
      action: () => console.log("Create SLA"),
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "New Release",
      icon: Rocket,
      description: "Create a release",
      action: () => console.log("Create Release"),
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "Add Application",
      icon: Smartphone,
      description: "Register new app",
      action: () => console.log("Create Application"),
      color: "bg-purple-500 hover:bg-purple-600"
    }
  ];

  const recentItems = [
    { title: "SLA-2024-001", type: "SLA", status: "Active", url: "/sla-list" },
    { title: "v2.1.0 Release", type: "Release", status: "In Progress", url: "/releases" },
    { title: "Frontend App", type: "Application", status: "Running", url: "/applications" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Running':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-80 space-y-4">
      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className={`w-full justify-start h-12 ${action.color} text-white border-none`}
              onClick={action.action}
            >
              <action.icon className="h-4 w-4 mr-3" />
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-xs opacity-90">{action.description}</div>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Recent Items */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Recent Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => navigate(item.url)}
            >
              <div className="flex-1">
                <div className="font-medium text-sm">{item.title}</div>
                <div className="text-xs text-gray-500">{item.type}</div>
              </div>
              <Badge className={getStatusColor(item.status)}>
                {item.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Today's Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Active SLAs</span>
            <span className="font-semibold">12</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Pending Releases</span>
            <span className="font-semibold">3</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Running Apps</span>
            <span className="font-semibold">8</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
