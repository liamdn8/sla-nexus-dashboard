
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Search, Server, FileText, Settings, Download, Play, Square, RefreshCw, Activity, Database, Users, Clock } from "lucide-react";

interface ApplicationVersion {
  id: string;
  name: string;
  version: string;
  status: 'running' | 'stopped' | 'error';
  replicas: number;
  cpu: string;
  memory: string;
  lastUpdated: string;
}

interface ConfigMap {
  id: string;
  name: string;
  keys: number;
  lastModified: string;
  size: string;
}

interface ToscaFile {
  id: string;
  name: string;
  type: string;
  size: string;
  lastModified: string;
}

const CNFDetail = () => {
  const { cnfId } = useParams();
  const navigate = useNavigate();
  const [searchTermApps, setSearchTermApps] = useState('');
  const [searchTermConfigs, setSearchTermConfigs] = useState('');
  const [searchTermFiles, setSearchTermFiles] = useState('');

  // Mock CNF data
  const cnfData = {
    id: cnfId,
    name: 'Production Environment',
    description: 'Live production environment serving customers for E-commerce Platform',
    status: 'running',
    version: 'v2.1.0',
    customer: 'Acme Corporation',
    system: 'E-commerce Platform',
    deploymentDate: '2024-01-15',
    lastUpdate: '2024-01-25 14:30:00',
    namespace: 'ecommerce-prod',
    cluster: 'prod-cluster-01',
    resources: {
      cpu: '8.5 cores',
      memory: '16.2 GB',
      storage: '250 GB',
      pods: 24
    },
    health: {
      uptime: '99.9%',
      responseTime: '120ms',
      errors: 2,
      warnings: 5
    }
  };

  // Mock application versions
  const applicationVersions: ApplicationVersion[] = [
    {
      id: 'app-001',
      name: 'Frontend Service',
      version: 'v2.1.0',
      status: 'running',
      replicas: 3,
      cpu: '2.1 cores',
      memory: '4.2 GB',
      lastUpdated: '2024-01-25'
    },
    {
      id: 'app-002',
      name: 'API Gateway',
      version: 'v1.8.0',
      status: 'running',
      replicas: 2,
      cpu: '1.5 cores',
      memory: '3.1 GB',
      lastUpdated: '2024-01-24'
    },
    {
      id: 'app-003',
      name: 'Auth Service',
      version: 'v1.2.0',
      status: 'running',
      replicas: 2,
      cpu: '0.8 cores',
      memory: '1.6 GB',
      lastUpdated: '2024-01-23'
    },
    {
      id: 'app-004',
      name: 'Payment Service',
      version: 'v2.0.1',
      status: 'error',
      replicas: 1,
      cpu: '1.2 cores',
      memory: '2.4 GB',
      lastUpdated: '2024-01-25'
    },
    {
      id: 'app-005',
      name: 'Notification Service',
      version: 'v1.5.0',
      status: 'running',
      replicas: 2,
      cpu: '0.9 cores',
      memory: '1.8 GB',
      lastUpdated: '2024-01-22'
    }
  ];

  // Mock config maps
  const configMaps: ConfigMap[] = [
    {
      id: 'config-001',
      name: 'app-config',
      keys: 15,
      lastModified: '2024-01-25',
      size: '2.1 KB'
    },
    {
      id: 'config-002',
      name: 'database-config',
      keys: 8,
      lastModified: '2024-01-24',
      size: '1.5 KB'
    },
    {
      id: 'config-003',
      name: 'redis-config',
      keys: 12,
      lastModified: '2024-01-23',
      size: '3.2 KB'
    },
    {
      id: 'config-004',
      name: 'nginx-config',
      keys: 6,
      lastModified: '2024-01-22',
      size: '4.1 KB'
    }
  ];

  // Mock TOSCA files
  const toscaFiles: ToscaFile[] = [
    {
      id: 'tosca-001',
      name: 'main-topology.yaml',
      type: 'Service Template',
      size: '15.2 KB',
      lastModified: '2024-01-20'
    },
    {
      id: 'tosca-002',
      name: 'node-types.yaml',
      type: 'Node Types',
      size: '8.7 KB',
      lastModified: '2024-01-18'
    },
    {
      id: 'tosca-003',
      name: 'policies.yaml',
      type: 'Policies',
      size: '3.4 KB',
      lastModified: '2024-01-17'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-800';
      case 'stopped':
        return 'bg-red-100 text-red-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredApps = applicationVersions.filter(app =>
    app.name.toLowerCase().includes(searchTermApps.toLowerCase()) ||
    app.version.toLowerCase().includes(searchTermApps.toLowerCase())
  );

  const filteredConfigs = configMaps.filter(config =>
    config.name.toLowerCase().includes(searchTermConfigs.toLowerCase())
  );

  const filteredFiles = toscaFiles.filter(file =>
    file.name.toLowerCase().includes(searchTermFiles.toLowerCase()) ||
    file.type.toLowerCase().includes(searchTermFiles.toLowerCase())
  );

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
                  onClick={() => navigate('/cnf-list')}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to CNF List
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{cnfData.name}</h1>
                  <p className="text-gray-600 mt-1">{cnfData.description}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button>
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
              </div>
            </div>

            {/* Overview Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Basic Info */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Server className="h-5 w-5 mr-2" />
                    Environment Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Status</p>
                        <Badge className={getStatusColor(cnfData.status)} size="lg">
                          {cnfData.status}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Version</p>
                        <p className="text-lg font-semibold">{cnfData.version}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Customer</p>
                        <p className="text-lg">{cnfData.customer}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">System</p>
                        <p className="text-lg">{cnfData.system}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Namespace</p>
                        <p className="text-lg font-mono">{cnfData.namespace}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Cluster</p>
                        <p className="text-lg">{cnfData.cluster}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Deployed</p>
                        <p className="text-lg">{new Date(cnfData.deploymentDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Last Updated</p>
                        <p className="text-lg">{cnfData.lastUpdate}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Health & Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Health & Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Uptime</span>
                      <span className="text-sm font-semibold text-green-600">{cnfData.health.uptime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Response Time</span>
                      <span className="text-sm font-semibold">{cnfData.health.responseTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Errors</span>
                      <Badge variant="outline" className="bg-red-50 text-red-700">
                        {cnfData.health.errors}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Warnings</span>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                        {cnfData.health.warnings}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resource Usage */}
            <div className="grid grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Settings className="h-6 w-6 text-blue-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">CPU Usage</p>
                      <p className="text-xl font-bold text-gray-900">{cnfData.resources.cpu}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Database className="h-6 w-6 text-green-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">Memory Usage</p>
                      <p className="text-xl font-bold text-gray-900">{cnfData.resources.memory}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Server className="h-6 w-6 text-purple-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">Storage</p>
                      <p className="text-xl font-bold text-gray-900">{cnfData.resources.storage}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Users className="h-6 w-6 text-orange-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">Active Pods</p>
                      <p className="text-xl font-bold text-gray-900">{cnfData.resources.pods}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabbed Content */}
            <Tabs defaultValue="applications" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="configs">Config Maps</TabsTrigger>
                <TabsTrigger value="files">TOSCA Files</TabsTrigger>
              </TabsList>

              {/* Applications Tab */}
              <TabsContent value="applications">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Application Versions</CardTitle>
                      <div className="relative w-80">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search applications..."
                          value={searchTermApps}
                          onChange={(e) => setSearchTermApps(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Application Name</TableHead>
                          <TableHead>Version</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Replicas</TableHead>
                          <TableHead>CPU Usage</TableHead>
                          <TableHead>Memory Usage</TableHead>
                          <TableHead>Last Updated</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredApps.map((app) => (
                          <TableRow key={app.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium">{app.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{app.version}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(app.status)}>
                                {app.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{app.replicas}</TableCell>
                            <TableCell>{app.cpu}</TableCell>
                            <TableCell>{app.memory}</TableCell>
                            <TableCell>{new Date(app.lastUpdated).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Play className="h-3 w-3" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Square className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Config Maps Tab */}
              <TabsContent value="configs">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Configuration Maps</CardTitle>
                      <div className="relative w-80">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search config maps..."
                          value={searchTermConfigs}
                          onChange={(e) => setSearchTermConfigs(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Config Map Name</TableHead>
                          <TableHead>Keys</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Last Modified</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredConfigs.map((config) => (
                          <TableRow key={config.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium">{config.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                {config.keys} keys
                              </Badge>
                            </TableCell>
                            <TableCell>{config.size}</TableCell>
                            <TableCell>{new Date(config.lastModified).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <FileText className="h-3 w-3 mr-1" />
                                  View
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Settings className="h-3 w-3 mr-1" />
                                  Edit
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* TOSCA Files Tab */}
              <TabsContent value="files">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>TOSCA Files</CardTitle>
                      <div className="relative w-80">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search TOSCA files..."
                          value={searchTermFiles}
                          onChange={(e) => setSearchTermFiles(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>File Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Last Modified</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredFiles.map((file) => (
                          <TableRow key={file.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium">{file.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                                {file.type}
                              </Badge>
                            </TableCell>
                            <TableCell>{file.size}</TableCell>
                            <TableCell>{new Date(file.lastModified).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <FileText className="h-3 w-3 mr-1" />
                                  View
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="h-3 w-3 mr-1" />
                                  Download
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CNFDetail;
