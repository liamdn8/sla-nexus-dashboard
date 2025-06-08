
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SystemLink {
  id: string;
  name: string;
  type: 'jira' | 'confluence' | 'jenkins' | 'harbor' | 'mano';
  baseUrl: string;
  description: string;
  authMethod: 'api_token' | 'username_password';
  username?: string;
  apiToken?: string;
  password?: string;
  isActive: boolean;
}

interface SystemLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  link: SystemLink | null;
  onSave: (link: Omit<SystemLink, 'id'>) => void;
}

export const SystemLinkDialog = ({ open, onOpenChange, link, onSave }: SystemLinkDialogProps) => {
  const [formData, setFormData] = useState<Omit<SystemLink, 'id'>>({
    name: '',
    type: 'jira',
    baseUrl: '',
    description: '',
    authMethod: 'api_token',
    username: '',
    apiToken: '',
    password: '',
    isActive: true,
  });

  useEffect(() => {
    if (link) {
      setFormData({
        name: link.name,
        type: link.type,
        baseUrl: link.baseUrl,
        description: link.description,
        authMethod: link.authMethod,
        username: link.username || '',
        apiToken: link.apiToken || '',
        password: link.password || '',
        isActive: link.isActive,
      });
    } else {
      setFormData({
        name: '',
        type: 'jira',
        baseUrl: '',
        description: '',
        authMethod: 'api_token',
        username: '',
        apiToken: '',
        password: '',
        isActive: true,
      });
    }
  }, [link, open]);

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {link ? 'Edit System Link' : 'Add New System Link'}
          </DialogTitle>
          <DialogDescription>
            Configure connection details and authentication for external systems.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter system name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="jira">Jira</option>
                  <option value="confluence">Confluence</option>
                  <option value="jenkins">Jenkins</option>
                  <option value="harbor">Harbor</option>
                  <option value="mano">MANO</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="baseUrl">Base URL</Label>
              <Input
                id="baseUrl"
                value={formData.baseUrl}
                onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter description"
              />
            </div>
          </TabsContent>

          <TabsContent value="authentication" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="authMethod">Authentication Method</Label>
              <select
                id="authMethod"
                value={formData.authMethod}
                onChange={(e) => setFormData({ ...formData, authMethod: e.target.value as any })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="api_token">API Token</option>
                <option value="username_password">Username/Password</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username/Email</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Enter username or email"
              />
            </div>

            {formData.authMethod === 'api_token' ? (
              <div className="space-y-2">
                <Label htmlFor="apiToken">API Token</Label>
                <Input
                  id="apiToken"
                  type="password"
                  value={formData.apiToken}
                  onChange={(e) => setFormData({ ...formData, apiToken: e.target.value })}
                  placeholder="Enter API token"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter password"
                />
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {link ? 'Update' : 'Create'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
