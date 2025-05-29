
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
import { Network } from "lucide-react";

interface EnvironmentMapping {
  id: string;
  environmentName: string;
  environmentId: string;
  systemType: 'harbor' | 'mano';
  externalTool: {
    toolId: string;
    toolName: string;
    toolType: string;
    projectKey?: string;
    namespace?: string;
  };
  lastUpdated: string;
}

interface EnvironmentMappingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mapping: EnvironmentMapping | null;
  onSave: (mapping: Omit<EnvironmentMapping, 'id' | 'lastUpdated'>) => void;
}

export const EnvironmentMappingDialog: React.FC<EnvironmentMappingDialogProps> = ({
  open,
  onOpenChange,
  mapping,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    environmentName: '',
    environmentId: '',
    systemType: 'harbor' as 'harbor' | 'mano',
    toolId: '',
    projectKey: '',
    namespace: '',
  });

  // Mock available environments from Environment Management
  const availableEnvironments = [
    { id: 'ENV-001', name: 'Production Environment' },
    { id: 'ENV-002', name: 'Staging Environment' },
    { id: 'ENV-003', name: 'Development Environment' },
    { id: 'ENV-004', name: 'Testing Environment' },
  ];

  // Mock available external tools
  const availableTools = [
    { id: '1', name: 'Docker Harbor', type: 'harbor' },
    { id: '2', name: 'MANO Orchestrator', type: 'mano' },
    { id: '3', name: 'Secondary Harbor', type: 'harbor' },
  ];

  useEffect(() => {
    if (mapping) {
      setFormData({
        environmentName: mapping.environmentName,
        environmentId: mapping.environmentId,
        systemType: mapping.systemType,
        toolId: mapping.externalTool.toolId,
        projectKey: mapping.externalTool.projectKey || '',
        namespace: mapping.externalTool.namespace || '',
      });
    } else {
      setFormData({
        environmentName: '',
        environmentId: '',
        systemType: 'harbor',
        toolId: '',
        projectKey: '',
        namespace: '',
      });
    }
  }, [mapping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedTool = availableTools.find(t => t.id === formData.toolId);
    if (!selectedTool) return;

    onSave({
      environmentName: formData.environmentName,
      environmentId: formData.environmentId,
      systemType: formData.systemType,
      externalTool: {
        toolId: formData.toolId,
        toolName: selectedTool.name,
        toolType: selectedTool.type,
        projectKey: formData.projectKey || undefined,
        namespace: formData.namespace || undefined,
      },
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

  const getSystemIcon = (type: string) => {
    const iconMap: Record<string, string> = {
      harbor: '🐳',
      mano: '🔧'
    };
    return iconMap[type] || '🔧';
  };

  const filteredTools = availableTools.filter(tool => tool.type === formData.systemType);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mapping ? 'Edit Environment Mapping' : 'Add Environment Mapping'}
          </DialogTitle>
          <DialogDescription>
            Map an environment to external systems like Harbor projects or MANO orchestrators.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Network className="h-5 w-5" />
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
              <CardTitle className="text-lg">System Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="systemType">System Type</Label>
                <Select
                  value={formData.systemType}
                  onValueChange={(value: 'harbor' | 'mano') => setFormData({ ...formData, systemType: value, toolId: '' })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="harbor">
                      <div className="flex items-center space-x-2">
                        <span>🐳</span>
                        <span>Harbor (Container Registry)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="mano">
                      <div className="flex items-center space-x-2">
                        <span>🔧</span>
                        <span>MANO (NFV Orchestrator)</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tool">External Tool</Label>
                <Select
                  value={formData.toolId}
                  onValueChange={(value) => setFormData({ ...formData, toolId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tool" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredTools.map((tool) => (
                      <SelectItem key={tool.id} value={tool.id}>
                        <div className="flex items-center space-x-2">
                          <span>{getSystemIcon(tool.type)}</span>
                          <span>{tool.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.systemType === 'harbor' && (
                <div className="space-y-2">
                  <Label htmlFor="projectKey">Harbor Project Key</Label>
                  <Input
                    id="projectKey"
                    value={formData.projectKey}
                    onChange={(e) => setFormData({ ...formData, projectKey: e.target.value })}
                    placeholder="e.g., production-containers"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="namespace">Namespace</Label>
                <Input
                  id="namespace"
                  value={formData.namespace}
                  onChange={(e) => setFormData({ ...formData, namespace: e.target.value })}
                  placeholder={formData.systemType === 'harbor' ? 'e.g., production' : 'e.g., nfv-production'}
                />
              </div>
            </CardContent>
          </Card>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!formData.environmentId || !formData.toolId}>
              {mapping ? 'Update Mapping' : 'Create Mapping'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
