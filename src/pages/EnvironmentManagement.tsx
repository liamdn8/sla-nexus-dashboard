
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Building, Server, Users } from "lucide-react";
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
}

const EnvironmentManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'systems' | 'customers'>('systems');

  // Mock data
  const customers: Customer[] = [
    { id: 'CUST-001', name: 'Acme Corporation', description: 'Large enterprise customer', systemCount: 3, status: 'active' },
    { id: 'CUST-002', name: 'Tech Solutions Inc', description: 'Technology service provider', systemCount: 2, status: 'active' },
    { id: 'CUST-003', name: 'Global Retail Ltd', description: 'International retail chain', systemCount: 1, status: 'inactive' },
  ];

  const systems: System[] = [
    { id: 'SYS-001', name: 'E-commerce Platform', description: 'Main shopping platform', customerId: 'CUST-001', customerName: 'Acme Corporation', environmentCount: 4, status: 'running' },
    { id: 'SYS-002', name: 'Payment Gateway', description: 'Payment processing system', customerId: 'CUST-001', customerName: 'Acme Corporation', environmentCount: 3, status: 'running' },
    { id: 'SYS-003', name: 'Analytics Dashboard', description: 'Business intelligence platform', customerId: 'CUST-002', customerName: 'Tech Solutions Inc', environmentCount: 2, status: 'maintenance' },
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

  const filteredSystems = systems.filter(system =>
    system.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    system.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSystemClick = (systemId: string) => {
    navigate(`/environment-detail/${systemId}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Environment Management</h1>
          <p className="text-gray-600 mt-1">Manage systems, customers, and CNF environments</p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add System
          </Button>
          <Button variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Add Customer
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
                <p className="text-sm font-medium text-gray-600">Total Environments</p>
                <p className="text-2xl font-bold text-gray-900">{systems.reduce((sum, sys) => sum + sys.environmentCount, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('systems')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'systems'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Systems
        </button>
        <button
          onClick={() => setActiveTab('customers')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'customers'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Customers
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder={`Search ${activeTab}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Content */}
      {activeTab === 'systems' ? (
        <Card>
          <CardHeader>
            <CardTitle>Systems</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredSystems.map((system) => (
                <div
                  key={system.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleSystemClick(system.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900">{system.name}</h3>
                        <Badge className={getStatusColor(system.status)}>
                          {system.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mt-1">{system.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>Customer: {system.customerName}</span>
                        <span>•</span>
                        <span>{system.environmentCount} environments</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Environments
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                        <Badge className={getStatusColor(customer.status)}>
                          {customer.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mt-1">{customer.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>{customer.systemCount} systems</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Systems
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnvironmentManagement;
