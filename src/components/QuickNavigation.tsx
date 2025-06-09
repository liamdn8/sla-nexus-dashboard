
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Rocket, Smartphone, FileText, Users, Settings } from "lucide-react";

export const QuickNavigation = () => {
  const quickActions = [
    {
      title: "Create SLA",
      icon: FileText,
      description: "Start a new SLA",
      action: () => console.log("Create SLA"),
      color: "text-blue-600 hover:text-blue-700"
    },
    {
      title: "New Release",
      icon: Rocket,
      description: "Create a release",
      action: () => console.log("Create Release"),
      color: "text-green-600 hover:text-green-700"
    },
    {
      title: "Add Application",
      icon: Smartphone,
      description: "Register new app",
      action: () => console.log("Create Application"),
      color: "text-purple-600 hover:text-purple-700"
    },
    {
      title: "Manage Users",
      icon: Users,
      description: "User management",
      action: () => console.log("Manage Users"),
      color: "text-orange-600 hover:text-orange-700"
    },
    {
      title: "Settings",
      icon: Settings,
      description: "Project settings",
      action: () => console.log("Settings"),
      color: "text-gray-600 hover:text-gray-700"
    }
  ];

  return (
    <div className="w-80 p-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2 hover:shadow-md transition-shadow"
              onClick={action.action}
            >
              <action.icon className={`h-6 w-6 ${action.color}`} />
              <div className="text-center">
                <div className="text-sm font-medium">{action.title}</div>
                <div className="text-xs text-gray-500">{action.description}</div>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
