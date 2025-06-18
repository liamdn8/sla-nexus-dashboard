
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Package, Settings, Database, Play, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface WorkflowSummary {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  failed: number;
}

interface DeliveryWorkflow {
  id: string;
  name: string;
  artifactType: 'image' | 'configmap' | 'tosca';
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  progress: number;
  lastUpdated: string;
  stages: {
    getArtifact: 'pending' | 'in-progress' | 'completed' | 'failed';
    pullStaging: 'pending' | 'in-progress' | 'completed' | 'failed';
    deployStaging: 'pending' | 'in-progress' | 'completed' | 'failed';
    verifyStaging: 'pending' | 'in-progress' | 'completed' | 'failed' | 'waiting-approval';
    prodTrigger: 'pending' | 'in-progress' | 'completed' | 'failed' | 'waiting-approval';
    uploadMano: 'pending' | 'in-progress' | 'completed' | 'failed';
  };
}

const mockWorkflows: DeliveryWorkflow[] = [
  {
    id: 'wf-001',
    name: 'VoLTE Core Image v2.1.0',
    artifactType: 'image',
    status: 'in-progress',
    progress: 65,
    lastUpdated: '2024-06-18 14:30',
    stages: {
      getArtifact: 'completed',
      pullStaging: 'completed',
      deployStaging: 'completed',
      verifyStaging: 'waiting-approval',
      prodTrigger: 'pending',
      uploadMano: 'pending'
    }
  },
  {
    id: 'wf-002',
    name: 'IMS ConfigMap v1.5.2',
    artifactType: 'configmap',
    status: 'completed',
    progress: 100,
    lastUpdated: '2024-06-18 12:15',
    stages: {
      getArtifact: 'completed',
      pullStaging: 'completed',
      deployStaging: 'completed',
      verifyStaging: 'completed',
      prodTrigger: 'completed',
      uploadMano: 'completed'
    }
  },
  {
    id: 'wf-003',
    name: 'vOCS TOSCA Package v3.0.1',
    artifactType: 'tosca',
    status: 'pending',
    progress: 15,
    lastUpdated: '2024-06-18 16:00',
    stages: {
      getArtifact: 'in-progress',
      pullStaging: 'pending',
      deployStaging: 'pending',
      verifyStaging: 'pending',
      prodTrigger: 'pending',
      uploadMano: 'pending'
    }
  }
];

const getArtifactIcon = (type: string) => {
  switch (type) {
    case 'image':
      return <Package className="h-4 w-4" />;
    case 'configmap':
      return <Settings className="h-4 w-4" />;
    case 'tosca':
      return <Database className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'in-progress':
      return <Play className="h-4 w-4 text-blue-600" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case 'failed':
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    default:
      return <Clock className="h-4 w-4 text-gray-600" />;
  }
};

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'completed':
      return 'default';
    case 'in-progress':
      return 'secondary';
    case 'pending':
      return 'outline';
    case 'failed':
      return 'destructive';
    default:
      return 'outline';
  }
};

const DeliveryWorkflows = () => {
  const navigate = useNavigate();
  const [workflows] = useState<DeliveryWorkflow[]>(mockWorkflows);

  const summary: Record<string, WorkflowSummary> = {
    image: { total: 5, pending: 1, inProgress: 2, completed: 2, failed: 0 },
    configmap: { total: 3, pending: 0, inProgress: 1, completed: 2, failed: 0 },
    tosca: { total: 4, pending: 2, inProgress: 1, completed: 1, failed: 0 }
  };

  const handleWorkflowClick = (workflowId: string) => {
    navigate(`/delivery-workflows/${workflowId}`);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">Delivery Workflows</h1>
              <p className="text-sm text-muted-foreground">Manage artifact delivery pipelines</p>
            </div>
          </header>

          <div className="flex-1 space-y-6 p-6">
            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              {Object.entries(summary).map(([type, stats]) => (
                <Card key={type}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium capitalize">
                      {type} Workflows
                    </CardTitle>
                    {getArtifactIcon(type)}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.total}</div>
                    <div className="flex gap-2 text-xs text-muted-foreground mt-2">
                      <span className="text-green-600">✓ {stats.completed}</span>
                      <span className="text-blue-600">▶ {stats.inProgress}</span>
                      <span className="text-yellow-600">⏳ {stats.pending}</span>
                      {stats.failed > 0 && <span className="text-red-600">✗ {stats.failed}</span>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Workflow List */}
            <Card>
              <CardHeader>
                <CardTitle>Active Workflows</CardTitle>
                <CardDescription>
                  Click on a workflow to view detailed stages and progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workflows.map((workflow) => (
                    <Card 
                      key={workflow.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleWorkflowClick(workflow.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {getArtifactIcon(workflow.artifactType)}
                            <div>
                              <h3 className="font-medium">{workflow.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                Last updated: {workflow.lastUpdated}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="flex items-center space-x-2">
                                {getStatusIcon(workflow.status)}
                                <Badge variant={getStatusBadgeVariant(workflow.status)}>
                                  {workflow.status.replace('-', ' ')}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                Progress: {workflow.progress}%
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Progress value={workflow.progress} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DeliveryWorkflows;
