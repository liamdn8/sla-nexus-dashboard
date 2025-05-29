
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Building, ArrowLeft, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Customer {
  id: string;
  name: string;
  description: string;
  systemCount: number;
  status: 'active' | 'inactive';
  createdDate: string;
  contactEmail: string;
  phone: string;
  address: string;
  lastActivity: string;
}

const Customers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Expanded mock data
  const customers: Customer[] = [
    { 
      id: 'CUST-001', 
      name: 'Acme Corporation', 
      description: 'Large enterprise customer', 
      systemCount: 4, 
      status: 'active',
      createdDate: '2023-01-15',
      contactEmail: 'admin@acme.com',
      phone: '+1-555-0123',
      address: '123 Business Ave, New York, NY',
      lastActivity: '2024-01-25'
    },
    { 
      id: 'CUST-002', 
      name: 'Tech Solutions Inc', 
      description: 'Technology service provider', 
      systemCount: 2, 
      status: 'active',
      createdDate: '2023-03-20',
      contactEmail: 'contact@techsolutions.com',
      phone: '+1-555-0456',
      address: '456 Tech Street, San Francisco, CA',
      lastActivity: '2024-01-24'
    },
    { 
      id: 'CUST-003', 
      name: 'Global Retail Ltd', 
      description: 'International retail chain', 
      systemCount: 1, 
      status: 'inactive',
      createdDate: '2023-06-10',
      contactEmail: 'support@globalretail.com',
      phone: '+1-555-0789',
      address: '789 Retail Plaza, Chicago, IL',
      lastActivity: '2024-01-10'
    },
    // Add more mock data for pagination demo
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `CUST-${String(i + 4).padStart(3, '0')}`,
      name: `Customer ${i + 4}`,
      description: `Description for customer ${i + 4}`,
      systemCount: Math.floor(Math.random() * 5) + 1,
      status: Math.random() > 0.3 ? 'active' : 'inactive' as 'active' | 'inactive',
      createdDate: `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      contactEmail: `contact${i + 4}@company.com`,
      phone: `+1-555-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      address: `${100 + i} Street ${i + 4}, City, State`,
      lastActivity: `2024-01-${String(Math.floor(Math.random() * 25) + 1).padStart(2, '0')}`
    }))
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contactEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  const handleViewSystems = (customerId: string) => {
    navigate(`/environment-management?customer=${customerId}`);
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
                  Back to Environment Management
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
                  <p className="text-gray-600 mt-1">Manage customers and their systems</p>
                </div>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </div>

            {/* Summary Card */}
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

            {/* Customers Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Customers</CardTitle>
                  <div className="relative w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search customers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Contact Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Systems</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedCustomers.map((customer) => (
                      <TableRow key={customer.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell className="text-gray-600">{customer.description}</TableCell>
                        <TableCell className="text-gray-600">{customer.contactEmail}</TableCell>
                        <TableCell className="text-gray-600">{customer.phone}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {customer.systemCount} systems
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(customer.status)}>
                            {customer.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {new Date(customer.lastActivity).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewSystems(customer.id)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Systems
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-600">
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length} results
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
                
                {filteredCustomers.length === 0 && (
                  <div className="text-center py-8">
                    <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No customers found</h3>
                    <p className="text-gray-600 mb-4">
                      {searchTerm
                        ? 'Try adjusting your search criteria.'
                        : 'Get started by adding your first customer.'}
                    </p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Customer
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

export default Customers;
