
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TableFilters } from "@/components/ui/table-filters";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ReleaseDialog } from "@/components/ReleaseDialog";
import { Calendar, GitCommit, Tag, User, Plus, Edit } from "lucide-react";

interface SearchTag {
  field: string;
  value: string;
  label: string;
}

const Releases = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingRelease, setEditingRelease] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [searchTags, setSearchTags] = useState<SearchTag[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [deploymentFrom, setDeploymentFrom] = useState<Date | undefined>();
  const [deploymentTo, setDeploymentTo] = useState<Date | undefined>();
  const itemsPerPage = 10;

  // Generate comprehensive release data
  const generateReleases = () => {
    const applications = [
      "Frontend Web App", "Backend API", "Mobile App (iOS)", "Mobile App (Android)", 
      "Analytics Dashboard", "Payment Gateway", "User Management System", 
      "Notification Service", "File Storage API", "Search Engine", 
      "Reporting Service", "Authentication Service", "E-commerce Platform",
      "Customer Portal", "Admin Dashboard", "Content Management System"
    ];

    const environments = ["Production", "Staging", "Development", "App Store", "Play Store", "Testing"];
    const statuses = ["Released", "In Review", "Pending", "In Development", "Testing", "Failed"];
    const developers = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson", "Alex Chen", "Emma Davis", "David Brown", "Lisa Garcia"];

    const releases = [];

    applications.forEach((app, appIndex) => {
      // Generate 2-4 releases per application
      const releaseCount = Math.floor(Math.random() * 3) + 2;
      
      for (let i = 0; i < releaseCount; i++) {
        const majorVersion = Math.floor(Math.random() * 3) + 1;
        const minorVersion = Math.floor(Math.random() * 10);
        const patchVersion = i; // Incremental patch versions
        const version = `v${majorVersion}.${minorVersion}.${patchVersion}`;
        
        releases.push({
          id: `${app.toLowerCase().replace(/\s+/g, '-')}-${version}`,
          name: `${app} ${version} Release`,
          version,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          environment: environments[appIndex % environments.length],
          releaseDate: new Date(2024, Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
          deployedBy: developers[Math.floor(Math.random() * developers.length)],
          commits: Math.floor(Math.random() * 50) + 5,
          features: Math.floor(Math.random() * 10) + 1,
          bugFixes: Math.floor(Math.random() * 15) + 1,
          application: app,
          description: `Release ${version} for ${app}`
        });
      }
    });

    return releases.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
  };

  const releases = generateReleases();

  // Search and filter functions
  const addSearchTag = (tag: SearchTag) => {
    setSearchTags(prev => [...prev, tag]);
  };

  const removeSearchTag = (index: number) => {
    setSearchTags(prev => prev.filter((_, i) => i !== index));
  };

  const getSearchSuggestions = () => {
    const suggestions = [];
    const inputLower = searchInput.toLowerCase();
    
    if (!searchInput) {
      return [
        { type: 'field', field: 'Release', value: 'Release:', label: 'Release' },
        { type: 'field', field: 'Application', value: 'Application:', label: 'Application' },
        { type: 'field', field: 'Environment', value: 'Environment:', label: 'Environment' },
        { type: 'field', field: 'Deployed By', value: 'Deployed By:', label: 'Deployed By' }
      ];
    }

    if (inputLower.includes(':')) {
      const [fieldPart, valuePart] = searchInput.split(':');
      const field = fieldPart.trim();
      const value = valuePart.trim();
      
      if (field.toLowerCase() === 'release' && value) {
        releases.forEach(release => {
          if (release.version.toLowerCase().includes(value.toLowerCase())) {
            suggestions.push({ 
              type: 'value', 
              field: 'Release', 
              value: `Release:${release.version}`, 
              label: `Release: ${release.version}`,
              operator: ':'
            });
          }
        });
      } else if (field.toLowerCase() === 'application' && value) {
        releases.forEach(release => {
          if (release.application.toLowerCase().includes(value.toLowerCase())) {
            suggestions.push({ 
              type: 'value', 
              field: 'Application', 
              value: `Application:${release.application}`, 
              label: `Application: ${release.application}`,
              operator: '='
            });
          }
        });
      } else if (field.toLowerCase() === 'environment' && value) {
        releases.forEach(release => {
          if (release.environment.toLowerCase().includes(value.toLowerCase())) {
            suggestions.push({ 
              type: 'value', 
              field: 'Environment', 
              value: `Environment:${release.environment}`, 
              label: `Environment: ${release.environment}`,
              operator: '='
            });
          }
        });
      } else if (field.toLowerCase() === 'deployed by' && value) {
        releases.forEach(release => {
          if (release.deployedBy.toLowerCase().includes(value.toLowerCase())) {
            suggestions.push({ 
              type: 'value', 
              field: 'Deployed By', 
              value: `Deployed By:${release.deployedBy}`, 
              label: `Deployed By: ${release.deployedBy}`,
              operator: '='
            });
          }
        });
      }
    } else {
      ['release', 'application', 'environment', 'deployed by'].forEach(field => {
        if (field.includes(inputLower)) {
          const capitalizedField = field.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ');
          suggestions.push({ 
            type: 'field', 
            field: capitalizedField, 
            value: `${capitalizedField}:`, 
            label: capitalizedField 
          });
        }
      });
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

  const filteredReleases = releases.filter(release => {
    // Search tags filter
    let matchesSearchTags = true;
    if (searchTags.length > 0) {
      matchesSearchTags = searchTags.every(tag => {
        if (tag.field === 'Release') {
          return release.version.toLowerCase().includes(tag.value.toLowerCase());
        } else if (tag.field === 'Application') {
          return release.application.toLowerCase().includes(tag.value.toLowerCase());
        } else if (tag.field === 'Environment') {
          return release.environment.toLowerCase().includes(tag.value.toLowerCase());
        } else if (tag.field === 'Deployed By') {
          return release.deployedBy.toLowerCase().includes(tag.value.toLowerCase());
        }
        return true;
      });
    }
    
    // Status filter
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(release.status);
    
    // Date filter
    let matchesDate = true;
    if (deploymentFrom || deploymentTo) {
      const releaseDate = new Date(release.releaseDate);
      if (deploymentFrom && releaseDate < deploymentFrom) matchesDate = false;
      if (deploymentTo && releaseDate > deploymentTo) matchesDate = false;
    }
    
    return matchesSearchTags && matchesStatus && matchesDate;
  });

  const clearAllFilters = () => {
    setSearchInput('');
    setSearchTags([]);
    setStatusFilter([]);
    setDeploymentFrom(undefined);
    setDeploymentTo(undefined);
    setCurrentPage(1);
  };

  const filterGroups = [
    {
      key: 'status',
      label: 'Status',
      options: ['Released', 'In Review', 'Pending', 'In Development', 'Testing', 'Failed'],
      values: statusFilter,
      onToggle: toggleStatusFilter
    }
  ];

  // Pagination logic
  const totalPages = Math.ceil(filteredReleases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReleases = filteredReleases.slice(startIndex, endIndex);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Released': return 'bg-green-100 text-green-800';
      case 'In Review': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Development': return 'bg-purple-100 text-purple-800';
      case 'Testing': return 'bg-orange-100 text-orange-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const releaseStats = {
    total: releases.length,
    released: releases.filter(r => r.status === 'Released').length,
    pending: releases.filter(r => r.status === 'Pending' || r.status === 'In Review').length,
    inDevelopment: releases.filter(r => r.status === 'In Development').length
  };

  const handleCreateRelease = (releaseData: any) => {
    console.log('Creating release:', releaseData);
  };

  const handleEditRelease = (release: any) => {
    setEditingRelease(release);
    setIsEditDialogOpen(true);
  };

  const handleUpdateRelease = (releaseData: any) => {
    console.log('Updating release:', releaseData);
    setEditingRelease(null);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-white">
          <div className="bg-white border-b border-gray-200 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Releases</h1>
                <p className="text-gray-600 mt-1">Track and manage application releases across environments</p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="text-blue-600">
                  {filteredReleases.length} releases
                </Badge>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Release
                </Button>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="flex-1 container mx-auto px-8 py-6 space-y-8">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Releases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{releaseStats.total}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Released</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{releaseStats.released}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">{releaseStats.pending}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">In Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">{releaseStats.inDevelopment}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Search and Filter */}
              <Card>
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
                      label: 'Deploy Date'
                    }}
                    onClearAll={clearAllFilters}
                    placeholder="Find release by version, application, environment, or developer"
                  />
                </CardContent>
              </Card>

              {/* Releases Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Release History</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>Release</TableHead>
                        <TableHead>Application</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Environment</TableHead>
                        <TableHead>Features</TableHead>
                        <TableHead>Bug Fixes</TableHead>
                        <TableHead>Commits</TableHead>
                        <TableHead>Deploy Date</TableHead>
                        <TableHead>Deployed By</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentReleases.map((release) => (
                        <TableRow key={release.id} className="hover:bg-gray-50">
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Tag className="h-4 w-4 text-gray-400" />
                              <div>
                                <div className="font-medium">{release.version}</div>
                                <div className="text-sm text-gray-500">{release.name}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{release.application}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(release.status)}>
                              {release.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{release.environment}</TableCell>
                          <TableCell>{release.features}</TableCell>
                          <TableCell>{release.bugFixes}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <GitCommit className="h-4 w-4 text-gray-400" />
                              <span>{release.commits}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{new Date(release.releaseDate).toLocaleDateString()}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{release.deployedBy}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditRelease(release)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="flex items-center justify-between p-4">
                    <div className="text-sm text-gray-500">
                      Showing {startIndex + 1} to {Math.min(endIndex, filteredReleases.length)} of {filteredReleases.length} releases
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
          </div>
        </main>

        <ReleaseDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onSave={handleCreateRelease}
        />

        <ReleaseDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          release={editingRelease}
          onSave={handleUpdateRelease}
        />
      </div>
    </SidebarProvider>
  );
};

export default Releases;
