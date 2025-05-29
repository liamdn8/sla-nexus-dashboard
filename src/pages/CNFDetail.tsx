import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Play, Square, RefreshCw, Download, Upload, Settings, FileText } from "lucide-react";

interface FileComponent {
  id: string;
  name: string;
  type: 'application' | 'configmap' | 'tosca' | 'other';
  version: string;
  size: string;
  lastModified: string;
  status: 'active' | 'inactive' | 'pending';
}

const CNFDetail = () => {
  const { cnfId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const cnfInfo = {
    id: cnfId,
    name: 'Production Environment',
    description: 'Live production environment serving customers',
    status: 'running',
    version: 'v2.1.0',
    system: 'E-commerce Platform',
    customer: 'Acme Corporation',
    deploymentDate: '2024-01-15',
    lastUpdate: '2024-01-20',
    resources: {
      cpu: '8 cores',
      memory: '16 GB',
      storage: '100 GB',
    },
  };

  const components: FileComponent[] = [
    // Application Versions
    { id: 'app-001', name: 'frontend-service', type: 'application', version: 'v1.2.3', size: '45MB', lastModified: '2024-01-15', status: 'active' },
    { id: 'app-002', name: 'backend-api', type: 'application', version: 'v2.1.0', size: '78MB', lastModified: '2024-01-15', status: 'active' },
    { id: 'app-003', name: 'database-service', type: 'application', version: 'v1.8.5', size: '120MB', lastModified: '2024-01-15', status: 'active' },
    { id: 'app-004', name: 'auth-service', type: 'application', version: 'v1.5.2', size: '32MB', lastModified: '2024-01-15', status: 'active' },
    { id: 'app-005', name: 'notification-service', type: 'application', version: 'v1.1.8', size: '28MB', lastModified: '2024-01-15', status: 'active' },
    
    // Config Maps
    { id: 'cfg-001', name: 'app-config', type: 'configmap', version: 'v1.0', size: '2KB', lastModified: '2024-01-18', status: 'active' },
    { id: 'cfg-002', name: 'database-config', type: 'configmap', version: 'v1.1', size: '1.5KB', lastModified: '2024-01-18', status: 'active' },
    { id: 'cfg-003', name: 'nginx-config', type: 'configmap', version: 'v2.0', size: '3KB', lastModified: '2024-01-18', status: 'active' },
    { id: 'cfg-004', name: 'monitoring-config', type: 'configmap', version: 'v1.0', size: '1KB', lastModified: '2024-01-18', status: 'active' },
    
    // TOSCA Files
    { id: 'tosca-001', name: 'infrastructure.yaml', type: 'tosca', version: 'v1.0', size: '15KB', lastModified: '2024-01-15', status: 'active' },
    { id: 'tosca-002', name: 'networking.yaml', type: 'tosca', version: 'v1.2', size: '8KB', lastModified: '2024-01-15', status: 'active' },
    { id: 'tosca-003', name: 'security.yaml', type: 'tosca', version: 'v1.1', size: '5KB', lastModified: '2024-01-15', status: 'active' },
    
    // Other Files
    { id: 'other-001', name: 'deployment.yaml', type: 'other', version: 'v1.0', size: '12KB', lastModified: '2024-01-15', status: 'active' },
    { id: 'other-002', name: 'service.yaml', type: 'other', version: 'v1.0', size: '6KB', lastModified: '2024-01-15', status: 'active' },
    { id: 'other-003', name: 'ingress.yaml', type: 'other', version: 'v1.0', size: '4KB', lastModified: '2024-01-15', status: 'active' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'stopped':
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'application':
        return <Settings className="h-4 w-4 text-blue-600" />;
      case 'configmap':
        return <FileText className="h-4 w-4 text-green-600" />;
      case 'tosca':
        return <Download className="h-4 w-4 text-purple-600" />;
      case 'other':
        return <FileText className="h-4 w-4 text-gray-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'application':
        return 'Application Version';
      case 'configmap':
        return 'Config Map';
      case 'tosca':
        return 'TOSCA File';
      case 'other':
        return 'Other File';
      default:
        return 'Unknown';
    }
  };

  const componentsByType = {
    application: components.filter(c => c.type === 'application'),
    configmap: components.filter(c => c.type === 'configmap'),
    tosca: components.filter(c => c.type === 'tosca'),
    other: components.filter(c => c.type === 'other'),
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/environment-detail/SYS-001`)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to System
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{cnfInfo.name}</h1>
            <p className="text-gray-600 mt-1">{cnfInfo.description}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <span>System: {cnfInfo.system}</span>
              <span>•</span>
              <span>Customer: {cnfInfo.customer}</span>
              <span>•</span>
              <span>Version: {cnfInfo.version}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={getStatusColor(cnfInfo.status)} variant="outline">
            {cnfInfo.status}
          </Badge>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Redeploy
            </Button>
            <Button variant="outline" size="sm">
              <Square className="h-4 w-4 mr-2" />
              Stop
            </Button>
            <Button size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Update
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">CPU</p>
              <p className="text-lg font-bold text-gray-900">{cnfInfo.resources.cpu}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Memory</p>
              <p className="text-lg font-bold text-gray-900">{cnfInfo.resources.memory}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Storage</p>
              <p className="text-lg font-bold text-gray-900">{cnfInfo.resources.storage}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Components</p>
              <p className="text-lg font-bold text-gray-900">{components.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applications">Applications ({componentsByType.application.length})</TabsTrigger>
          <TabsTrigger value="configmaps">Config Maps ({componentsByType.configmap.length})</TabsTrigger>
          <TabsTrigger value="tosca">TOSCA Files ({componentsByType.tosca.length})</TabsTrigger>
          <TabsTrigger value="other">Other Files ({componentsByType.other.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Deployment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Deployment Date:</span>
                  <span>{new Date(cnfInfo.deploymentDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Update:</span>
                  <span>{new Date(cnfInfo.lastUpdate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Version:</span>
                  <Badge variant="outline">{cnfInfo.version}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge className={getStatusColor(cnfInfo.status)}>{cnfInfo.status}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Component Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Settings className="h-4 w-4 text-blue-600" />
                    <span>Application Versions</span>
                  </div>
                  <span className="font-semibold">{componentsByType.application.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-green-600" />
                    <span>Config Maps</span>
                  </div>
                  <span className="font-semibold">{componentsByType.configmap.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Download className="h-4 w-4 text-purple-600" />
                    <span>TOSCA Files</span>
                  </div>
                  <span className="font-semibold">{componentsByType.tosca.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-600" />
                    <span>Other Files</span>
                  </div>
                  <span className="font-semibold">{componentsByType.other.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Component Tables */}
        {(['applications', 'configmaps', 'tosca', 'other'] as const).map((tabType) => (
          <TabsContent key={tabType} value={tabType}>
            <Card>
              <CardHeader>
                <CardTitle>
                  {tabType === 'applications' && 'Application Versions'}
                  {tabType === 'configmaps' && 'Configuration Maps'}
                  {tabType === 'tosca' && 'TOSCA Files'}
                  {tabType === 'other' && 'Other Files'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4">Name</th>
                        <th className="text-left p-4">Type</th>
                        <th className="text-left p-4">Version</th>
                        <th className="text-left p-4">Size</th>
                        <th className="text-left p-4">Last Modified</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {componentsByType[tabType === 'applications' ? 'application' : tabType].map((component) => (
                        <tr key={component.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              {getTypeIcon(component.type)}
                              <span className="font-medium">{component.name}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline">{getTypeLabel(component.type)}</Badge>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline">{component.version}</Badge>
                          </td>
                          <td className="p-4 text-sm text-gray-600">{component.size}</td>
                          <td className="p-4 text-sm text-gray-600">
                            {new Date(component.lastModified).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            <Badge className={getStatusColor(component.status)}>
                              {component.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-1">
                              <Button size="sm" variant="ghost">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Upload className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CNFDetail;
