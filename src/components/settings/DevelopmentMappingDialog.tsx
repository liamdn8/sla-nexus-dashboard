
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch } from "lucide-react";

interface DevelopmentMapping {
  id: string;
  environmentName: string;
  environmentId: string;
  toolType: 'jira' | 'jenkins' | 'gitlab' | 'github';
  configuration: {
    projectKey?: string;
    repository?: string;
    workspace?: string;
    namespace?: string;
  };
  lastUpdated: string;
}

interface DevelopmentMappingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mapping: DevelopmentMapping | null;
  onSave: (mapping: Omit<DevelopmentMapping, 'id' | 'lastUpdated'>) => void;
}

export const DevelopmentMappingDialog: React.FC<DevelopmentMappingDialogProps> = ({
  open,
  onOpenChange,
  mapping,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    environmentName: '',
    environmentId: '',
    toolType: 'jira' as 'jira' | 'jenkins' | 'gitlab' | 'github',
    projectKey: '',
    repository: '',
    workspace: '',
    namespace: '',
  });

  // Mock available environments
  const availableEnvironments = [
    { id: 'ENV-001', name: 'Production Environment' },
    { id: 'ENV-002', name: 'Staging Environment' },
    { id: 'ENV-003', name: 'Development Environment' },
    { id: 'ENV-004', name: 'Testing Environment' },
  ];

  useEffect(() => {
    if (mapping) {
      setFormData({
        environmentName: mapping.environmentName,
        environmentId: mapping.environmentId,
        toolType: mapping.toolType,
        projectKey: mapping.configuration.projectKey || '',
        repository: mapping.configuration.repository || '',
        workspace: mapping.configuration.workspace || '',
        namespace: mapping.configuration.namespace || '',
      });
    } else {
      setFormData({
        environmentName: '',
        environmentId: '',
        toolType: 'jira',
        projectKey: '',
        repository: '',
        workspace: '',
        namespace: '',
      });
    }
  }, [mapping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const configuration: any = {};
    if (formData.projectKey) configuration.projectKey = formData.projectKey;
    if (formData.repository) configuration.repository = formData.repository;
    if (formData.workspace) configuration.workspace = formData.workspace;
    if (formData.namespace) configuration.namespace = formData.namespace;

    onSave({
      environmentName: formData.environmentName,
      environmentId: formData.environmentId,
      toolType: formData.toolType,
      configuration,
    });
  };

  const handleEnvironmentSelect = (environmentId: string) => {
    const environment = availableEnvironments.find(env => env.id === environmentId);
    if (environment) {
      setFormData({
        ...formData,
        environmentId,
        environmentName: environment.name,
      });
    }
  };

  const getToolIcon = (type: string) => {
    const iconMap: Record<string, string> = {
      jira: '🎫',
      jenkins: '🔧',
      gitlab: '🦊',
      github: '🐙'
    };
    return iconMap[type] || '🔧';
  };

  const renderToolSpecificFields = () => {
    switch (formData.toolType) {
      case 'jira':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="projectKey">Project Key</Label>
              <Input
                id="projectKey"
                value={formData.projectKey}
                onChange={(e) => setFormData({ ...formData, projectKey: e.target.value })}
                placeholder="e.g., PROD, DEV, TEST"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workspace">Workspace</Label>
              <Input
                id="workspace"
                value={formData.workspace}
                onChange={(e) => setFormData({ ...formData, workspace: e.target.value })}
                placeholder="e.g., production-workspace"
              />
            </div>
          </>
        );
      case 'jenkins':
        return (
          <div className="space-y-2">
            <Label htmlFor="namespace">Build Namespace</Label>
            <Input
              id="namespace"
              value={formData.namespace}
              onChange={(e) => setFormData({ ...formData, namespace: e.target.value })}
              placeholder="e.g., production-builds"
            />
          </div>
        );
      case 'gitlab':
      case 'github':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="repository">Repository</Label>
              <Input
                id="repository"
                value={formData.repository}
                onChange={(e) => setFormData({ ...formData, repository: e.target.value })}
                placeholder="e.g., organization/project-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="namespace">Namespace</Label>
              <Input
                id="namespace"
                value={formData.namespace}
                onChange={(e) => setFormData({ ...formData, namespace: e.target.value })}
                placeholder="e.g., production"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mapping ? 'Edit Development Mapping' : 'Add Development Mapping'}
          </DialogTitle>
          <DialogDescription>
            Map an environment to development tools like Jira, Jenkins, GitLab, or GitHub.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <GitBranch className="h-5 w-5" />
                <span>Environment Selection</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="environment">Environment</Label>
                <Select
                  value={formData.environmentId}
                  onValueChange={handleEnvironmentSelect}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an environment" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableEnvironments.map((env) => (
                      <SelectItem key={env.id} value={env.id}>
                        {env.name} ({env.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Development Tool</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="toolType">Tool Type</Label>
                <Select
                  value={formData.toolType}
                  onValueChange={(value: 'jira' | 'jenkins' | 'gitlab' | 'github') => 
                    setFormData({ ...formData, toolType: value, projectKey: '', repository: '', workspace: '', namespace: '' })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jira">
                      <div className="flex items-center space-x-2">
                        <span>🎫</span>
                        <span>Jira (Issue Tracking)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="jenkins">
                      <div className="flex items-center space-x-2">
                        <span>🔧</span>
                        <span>Jenkins (CI/CD)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="gitlab">
                      <div className="flex items-center space-x-2">
                        <span>🦊</span>
                        <span>GitLab (Source Control)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="github">
                      <div className="flex items-center space-x-2">
                        <span>🐙</span>
                        <span>GitHub (Source Control)</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {renderToolSpecificFields()}
            </CardContent>
          </Card>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!formData.environmentId}>
              {mapping ? 'Update Mapping' : 'Create Mapping'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
