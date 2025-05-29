
import React, { useState } from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, Plus, Trash2, Edit, Search, Link as LinkIcon } from "lucide-react";
import { CustomerMappingDialog } from "@/components/settings/CustomerMappingDialog";
import { useToast } from "@/hooks/use-toast";

interface CustomerMapping {
  id: string;
  customerName: string;
  internalId: string;
  externalTools: {
    toolId: string;
    toolName: string;
    toolType: string;
    externalId: string;
    projectKey?: string;
  }[];
  applications: string[];
  lastUpdated: string;
}

const CustomerMapping = () => {
  const { toast } = useToast();
  const [mappings, setMappings] = useState<CustomerMapping[]>([
    {
      id: '1',
      customerName: 'Acme Corporation',
      internalId: 'CUST-001',
      externalTools: [
        {
          toolId: '1',
          toolName: 'Production Jira',
          toolType: 'jira',
          externalId: 'ACME',
          projectKey: 'ACM'
        },
        {
          toolId: '2',
          toolName: 'Docker Harbor',
          toolType: 'harbor',
          externalId: 'acme-corp'
        }
      ],
      applications: ['Web Portal', 'Mobile App', 'API Gateway'],
      lastUpdated: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      customerName: 'TechStart Inc',
      internalId: 'CUST-002',
      externalTools: [
        {
          toolId: '1',
          toolName: 'Production Jira',
          toolType: 'jira',
          externalId: 'TECH',
          projectKey: 'TSI'
        }
      ],
      applications: ['Analytics Platform'],
      lastUpdated: '2024-01-14T15:45:00Z'
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMapping, setEditingMapping] = useState<CustomerMapping | null>(null);

  const filteredMappings = mappings.filter(mapping =>
    mapping.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mapping.internalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mapping.applications.some(app => app.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getToolIcon = (type: string) => {
    const iconMap: Record<string, string> = {
      jira: '🎯',
      harbor: '🐳',
      gitlab: '🦊',
      github: '🐙',
      jenkins: '👷'
    };
    return iconMap[type] || '🔧';
  };

  const handleSaveMapping = (mapping: Omit<CustomerMapping, 'id' | 'lastUpdated'>) => {
    if (editingMapping) {
      setMappings(mappings.map(m => 
        m.id === editingMapping.id 
          ? { ...mapping, id: editingMapping.id, lastUpdated: new Date().toISOString() }
          : m
      ));
      toast({
        title: "Mapping Updated",
        description: `Customer mapping for ${mapping.customerName} has been updated.`,
      });
    } else {
      const newMapping: CustomerMapping = {
        ...mapping,
        id: Date.now().toString(),
        lastUpdated: new Date().toISOString(),
      };
      setMappings([...mappings, newMapping]);
      toast({
        title: "Mapping Created",
        description: `Customer mapping for ${mapping.customerName} has been created.`,
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
      description: `Customer mapping for ${mapping?.customerName} has been deleted.`,
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
                <h2 className="text-3xl font-bold tracking-tight">Customer Mapping</h2>
                <p className="text-muted-foreground">
                  Map internal customers to external tools and applications for seamless integration.
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
                  placeholder="Search customers..."
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
                          <Users className="h-5 w-5" />
                          <span>{mapping.customerName}</span>
                          <Badge variant="outline">{mapping.internalId}</Badge>
                        </CardTitle>
                        <CardDescription>
                          {mapping.applications.length} application(s) • {mapping.externalTools.length} external tool(s)
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
                        <h4 className="text-sm font-medium mb-2">Applications</h4>
                        <div className="flex flex-wrap gap-2">
                          {mapping.applications.map((app, index) => (
                            <Badge key={index} variant="secondary">
                              {app}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">External Tools</h4>
                        <div className="space-y-2">
                          {mapping.externalTools.map((tool, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">{getToolIcon(tool.toolType)}</span>
                                <div>
                                  <div className="font-medium">{tool.toolName}</div>
                                  <div className="text-sm text-muted-foreground">
                                    ID: {tool.externalId}
                                    {tool.projectKey && ` • Project: ${tool.projectKey}`}
                                  </div>
                                </div>
                              </div>
                              <LinkIcon className="h-4 w-4 text-muted-foreground" />
                            </div>
                          ))}
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
                  <Users className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {searchTerm ? 'No Matching Mappings' : 'No Customer Mappings'}
                  </h3>
                  <p className="text-muted-foreground text-center mb-4">
                    {searchTerm 
                      ? 'Try adjusting your search terms.'
                      : 'Get started by creating your first customer mapping.'
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

      <CustomerMappingDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        mapping={editingMapping}
        onSave={handleSaveMapping}
      />
    </SidebarProvider>
  );
};

export default CustomerMapping;
