
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Plus, Search, Server, FileText, Settings, Download, Grid, List, ChevronLeft, ChevronRight, Eye } from "lucide-react";

interface CNFEnvironment {
  id: string;
  name: string;
  description: string;
  status: 'running' | 'stopped' | 'deploying' | 'error';
  version: string;
  customer: string;
  deploymentDate: string;
  components: {
    applicationVersions: number;
    configMaps: number;
    toscaFiles: number;
    otherFiles: number;
  };
}

const EnvironmentDetail = () => {
  const { systemId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data
  const systemInfo = {
    id: systemId,
    name: 'E-commerce Platform',
    description: 'Main shopping platform for Acme Corporation',
    customer: 'Acme Corporation',
  };

  const environments: CNFEnvironment[] = [
    {
      id: 'CNF-001',
      name: 'Production Environment',
      description: 'Live production environment serving customers',
      status: 'running',
      version: 'v2.1.0',
      customer: 'Acme Corporation',
      deploymentDate: '2024-01-15',
      components: {
        applicationVersions: 5,
        configMaps: 8,
        toscaFiles: 3,
        otherFiles: 12,
      },
    },
    {
      id: 'CNF-002',
      name: 'Staging Environment',
      description: 'Pre-production testing environment',
      status: 'running',
      version: 'v2.2.0-beta',
      customer: 'Acme Corporation',
      deploymentDate: '2024-01-20',
      components: {
        applicationVersions: 6,
        configMaps: 10,
        toscaFiles: 4,
        otherFiles: 15,
      },
    },
    {
      id: 'CNF-003',
      name: 'Development Environment',
      description: 'Development and testing environment',
      status: 'deploying',
      version: 'v2.3.0-dev',
      customer: 'Acme Corporation',
      deploymentDate: '2024-01-25',
      components: {
        applicationVersions: 4,
        configMaps: 6,
        toscaFiles: 2,
        otherFiles: 8,
      },
    },
    {
      id: 'CNF-004',
      name: 'DR Environment',
      description: 'Disaster recovery environment',
      status: 'stopped',
      version: 'v2.1.0',
      customer: 'Acme Corporation',
      deploymentDate: '2024-01-10',
      components: {
        applicationVersions: 5,
        configMaps: 8,
        toscaFiles: 3,
        otherFiles: 12,
      },
    },
    // Add more mock data for pagination
    ...Array.from({ length: 12 }, (_, i) => ({
      id: `CNF-${String(i + 5).padStart(3, '0')}`,
      name: `Environment ${i + 5}`,
      description: `Environment description ${i + 5}`,
      status: ['running', 'stopped', 'deploying', 'error'][Math.floor(Math.random() * 4)] as 'running' | 'stopped' | 'deploying' | 'error',
      version: `v${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 10)}.0`,
      customer: 'Acme Corporation',
      deploymentDate: `2024-01-${String(Math.floor(Math.random() * 25) + 1).padStart(2, '0')}`,
      components: {
        applicationVersions: Math.floor(Math.random() * 8) + 2,
        configMaps: Math.floor(Math.random() * 12) + 4,
        toscaFiles: Math.floor(Math.random() * 6) + 1,
        otherFiles: Math.floor(Math.random() * 20) + 5,
      },
    }))
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-800';
      case 'stopped':
        return 'bg-red-100 text-red-800';
      case 'deploying':
        return 'bg-blue-100 text-blue-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEnvironments = environments.filter(env => {
    const matchesSearch = env.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         env.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || env.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredEnvironments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEnvironments = filteredEnvironments.slice(startIndex, startIndex + itemsPerPage);

  const handleCNFClick = (cnfId: string) => {
    navigate(`/cnf-detail/${cnfId}`);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <SidebarTrigger />
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/environment-management')}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Systems
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{systemInfo.name}</h1>
                  <p className="text-gray-600 mt-1">{systemInfo.description}</p>
                  <p className="text-sm text-gray-500">Customer: {systemInfo.customer}</p>
                </div>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Deploy New CNF
              </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Server className="h-6 w-6 text-blue-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">Total CNFs</p>
                      <p className="text-xl font-bold text-gray-900">{environments.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">Running</p>
                      <p className="text-xl font-bold text-gray-900">
                        {environments.filter(env => env.status === 'running').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">Deploying</p>
                      <p className="text-xl font-bold text-gray-900">
                        {environments.filter(env => env.status === 'deploying').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">Stopped</p>
                      <p className="text-xl font-bold text-gray-900">
                        {environments.filter(env => env.status === 'stopped').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Controls */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-80">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search environments..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="running">Running</SelectItem>
                        <SelectItem value="stopped">Stopped</SelectItem>
                        <SelectItem value="deploying">Deploying</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={viewMode === 'cards' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('cards')}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'table' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('table')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CNF Environments */}
            {viewMode === 'cards' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {paginatedEnvironments.map((env) => (
                    <Card
                      key={env.id}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => handleCNFClick(env.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{env.name}</CardTitle>
                          <Badge className={getStatusColor(env.status)}>
                            {env.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{env.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Version:</span>
                            <Badge variant="outline">{env.version}</Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Deployed:</span>
                            <span>{new Date(env.deploymentDate).toLocaleDateString()}</span>
                          </div>
                          
                          {/* Components Summary */}
                          <div className="border-t pt-3">
                            <p className="text-sm font-medium text-gray-700 mb-2">Components:</p>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="flex items-center space-x-2">
                                <Settings className="h-3 w-3 text-blue-600" />
                                <span>{env.components.applicationVersions} App Versions</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <FileText className="h-3 w-3 text-green-600" />
                                <span>{env.components.configMaps} Config Maps</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Download className="h-3 w-3 text-purple-600" />
                                <span>{env.components.toscaFiles} TOSCA Files</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <FileText className="h-3 w-3 text-gray-600" />
                                <span>{env.components.otherFiles} Other Files</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {/* Pagination for Cards */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredEnvironments.length)} of {filteredEnvironments.length} results
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <span className="text-sm text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>CNF Environments</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Environment Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Version</TableHead>
                        <TableHead>Components</TableHead>
                        <TableHead>Deployed</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedEnvironments.map((env) => (
                        <TableRow 
                          key={env.id} 
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleCNFClick(env.id)}
                        >
                          <TableCell className="font-medium">{env.name}</TableCell>
                          <TableCell className="text-gray-600">{env.description}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(env.status)}>
                              {env.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{env.version}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-xs space-y-1">
                              <div>{env.components.applicationVersions} Apps</div>
                              <div>{env.components.configMaps} Configs</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {new Date(env.deploymentDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCNFClick(env.id);
                              }}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {/* Pagination for Table */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-600">
                      Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredEnvironments.length)} of {filteredEnvironments.length} results
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      <span className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {filteredEnvironments.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Server className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No environments found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm || statusFilter !== 'all'
                      ? 'Try adjusting your search or filter criteria.'
                      : 'Get started by deploying your first CNF environment.'}
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Deploy New CNF
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default EnvironmentDetail;
