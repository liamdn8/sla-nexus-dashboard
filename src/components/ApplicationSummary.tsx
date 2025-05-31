
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Plus, Smartphone, Server, Database, Users } from "lucide-react";

export const ApplicationSummary = () => {
  const summaryStats = [
    {
      title: "Total Applications",
      value: "12",
      icon: Smartphone,
      change: "+2 this month",
      changeType: "positive" as const
    },
    {
      title: "Active Deployments",
      value: "8",
      icon: Server,
      change: "+1 this week",
      changeType: "positive" as const
    },
    {
      title: "Environments",
      value: "15",
      icon: Database,
      change: "Stable",
      changeType: "neutral" as const
    },
    {
      title: "Team Members",
      value: "24",
      icon: Users,
      change: "+3 this quarter",
      changeType: "positive" as const
    }
  ];

  const handleRefresh = () => {
    console.log('Refreshing applications data...');
    // Add refresh logic here
  };

  const handleAddApplication = () => {
    console.log('Opening add application dialog...');
    // Add navigation to create application form
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Application Overview</h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            className="flex items-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </Button>
          <Button 
            onClick={handleAddApplication}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Application
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className={`text-xs mt-1 ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-gray-500'
              }`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
