
import React, { useState } from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Network, Plus, Trash2, Edit, Search, Link as LinkIcon } from "lucide-react";
import { EnvironmentMappingDialog } from "@/components/settings/EnvironmentMappingDialog";
import { useToast } from "@/hooks/use-toast";

interface EnvironmentMapping {
  id: string;
  environmentName: string;
  environmentId: string;
  systemType: 'harbor' | 'mano';
  externalTool: {
    toolId: string;
    toolName: string;
    toolType: string;
    projectKey?: string;
    namespace?: string;
  };
  lastUpdated: string;
}

const EnvironmentMapping = () => {
  const { toast } = useToast();
  const [mappings, setMappings] = useState<EnvironmentMapping[]>([
    {
      id: '1',
      environmentName: 'Production Environment',
      environmentId: 'ENV-001',
      systemType: 'harbor',
      externalTool: {
        toolId: '1',
        toolName: 'Docker Harbor',
        toolType: 'harbor',
        projectKey: 'prod-containers',
        namespace: 'production'
      },
      lastUpdated: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      environmentName: 'Staging Environment',
      environmentId: 'ENV-002',
      systemType: 'mano',
      externalTool: {
        toolId: '2',
        toolName: 'MANO Orchestrator',
        toolType: 'mano',
        namespace: 'staging-nfv'
      },
      lastUpdated: '2024-01-14T15:45:00Z'
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMapping, setEditingMapping] = useState<EnvironmentMapping | null>(null);

  const filteredMappings = mappings.filter(mapping =>
    mapping.environmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mapping.environmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mapping.externalTool.toolName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSystemIcon = (type: string) => {
    const iconMap: Record<string, string> = {
      harbor: '🐳',
      mano: '🔧'
    };
    return iconMap[type] || '🔧';
  };

  const handleSaveMapping = (mapping: Omit<EnvironmentMapping, 'id' | 'lastUpdated'>) => {
    if (editingMapping) {
      setMappings(mappings.map(m => 
        m.id === editingMapping.id 
          ? { ...mapping, id: editingMapping.id, lastUpdated: new Date().toISOString() }
          : m
      ));
      toast({
        title: "Mapping Updated",
        description: `Environment mapping for ${mapping.environmentName} has been updated.`,
      });
    } else {
      const newMapping: EnvironmentMapping = {
        ...mapping,
        id: Date.now().toString(),
        lastUpdated: new Date().toISOString(),
      };
      setMappings([...mappings, newMapping]);
      toast({
        title: "Mapping Created",
        description: `Environment mapping for ${mapping.environmentName} has been created.`,
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
      description: `Environment mapping for ${mapping?.environmentName} has been deleted.`,
      variant: "destructive",
    });
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
                <h2 className="text-3xl font-bold tracking-tight">Environment Mapping</h2>
                <p className="text-muted-foreground">
                  Map environments to external systems like Harbor projects and MANO orchestrators for deployment management.
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
                  placeholder="Search environments..."
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
                          <Network className="h-5 w-5" />
                          <span>{mapping.environmentName}</span>
                          <Badge variant="outline">{mapping.environmentId}</Badge>
                        </CardTitle>
                        <CardDescription>
                          {mapping.systemType.toUpperCase()} integration with {mapping.externalTool.toolName}
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
                        <h4 className="text-sm font-medium mb-2">System Integration</h4>
                        <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{getSystemIcon(mapping.systemType)}</span>
                            <div>
                              <div className="font-medium">{mapping.externalTool.toolName}</div>
                              <div className="text-sm text-muted-foreground">
                                Type: {mapping.systemType.toUpperCase()}
                                {mapping.externalTool.projectKey && ` • Project: ${mapping.externalTool.projectKey}`}
                                {mapping.externalTool.namespace && ` • Namespace: ${mapping.externalTool.namespace}`}
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
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Network className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {searchTerm ? 'No Matching Mappings' : 'No Environment Mappings'}
                  </h3>
                  <p className="text-muted-foreground text-center mb-4">
                    {searchTerm 
                      ? 'Try adjusting your search terms.'
                      : 'Get started by creating your first environment mapping.'
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

      <EnvironmentMappingDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        mapping={editingMapping}
        onSave={handleSaveMapping}
      />
    </SidebarProvider>
  );
};

export default EnvironmentMapping;
