
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Building, Server, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Customer {
  id: string;
  name: string;
  description: string;
  systemCount: number;
  status: 'active' | 'inactive';
}

interface System {
  id: string;
  name: string;
  description: string;
  customerId: string;
  customerName: string;
  environmentCount: number;
  status: 'running' | 'stopped' | 'maintenance';
  lastDeployment: string;
  version: string;
  deploymentType: string;
}

const EnvironmentManagement = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const customerFilter = searchParams.get('customer');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<string>(customerFilter || 'all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data
  const customers: Customer[] = [
    { id: 'CUST-001', name: 'Acme Corporation', description: 'Large enterprise customer', systemCount: 3, status: 'active' },
    { id: 'CUST-002', name: 'Tech Solutions Inc', description: 'Technology service provider', systemCount: 2, status: 'active' },
    { id: 'CUST-003', name: 'Global Retail Ltd', description: 'International retail chain', systemCount: 1, status: 'inactive' },
  ];

  const systems: System[] = [
    { 
      id: 'SYS-001', 
      name: 'E-commerce Platform', 
      description: 'Main shopping platform', 
      customerId: 'CUST-001', 
      customerName: 'Acme Corporation', 
      environmentCount: 4, 
      status: 'running',
      lastDeployment: '2024-01-25',
      version: 'v2.1.0',
      deploymentType: 'Production'
    },
    { 
      id: 'SYS-002', 
      name: 'Payment Gateway', 
      description: 'Payment processing system', 
      customerId: 'CUST-001', 
      customerName: 'Acme Corporation', 
      environmentCount: 3, 
      status: 'running',
      lastDeployment: '2024-01-20',
      version: 'v1.5.0',
      deploymentType: 'Production'
    },
    { 
      id: 'SYS-003', 
      name: 'Analytics Dashboard', 
      description: 'Business intelligence platform', 
      customerId: 'CUST-002', 
      customerName: 'Tech Solutions Inc', 
      environmentCount: 2, 
      status: 'maintenance',
      lastDeployment: '2024-01-18',
      version: 'v3.1.0',
      deploymentType: 'Staging'
    },
    { 
      id: 'SYS-004', 
      name: 'Inventory Management', 
      description: 'Stock and inventory tracking', 
      customerId: 'CUST-001', 
      customerName: 'Acme Corporation', 
      environmentCount: 2, 
      status: 'running',
      lastDeployment: '2024-01-22',
      version: 'v1.8.0',
      deploymentType: 'Production'
    },
    { 
      id: 'SYS-005', 
      name: 'CRM System', 
      description: 'Customer relationship management', 
      customerId: 'CUST-002', 
      customerName: 'Tech Solutions Inc', 
      environmentCount: 3, 
      status: 'stopped',
      lastDeployment: '2024-01-15',
      version: 'v2.3.0',
      deploymentType: 'Development'
    },
    // Add more mock data for pagination
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `SYS-${String(i + 6).padStart(3, '0')}`,
      name: `System ${i + 6}`,
      description: `System description ${i + 6}`,
      customerId: customers[i % 3].id,
      customerName: customers[i % 3].name,
      environmentCount: Math.floor(Math.random() * 5) + 1,
      status: ['running', 'stopped', 'maintenance'][Math.floor(Math.random() * 3)] as 'running' | 'stopped' | 'maintenance',
      lastDeployment: `2024-01-${String(Math.floor(Math.random() * 25) + 1).padStart(2, '0')}`,
      version: `v${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 10)}.0`,
      deploymentType: ['Production', 'Staging', 'Development'][Math.floor(Math.random() * 3)]
    }))
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'running':
        return 'bg-green-100 text-green-800';
      case 'inactive':
      case 'stopped':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredSystems = systems.filter(system => {
    const matchesSearch = system.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         system.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         system.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCustomer = selectedCustomer === 'all' || system.customerId === selectedCustomer;
    const matchesStatus = statusFilter === 'all' || system.status === statusFilter;
    return matchesSearch && matchesCustomer && matchesStatus;
  });

  const totalPages = Math.ceil(filteredSystems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSystems = filteredSystems.slice(startIndex, startIndex + itemsPerPage);

  const handleSystemClick = (systemId: string) => {
    navigate(`/environment-detail/${systemId}`);
  };

  const handleCustomerClick = (customerId: string) => {
    navigate(`/customers/${customerId}`);
  };

  const totalEnvironments = systems.reduce((sum, sys) => sum + sys.environmentCount, 0);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <SidebarTrigger />
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Environment Management</h1>
                <p className="text-gray-600 mt-1">Manage systems and CNF environments</p>
              </div>
              <div className="flex space-x-2">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add System
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/customers')}
                >
                  <Building className="h-4 w-4 mr-2" />
                  Manage Customers
                </Button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Building className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Customers</p>
                      <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Server className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Systems</p>
                      <p className="text-2xl font-bold text-gray-900">{systems.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Server className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total CNF Environments</p>
                      <p className="text-2xl font-bold text-gray-900">{totalEnvironments}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Systems Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Systems</CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative w-80">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search systems..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Customers</SelectItem>
                        {customers.map((customer) => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="running">Running</SelectItem>
                        <SelectItem value="stopped">Stopped</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>System Name</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>CNF Environments</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Deployment</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedSystems.map((system) => (
                      <TableRow 
                        key={system.id} 
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleSystemClick(system.id)}
                      >
                        <TableCell className="font-medium">{system.name}</TableCell>
                        <TableCell>
                          <Button 
                            variant="link" 
                            className="p-0 h-auto font-normal"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCustomerClick(system.customerId);
                            }}
                          >
                            {system.customerName}
                          </Button>
                        </TableCell>
                        <TableCell className="text-gray-600">{system.description}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{system.version}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{system.deploymentType}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {system.environmentCount} CNFs
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(system.status)}>
                            {system.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {new Date(system.lastDeployment).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSystemClick(system.id);
                            }}
                          >
                            View Environments
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-600">
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredSystems.length)} of {filteredSystems.length} results
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
                
                {filteredSystems.length === 0 && (
                  <div className="text-center py-8">
                    <Server className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No systems found</h3>
                    <p className="text-gray-600 mb-4">
                      {searchTerm || selectedCustomer !== 'all' || statusFilter !== 'all'
                        ? 'Try adjusting your search or filter criteria.'
                        : 'Get started by adding your first system.'}
                    </p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add System
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default EnvironmentManagement;
