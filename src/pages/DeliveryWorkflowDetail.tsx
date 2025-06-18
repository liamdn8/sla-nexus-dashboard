import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeft, CheckCircle, Clock, Play, AlertCircle, User, GitBranch, Settings, ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import StageInputDialog from '@/components/delivery/StageInputDialog';

interface Stage {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed' | 'waiting-approval';
  startTime?: string;
  endTime?: string;
  requiresApproval?: boolean;
  parallel?: boolean;
  group?: string;
}

interface WorkflowDetail {
  id: string;
  name: string;
  artifactType: string;
  status: string;
  progress: number;
  stages: Stage[];
}

const mockWorkflowDetail: WorkflowDetail = {
  id: 'wf-001',
  name: 'VoLTE Core Image v2.1.0',
  artifactType: 'image',
  status: 'in-progress',
  progress: 65,
  stages: [
    {
      id: 'stage-1',
      name: 'Get Artifact Event',
      status: 'completed',
      startTime: '2024-06-18 10:00',
      endTime: '2024-06-18 10:05'
    },
    {
      id: 'stage-2.1',
      name: 'Pull to Staging 1',
      status: 'completed',
      startTime: '2024-06-18 10:05',
      endTime: '2024-06-18 10:15',
      parallel: true,
      group: 'pull'
    },
    {
      id: 'stage-2.2',
      name: 'Pull to Staging 2',
      status: 'completed',
      startTime: '2024-06-18 10:05',
      endTime: '2024-06-18 10:20',
      parallel: true,
      group: 'pull'
    },
    {
      id: 'stage-3.1',
      name: 'Deploy Staging 1',
      status: 'completed',
      startTime: '2024-06-18 10:20',
      endTime: '2024-06-18 11:00',
      parallel: true,
      group: 'deploy'
    },
    {
      id: 'stage-3.2',
      name: 'Deploy Staging 2',
      status: 'completed',
      startTime: '2024-06-18 10:25',
      endTime: '2024-06-18 11:10',
      parallel: true,
      group: 'deploy'
    },
    {
      id: 'stage-4.1',
      name: 'Pending Staging 1 Verify/Confirm',
      status: 'waiting-approval',
      startTime: '2024-06-18 11:10',
      requiresApproval: true,
      parallel: true,
      group: 'verify'
    },
    {
      id: 'stage-4.2',
      name: 'Pending Staging 2 Verify/Confirm',
      status: 'waiting-approval',
      startTime: '2024-06-18 11:15',
      requiresApproval: true,
      parallel: true,
      group: 'verify'
    },
    {
      id: 'stage-5',
      name: 'Pending Production Delivery Trigger',
      status: 'pending',
      requiresApproval: true
    },
    {
      id: 'stage-6',
      name: 'Upload MANO Production',
      status: 'pending'
    }
  ]
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    case 'in-progress':
      return <Play className="h-5 w-5 text-blue-600" />;
    case 'pending':
      return <Clock className="h-5 w-5 text-yellow-600" />;
    case 'waiting-approval':
      return <User className="h-5 w-5 text-orange-600" />;
    case 'failed':
      return <AlertCircle className="h-5 w-5 text-red-600" />;
    default:
      return <Clock className="h-5 w-5 text-gray-600" />;
  }
};

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'completed':
      return 'default';
    case 'in-progress':
      return 'secondary';
    case 'waiting-approval':
      return 'outline';
    case 'pending':
      return 'outline';
    case 'failed':
      return 'destructive';
    default:
      return 'outline';
  }
};

const DeliveryWorkflowDetail = () => {
  const { workflowId } = useParams();
  const navigate = useNavigate();
  const [workflow] = useState<WorkflowDetail>(mockWorkflowDetail);
  const [viewMode, setViewMode] = useState<'detailed' | 'workflow'>('detailed');
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [isStageDialogOpen, setIsStageDialogOpen] = useState(false);

  const handleApproval = (stageId: string, action: 'approve' | 'reject') => {
    console.log(`${action} stage ${stageId}`);
    // Implementation for approval actions
  };

  const handleStageConfig = (stage: Stage) => {
    setSelectedStage(stage);
    setIsStageDialogOpen(true);
  };

  const handleSaveStageConfig = (data: any) => {
    console.log('Saving stage configuration:', selectedStage?.id, data);
    // Implementation for saving stage configuration
  };

  const groupedStages = workflow.stages.reduce((acc, stage) => {
    if (stage.group) {
      if (!acc[stage.group]) acc[stage.group] = [];
      acc[stage.group].push(stage);
    } else {
      acc[stage.id] = [stage];
    }
    return acc;
  }, {} as Record<string, Stage[]>);

  const WorkflowView = () => {
    const stageGroups = [
      { key: 'stage-1', name: 'Get Artifact', stages: [workflow.stages[0]] },
      { key: 'pull', name: 'Pull to Staging', stages: workflow.stages.filter(s => s.group === 'pull') },
      { key: 'deploy', name: 'Deploy Staging', stages: workflow.stages.filter(s => s.group === 'deploy') },
      { key: 'verify', name: 'Verify/Confirm', stages: workflow.stages.filter(s => s.group === 'verify') },
      { key: 'stage-5', name: 'Production Trigger', stages: [workflow.stages.find(s => s.id === 'stage-5')!] },
      { key: 'stage-6', name: 'Upload MANO', stages: [workflow.stages.find(s => s.id === 'stage-6')!] }
    ];

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 overflow-x-auto pb-4">
          {stageGroups.map((group, index) => (
            <React.Fragment key={group.key}>
              <div className="flex-shrink-0">
                <Card className="w-64">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">{group.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {group.stages.map((stage) => (
                      <div key={stage.id} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(stage.status)}
                          <span className="text-xs font-medium">{stage.name}</span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleStageConfig(stage)}
                        >
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              {index < stageGroups.length - 1 && (
                <ArrowRight className="h-6 w-6 text-gray-400 flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/delivery-workflows')}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">{workflow.name}</h1>
              <p className="text-sm text-muted-foreground">Workflow Detail - {workflow.artifactType}</p>
            </div>
          </header>

          <div className="flex-1 space-y-6 p-6">
            {/* Workflow Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Workflow Progress
                      <Badge variant={getStatusBadgeVariant(workflow.status)}>
                        {workflow.status.replace('-', ' ')}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Overall progress: {workflow.progress}%
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === 'detailed' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('detailed')}
                    >
                      Detailed View
                    </Button>
                    <Button
                      variant={viewMode === 'workflow' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('workflow')}
                    >
                      Workflow View
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Pipeline Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GitBranch className="h-5 w-5 mr-2" />
                  Pipeline Stages
                </CardTitle>
                <CardDescription>
                  {viewMode === 'workflow' 
                    ? 'Left-to-right workflow visualization'
                    : 'Delivery pipeline with parallel and sequential stages'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {viewMode === 'workflow' ? (
                  <WorkflowView />
                ) : (
                  <div className="space-y-6">
                    {Object.entries(groupedStages).map(([groupKey, stages]) => (
                      <div key={groupKey} className="space-y-2">
                        {stages.length > 1 ? (
                          <div className="border-l-2 border-gray-200 pl-4">
                            <div className="text-sm font-medium text-gray-600 mb-3">
                              Parallel Execution - {groupKey}
                            </div>
                            <div className="grid gap-3 md:grid-cols-2">
                              {stages.map((stage) => (
                                <Card key={stage.id} className="border-l-4 border-l-blue-300">
                                  <CardContent className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="flex items-center space-x-2">
                                        {getStatusIcon(stage.status)}
                                        <span className="font-medium">{stage.name}</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Badge variant={getStatusBadgeVariant(stage.status)}>
                                          {stage.status.replace('-', ' ')}
                                        </Badge>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          onClick={() => handleStageConfig(stage)}
                                        >
                                          <Settings className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      {stage.startTime && `Started: ${stage.startTime}`}
                                      {stage.endTime && ` • Completed: ${stage.endTime}`}
                                    </div>
                                    {stage.requiresApproval && stage.status === 'waiting-approval' && (
                                      <div className="flex gap-2 mt-3">
                                        <Button 
                                          size="sm" 
                                          onClick={() => handleApproval(stage.id, 'approve')}
                                        >
                                          Approve
                                        </Button>
                                        <Button 
                                          size="sm" 
                                          variant="outline"
                                          onClick={() => handleApproval(stage.id, 'reject')}
                                        >
                                          Reject
                                        </Button>
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Card className="border-l-4 border-l-green-300">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  {getStatusIcon(stages[0].status)}
                                  <span className="font-medium">{stages[0].name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Badge variant={getStatusBadgeVariant(stages[0].status)}>
                                    {stages[0].status.replace('-', ' ')}
                                  </Badge>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleStageConfig(stages[0])}
                                  >
                                    <Settings className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {stages[0].startTime && `Started: ${stages[0].startTime}`}
                                {stages[0].endTime && ` • Completed: ${stages[0].endTime}`}
                              </div>
                              {stages[0].requiresApproval && stages[0].status === 'waiting-approval' && (
                                <Alert className="mt-3">
                                  <User className="h-4 w-4" />
                                  <AlertDescription>
                                    This stage requires manual approval to proceed.
                                    <div className="flex gap-2 mt-2">
                                      <Button 
                                        size="sm"
                                        onClick={() => handleApproval(stages[0].id, 'approve')}
                                      >
                                        Approve
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        onClick={() => handleApproval(stages[0].id, 'reject')}
                                      >
                                        Reject
                                      </Button>
                                    </div>
                                  </AlertDescription>
                                </Alert>
                              )}
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>

      {/* Stage Input Dialog */}
      {selectedStage && (
        <StageInputDialog
          isOpen={isStageDialogOpen}
          onClose={() => setIsStageDialogOpen(false)}
          stageName={selectedStage.name}
          stageNumber={selectedStage.id.replace('stage-', '')}
          onSave={handleSaveStageConfig}
        />
      )}
    </SidebarProvider>
  );
};

export default DeliveryWorkflowDetail;
