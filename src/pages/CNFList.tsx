
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Database, Filter, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CNF {
  id: string;
  name: string;
  description: string;
  systemId: string;
  systemName: string;
  customerId: string;
  customerName: string;
  status: 'running' | 'stopped' | 'maintenance' | 'pending';
  version: string;
  environment: 'production' | 'staging' | 'development';
  deploymentDate: string;
  lastUpdate: string;
  componentCount: number;
}

const CNFList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<string>('all');
  const [selectedSystem, setSelectedSystem] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [environmentFilter, setEnvironmentFilter] = useState<string>('all');

  // Mock data
  const cnfs: CNF[] = [
    {
      id: 'CNF-001',
      name: 'Production Environment',
      description: 'Live production environment serving customers',
      systemId: 'SYS-001',
      systemName: 'E-commerce Platform',
      customerId: 'CUST-001',
      customerName: 'Acme Corporation',
      status: 'running',
      version: 'v2.1.0',
      environment: 'production',
      deploymentDate: '2024-01-15',
      lastUpdate: '2024-01-20',
      componentCount: 16
    },
    {
      id: 'CNF-002',
      name: 'Staging Environment',
      description: 'Pre-production testing environment',
      systemId: 'SYS-001',
      systemName: 'E-commerce Platform',
      customerId: 'CUST-001',
      customerName: 'Acme Corporation',
      status: 'running',
      version: 'v2.2.0-beta',
      environment: 'staging',
      deploymentDate: '2024-01-18',
      lastUpdate: '2024-01-22',
      componentCount: 14
    },
    {
      id: 'CNF-003',
      name: 'Development Environment',
      description: 'Development and testing environment',
      systemId: 'SYS-001',
      systemName: 'E-commerce Platform',
      customerId: 'CUST-001',
      customerName: 'Acme Corporation',
      status: 'maintenance',
      version: 'v2.3.0-alpha',
      environment: 'development',
      deploymentDate: '2024-01-20',
      lastUpdate: '2024-01-25',
      componentCount: 12
    },
    {
      id: 'CNF-004',
      name: 'Payment Production',
      description: 'Payment processing production environment',
      systemId: 'SYS-002',
      systemName: 'Payment Gateway',
      customerId: 'CUST-001',
      customerName: 'Acme Corporation',
      status: 'running',
      version: 'v1.5.0',
      environment: 'production',
      deploymentDate: '2024-01-10',
      lastUpdate: '2024-01-18',
      componentCount: 8
    },
    {
      id: 'CNF-005',
      name: 'Analytics Production',
      description: 'Business intelligence production environment',
      systemId: 'SYS-003',
      systemName: 'Analytics Dashboard',
      customerId: 'CUST-002',
      customerName: 'Tech Solutions Inc',
      status: 'stopped',
      version: 'v3.1.0',
      environment: 'production',
      deploymentDate: '2024-01-12',
      lastUpdate: '2024-01-19',
      componentCount: 10
    },
  ];

  const customers = Array.from(new Set(cnfs.map(cnf => ({ id: cnf.customerId, name: cnf.customerName }))))
    .reduce((acc, current) => {
      const x = acc.find(item => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, [] as { id: string; name: string }[]);

  const systems = Array.from(new Set(cnfs.map(cnf => ({ id: cnf.systemId, name: cnf.systemName }))))
    .reduce((acc, current) => {
      const x = acc.find(item => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, [] as { id: string; name: string }[]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-800';
      case 'stopped':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEnvironmentColor = (environment: string) => {
    switch (environment) {
      case 'production':
        return 'bg-red-100 text-red-800';
      case 'staging':
        return 'bg-yellow-100 text-yellow-800';
      case 'development':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCNFs = cnfs.filter(cnf => {
    const matchesSearch = cnf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cnf.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cnf.systemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cnf.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCustomer = selectedCustomer === 'all' || cnf.customerId === selectedCustomer;
    const matchesSystem = selectedSystem === 'all' || cnf.systemId === selectedSystem;
    const matchesStatus = statusFilter === 'all' || cnf.status === statusFilter;
    const matchesEnvironment = environmentFilter === 'all' || cnf.environment === environmentFilter;
    return matchesSearch && matchesCustomer && matchesSystem && matchesStatus && matchesEnvironment;
  });

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
              <div>
                <h1 className="text-3xl font-bold text-gray-900">CNF Environment List</h1>
                <p className="text-gray-600 mt-1">Browse and manage all CNF environments across systems</p>
              </div>
            </div>

            {/* Summary Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Database className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total CNF Environments</p>
                    <p className="text-2xl font-bold text-gray-900">{cnfs.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filter CNF Environments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search CNFs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                    <SelectTrigger>
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
                  <Select value={selectedSystem} onValueChange={setSelectedSystem}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select system" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Systems</SelectItem>
                      {systems.map((system) => (
                        <SelectItem key={system.id} value={system.id}>
                          {system.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="running">Running</SelectItem>
                      <SelectItem value="stopped">Stopped</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={environmentFilter} onValueChange={setEnvironmentFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by environment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Environments</SelectItem>
                      <SelectItem value="production">Production</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* CNF Table */}
            <Card>
              <CardHeader>
                <CardTitle>CNF Environments</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>CNF Name</TableHead>
                      <TableHead>System</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Environment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Components</TableHead>
                      <TableHead>Last Update</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCNFs.map((cnf) => (
                      <TableRow 
                        key={cnf.id} 
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleCNFClick(cnf.id)}
                      >
                        <TableCell className="font-medium">{cnf.name}</TableCell>
                        <TableCell className="text-gray-600">{cnf.systemName}</TableCell>
                        <TableCell className="text-gray-600">{cnf.customerName}</TableCell>
                        <TableCell>
                          <Badge className={getEnvironmentColor(cnf.environment)}>
                            {cnf.environment}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(cnf.status)}>
                            {cnf.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{cnf.version}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {cnf.componentCount} components
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {new Date(cnf.lastUpdate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCNFClick(cnf.id);
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
                
                {filteredCNFs.length === 0 && (
                  <div className="text-center py-8">
                    <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No CNF environments found</h3>
                    <p className="text-gray-600">
                      {searchTerm || selectedCustomer !== 'all' || selectedSystem !== 'all' || statusFilter !== 'all' || environmentFilter !== 'all'
                        ? 'Try adjusting your search or filter criteria.'
                        : 'No CNF environments are currently available.'}
                    </p>
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

export default CNFList;
