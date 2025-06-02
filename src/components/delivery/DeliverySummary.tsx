
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  FileText, 
  TrendingUp, 
  Users, 
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react";

export const DeliverySummary = () => {
  const deliveryStats = [
    { title: "Total Deliveries", value: "156", trend: "+12", icon: Package, color: "text-blue-600", bgColor: "bg-blue-50" },
    { title: "Image Deliveries", value: "89", trend: "+8", icon: Package, color: "text-green-600", bgColor: "bg-green-50" },
    { title: "File Deliveries", value: "67", trend: "+4", icon: FileText, color: "text-purple-600", bgColor: "bg-purple-50" },
    { title: "Active Customers", value: "23", trend: "+2", icon: Users, color: "text-orange-600", bgColor: "bg-orange-50" }
  ];

  const recentDeliveries = [
    { 
      type: "Image", 
      target: "product-catalog:4.5.1", 
      customer: "TechCorp", 
      status: "success", 
      time: "2 hours ago",
      deliveredBy: "john.doe"
    },
    { 
      type: "ConfigMap", 
      target: "app-config.yaml", 
      customer: "InnovateLtd", 
      status: "in-progress", 
      time: "4 hours ago",
      deliveredBy: "jane.smith"
    },
    { 
      type: "Image", 
      target: "user-service:2.1.0", 
      customer: "DataFlow", 
      status: "failed", 
      time: "6 hours ago",
      deliveredBy: "mike.wilson"
    },
    { 
      type: "Tosca", 
      target: "test-suite-v3.xml", 
      customer: "QualityFirst", 
      status: "success", 
      time: "8 hours ago",
      deliveredBy: "sarah.johnson"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-orange-500" />;
      case 'failed': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {deliveryStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.trend} this month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Deliveries */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Deliveries</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Latest delivery activities</p>
          </div>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDeliveries.map((delivery, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(delivery.status)}
                    <Badge variant="outline" className="text-xs">
                      {delivery.type}
                    </Badge>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{delivery.target}</p>
                    <p className="text-sm text-gray-500">to {delivery.customer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(delivery.status)}>
                    {delivery.status}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">{delivery.time}</p>
                  <p className="text-xs text-gray-400">by {delivery.deliveredBy}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
