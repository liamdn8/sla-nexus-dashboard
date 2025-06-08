
import React, { useState } from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Save, RefreshCw, Users, Group, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SystemSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    systemLinks: {
      companyWebsite: 'https://your-company.com',
      helpDesk: 'https://helpdesk.your-company.com',
      documentation: 'https://docs.your-company.com',
    },
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
                  Configure global system settings, integrations, users, and access control.
                </p>
              </div>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </div>

            <Tabs defaultValue="system-links" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="system-links">System Links</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
                <TabsTrigger value="roles">Roles</TabsTrigger>
                <TabsTrigger value="jira">Jira</TabsTrigger>
                <TabsTrigger value="jenkins">Jenkins</TabsTrigger>
              </TabsList>

              <TabsContent value="system-links">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5" />
                      <span>System Links Configuration</span>
                    </CardTitle>
                    <CardDescription>
                      Configure global system links and external resources.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-website">Company Website</Label>
                      <Input
                        id="company-website"
                        value={settings.systemLinks.companyWebsite}
                        onChange={(e) => setSettings({
                          ...settings,
                          systemLinks: { ...settings.systemLinks, companyWebsite: e.target.value }
                        })}
                        placeholder="https://your-company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="help-desk">Help Desk URL</Label>
                      <Input
                        id="help-desk"
                        value={settings.systemLinks.helpDesk}
                        onChange={(e) => setSettings({
                          ...settings,
                          systemLinks: { ...settings.systemLinks, helpDesk: e.target.value }
                        })}
                        placeholder="https://helpdesk.your-company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="documentation">Documentation URL</Label>
                      <Input
                        id="documentation"
                        value={settings.systemLinks.documentation}
                        onChange={(e) => setSettings({
                          ...settings,
                          systemLinks: { ...settings.systemLinks, documentation: e.target.value }
                        })}
                        placeholder="https://docs.your-company.com"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>User Management</span>
                    </CardTitle>
                    <CardDescription>
                      Manage system users, their roles, and permissions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">User Management</h3>
                      <p className="text-gray-500 mb-4">Configure user accounts, roles, and permissions</p>
                      <Button variant="outline">
                        Manage Users
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="groups">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Group className="h-5 w-5" />
                      <span>Group Management</span>
                    </CardTitle>
                    <CardDescription>
                      Configure user groups and team structures.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Group className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Group Management</h3>
                      <p className="text-gray-500 mb-4">Create and manage user groups and teams</p>
                      <Button variant="outline">
                        Manage Groups
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="roles">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Role Management</span>
                    </CardTitle>
                    <CardDescription>
                      Define roles and permissions for system access control.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Role Management</h3>
                      <p className="text-gray-500 mb-4">Configure roles and access permissions</p>
                      <Button variant="outline">
                        Manage Roles
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

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
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default SystemSettings;
