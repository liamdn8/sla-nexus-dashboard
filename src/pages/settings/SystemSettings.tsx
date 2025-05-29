
import React, { useState } from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Save, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SystemSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    jira: {
      baseUrl: 'https://your-company.atlassian.net',
      defaultProject: 'DEFAULT',
    },
    jenkins: {
      baseUrl: 'https://jenkins.your-company.com',
      defaultNamespace: 'builds',
    },
    gitlab: {
      baseUrl: 'https://gitlab.your-company.com',
      defaultGroup: 'development',
    },
    github: {
      baseUrl: 'https://api.github.com',
      defaultOrganization: 'your-organization',
    },
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "System settings have been updated successfully.",
    });
  };

  const handleTest = (tool: string) => {
    toast({
      title: "Testing Connection",
      description: `Testing connection to ${tool}...`,
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
                <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>
                <p className="text-muted-foreground">
                  Configure global endpoints and settings for development tools used across the system.
                </p>
              </div>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </div>

            <Tabs defaultValue="jira" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="jira">Jira</TabsTrigger>
                <TabsTrigger value="jenkins">Jenkins</TabsTrigger>
                <TabsTrigger value="gitlab">GitLab</TabsTrigger>
                <TabsTrigger value="github">GitHub</TabsTrigger>
              </TabsList>

              <TabsContent value="jira">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span>🎫</span>
                      <span>Jira Configuration</span>
                    </CardTitle>
                    <CardDescription>
                      Configure global Jira settings for issue tracking and project management.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="jira-url">Base URL</Label>
                      <Input
                        id="jira-url"
                        value={settings.jira.baseUrl}
                        onChange={(e) => setSettings({
                          ...settings,
                          jira: { ...settings.jira, baseUrl: e.target.value }
                        })}
                        placeholder="https://your-company.atlassian.net"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jira-project">Default Project Key</Label>
                      <Input
                        id="jira-project"
                        value={settings.jira.defaultProject}
                        onChange={(e) => setSettings({
                          ...settings,
                          jira: { ...settings.jira, defaultProject: e.target.value }
                        })}
                        placeholder="DEFAULT"
                      />
                    </div>
                    <Button variant="outline" onClick={() => handleTest('Jira')}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Test Connection
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="jenkins">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span>🔧</span>
                      <span>Jenkins Configuration</span>
                    </CardTitle>
                    <CardDescription>
                      Configure global Jenkins settings for build automation and CI/CD.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="jenkins-url">Base URL</Label>
                      <Input
                        id="jenkins-url"
                        value={settings.jenkins.baseUrl}
                        onChange={(e) => setSettings({
                          ...settings,
                          jenkins: { ...settings.jenkins, baseUrl: e.target.value }
                        })}
                        placeholder="https://jenkins.your-company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jenkins-namespace">Default Namespace</Label>
                      <Input
                        id="jenkins-namespace"
                        value={settings.jenkins.defaultNamespace}
                        onChange={(e) => setSettings({
                          ...settings,
                          jenkins: { ...settings.jenkins, defaultNamespace: e.target.value }
                        })}
                        placeholder="builds"
                      />
                    </div>
                    <Button variant="outline" onClick={() => handleTest('Jenkins')}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Test Connection
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gitlab">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span>🦊</span>
                      <span>GitLab Configuration</span>
                    </CardTitle>
                    <CardDescription>
                      Configure global GitLab settings for source control and CI/CD.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="gitlab-url">Base URL</Label>
                      <Input
                        id="gitlab-url"
                        value={settings.gitlab.baseUrl}
                        onChange={(e) => setSettings({
                          ...settings,
                          gitlab: { ...settings.gitlab, baseUrl: e.target.value }
                        })}
                        placeholder="https://gitlab.your-company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gitlab-group">Default Group</Label>
                      <Input
                        id="gitlab-group"
                        value={settings.gitlab.defaultGroup}
                        onChange={(e) => setSettings({
                          ...settings,
                          gitlab: { ...settings.gitlab, defaultGroup: e.target.value }
                        })}
                        placeholder="development"
                      />
                    </div>
                    <Button variant="outline" onClick={() => handleTest('GitLab')}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Test Connection
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="github">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span>🐙</span>
                      <span>GitHub Configuration</span>
                    </CardTitle>
                    <CardDescription>
                      Configure global GitHub settings for source control and collaboration.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="github-url">Base URL</Label>
                      <Input
                        id="github-url"
                        value={settings.github.baseUrl}
                        onChange={(e) => setSettings({
                          ...settings,
                          github: { ...settings.github, baseUrl: e.target.value }
                        })}
                        placeholder="https://api.github.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="github-org">Default Organization</Label>
                      <Input
                        id="github-org"
                        value={settings.github.defaultOrganization}
                        onChange={(e) => setSettings({
                          ...settings,
                          github: { ...settings.github, defaultOrganization: e.target.value }
                        })}
                        placeholder="your-organization"
                      />
                    </div>
                    <Button variant="outline" onClick={() => handleTest('GitHub')}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Test Connection
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default SystemSettings;
