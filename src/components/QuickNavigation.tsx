
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, TrendingUp, Activity, AlertCircle, CheckCircle } from "lucide-react";

export const QuickNavigation = () => {
  const quickStats = [
    {
      title: "Active Issues",
      value: "12",
      icon: AlertCircle,
      color: "text-red-600",
      change: "+2"
    },
    {
      title: "Deployments",
      value: "8",
      icon: TrendingUp,
      color: "text-green-600",
      change: "+3"
    },
    {
      title: "Health Status",
      value: "98.5%",
      icon: Activity,
      color: "text-blue-600",
      change: "+0.2%"
    },
    {
      title: "Completed",
      value: "24",
      icon: CheckCircle,
      color: "text-green-600",
      change: "+5"
    }
  ];

  const quickLinks = [
    { title: "System Health", url: "#", description: "Monitor system status" },
    { title: "Release Notes", url: "#", description: "Latest updates" },
    { title: "Documentation", url: "#", description: "Project docs" },
    { title: "Support Portal", url: "#", description: "Get help" }
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {quickStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <div>
                  <div className="text-sm font-medium">{stat.title}</div>
                  <div className="text-xs text-gray-500">{stat.change} this week</div>
                </div>
              </div>
              <div className="text-lg font-bold">{stat.value}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {quickLinks.map((link, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start h-auto p-3 hover:bg-gray-50"
              onClick={() => console.log(`Navigate to ${link.title}`)}
            >
              <div className="flex items-center justify-between w-full">
                <div className="text-left">
                  <div className="text-sm font-medium">{link.title}</div>
                  <div className="text-xs text-gray-500">{link.description}</div>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
