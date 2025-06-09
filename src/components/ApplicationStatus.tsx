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

export const ApplicationStatus = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [environmentFilter, setEnvironmentFilter] = useState('all');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const itemsPerPage = 5;

  const applications = [
    {
      id: "app-001",
      name: "Frontend Web App",
      version: "v2.1.0",
      status: "Released",
      environment: "Production",
      lastDeployment: "2024-05-25",
      health: "Healthy",
      issues: 3,
      coverage: "94%"
    },
    {
      id: "app-002",
      name: "Backend API",
      version: "v1.8.2",
      status: "In Development",
      environment: "Staging",
      lastDeployment: "2024-05-24",
      health: "Testing",
      issues: 7,
      coverage: "87%"
    },
    {
      id: "app-003",
      name: "Mobile App (iOS)",
      version: "v1.5.0",
      status: "Released",
      environment: "App Store",
      lastDeployment: "2024-05-20",
      health: "Healthy",
      issues: 1,
      coverage: "91%"
    },
    {
      id: "app-004",
      name: "Mobile App (Android)",
      version: "v1.5.1",
      status: "Pending Release",
      environment: "Play Store",
      lastDeployment: "2024-05-26",
      health: "Ready",
      issues: 2,
      coverage: "89%"
    },
    {
      id: "app-005",
      name: "Analytics Dashboard",
      version: "v0.9.3",
      status: "In Development",
      environment: "Development",
      lastDeployment: "2024-05-27",
      health: "Development",
      issues: 12,
      coverage: "76%"
    },
    {
      id: "app-006",
      name: "Payment Gateway",
      version: "v2.0.1",
      status: "Released",
      environment: "Production",
      lastDeployment: "2024-05-23",
      health: "Healthy",
      issues: 0,
      coverage: "96%"
    },
    {
      id: "app-007",
      name: "User Management System",
      version: "v1.7.4",
      status: "Pending Release",
      environment: "Staging",
      lastDeployment: "2024-05-28",
      health: "Ready",
      issues: 4,
      coverage: "88%"
    },
    {
      id: "app-008",
      name: "Notification Service",
      version: "v1.3.2",
      status: "In Development",
      environment: "Development",
      lastDeployment: "2024-05-29",
      health: "Testing",
      issues: 8,
      coverage: "82%"
    },
    {
      id: "app-009",
      name: "File Storage API",
      version: "v2.2.0",
      status: "Released",
      environment: "Production",
      lastDeployment: "2024-05-22",
      health: "Healthy",
      issues: 1,
      coverage: "93%"
    },
    {
      id: "app-010",
      name: "Search Engine",
      version: "v1.1.5",
      status: "In Development",
      environment: "Development",
      lastDeployment: "2024-05-30",
      health: "Development",
      issues: 15,
      coverage: "79%"
    },
    {
      id: "app-011",
      name: "Reporting Service",
      version: "v1.4.8",
      status: "Pending Release",
      environment: "Staging",
      lastDeployment: "2024-05-26",
      health: "Ready",
      issues: 3,
      coverage: "90%"
    },
    {
      id: "app-012",
      name: "Authentication Service",
      version: "v3.0.0",
      status: "Released",
      environment: "Production",
      lastDeployment: "2024-05-21",
      health: "Healthy",
      issues: 2,
      coverage: "97%"
    }
  ];

  // Filter and search logic
  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                         app.version.toLowerCase().includes(searchValue.toLowerCase()) ||
                         app.environment.toLowerCase().includes(searchValue.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesEnvironment = environmentFilter === 'all' || app.environment === environmentFilter;
    return matchesSearch && matchesStatus && matchesEnvironment;
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
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case "Healthy": return "bg-green-100 text-green-800";
      case "Testing": return "bg-blue-100 text-blue-800";
      case "Ready": return "bg-green-100 text-green-800";
      case "Development": return "bg-yellow-100 text-yellow-800";
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
    setSearchValue('');
    setStatusFilter('all');
    setEnvironmentFilter('all');
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
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              searchPlaceholder="Search applications..."
              filters={[
                {
                  field: 'status',
                  label: 'Status',
                  value: statusFilter,
                  onValueChange: setStatusFilter,
                  options: [
                    { value: 'all', label: 'All Status' },
                    { value: 'Released', label: 'Released' },
                    { value: 'In Development', label: 'In Development' },
                    { value: 'Pending Release', label: 'Pending Release' }
                  ]
                },
                {
                  field: 'environment',
                  label: 'Environment',
                  value: environmentFilter,
                  onValueChange: setEnvironmentFilter,
                  options: [
                    { value: 'all', label: 'All Environments' },
                    { value: 'Production', label: 'Production' },
                    { value: 'Staging', label: 'Staging' },
                    { value: 'Development', label: 'Development' },
                    { value: 'App Store', label: 'App Store' },
                    { value: 'Play Store', label: 'Play Store' }
                  ]
                }
              ]}
              onClearFilters={clearFilters}
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
                      <span className={app.issues > 5 ? "text-red-600 font-medium" : "text-gray-700"}>
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
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
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
