
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Calendar, CalendarDays } from "lucide-react";

interface Release {
  id: string;
  name: string;
  version: string;
  status: string;
  environment: string;
  releaseDate: string;
  deployedBy: string;
  application: string;
  slaId?: string;
  description: string;
}

interface SLA {
  id: string;
  name: string;
  status: string;
  priority: string;
}

interface ReleaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  release?: Release | null;
  onSave: (release: Partial<Release>) => void;
}

export const ReleaseDialog = ({ open, onOpenChange, release, onSave }: ReleaseDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: release?.name || '',
    version: release?.version || '',
    status: release?.status || 'In Development',
    environment: release?.environment || 'Development',
    releaseDate: release?.releaseDate || '',
    application: release?.application || '',
    slaId: release?.slaId || '',
    description: release?.description || '',
  });

  // Mock SLA data
  const availableSLAs: SLA[] = [
    { id: '1', name: 'SLA-2024-001 - Frontend Enhancement', status: 'Active', priority: 'High' },
    { id: '2', name: 'SLA-2024-002 - Backend API Update', status: 'Active', priority: 'Medium' },
    { id: '3', name: 'SLA-2024-003 - Security Improvements', status: 'Active', priority: 'High' },
  ];

  const applications = [
    'Frontend Web App',
    'Backend API',
    'Mobile App',
    'Analytics Dashboard',
  ];

  const isEditing = !!release;

  const handleSave = () => {
    if (!formData.name || !formData.version || !formData.application) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    onSave(formData);
    onOpenChange(false);
    setFormData({
      name: '',
      version: '',
      status: 'In Development',
      environment: 'Development',
      releaseDate: '',
      application: '',
      slaId: '',
      description: '',
    });

    toast({
      title: isEditing ? "Release Updated" : "Release Created",
      description: `Release ${formData.version} has been ${isEditing ? 'updated' : 'created'} successfully.`,
    });
  };

  const selectedSLA = availableSLAs.find(sla => sla.id === formData.slaId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Release' : 'Create New Release'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update release details.' : 'Create a new release for your application.'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="release-name">Release Name *</Label>
              <Input
                id="release-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter release name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="release-version">Version *</Label>
              <Input
                id="release-version"
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                placeholder="e.g., v2.1.0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="release-application">Application *</Label>
              <Select
                value={formData.application}
                onValueChange={(value) => setFormData({ ...formData, application: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select application" />
                </SelectTrigger>
                <SelectContent>
                  {applications.map((app) => (
                    <SelectItem key={app} value={app}>
                      {app}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="release-status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="In Development">In Development</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Review">In Review</SelectItem>
                  <SelectItem value="Released">Released</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="release-environment">Environment</Label>
              <Select
                value={formData.environment}
                onValueChange={(value) => setFormData({ ...formData, environment: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Development">Development</SelectItem>
                  <SelectItem value="Staging">Staging</SelectItem>
                  <SelectItem value="Production">Production</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="release-date">Release Date</Label>
              <Input
                id="release-date"
                type="date"
                value={formData.releaseDate}
                onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="release-sla">Map to SLA (Optional)</Label>
            <Select
              value={formData.slaId}
              onValueChange={(value) => setFormData({ ...formData, slaId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an SLA to map this release" />
              </SelectTrigger>
              <SelectContent>
                {availableSLAs.map((sla) => (
                  <SelectItem key={sla.id} value={sla.id}>
                    <div className="flex items-center space-x-2">
                      <span>{sla.name}</span>
                      <Badge variant={sla.priority === 'High' ? 'destructive' : 'secondary'}>
                        {sla.priority}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedSLA && (
              <p className="text-sm text-muted-foreground">
                This release will be linked to {selectedSLA.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="release-description">Description</Label>
            <Textarea
              id="release-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the changes and features in this release"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {isEditing ? 'Update' : 'Create'} Release
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
