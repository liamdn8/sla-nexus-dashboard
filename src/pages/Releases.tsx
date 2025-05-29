
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, GitCommit, Tag, User } from "lucide-react";

const Releases = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const releases = [
    {
      id: 'v2.1.0',
      name: 'Frontend Enhancement Release',
      version: 'v2.1.0',
      status: 'Released',
      environment: 'Production',
      releaseDate: '2024-05-25',
      deployedBy: 'John Doe',
      commits: 23,
      features: ['New authentication flow', 'Enhanced UI components', 'Performance improvements'],
      bugFixes: 8,
      application: 'Frontend Web App'
    },
    {
      id: 'v1.8.2',
      name: 'Backend API Security Update',
      version: 'v1.8.2',
      status: 'In Review',
      environment: 'Staging',
      releaseDate: '2024-05-28',
      deployedBy: 'Jane Smith',
      commits: 15,
      features: ['Enhanced security protocols', 'API rate limiting', 'New endpoint validation'],
      bugFixes: 5,
      application: 'Backend API'
    },
    {
      id: 'v1.5.1',
      name: 'Mobile App Bug Fixes',
      version: 'v1.5.1',
      status: 'Pending',
      environment: 'Development',
      releaseDate: '2024-05-30',
      deployedBy: 'Mike Johnson',
      commits: 8,
      features: ['Push notification improvements', 'Offline mode enhancements'],
      bugFixes: 12,
      application: 'Mobile App'
    },
    {
      id: 'v0.9.3',
      name: 'Analytics Dashboard Beta',
      version: 'v0.9.3',
      status: 'In Development',
      environment: 'Development',
      releaseDate: '2024-06-05',
      deployedBy: 'Sarah Wilson',
      commits: 31,
      features: ['Real-time analytics', 'Custom dashboard widgets', 'Export functionality'],
      bugFixes: 3,
      application: 'Analytics Dashboard'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Releases' },
    { value: 'Released', label: 'Released' },
    { value: 'In Review', label: 'In Review' },
    { value: 'Pending', label: 'Pending' },
    { value: 'In Development', label: 'In Development' }
  ];

  const filteredReleases = selectedStatus === 'all' 
    ? releases 
    : releases.filter(release => release.status === selectedStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Released': return 'bg-green-100 text-green-800';
      case 'In Review': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Development': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const releaseStats = {
    total: releases.length,
    released: releases.filter(r => r.status === 'Released').length,
    pending: releases.filter(r => r.status === 'Pending' || r.status === 'In Review').length,
    inDevelopment: releases.filter(r => r.status === 'In Development').length
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
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Badge variant="outline" className="text-blue-600">
                  {filteredReleases.length} releases
                </Badge>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-8 py-6 space-y-8">
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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReleases.map((release) => (
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
                        <TableCell>{release.features.length}</TableCell>
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Releases;
