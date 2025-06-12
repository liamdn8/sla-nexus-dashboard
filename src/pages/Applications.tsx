
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ApplicationStatus } from "@/components/ApplicationStatus";
import { ApplicationSummary } from "@/components/ApplicationSummary";
import { ApplicationDialog } from "@/components/ApplicationDialog";
import { QuickNavigation } from "@/components/QuickNavigation";
import { TableFilters } from "@/components/ui/table-filters";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Smartphone, Server, Database } from "lucide-react";

interface SearchTag {
  field: string;
  value: string;
  label: string;
}

const Applications = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchTags, setSearchTags] = useState<SearchTag[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [healthFilter, setHealthFilter] = useState<string[]>([]);
  const [deploymentFrom, setDeploymentFrom] = useState<Date | undefined>();
  const [deploymentTo, setDeploymentTo] = useState<Date | undefined>();

  // Sample application data
  const applicationData = [
    {
      id: 'APP-001',
      name: 'E-commerce Web App',
      version: 'v2.1.4',
      environment: 'Production',
      status: 'Active',
      health: 'Healthy',
      lastDeployment: '2024-01-15',
      type: 'Web Application',
      instances: 3
    },
    {
      id: 'APP-002',
      name: 'Mobile Banking API',
      version: 'v1.8.2',
      environment: 'Production',
      status: 'Active',
      health: 'Warning',
      lastDeployment: '2024-01-12',
      type: 'API Service',
      instances: 5
    },
    {
      id: 'APP-003',
      name: 'Analytics Dashboard',
      version: 'v3.0.1',
      environment: 'Staging',
      status: 'Inactive',
      health: 'Critical',
      lastDeployment: '2024-01-08',
      type: 'Dashboard',
      instances: 2
    },
    {
      id: 'APP-004',
      name: 'Payment Gateway',
      version: 'v1.5.0',
      environment: 'Production',
      status: 'Active',
      health: 'Healthy',
      lastDeployment: '2024-01-20',
      type: 'Service',
      instances: 4
    },
    {
      id: 'APP-005',
      name: 'User Management System',
      version: 'v2.3.1',
      environment: 'Development',
      status: 'Development',
      health: 'Healthy',
      lastDeployment: '2024-01-22',
      type: 'System',
      instances: 1
    }
  ];

  // Generate additional applications for testing
  const additionalApps = Array.from({ length: 15 }, (_, index) => {
    const appNum = 6 + index;
    const environments = ['Production', 'Staging', 'Development'];
    const statuses = ['Active', 'Inactive', 'Development', 'Maintenance'];
    const healths = ['Healthy', 'Warning', 'Critical'];
    const types = ['Web Application', 'API Service', 'Dashboard', 'Service', 'System'];
    
    return {
      id: `APP-${appNum.toString().padStart(3, '0')}`,
      name: `Application ${appNum}`,
      version: `v${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
      environment: environments[index % environments.length],
      status: statuses[index % statuses.length],
      health: healths[index % healths.length],
      lastDeployment: '2024-01-15',
      type: types[index % types.length],
      instances: Math.floor(Math.random() * 5) + 1
    };
  });

  const allApplications = [...applicationData, ...additionalApps];

  const getSearchSuggestions = () => {
    const suggestions = [];
    const inputLower = searchInput.toLowerCase();
    
    if (!searchInput) {
      return [
        { type: 'field', field: 'Application', value: 'Application:', label: 'Application' },
        { type: 'field', field: 'Version', value: 'Version:', label: 'Version' },
        { type: 'field', field: 'Environment', value: 'Environment:', label: 'Environment' }
      ];
    }

    if (inputLower.includes(':')) {
      const [fieldPart, valuePart] = searchInput.split(':');
      const field = fieldPart.trim();
      const value = valuePart.trim();
      
      if (field.toLowerCase() === 'application' && value) {
        allApplications.forEach(app => {
          if (app.name.toLowerCase().includes(value.toLowerCase())) {
            suggestions.push({ 
              type: 'value', 
              field: 'Application', 
              value: `Application:${app.name}`, 
              label: `Application: ${app.name}`,
              operator: ':'
            });
          }
        });
      } else if (field.toLowerCase() === 'version' && value) {
        allApplications.forEach(app => {
          if (app.version.toLowerCase().includes(value.toLowerCase())) {
            suggestions.push({ 
              type: 'value', 
              field: 'Version', 
              value: `Version:${app.version}`, 
              label: `Version: ${app.version}`,
              operator: '='
            });
          }
        });
      } else if (field.toLowerCase() === 'environment' && value) {
        allApplications.forEach(app => {
          if (app.environment.toLowerCase().includes(value.toLowerCase())) {
            suggestions.push({ 
              type: 'value', 
              field: 'Environment', 
              value: `Environment:${app.environment}`, 
              label: `Environment: ${app.environment}`,
              operator: '='
            });
          }
        });
      }
    } else {
      if ('application'.includes(inputLower)) {
        suggestions.push({ type: 'field', field: 'Application', value: 'Application:', label: 'Application' });
      }
      if ('version'.includes(inputLower)) {
        suggestions.push({ type: 'field', field: 'Version', value: 'Version:', label: 'Version' });
      }
      if ('environment'.includes(inputLower)) {
        suggestions.push({ type: 'field', field: 'Environment', value: 'Environment:', label: 'Environment' });
      }
    }
    
    return suggestions.slice(0, 8);
  };

  const toggleStatusFilter = (status: string) => {
    if (status === 'All') {
      setStatusFilter([]);
    } else {
      setStatusFilter(prev => 
        prev.includes(status) 
          ? prev.filter(s => s !== status)
          : [...prev, status]
      );
    }
  };

  const toggleHealthFilter = (health: string) => {
    if (health === 'All') {
      setHealthFilter([]);
    } else {
      setHealthFilter(prev => 
        prev.includes(health) 
          ? prev.filter(h => h !== health)
          : [...prev, health]
      );
    }
  };

  const filteredApplications = allApplications.filter(app => {
    // Search tags filter
    let matchesSearchTags = true;
    if (searchTags.length > 0) {
      matchesSearchTags = searchTags.every(tag => {
        if (tag.field === 'Application') {
          return app.name.toLowerCase().includes(tag.value.toLowerCase());
        } else if (tag.field === 'Version') {
          return app.version.toLowerCase().includes(tag.value.toLowerCase());
        } else if (tag.field === 'Environment') {
          return app.environment.toLowerCase().includes(tag.value.toLowerCase());
        }
        return true;
      });
    }
    
    // Status filter
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(app.status);
    
    // Health filter
    const matchesHealth = healthFilter.length === 0 || healthFilter.includes(app.health);
    
    // Date filter
    let matchesDate = true;
    if (deploymentFrom || deploymentTo) {
      const deploymentDate = new Date(app.lastDeployment);
      if (deploymentFrom && deploymentDate < deploymentFrom) matchesDate = false;
      if (deploymentTo && deploymentDate > deploymentTo) matchesDate = false;
    }
    
    return matchesSearchTags && matchesStatus && matchesHealth && matchesDate;
  });

  const clearAllFilters = () => {
    setSearchInput('');
    setSearchTags([]);
    setStatusFilter([]);
    setHealthFilter([]);
    setDeploymentFrom(undefined);
    setDeploymentTo(undefined);
  };

  const addSearchTag = (tag: SearchTag) => {
    setSearchTags([...searchTags, tag]);
  };

  const removeSearchTag = (index: number) => {
    setSearchTags(searchTags.filter((_, i) => i !== index));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Development': return 'bg-blue-100 text-blue-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'Healthy': return 'bg-green-100 text-green-800';
      case 'Warning': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Web Application': return <Smartphone className="h-4 w-4" />;
      case 'API Service': return <Server className="h-4 w-4" />;
      case 'Dashboard': return <Database className="h-4 w-4" />;
      default: return <Server className="h-4 w-4" />;
    }
  };

  const handleCreateApplication = (applicationData: any) => {
    console.log('Creating application:', applicationData);
  };

  const handleEditApplication = (application: any) => {
    setEditingApplication(application);
    setIsEditDialogOpen(true);
  };

  const handleUpdateApplication = (applicationData: any) => {
    console.log('Updating application:', applicationData);
    setEditingApplication(null);
  };

  const filterGroups = [
    {
      key: 'status',
      label: 'Status',
      options: ['Active', 'Inactive', 'Development', 'Maintenance'],
      values: statusFilter,
      onToggle: toggleStatusFilter
    },
    {
      key: 'health',
      label: 'Health',
      options: ['Healthy', 'Warning', 'Critical'],
      values: healthFilter,
      onToggle: toggleHealthFilter
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-white">
          <div className="bg-white border-b border-gray-200 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
                <p className="text-gray-600 mt-1">Manage and monitor application status and deployments</p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="text-blue-600">
                  {filteredApplications.length} Applications
                </Badge>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Application
                </Button>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="flex-1 container mx-auto px-8 py-6 space-y-6">
              <ApplicationSummary />
              
              {/* Applications List with Search/Filter */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900">Applications List</h2>
                </div>
                
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <TableFilters
                      searchInput={searchInput}
                      onSearchInputChange={setSearchInput}
                      searchTags={searchTags}
                      onAddSearchTag={addSearchTag}
                      onRemoveSearchTag={removeSearchTag}
                      searchSuggestions={getSearchSuggestions()}
                      filterGroups={filterGroups}
                      dateFilters={{
                        from: deploymentFrom,
                        to: deploymentTo,
                        onFromChange: setDeploymentFrom,
                        onToChange: setDeploymentTo,
                        label: 'Deployment Date'
                      }}
                      onClearAll={clearAllFilters}
                      placeholder="Find application by name, version, or environment"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead>Application</TableHead>
                          <TableHead>Version</TableHead>
                          <TableHead>Environment</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Health</TableHead>
                          <TableHead>Instances</TableHead>
                          <TableHead>Last Deployment</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredApplications.map((app) => (
                          <TableRow key={app.id} className="hover:bg-gray-50 cursor-pointer transition-colors">
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                {getTypeIcon(app.type)}
                                <div>
                                  <p className="font-medium text-blue-600">{app.name}</p>
                                  <p className="text-sm text-gray-500">{app.id}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{app.version}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">{app.environment}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(app.status)}>
                                {app.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getHealthColor(app.health)}>
                                {app.health}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{app.instances}</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{new Date(app.lastDeployment).toLocaleDateString()}</span>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditApplication(app)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </section>
            </div>
            
            <div className="w-80 border-l border-gray-200 p-6">
              <QuickNavigation />
            </div>
          </div>
        </main>

        <ApplicationDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onSave={handleCreateApplication}
        />

        <ApplicationDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          application={editingApplication}
          onSave={handleUpdateApplication}
        />
      </div>
    </SidebarProvider>
  );
};

export default Applications;
