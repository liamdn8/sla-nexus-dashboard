
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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X, Link as LinkIcon } from "lucide-react";

interface CustomerMapping {
  id: string;
  customerName: string;
  internalId: string;
  externalTools: {
    toolId: string;
    toolName: string;
    toolType: string;
    externalId: string;
    projectKey?: string;
  }[];
  applications: string[];
  lastUpdated: string;
}

interface CustomerMappingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mapping: CustomerMapping | null;
  onSave: (mapping: Omit<CustomerMapping, 'id' | 'lastUpdated'>) => void;
}

export const CustomerMappingDialog: React.FC<CustomerMappingDialogProps> = ({
  open,
  onOpenChange,
  mapping,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    customerName: '',
    internalId: '',
    externalTools: [] as any[],
    applications: [] as string[],
  });
  const [newApplication, setNewApplication] = useState('');
  const [newToolMapping, setNewToolMapping] = useState({
    toolId: '',
    externalId: '',
    projectKey: '',
  });

  // Mock available external tools
  const availableTools = [
    { id: '1', name: 'Production Jira', type: 'jira' },
    { id: '2', name: 'Docker Harbor', type: 'harbor' },
    { id: '3', name: 'GitLab Instance', type: 'gitlab' },
  ];

  // Mock available applications
  const availableApplications = [
    'Web Portal', 'Mobile App', 'API Gateway', 'Analytics Platform', 
    'Admin Dashboard', 'Payment Service', 'Notification Service'
  ];

  useEffect(() => {
    if (mapping) {
      setFormData({
        customerName: mapping.customerName,
        internalId: mapping.internalId,
        externalTools: mapping.externalTools,
        applications: mapping.applications,
      });
    } else {
      setFormData({
        customerName: '',
        internalId: '',
        externalTools: [],
        applications: [],
      });
    }
  }, [mapping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addApplication = () => {
    if (newApplication && !formData.applications.includes(newApplication)) {
      setFormData({
        ...formData,
        applications: [...formData.applications, newApplication],
      });
      setNewApplication('');
    }
  };

  const removeApplication = (app: string) => {
    setFormData({
      ...formData,
      applications: formData.applications.filter(a => a !== app),
    });
  };

  const addToolMapping = () => {
    if (newToolMapping.toolId && newToolMapping.externalId) {
      const tool = availableTools.find(t => t.id === newToolMapping.toolId);
      if (tool) {
        const mapping = {
          toolId: newToolMapping.toolId,
          toolName: tool.name,
          toolType: tool.type,
          externalId: newToolMapping.externalId,
          projectKey: newToolMapping.projectKey || undefined,
        };
        setFormData({
          ...formData,
          externalTools: [...formData.externalTools, mapping],
        });
        setNewToolMapping({ toolId: '', externalId: '', projectKey: '' });
      }
    }
  };

  const removeToolMapping = (index: number) => {
    setFormData({
      ...formData,
      externalTools: formData.externalTools.filter((_, i) => i !== index),
    });
  };

  const getToolIcon = (type: string) => {
    const iconMap: Record<string, string> = {
      jira: '🎯',
      harbor: '🐳',
      gitlab: '🦊',
      github: '🐙',
      jenkins: '👷'
    };
    return iconMap[type] || '🔧';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mapping ? 'Edit Customer Mapping' : 'Add Customer Mapping'}
          </DialogTitle>
          <DialogDescription>
            Map internal customer information to external tools and applications.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="e.g., Acme Corporation"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="internalId">Internal ID</Label>
              <Input
                id="internalId"
                value={formData.internalId}
                onChange={(e) => setFormData({ ...formData, internalId: e.target.value })}
                placeholder="e.g., CUST-001"
                required
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Applications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {formData.applications.map((app, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {app}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 hover:bg-transparent"
                      onClick={() => removeApplication(app)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Select
                  value={newApplication}
                  onValueChange={setNewApplication}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select an application" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableApplications
                      .filter(app => !formData.applications.includes(app))
                      .map((app) => (
                        <SelectItem key={app} value={app}>
                          {app}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                <Button type="button" onClick={addApplication} disabled={!newApplication}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">External Tool Mappings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {formData.externalTools.map((tool, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{getToolIcon(tool.toolType)}</span>
                      <div>
                        <div className="font-medium">{tool.toolName}</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {tool.externalId}
                          {tool.projectKey && ` • Project: ${tool.projectKey}`}
                        </div>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeToolMapping(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-4 space-y-1">
                  <Label>External Tool</Label>
                  <Select
                    value={newToolMapping.toolId}
                    onValueChange={(value) => setNewToolMapping({ ...newToolMapping, toolId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select tool" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTools
                        .filter(tool => !formData.externalTools.some(et => et.toolId === tool.id))
                        .map((tool) => (
                          <SelectItem key={tool.id} value={tool.id}>
                            <div className="flex items-center space-x-2">
                              <span>{getToolIcon(tool.type)}</span>
                              <span>{tool.name}</span>
                            </div>
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-3 space-y-1">
                  <Label>External ID</Label>
                  <Input
                    value={newToolMapping.externalId}
                    onChange={(e) => setNewToolMapping({ ...newToolMapping, externalId: e.target.value })}
                    placeholder="External ID"
                  />
                </div>
                <div className="col-span-3 space-y-1">
                  <Label>Project Key</Label>
                  <Input
                    value={newToolMapping.projectKey}
                    onChange={(e) => setNewToolMapping({ ...newToolMapping, projectKey: e.target.value })}
                    placeholder="Optional"
                  />
                </div>
                <div className="col-span-2">
                  <Button
                    type="button"
                    onClick={addToolMapping}
                    disabled={!newToolMapping.toolId || !newToolMapping.externalId}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {mapping ? 'Update Mapping' : 'Create Mapping'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
