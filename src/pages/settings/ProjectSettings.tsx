
import React, { useState } from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FolderOpen, Save, RefreshCw, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProjectSettings = () => {
  const { toast } = useToast();
  const [projectInfo, setProjectInfo] = useState({
    name: 'E-Commerce Platform',
    key: 'ECP',
    description: 'Complete e-commerce solution with mobile and web applications',
    admin: 'John Smith',
    status: 'active',
  });

  const [projectLinks, setProjectLinks] = useState({
    jira: {
      projectKey: 'ECP',
      baseUrl: 'https://your-company.atlassian.net',
      enabled: true,
    },
    harbor: {
      projectName: 'ecommerce-platform',
      registryUrl: 'https://harbor.your-company.com',
      enabled: true,
    },
    mano: {
      projectId: 'ecp-001',
      orchestratorUrl: 'https://mano.your-company.com',
      enabled: false,
    },
  });

  const handleSave = () => {
    toast({
      title: "Project Settings Saved",
      description: "Project settings have been updated successfully.",
    });
  };

  const handleTestConnection = (service: string) => {
    toast({
      title: "Testing Connection",
      description: `Testing connection to ${service}...`,
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <DashboardHeader />
          <div className="flex-1 space-y-6 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Project Settings</h2>
                <p className="text-muted-foreground">
                  Configure project information and external system integrations.
                </p>
              </div>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </div>

            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="general">General Information</TabsTrigger>
                <TabsTrigger value="integrations">Project Integrations</TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FolderOpen className="h-5 w-5" />
                      <span>General Project Information</span>
                    </CardTitle>
                    <CardDescription>
                      Basic project configuration and metadata.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="project-name">Project Name</Label>
                        <Input
                          id="project-name"
                          value={projectInfo.name}
                          onChange={(e) => setProjectInfo({
                            ...projectInfo,
                            name: e.target.value
                          })}
                          placeholder="Enter project name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="project-key">Project Key</Label>
                        <Input
                          id="project-key"
                          value={projectInfo.key}
                          onChange={(e) => setProjectInfo({
                            ...projectInfo,
                            key: e.target.value.toUpperCase()
                          })}
                          placeholder="ECP"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="project-description">Description</Label>
                      <Textarea
                        id="project-description"
                        value={projectInfo.description}
                        onChange={(e) => setProjectInfo({
                          ...projectInfo,
                          description: e.target.value
                        })}
                        placeholder="Enter project description"
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="project-admin">Project Admin</Label>
                        <Input
                          id="project-admin"
                          value={projectInfo.admin}
                          onChange={(e) => setProjectInfo({
                            ...projectInfo,
                            admin: e.target.value
                          })}
                          placeholder="Enter admin name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="project-status">Status</Label>
                        <Select
                          value={projectInfo.status}
                          onValueChange={(value) => setProjectInfo({
                            ...projectInfo,
                            status: value
                          })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="integrations">
                <div className="space-y-6">
                  {/* Jira Integration */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <span>🎫</span>
                        <span>Jira Project Mapping</span>
                      </CardTitle>
                      <CardDescription>
                        Map this project to a Jira project for issue tracking.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="jira-project-key">Jira Project Key</Label>
                          <Input
                            id="jira-project-key"
                            value={projectLinks.jira.projectKey}
                            onChange={(e) => setProjectLinks({
                              ...projectLinks,
                              jira: { ...projectLinks.jira, projectKey: e.target.value }
                            })}
                            placeholder="ECP"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="jira-base-url">Jira Base URL</Label>
                          <Input
                            id="jira-base-url"
                            value={projectLinks.jira.baseUrl}
                            onChange={(e) => setProjectLinks({
                              ...projectLinks,
                              jira: { ...projectLinks.jira, baseUrl: e.target.value }
                            })}
                            placeholder="https://your-company.atlassian.net"
                          />
                        </div>
                      </div>
                      <Button variant="outline" onClick={() => handleTestConnection('Jira')}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Test Jira Connection
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Harbor Integration */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <span>🐳</span>
                        <span>Harbor Project Mapping</span>
                      </CardTitle>
                      <CardDescription>
                        Map this project to a Harbor registry project for container management.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="harbor-project-name">Harbor Project Name</Label>
                          <Input
                            id="harbor-project-name"
                            value={projectLinks.harbor.projectName}
                            onChange={(e) => setProjectLinks({
                              ...projectLinks,
                              harbor: { ...projectLinks.harbor, projectName: e.target.value }
                            })}
                            placeholder="ecommerce-platform"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="harbor-registry-url">Harbor Registry URL</Label>
                          <Input
                            id="harbor-registry-url"
                            value={projectLinks.harbor.registryUrl}
                            onChange={(e) => setProjectLinks({
                              ...projectLinks,
                              harbor: { ...projectLinks.harbor, registryUrl: e.target.value }
                            })}
                            placeholder="https://harbor.your-company.com"
                          />
                        </div>
                      </div>
                      <Button variant="outline" onClick={() => handleTestConnection('Harbor')}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Test Harbor Connection
                      </Button>
                    </CardContent>
                  </Card>

                  {/* MANO Integration */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <span>🎛️</span>
                        <span>MANO Project Mapping</span>
                      </CardTitle>
                      <CardDescription>
                        Map this project to a MANO orchestrator for network function management.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="mano-project-id">MANO Project ID</Label>
                          <Input
                            id="mano-project-id"
                            value={projectLinks.mano.projectId}
                            onChange={(e) => setProjectLinks({
                              ...projectLinks,
                              mano: { ...projectLinks.mano, projectId: e.target.value }
                            })}
                            placeholder="ecp-001"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mano-orchestrator-url">MANO Orchestrator URL</Label>
                          <Input
                            id="mano-orchestrator-url"
                            value={projectLinks.mano.orchestratorUrl}
                            onChange={(e) => setProjectLinks({
                              ...projectLinks,
                              mano: { ...projectLinks.mano, orchestratorUrl: e.target.value }
                            })}
                            placeholder="https://mano.your-company.com"
                          />
                        </div>
                      </div>
                      <Button variant="outline" onClick={() => handleTestConnection('MANO')}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Test MANO Connection
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ProjectSettings;
