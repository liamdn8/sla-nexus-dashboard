
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const SLAOverview = () => {
  const slaMetrics = [
    { title: "Total Issues", value: 142, status: "active", change: "+12" },
    { title: "Open Issues", value: 38, status: "warning", change: "+5" },
    { title: "In Progress", value: 24, status: "info", change: "-3" },
    { title: "Resolved", value: 80, status: "success", change: "+10" },
    { title: "Critical Bugs", value: 3, status: "danger", change: "+1" },
    { title: "Avg. Resolution Time", value: "2.3 days", status: "info", change: "-0.2" },
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">SLA Overview</h2>
        <Badge variant="outline" className="text-blue-600">Jira Epic Mapping Active</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slaMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
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
        ))}
      </div>
    </div>
  );
};
