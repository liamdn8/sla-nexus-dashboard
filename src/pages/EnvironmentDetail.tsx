
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Search, Server, FileText, Settings, Download } from "lucide-react";

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

  const handleCNFClick = (cnfId: string) => {
    navigate(`/cnf-detail/${cnfId}`);
  };

  return (
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

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
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

      {/* CNF Environments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEnvironments.map((env) => (
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
  );
};

export default EnvironmentDetail;
