
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Application {
  id: string;
  name: string;
  type: string;
  version: string;
  status: string;
  description: string;
  environment: string;
}

interface ApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application?: Application | null;
  onSave: (application: Partial<Application>) => void;
}

export const ApplicationDialog = ({ open, onOpenChange, application, onSave }: ApplicationDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: application?.name || '',
    type: application?.type || '',
    version: application?.version || '',
    status: application?.status || 'development',
    description: application?.description || '',
    environment: application?.environment || 'development',
  });

  const isEditing = !!application;

  const handleSave = () => {
    if (!formData.name || !formData.type || !formData.version) {
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
      type: '',
      version: '',
      status: 'development',
      description: '',
      environment: 'development',
    });

    toast({
      title: isEditing ? "Application Updated" : "Application Created",
      description: `Application ${formData.name} has been ${isEditing ? 'updated' : 'created'} successfully.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Application' : 'Create New Application'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update application details.' : 'Add a new application to your project.'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="app-name">Application Name *</Label>
            <Input
              id="app-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter application name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="app-type">Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Web Application</SelectItem>
                  <SelectItem value="mobile">Mobile Application</SelectItem>
                  <SelectItem value="api">API Service</SelectItem>
                  <SelectItem value="microservice">Microservice</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="app-version">Version *</Label>
              <Input
                id="app-version"
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                placeholder="e.g., 1.0.0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="app-status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="testing">Testing</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="app-environment">Environment</Label>
              <Select
                value={formData.environment}
                onValueChange={(value) => setFormData({ ...formData, environment: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="app-description">Description</Label>
            <Textarea
              id="app-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter application description"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {isEditing ? 'Update' : 'Create'} Application
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
