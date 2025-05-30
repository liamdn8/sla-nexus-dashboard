
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, FileText, Settings, BarChart3, GitBranch, Server, Database, Rocket, Building } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "SLA Management",
      description: "Monitor and track project SLAs with real-time updates and comprehensive reporting"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Collaborate with your team on project deliverables and track progress together"
    },
    {
      icon: FileText,
      title: "Documentation",
      description: "Centralized document management with version control and easy access"
    },
    {
      icon: Settings,
      title: "Environment Control",
      description: "Manage development and deployment environments with complete oversight"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Comprehensive analytics and detailed reports for informed decision making"
    },
    {
      icon: GitBranch,
      title: "Development Tracking",
      description: "Track application development, releases, and build history in one place"
    },
    {
      icon: Server,
      title: "Infrastructure Management",
      description: "Monitor and manage your infrastructure with real-time status updates"
    },
    {
      icon: Database,
      title: "Data Management",
      description: "Centralized data management with secure access and backup solutions"
    }
  ];

  const stats = [
    { label: "Active Projects", value: "150+", color: "text-blue-600" },
    { label: "Team Members", value: "500+", color: "text-green-600" },
    { label: "Deployments", value: "10K+", color: "text-purple-600" },
    { label: "Uptime", value: "99.9%", color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="mb-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
              ✨ Streamline Your Development Workflow
            </div>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            SLA Nexus
            <span className="block text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Management Platform
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            The comprehensive solution for project management, SLA tracking, team collaboration, 
            and environment management. Streamline your entire development and deployment lifecycle 
            with powerful tools designed for modern teams.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              onClick={() => navigate('/login')}
              className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Get Started Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/login')}
              className="px-8 py-4 text-lg border-2 hover:bg-gray-50"
            >
              <Building className="mr-2 h-5 w-5" />
              Request Enterprise Demo
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Login Options Card */}
        <Card className="max-w-2xl mx-auto shadow-2xl border-0">
          <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
            <CardTitle className="text-3xl text-gray-900">Access Your Dashboard</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Choose your preferred authentication method to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <Button 
              className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
              size="lg"
              onClick={() => navigate('/login')}
            >
              <Shield className="mr-3 h-6 w-6" />
              Sign in with Credentials
            </Button>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="w-full h-12 border-2 hover:bg-blue-50"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google SSO
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="w-full h-12 border-2 hover:bg-blue-50"
              >
                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
                </svg>
                Microsoft SSO
              </Button>
            </div>
            <div className="text-center text-sm text-gray-500 pt-4 border-t">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Demo Environment Active
              </span>
              <div className="mt-2">All login attempts will succeed for demonstration</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
