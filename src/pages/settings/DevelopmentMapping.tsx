
import React, { useState } from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { GitBranch, Plus, Trash2, Edit, Search, Link as LinkIcon } from "lucide-react";
import { DevelopmentMappingDialog } from "@/components/settings/DevelopmentMappingDialog";
import { useToast } from "@/hooks/use-toast";

interface DevelopmentMapping {
  id: string;
  environmentName: string;
  environmentId: string;
  toolType: 'jira' | 'jenkins' | 'gitlab' | 'github';
  configuration: {
    projectKey?: string;
    repository?: string;
    workspace?: string;
    namespace?: string;
  };
  lastUpdated: string;
}

const DevelopmentMapping = () => {
  const { toast } = useToast();
  const [mappings, setMappings] = useState<DevelopmentMapping[]>([
    {
      id: '1',
      environmentName: 'Production Environment',
      environmentId: 'ENV-001',
      toolType: 'jira',
      configuration: {
        projectKey: 'PROD',
        workspace: 'production-workspace'
      },
      lastUpdated: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      environmentName: 'Staging Environment',
      environmentId: 'ENV-002',
      toolType: 'jenkins',
      configuration: {
        namespace: 'staging-builds'
      },
      lastUpdated: '2024-01-14T15:45:00Z'
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMapping, setEditingMapping] = useState<DevelopmentMapping | null>(null);

  const filteredMappings = mappings.filter(mapping =>
    mapping.environmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mapping.environmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mapping.toolType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getToolIcon = (type: string) => {
    const iconMap: Record<string, string> = {
      jira: '🎫',
      jenkins: '🔧',
      gitlab: '🦊',
      github: '🐙'
    };
    return iconMap[type] || '🔧';
  };

  const handleSaveMapping = (mapping: Omit<DevelopmentMapping, 'id' | 'lastUpdated'>) => {
    if (editingMapping) {
      setMappings(mappings.map(m => 
        m.id === editingMapping.id 
          ? { ...mapping, id: editingMapping.id, lastUpdated: new Date().toISOString() }
          : m
      ));
      toast({
        title: "Mapping Updated",
        description: `Development mapping for ${mapping.environmentName} has been updated.`,
      });
    } else {
      const newMapping: DevelopmentMapping = {
        ...mapping,
        id: Date.now().toString(),
        lastUpdated: new Date().toISOString(),
      };
      setMappings([...mappings, newMapping]);
      toast({
        title: "Mapping Created",
        description: `Development mapping for ${mapping.environmentName} has been created.`,
      });
    }
    setIsDialogOpen(false);
    setEditingMapping(null);
  };

  const handleDeleteMapping = (id: string) => {
    const mapping = mappings.find(m => m.id === id);
    setMappings(mappings.filter(m => m.id !== id));
    toast({
      title: "Mapping Deleted",
      description: `Development mapping for ${mapping?.environmentName} has been deleted.`,
      variant: "destructive",
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
                <h2 className="text-3xl font-bold tracking-tight">Development Mapping</h2>
                <p className="text-muted-foreground">
                  Map environments to development tools like Jira, Jenkins, GitLab, and GitHub for seamless integration.
                </p>
              </div>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Mapping
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search development mappings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="grid gap-4">
              {filteredMappings.map((mapping) => (
                <Card key={mapping.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <GitBranch className="h-5 w-5" />
                          <span>{mapping.environmentName}</span>
                          <Badge variant="outline">{mapping.environmentId}</Badge>
                        </CardTitle>
                        <CardDescription>
                          {mapping.toolType.toUpperCase()} integration for development workflow
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingMapping(mapping);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteMapping(mapping.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Tool Integration</h4>
                        <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{getToolIcon(mapping.toolType)}</span>
                            <div>
                              <div className="font-medium">{mapping.toolType.toUpperCase()}</div>
                              <div className="text-sm text-muted-foreground">
                                {mapping.configuration.projectKey && `Project: ${mapping.configuration.projectKey}`}
                                {mapping.configuration.repository && `Repository: ${mapping.configuration.repository}`}
                                {mapping.configuration.workspace && ` • Workspace: ${mapping.configuration.workspace}`}
                                {mapping.configuration.namespace && `Namespace: ${mapping.configuration.namespace}`}
                              </div>
                            </div>
                          </div>
                          <LinkIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Last updated: {new Date(mapping.lastUpdated).toLocaleString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredMappings.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <GitBranch className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {searchTerm ? 'No Matching Mappings' : 'No Development Mappings'}
                  </h3>
                  <p className="text-muted-foreground text-center mb-4">
                    {searchTerm 
                      ? 'Try adjusting your search terms.'
                      : 'Get started by creating your first development mapping.'
                    }
                  </p>
                  {!searchTerm && (
                    <Button onClick={() => setIsDialogOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add First Mapping
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </SidebarInset>
      </div>

      <DevelopmentMappingDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        mapping={editingMapping}
        onSave={handleSaveMapping}
      />
    </SidebarProvider>
  );
};

export default DevelopmentMapping;
