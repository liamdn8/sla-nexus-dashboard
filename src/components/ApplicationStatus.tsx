
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export const ApplicationStatus = () => {
  const applications = [
    {
      name: "Frontend Web App",
      version: "v2.1.0",
      status: "Released",
      environment: "Production",
      lastDeployment: "2024-05-25",
      health: "Healthy",
      issues: 3,
      coverage: "94%"
    },
    {
      name: "Backend API",
      version: "v1.8.2",
      status: "In Development",
      environment: "Staging",
      lastDeployment: "2024-05-24",
      health: "Testing",
      issues: 7,
      coverage: "87%"
    },
    {
      name: "Mobile App (iOS)",
      version: "v1.5.0",
      status: "Released",
      environment: "App Store",
      lastDeployment: "2024-05-20",
      health: "Healthy",
      issues: 1,
      coverage: "91%"
    },
    {
      name: "Mobile App (Android)",
      version: "v1.5.1",
      status: "Pending Release",
      environment: "Play Store",
      lastDeployment: "2024-05-26",
      health: "Ready",
      issues: 2,
      coverage: "89%"
    },
    {
      name: "Analytics Dashboard",
      version: "v0.9.3",
      status: "In Development",
      environment: "Development",
      lastDeployment: "2024-05-27",
      health: "Development",
      issues: 12,
      coverage: "76%"
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
      case "Development": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const statusSummary = {
    Released: applications.filter(app => app.status === "Released").length,
    "In Development": applications.filter(app => app.status === "In Development").length,
    "Pending Release": applications.filter(app => app.status === "Pending Release").length,
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Applications & Releases</h2>
          <div className="flex space-x-2">
            {Object.entries(statusSummary).map(([status, count]) => (
              <Badge key={status} variant="outline" className="text-xs">
                {status}: {count}
              </Badge>
            ))}
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Application Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Environment</TableHead>
                  <TableHead>Health</TableHead>
                  <TableHead>Issues</TableHead>
                  <TableHead>Coverage</TableHead>
                  <TableHead>Last Deploy</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{app.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{app.version}</Badge>
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Current development and release status</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{app.environment}</TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge className={getHealthColor(app.health)}>{app.health}</Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Application health and monitoring status</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <span className={app.issues > 5 ? "text-red-600 font-medium" : "text-gray-700"}>
                        {app.issues}
                      </span>
                    </TableCell>
                    <TableCell>{app.coverage}</TableCell>
                    <TableCell className="text-sm text-gray-600">{app.lastDeployment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};
