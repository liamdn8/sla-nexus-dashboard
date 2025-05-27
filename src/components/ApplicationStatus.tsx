
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const ApplicationStatus = () => {
  const applications = [
    {
      name: "Frontend Web App",
      version: "v2.1.0",
      status: "Released",
      environment: "Production",
      lastDeployment: "2024-05-25",
      health: "Healthy"
    },
    {
      name: "Backend API",
      version: "v1.8.2",
      status: "In Development",
      environment: "Staging",
      lastDeployment: "2024-05-24",
      health: "Testing"
    },
    {
      name: "Mobile App (iOS)",
      version: "v1.5.0",
      status: "Released",
      environment: "App Store",
      lastDeployment: "2024-05-20",
      health: "Healthy"
    },
    {
      name: "Mobile App (Android)",
      version: "v1.5.1",
      status: "Pending Release",
      environment: "Play Store",
      lastDeployment: "2024-05-26",
      health: "Ready"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Released": return "bg-green-100 text-green-800";
      case "In Development": return "bg-blue-100 text-blue-800";
      case "Pending Release": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case "Healthy": return "bg-green-100 text-green-800";
      case "Testing": return "bg-blue-100 text-blue-800";
      case "Ready": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Applications & Releases</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {applications.map((app, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{app.name}</CardTitle>
                <Badge className={getHealthColor(app.health)}>{app.health}</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{app.version}</Badge>
                <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Environment:</span>
                  <span>{app.environment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Last Deployment:</span>
                  <span>{app.lastDeployment}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
