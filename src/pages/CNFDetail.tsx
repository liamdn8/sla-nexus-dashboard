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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowLeft, Search, Server, FileText, Settings, Download, Play, Square, RefreshCw, Activity, Database, Users, Clock, Shield, Network, HardDrive, Zap } from "lucide-react";

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

interface Secret {
  id: string;
  name: string;
  type: string;
  keys: number;
  lastModified: string;
  size: string;
}

interface Service {
  id: string;
  name: string;
  type: string;
  clusterIP: string;
  ports: string;
  age: string;
}

interface Volume {
  id: string;
  name: string;
  type: string;
  capacity: string;
  status: string;
  storageClass: string;
}

const CNFDetail = () => {
  const { cnfId } = useParams();
  const navigate = useNavigate();
  const [searchTermApps, setSearchTermApps] = useState('');
  const [searchTermConfigs, setSearchTermConfigs] = useState('');
  const [searchTermFiles, setSearchTermFiles] = useState('');
  const [searchTermSecrets, setSearchTermSecrets] = useState('');
  const [searchTermServices, setSearchTermServices] = useState('');
  const [searchTermVolumes, setSearchTermVolumes] = useState('');

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

  // Mock additional data for new tabs
  const secrets = [
    { id: 'secret-001', name: 'db-credentials', type: 'Opaque', keys: 3, lastModified: '2024-01-25', size: '0.8 KB' },
    { id: 'secret-002', name: 'api-tokens', type: 'Opaque', keys: 5, lastModified: '2024-01-24', size: '1.2 KB' },
    { id: 'secret-003', name: 'tls-certificates', type: 'kubernetes.io/tls', keys: 2, lastModified: '2024-01-23', size: '4.5 KB' }
  ];

  const services = [
    { id: 'svc-001', name: 'frontend-service', type: 'LoadBalancer', clusterIP: '10.0.1.100', ports: '80,443', age: '15d' },
    { id: 'svc-002', name: 'api-service', type: 'ClusterIP', clusterIP: '10.0.1.101', ports: '8080', age: '15d' },
    { id: 'svc-003', name: 'database-service', type: 'ClusterIP', clusterIP: '10.0.1.102', ports: '5432', age: '15d' }
  ];

  const volumes = [
    { id: 'vol-001', name: 'data-volume', type: 'PersistentVolumeClaim', capacity: '100Gi', status: 'Bound', storageClass: 'fast-ssd' },
    { id: 'vol-002', name: 'logs-volume', type: 'PersistentVolumeClaim', capacity: '50Gi', status: 'Bound', storageClass: 'standard' },
    { id: 'vol-003', name: 'cache-volume', type: 'EmptyDir', capacity: '10Gi', status: 'Active', storageClass: 'memory' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
      case 'Bound':
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'stopped':
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

  const filteredSecrets = secrets.filter(secret =>
    secret.name.toLowerCase().includes(searchTermSecrets.toLowerCase())
  );

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTermServices.toLowerCase())
  );

  const filteredVolumes = volumes.filter(volume =>
    volume.name.toLowerCase().includes(searchTermVolumes.toLowerCase())
  );

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-1">
            <SidebarTrigger />
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/cnf-list')}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to CNF List
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Return to CNF List page</p>
                    </TooltipContent>
                  </Tooltip>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{cnfData.name}</h1>
                    <p className="text-gray-600 mt-1">{cnfData.description}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Refresh CNF data</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button>
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Configure CNF settings</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              {/* Compact Overview Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Basic Info - Smaller */}
                <Card className="lg:col-span-1">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-lg">
                      <Server className="h-4 w-4 mr-2" />
                      Environment Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs font-medium text-gray-600">Status</p>
                          <Badge className={getStatusColor(cnfData.status)}>
                            {cnfData.status}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-600">Version</p>
                          <p className="font-semibold">{cnfData.version}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-600">Customer</p>
                          <p>{cnfData.customer}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-600">System</p>
                          <p>{cnfData.system}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs font-medium text-gray-600">Namespace</p>
                          <p className="font-mono text-sm">{cnfData.namespace}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-600">Cluster</p>
                          <p>{cnfData.cluster}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-600">Deployed</p>
                          <p>{new Date(cnfData.deploymentDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-600">Last Updated</p>
                          <p>{cnfData.lastUpdate}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Health & Metrics - Smaller */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-lg">
                      <Activity className="h-4 w-4 mr-2" />
                      Health & Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-600">Uptime</span>
                        <span className="text-xs font-semibold text-green-600">{cnfData.health.uptime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-600">Response Time</span>
                        <span className="text-xs font-semibold">{cnfData.health.responseTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-600">Errors</span>
                        <Badge variant="outline" className="bg-red-50 text-red-700 text-xs">
                          {cnfData.health.errors}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-600">Warnings</span>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 text-xs">
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
                      <Zap className="h-6 w-6 text-blue-600" />
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
                      <HardDrive className="h-6 w-6 text-purple-600" />
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

              {/* Enhanced Tabbed Content */}
              <Tabs defaultValue="applications" className="w-full">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="applications">Applications</TabsTrigger>
                  <TabsTrigger value="configs">Config Maps</TabsTrigger>
                  <TabsTrigger value="secrets">Secrets</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="volumes">Volumes</TabsTrigger>
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
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        <Play className="h-3 w-3" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Start application</p>
                                    </TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        <Square className="h-3 w-3" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Stop application</p>
                                    </TooltipContent>
                                  </Tooltip>
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
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        <FileText className="h-3 w-3 mr-1" />
                                        View
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>View config map contents</p>
                                    </TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        <Settings className="h-3 w-3 mr-1" />
                                        Edit
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Edit config map</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Secrets Tab */}
                <TabsContent value="secrets">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <Shield className="h-5 w-5 mr-2" />
                          Secrets
                        </CardTitle>
                        <div className="relative w-80">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Search secrets..."
                            value={searchTermSecrets}
                            onChange={(e) => setSearchTermSecrets(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Secret Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Keys</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Last Modified</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredSecrets.map((secret) => (
                            <TableRow key={secret.id} className="hover:bg-gray-50">
                              <TableCell className="font-medium">{secret.name}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="bg-red-50 text-red-700">
                                  {secret.type}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="bg-gray-50 text-gray-700">
                                  {secret.keys} keys
                                </Badge>
                              </TableCell>
                              <TableCell>{secret.size}</TableCell>
                              <TableCell>{new Date(secret.lastModified).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        <FileText className="h-3 w-3 mr-1" />
                                        View
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>View secret (masked)</p>
                                    </TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        <Settings className="h-3 w-3 mr-1" />
                                        Edit
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Edit secret</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Services Tab */}
                <TabsContent value="services">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <Network className="h-5 w-5 mr-2" />
                          Services
                        </CardTitle>
                        <div className="relative w-80">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Search services..."
                            value={searchTermServices}
                            onChange={(e) => setSearchTermServices(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Service Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Cluster IP</TableHead>
                            <TableHead>Ports</TableHead>
                            <TableHead>Age</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredServices.map((service) => (
                            <TableRow key={service.id} className="hover:bg-gray-50">
                              <TableCell className="font-medium">{service.name}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                  {service.type}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-mono text-sm">{service.clusterIP}</TableCell>
                              <TableCell>{service.ports}</TableCell>
                              <TableCell>{service.age}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        <FileText className="h-3 w-3 mr-1" />
                                        View
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>View service details</p>
                                    </TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        <Settings className="h-3 w-3 mr-1" />
                                        Edit
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Edit service</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Volumes Tab */}
                <TabsContent value="volumes">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <HardDrive className="h-5 w-5 mr-2" />
                          Volumes
                        </CardTitle>
                        <div className="relative w-80">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Search volumes..."
                            value={searchTermVolumes}
                            onChange={(e) => setSearchTermVolumes(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Volume Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Capacity</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Storage Class</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredVolumes.map((volume) => (
                            <TableRow key={volume.id} className="hover:bg-gray-50">
                              <TableCell className="font-medium">{volume.name}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                                  {volume.type}
                                </Badge>
                              </TableCell>
                              <TableCell>{volume.capacity}</TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(volume.status)}>
                                  {volume.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{volume.storageClass}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        <FileText className="h-3 w-3 mr-1" />
                                        View
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>View volume details</p>
                                    </TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        <Settings className="h-3 w-3 mr-1" />
                                        Edit
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Edit volume</p>
                                    </TooltipContent>
                                  </Tooltip>
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
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        <FileText className="h-3 w-3 mr-1" />
                                        View
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>View TOSCA file</p>
                                    </TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        <Download className="h-3 w-3 mr-1" />
                                        Download
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Download TOSCA file</p>
                                    </TooltipContent>
                                  </Tooltip>
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
    </TooltipProvider>
  );
};

export default CNFDetail;
