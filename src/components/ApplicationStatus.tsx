import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { TableFilters } from "@/components/ui/table-filters";
import { Plus, Edit, Trash2, Eye, ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchTag {
  field: string;
  value: string;
  label: string;
}

export const ApplicationStatus = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [searchTags, setSearchTags] = useState<SearchTag[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [environmentFilter, setEnvironmentFilter] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const itemsPerPage = 10;

  // Generate comprehensive application data
  const generateApplications = () => {
    const baseApps = [
      "Frontend Web App", "Backend API", "Mobile App (iOS)", "Mobile App (Android)", 
      "Analytics Dashboard", "Payment Gateway", "User Management System", 
      "Notification Service", "File Storage API", "Search Engine", 
      "Reporting Service", "Authentication Service", "E-commerce Platform",
      "Customer Portal", "Admin Dashboard", "Content Management System",
      "Message Queue Service", "Cache Service", "Load Balancer", "Database Service"
    ];

    const environments = ["Production", "Staging", "Development", "App Store", "Play Store", "Testing"];
    const statuses = ["Released", "In Development", "Pending Release", "Testing", "Maintenance"];
    const healths = ["Healthy", "Testing", "Ready", "Development", "Warning", "Critical"];

    return baseApps.map((name, index) => {
      const appId = `app-${(index + 1).toString().padStart(3, '0')}`;
      const majorVersion = Math.floor(Math.random() * 3) + 1;
      const minorVersion = Math.floor(Math.random() * 10);
      const patchVersion = Math.floor(Math.random() * 10);
      
      return {
        id: appId,
        name,
        version: `v${majorVersion}.${minorVersion}.${patchVersion}`,
        status: statuses[index % statuses.length],
        environment: environments[index % environments.length],
        lastDeployment: new Date(2024, 4, Math.floor(Math.random() * 30) + 1).toISOString().split('T')[0],
        health: healths[index % healths.length],
        issues: Math.floor(Math.random() * 20),
        coverage: `${Math.floor(Math.random() * 30) + 70}%`
      };
    });
  };

  const applications = generateApplications();

  // Add the missing functions
  const addSearchTag = (tag: SearchTag) => {
    setSearchTags(prev => [...prev, tag]);
  };

  const removeSearchTag = (index: number) => {
    setSearchTags(prev => prev.filter((_, i) => i !== index));
  };

  // Filter and search logic
  const filteredApplications = applications.filter(app => {
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
    
    // Environment filter
    const matchesEnvironment = environmentFilter.length === 0 || environmentFilter.includes(app.environment);
    
    return matchesSearchTags && matchesStatus && matchesEnvironment;
  });

  // Sort logic
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (!sortField) return 0;
    
    let aValue = a[sortField as keyof typeof a];
    let bValue = b[sortField as keyof typeof b];
    
    if (sortField === 'issues') {
      aValue = Number(aValue);
      bValue = Number(bValue);
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Released": return "bg-green-100 text-green-800";
      case "In Development": return "bg-blue-100 text-blue-800";
      case "Pending Release": return "bg-yellow-100 text-yellow-800";
      case "Testing": return "bg-purple-100 text-purple-800";
      case "Maintenance": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case "Healthy": return "bg-green-100 text-green-800";
      case "Testing": return "bg-blue-100 text-blue-800";
      case "Ready": return "bg-green-100 text-green-800";
      case "Development": return "bg-yellow-100 text-yellow-800";
      case "Warning": return "bg-yellow-100 text-yellow-800";
      case "Critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const statusSummary = {
    Released: applications.filter(app => app.status === "Released").length,
    "In Development": applications.filter(app => app.status === "In Development").length,
    "Pending Release": applications.filter(app => app.status === "Pending Release").length,
  };

  // Pagination logic
  const totalPages = Math.ceil(sortedApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentApplications = sortedApplications.slice(startIndex, endIndex);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const clearFilters = () => {
    setSearchInput('');
    setSearchTags([]);
    setStatusFilter([]);
    setEnvironmentFilter([]);
    setSortField('');
    setSortDirection('asc');
    setCurrentPage(1);
  };

  const handleAddApplication = () => {
    console.log('Opening add application dialog...');
    // Add logic to open create application form
  };

  const handleEditApplication = (appId: string) => {
    console.log('Editing application:', appId);
    // Add logic to edit application
  };

  const handleDeleteApplication = (appId: string) => {
    console.log('Deleting application:', appId);
    // Add logic to delete application
  };

  const handleViewApplication = (appId: string) => {
    navigate(`/application-detail/${appId}`);
  };

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
        applications.forEach(app => {
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
        applications.forEach(app => {
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
        applications.forEach(app => {
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

  const toggleEnvironmentFilter = (environment: string) => {
    if (environment === 'All') {
      setEnvironmentFilter([]);
    } else {
      setEnvironmentFilter(prev => 
        prev.includes(environment) 
          ? prev.filter(e => e !== environment)
          : [...prev, environment]
      );
    }
  };

  const filterGroups = [
    {
      key: 'status',
      label: 'Status',
      options: ['Released', 'In Development', 'Pending Release', 'Testing', 'Maintenance'],
      values: statusFilter,
      onToggle: toggleStatusFilter
    },
    {
      key: 'environment',
      label: 'Environment',
      options: ['Production', 'Staging', 'Development', 'App Store', 'Play Store', 'Testing'],
      values: environmentFilter,
      onToggle: toggleEnvironmentFilter
    }
  ];

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Applications & Releases</h2>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              {Object.entries(statusSummary).map(([status, count]) => (
                <Badge key={status} variant="outline" className="text-xs">
                  {status}: {count}
                </Badge>
              ))}
            </div>
            <Button onClick={handleAddApplication} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Application
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Application Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <TableFilters
              searchInput={searchInput}
              onSearchInputChange={setSearchInput}
              searchTags={searchTags}
              onAddSearchTag={addSearchTag}
              onRemoveSearchTag={removeSearchTag}
              searchSuggestions={getSearchSuggestions()}
              filterGroups={filterGroups}
              onClearAll={clearFilters}
              placeholder="Find application by name, version, or environment"
            />

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Application
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center">
                      Status
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('environment')}
                  >
                    <div className="flex items-center">
                      Environment
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Health</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('issues')}
                  >
                    <div className="flex items-center">
                      Issues
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Coverage</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('lastDeployment')}
                  >
                    <div className="flex items-center">
                      Last Deploy
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentApplications.map((app) => (
                  <TableRow key={app.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{app.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{app.version}</Badge>
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Current development and release status</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{app.environment}</TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge className={getHealthColor(app.health)}>{app.health}</Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Application health and monitoring status</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <span className={app.issues > 10 ? "text-red-600 font-medium" : "text-gray-700"}>
                        {app.issues}
                      </span>
                    </TableCell>
                    <TableCell>{app.coverage}</TableCell>
                    <TableCell className="text-sm text-gray-600">{app.lastDeployment}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewApplication(app.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Details</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditApplication(app.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit Application</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteApplication(app.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete Application</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1} to {Math.min(endIndex, sortedApplications.length)} of {sortedApplications.length} applications
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          onClick={() => setCurrentPage(pageNum)}
                          isActive={currentPage === pageNum}
                          className="cursor-pointer"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};
