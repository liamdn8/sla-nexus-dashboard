
import React, { useState } from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Plus, Trash2, Edit, Users, User } from "lucide-react";
import { ExternalToolDialog } from "@/components/settings/ExternalToolDialog";
import { useToast } from "@/hooks/use-toast";

interface ExternalTool {
  id: string;
  name: string;
  type: 'jira' | 'harbor' | 'gitlab' | 'github' | 'jenkins' | 'mano';
  url: string;
  authMethod: 'api_token' | 'username_password';
  username?: string;
  scope: 'admin' | 'user';
  isConnected: boolean;
  lastSync?: string;
}

const ExternalTools = () => {
  const { toast } = useToast();
  const [tools, setTools] = useState<ExternalTool[]>([
    {
      id: '1',
      name: 'Production Jira',
      type: 'jira',
      url: 'https://company.atlassian.net',
      authMethod: 'api_token',
      username: 'admin@company.com',
      scope: 'admin',
      isConnected: true,
      lastSync: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Docker Harbor',
      type: 'harbor',
      url: 'https://harbor.company.com',
      authMethod: 'username_password',
      username: 'harbor-admin',
      scope: 'admin',
      isConnected: false,
      lastSync: '2024-01-14T15:45:00Z'
    },
    {
      id: '3',
      name: 'MANO Orchestrator',
      type: 'mano',
      url: 'https://mano.company.com',
      authMethod: 'api_token',
      scope: 'user',
      isConnected: false,
    }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<ExternalTool | null>(null);

  const getTypeIcon = (type: string) => {
    const iconMap: Record<string, string> = {
      jira: '🎯',
      harbor: '🐳',
      gitlab: '🦊',
      github: '🐙',
      jenkins: '👷',
      mano: '🔧'
    };
    return iconMap[type] || '🔧';
  };

  const getTypeBadgeColor = (type: string) => {
    const colorMap: Record<string, string> = {
      jira: 'bg-blue-100 text-blue-800',
      harbor: 'bg-cyan-100 text-cyan-800',
      gitlab: 'bg-orange-100 text-orange-800',
      github: 'bg-gray-100 text-gray-800',
      jenkins: 'bg-red-100 text-red-800',
      mano: 'bg-purple-100 text-purple-800'
    };
    return colorMap[type] || 'bg-gray-100 text-gray-800';
  };

  const handleSaveTool = (tool: Omit<ExternalTool, 'id'>) => {
    if (editingTool) {
      setTools(tools.map(t => t.id === editingTool.id ? { ...tool, id: editingTool.id } : t));
      toast({
        title: "Tool Updated",
        description: `${tool.name} has been updated successfully.`,
      });
    } else {
      const newTool: ExternalTool = {
        ...tool,
        id: Date.now().toString(),
      };
      setTools([...tools, newTool]);
      toast({
        title: "Tool Added",
        description: `${tool.name} has been added successfully.`,
      });
    }
    setIsDialogOpen(false);
    setEditingTool(null);
  };

  const handleDeleteTool = (id: string) => {
    const tool = tools.find(t => t.id === id);
    setTools(tools.filter(t => t.id !== id));
    toast({
      title: "Tool Deleted",
      description: `${tool?.name} has been deleted successfully.`,
      variant: "destructive",
    });
  };

  const handleTestConnection = async (tool: ExternalTool) => {
    toast({
      title: "Testing Connection",
      description: `Testing connection to ${tool.name}...`,
    });
    
    // Simulate API call
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate for demo
      if (success) {
        setTools(tools.map(t => 
          t.id === tool.id 
            ? { ...t, isConnected: true, lastSync: new Date().toISOString() }
            : t
        ));
        toast({
          title: "Connection Successful",
          description: `Successfully connected to ${tool.name}.`,
        });
      } else {
        setTools(tools.map(t => 
          t.id === tool.id 
            ? { ...t, isConnected: false }
            : t
        ));
        toast({
          title: "Connection Failed",
          description: `Failed to connect to ${tool.name}. Please check your credentials.`,
          variant: "destructive",
        });
      }
    }, 2000);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <DashboardHeader />
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">External Tools</h2>
                <p className="text-muted-foreground">
                  Manage integrations with external tools like Jira, Harbor, MANO, and other services.
                </p>
              </div>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Tool
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <Card key={tool.id} className="relative">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{getTypeIcon(tool.type)}</span>
                        <div>
                          <CardTitle className="text-lg">{tool.name}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getTypeBadgeColor(tool.type)}>
                              {tool.type.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="flex items-center space-x-1">
                              {tool.scope === 'admin' ? (
                                <Users className="h-3 w-3" />
                              ) : (
                                <User className="h-3 w-3" />
                              )}
                              <span>{tool.scope === 'admin' ? 'Shared' : 'User'}</span>
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingTool(tool);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTool(tool.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">
                        <strong>URL:</strong> {tool.url}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <strong>Auth:</strong> {tool.authMethod.replace('_', ' ')}
                      </div>
                      {tool.username && (
                        <div className="text-sm text-muted-foreground">
                          <strong>Username:</strong> {tool.username}
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${tool.isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                          <span className="text-sm text-muted-foreground">
                            {tool.isConnected ? 'Connected' : 'Disconnected'}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTestConnection(tool)}
                        >
                          Test
                        </Button>
                      </div>
                      {tool.lastSync && (
                        <div className="text-xs text-muted-foreground">
                          Last sync: {new Date(tool.lastSync).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {tools.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Settings className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No External Tools</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Get started by adding your first external tool integration.
                  </p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add First Tool
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </SidebarInset>
      </div>

      <ExternalToolDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        tool={editingTool}
        onSave={handleSaveTool}
      />
    </SidebarProvider>
  );
};

export default ExternalTools;
