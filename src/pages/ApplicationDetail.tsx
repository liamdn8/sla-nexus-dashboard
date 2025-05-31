
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, GitBranch, CheckCircle, XCircle, Clock, Package } from "lucide-react";

const ApplicationDetail = () => {
  const { appId } = useParams();
  const navigate = useNavigate();

  // Mock application data
  const application = {
    id: appId,
    name: "Frontend Web App",
    description: "Main customer-facing web application built with React and TypeScript",
    repository: "https://github.com/company/frontend-web-app",
    technology: "React, TypeScript, Vite",
    team: "Frontend Team",
    owner: "John Doe",
    created: "2023-01-15",
    lastUpdated: "2024-05-25"
  };

  const versions = [
    {
      id: "v2.1.0",
      version: "v2.1.0",
      stage: "released",
      releaseDate: "2024-05-25",
      description: "Major UI improvements and bug fixes",
      commits: [
        {
          id: "abc123",
          message: "Fix navigation menu responsiveness",
          author: "Jane Smith",
          date: "2024-05-25",
          hash: "abc123def"
        },
        {
          id: "def456",
          message: "Update user dashboard layout",
          author: "Mike Johnson",
          date: "2024-05-24",
          hash: "def456ghi"
        }
      ],
      builds: [
        {
          id: "build-001",
          status: "success",
          trigger: "CI/CD Pipeline",
          duration: "5m 32s",
          testResults: {
            passed: 156,
            failed: 2,
            coverage: "94%"
          },
          slaMapping: "SLA-2024-001"
        }
      ]
    },
    {
      id: "v2.0.5",
      version: "v2.0.5",
      stage: "delivered",
      releaseDate: "2024-05-20",
      description: "Security patches and performance improvements",
      commits: [
        {
          id: "ghi789",
          message: "Security vulnerability fixes",
          author: "Security Team",
          date: "2024-05-20",
          hash: "ghi789jkl"
        }
      ],
      builds: [
        {
          id: "build-002",
          status: "success",
          trigger: "Manual Deploy",
          duration: "4m 18s",
          testResults: {
            passed: 148,
            failed: 0,
            coverage: "92%"
          },
          slaMapping: "SLA-2024-002"
        }
      ]
    },
    {
      id: "v2.1.1",
      version: "v2.1.1",
      stage: "pending release",
      releaseDate: "2024-05-30",
      description: "Hot fixes for critical issues",
      commits: [
        {
          id: "jkl012",
          message: "Fix critical payment processing bug",
          author: "Emergency Team",
          date: "2024-05-29",
          hash: "jkl012mno"
        }
      ],
      builds: [
        {
          id: "build-003",
          status: "in_progress",
          trigger: "CI/CD Pipeline",
          duration: "Running...",
          testResults: {
            passed: 0,
            failed: 0,
            coverage: "Testing..."
          },
          slaMapping: "SLA-2024-003"
        }
      ]
    },
    {
      id: "v2.2.0",
      version: "v2.2.0",
      stage: "in development",
      releaseDate: "TBD",
      description: "New features and enhancements",
      commits: [
        {
          id: "mno345",
          message: "Add new dashboard widgets",
          author: "UI Team",
          date: "2024-05-28",
          hash: "mno345pqr"
        },
        {
          id: "pqr678",
          message: "Implement dark mode support",
          author: "Frontend Team",
          date: "2024-05-27",
          hash: "pqr678stu"
        }
      ],
      builds: [
        {
          id: "build-004",
          status: "failed",
          trigger: "CI/CD Pipeline",
          duration: "2m 45s",
          testResults: {
            passed: 132,
            failed: 8,
            coverage: "87%"
          },
          slaMapping: null
        }
      ]
    }
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "released": return "bg-green-100 text-green-800";
      case "delivered": return "bg-blue-100 text-blue-800";
      case "pending release": return "bg-yellow-100 text-yellow-800";
      case "in development": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case "released": return <CheckCircle className="h-4 w-4" />;
      case "delivered": return <Package className="h-4 w-4" />;
      case "pending release": return <Clock className="h-4 w-4" />;
      case "in development": return <GitBranch className="h-4 w-4" />;
      default: return <GitBranch className="h-4 w-4" />;
    }
  };

  const getBuildStatusColor = (status: string) => {
    switch (status) {
      case "success": return "text-green-600";
      case "failed": return "text-red-600";
      case "in_progress": return "text-blue-600";
      default: return "text-gray-600";
    }
  };

  const getBuildStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle className="h-4 w-4" />;
      case "failed": return <XCircle className="h-4 w-4" />;
      case "in_progress": return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-white">
          <div className="bg-white border-b border-gray-200 px-8 py-6">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/applications')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Applications
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{application.name}</h1>
                <p className="text-gray-600 mt-1">{application.description}</p>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-8 py-6">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="versions">Versions</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Application Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Repository</label>
                        <p className="text-sm text-blue-600">{application.repository}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Technology Stack</label>
                        <p className="text-sm">{application.technology}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Team</label>
                        <p className="text-sm">{application.team}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Owner</label>
                        <p className="text-sm">{application.owner}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Created</label>
                        <p className="text-sm">{application.created}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Last Updated</label>
                        <p className="text-sm">{application.lastUpdated}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Version Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(
                          versions.reduce((acc, version) => {
                            acc[version.stage] = (acc[version.stage] || 0) + 1;
                            return acc;
                          }, {} as Record<string, number>)
                        ).map(([stage, count]) => (
                          <div key={stage} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getStageIcon(stage)}
                              <span className="text-sm font-medium capitalize">{stage}</span>
                            </div>
                            <Badge variant="outline">{count}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="versions">
                <Card>
                  <CardHeader>
                    <CardTitle>Application Versions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {versions.map((version) => (
                        <div key={version.id} className="border rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <h3 className="text-lg font-semibold">{version.version}</h3>
                              <Badge className={getStageColor(version.stage)}>
                                <div className="flex items-center gap-1">
                                  {getStageIcon(version.stage)}
                                  {version.stage}
                                </div>
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-500">
                              {version.releaseDate}
                            </div>
                          </div>

                          <p className="text-gray-600 mb-4">{version.description}</p>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-medium mb-3">Commits</h4>
                              <div className="space-y-2">
                                {version.commits.map((commit) => (
                                  <div key={commit.id} className="border rounded p-3">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-sm font-medium">{commit.message}</span>
                                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                        {commit.hash}
                                      </code>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {commit.author} • {commit.date}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-3">Build & Test Results</h4>
                              <div className="space-y-2">
                                {version.builds.map((build) => (
                                  <div key={build.id} className="border rounded p-3">
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="flex items-center gap-2">
                                        <div className={getBuildStatusColor(build.status)}>
                                          {getBuildStatusIcon(build.status)}
                                        </div>
                                        <span className="text-sm font-medium">
                                          Build {build.id}
                                        </span>
                                      </div>
                                      <span className="text-xs text-gray-500">
                                        {build.duration}
                                      </span>
                                    </div>
                                    <div className="text-xs text-gray-600 mb-2">
                                      Triggered by: {build.trigger}
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 text-xs">
                                      <div>
                                        <span className="text-green-600">✓ {build.testResults.passed}</span>
                                      </div>
                                      <div>
                                        <span className="text-red-600">✗ {build.testResults.failed}</span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">Coverage: {build.testResults.coverage}</span>
                                      </div>
                                    </div>
                                    {build.slaMapping && (
                                      <div className="mt-2 pt-2 border-t">
                                        <span className="text-xs text-blue-600">
                                          SLA: {build.slaMapping}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ApplicationDetail;
