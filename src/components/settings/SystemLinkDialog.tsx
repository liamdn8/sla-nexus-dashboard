
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, User } from "lucide-react";

interface SystemLink {
  id: string;
  name: string;
  type: 'jira' | 'confluence' | 'jenkins' | 'harbor' | 'mano';
  baseUrl: string;
  description: string;
  credentialType: 'admin_shared' | 'user_specific';
  authMethod: 'api_token' | 'username_password';
  // Admin shared credentials
  adminUsername?: string;
  adminApiToken?: string;
  adminPassword?: string;
  // User specific credentials (would be per user in real app)
  userUsername?: string;
  userApiToken?: string;
  userPassword?: string;
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
    credentialType: 'admin_shared',
    authMethod: 'api_token',
    adminUsername: '',
    adminApiToken: '',
    adminPassword: '',
    userUsername: '',
    userApiToken: '',
    userPassword: '',
    isActive: true,
  });

  useEffect(() => {
    if (link) {
      setFormData({
        name: link.name,
        type: link.type,
        baseUrl: link.baseUrl,
        description: link.description,
        credentialType: link.credentialType,
        authMethod: link.authMethod,
        adminUsername: link.adminUsername || '',
        adminApiToken: link.adminApiToken || '',
        adminPassword: link.adminPassword || '',
        userUsername: link.userUsername || '',
        userApiToken: link.userApiToken || '',
        userPassword: link.userPassword || '',
        isActive: link.isActive,
      });
    } else {
      setFormData({
        name: '',
        type: 'jira',
        baseUrl: '',
        description: '',
        credentialType: 'admin_shared',
        authMethod: 'api_token',
        adminUsername: '',
        adminApiToken: '',
        adminPassword: '',
        userUsername: '',
        userApiToken: '',
        userPassword: '',
        isActive: true,
      });
    }
  }, [link, open]);

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {link ? 'Edit System Link' : 'Add New System Link'}
          </DialogTitle>
          <DialogDescription>
            Configure connection details and authentication for external systems.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
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

          <TabsContent value="credentials" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Credential Type</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Card 
                    className={`cursor-pointer border-2 ${formData.credentialType === 'admin_shared' ? 'border-primary bg-primary/5' : 'border-border'}`}
                    onClick={() => setFormData({ ...formData, credentialType: 'admin_shared' })}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center space-x-2">
                        <Lock className="h-4 w-4" />
                        <span>Admin Shared</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        Single set of credentials shared across all users
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className={`cursor-pointer border-2 ${formData.credentialType === 'user_specific' ? 'border-primary bg-primary/5' : 'border-border'}`}
                    onClick={() => setFormData({ ...formData, credentialType: 'user_specific' })}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>User Specific</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        Each user provides their own credentials
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

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

              {formData.credentialType === 'admin_shared' ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center space-x-2">
                      <Lock className="h-4 w-4" />
                      <span>Admin Shared Credentials</span>
                      <Badge variant="secondary">Shared</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="adminUsername">Username/Email</Label>
                      <Input
                        id="adminUsername"
                        value={formData.adminUsername}
                        onChange={(e) => setFormData({ ...formData, adminUsername: e.target.value })}
                        placeholder="Enter admin username or email"
                      />
                    </div>

                    {formData.authMethod === 'api_token' ? (
                      <div className="space-y-2">
                        <Label htmlFor="adminApiToken">API Token</Label>
                        <Input
                          id="adminApiToken"
                          type="password"
                          value={formData.adminApiToken}
                          onChange={(e) => setFormData({ ...formData, adminApiToken: e.target.value })}
                          placeholder="Enter admin API token"
                        />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="adminPassword">Password</Label>
                        <Input
                          id="adminPassword"
                          type="password"
                          value={formData.adminPassword}
                          onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
                          placeholder="Enter admin password"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>User Specific Credentials</span>
                      <Badge variant="outline">Per User</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="userUsername">Your Username/Email</Label>
                      <Input
                        id="userUsername"
                        value={formData.userUsername}
                        onChange={(e) => setFormData({ ...formData, userUsername: e.target.value })}
                        placeholder="Enter your username or email"
                      />
                    </div>

                    {formData.authMethod === 'api_token' ? (
                      <div className="space-y-2">
                        <Label htmlFor="userApiToken">Your API Token</Label>
                        <Input
                          id="userApiToken"
                          type="password"
                          value={formData.userApiToken}
                          onChange={(e) => setFormData({ ...formData, userApiToken: e.target.value })}
                          placeholder="Enter your API token"
                        />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="userPassword">Your Password</Label>
                        <Input
                          id="userPassword"
                          type="password"
                          value={formData.userPassword}
                          onChange={(e) => setFormData({ ...formData, userPassword: e.target.value })}
                          placeholder="Enter your password"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="isActive">Enable this system link</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                When enabled, users will be able to use this system integration.
              </p>
            </div>
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
