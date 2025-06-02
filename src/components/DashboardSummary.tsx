
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Smartphone, 
  Server, 
  Database, 
  Users,
  GitBranch,
  Rocket,
  Building,
  FileText,
  Activity,
  LogOut,
  Truck,
  Package
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const DashboardSummary = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  // Development Summary Data
  const developmentStats = [
    { title: "Active SLAs", value: "12", trend: "+2", icon: FileText, color: "text-blue-600", bgColor: "bg-blue-50" },
    { title: "Applications", value: "8", trend: "+1", icon: Smartphone, color: "text-green-600", bgColor: "bg-green-50" },
    { title: "Releases", value: "24", trend: "+5", icon: Rocket, color: "text-purple-600", bgColor: "bg-purple-50" },
    { title: "Build Success", value: "94%", trend: "+3%", icon: CheckCircle, color: "text-green-600", bgColor: "bg-green-50" }
  ];

  // Deployment Summary Data
  const deploymentStats = [
    { title: "Customers", value: "45", trend: "+8", icon: Building, color: "text-orange-600", bgColor: "bg-orange-50" },
    { title: "Environments", value: "18", trend: "+3", icon: Server, color: "text-indigo-600", bgColor: "bg-indigo-50" },
    { title: "CNF Instances", value: "156", trend: "+12", icon: Database, color: "text-cyan-600", bgColor: "bg-cyan-50" },
    { title: "Uptime", value: "99.8%", trend: "+0.1%", icon: Activity, color: "text-green-600", bgColor: "bg-green-50" }
  ];

  // NEW: Delivery Summary Data
  const deliveryStats = [
    { title: "Total Deliveries", value: "156", trend: "+12", icon: Truck, color: "text-purple-600", bgColor: "bg-purple-50" },
    { title: "Image Deliveries", value: "89", trend: "+8", icon: Package, color: "text-blue-600", bgColor: "bg-blue-50" },
    { title: "File Deliveries", value: "67", trend: "+4", icon: FileText, color: "text-green-600", bgColor: "bg-green-50" },
    { title: "Success Rate", value: "96.2%", trend: "+1.2%", icon: CheckCircle, color: "text-emerald-600", bgColor: "bg-emerald-50" }
  ];

  // Recent Activities
  const recentActivities = [
    { type: "SLA", title: "Mobile App Enhancement SLA completed", time: "2 hours ago", status: "completed" },
    { type: "Delivery", title: "product-catalog:4.5.1 delivered to TechCorp", time: "3 hours ago", status: "success" },
    { type: "Release", title: "Version 2.1.4 deployed to production", time: "4 hours ago", status: "success" },
    { type: "Build", title: "Web Portal build failed - fixed", time: "6 hours ago", status: "warning" },
    { type: "Delivery", title: "ConfigMap delivery to InnovateLtd failed", time: "7 hours ago", status: "warning" },
    { type: "Environment", title: "New staging environment created", time: "8 hours ago", status: "info" },
    { type: "Customer", title: "TechCorp onboarded successfully", time: "1 day ago", status: "completed" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'success': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Logout */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your projects.</p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* Development Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <GitBranch className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Development Overview</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {developmentStats.map((stat, index) => (
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
                  {stat.trend} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex gap-4">
          <Button onClick={() => navigate('/sla-list')} variant="outline">
            View SLAs
          </Button>
          <Button onClick={() => navigate('/applications')} variant="outline">
            Manage Applications
          </Button>
          <Button onClick={() => navigate('/releases')} variant="outline">
            View Releases
          </Button>
        </div>
      </div>

      {/* Deployment Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Server className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">Deployment Overview</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {deploymentStats.map((stat, index) => (
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
                  {stat.trend} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex gap-4">
          <Button onClick={() => navigate('/customers')} variant="outline">
            Manage Customers
          </Button>
          <Button onClick={() => navigate('/environment-management')} variant="outline">
            View Environments
          </Button>
          <Button onClick={() => navigate('/cnf-list')} variant="outline">
            CNF Management
          </Button>
        </div>
      </div>

      {/* NEW: Delivery Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Truck className="h-6 w-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">Delivery Overview</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
                  {stat.trend} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex gap-4">
          <Button onClick={() => navigate('/delivery')} variant="outline">
            Manage Deliveries
          </Button>
          <Button onClick={() => navigate('/delivery')} variant="outline">
            View History
          </Button>
        </div>
      </div>

      {/* Recent Activities */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Clock className="h-6 w-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">Recent Activities</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Latest Updates</CardTitle>
            <CardDescription>
              Stay updated with the latest changes across your projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                    <div>
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(activity.status)}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
