
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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff } from "lucide-react";

interface ExternalTool {
  id: string;
  name: string;
  type: 'jira' | 'harbor' | 'gitlab' | 'github' | 'jenkins';
  url: string;
  authMethod: 'api_token' | 'username_password';
  username?: string;
  isConnected: boolean;
  lastSync?: string;
}

interface ExternalToolDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tool: ExternalTool | null;
  onSave: (tool: Omit<ExternalTool, 'id'>) => void;
}

export const ExternalToolDialog: React.FC<ExternalToolDialogProps> = ({
  open,
  onOpenChange,
  tool,
  onSave,
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    type: 'jira' | 'harbor' | 'gitlab' | 'github' | 'jenkins';
    url: string;
    authMethod: 'api_token' | 'username_password';
    username: string;
    password: string;
    apiToken: string;
    description: string;
  }>({
    name: '',
    type: 'jira',
    url: '',
    authMethod: 'api_token',
    username: '',
    password: '',
    apiToken: '',
    description: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showApiToken, setShowApiToken] = useState(false);

  useEffect(() => {
    if (tool) {
      setFormData({
        name: tool.name,
        type: tool.type,
        url: tool.url,
        authMethod: tool.authMethod,
        username: tool.username || '',
        password: '',
        apiToken: '',
        description: '',
      });
    } else {
      setFormData({
        name: '',
        type: 'jira',
        url: '',
        authMethod: 'api_token',
        username: '',
        password: '',
        apiToken: '',
        description: '',
      });
    }
  }, [tool]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSave({
      name: formData.name,
      type: formData.type,
      url: formData.url,
      authMethod: formData.authMethod,
      username: formData.username,
      isConnected: false,
    });
  };

  const getToolTemplates = () => {
    const templates = {
      jira: {
        url: 'https://your-domain.atlassian.net',
        description: 'Connect to Jira for issue tracking and project management'
      },
      harbor: {
        url: 'https://harbor.your-domain.com',
        description: 'Connect to Harbor for container registry management'
      },
      gitlab: {
        url: 'https://gitlab.your-domain.com',
        description: 'Connect to GitLab for source code and CI/CD management'
      },
      github: {
        url: 'https://api.github.com',
        description: 'Connect to GitHub for source code management'
      },
      jenkins: {
        url: 'https://jenkins.your-domain.com',
        description: 'Connect to Jenkins for build automation'
      }
    };
    return templates[formData.type];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {tool ? 'Edit External Tool' : 'Add External Tool'}
          </DialogTitle>
          <DialogDescription>
            Configure connection settings for external tools and services.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tool Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Production Jira"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Tool Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: 'jira' | 'harbor' | 'gitlab' | 'github' | 'jenkins') => {
                  const templates = {
                    jira: 'https://your-domain.atlassian.net',
                    harbor: 'https://harbor.your-domain.com',
                    gitlab: 'https://gitlab.your-domain.com',
                    github: 'https://api.github.com',
                    jenkins: 'https://jenkins.your-domain.com'
                  };
                  setFormData({ 
                    ...formData, 
                    type: value,
                    url: templates[value]
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jira">Jira</SelectItem>
                  <SelectItem value="harbor">Harbor</SelectItem>
                  <SelectItem value="gitlab">GitLab</SelectItem>
                  <SelectItem value="github">GitHub</SelectItem>
                  <SelectItem value="jenkins">Jenkins</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">Base URL</Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder={getToolTemplates().url}
              required
            />
            <p className="text-sm text-muted-foreground">
              {getToolTemplates().description}
            </p>
          </div>

          <div className="space-y-2">
            <Label>Authentication Method</Label>
            <Tabs 
              value={formData.authMethod} 
              onValueChange={(value: 'api_token' | 'username_password') => setFormData({ ...formData, authMethod: value })}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="api_token">API Token</TabsTrigger>
                <TabsTrigger value="username_password">Username & Password</TabsTrigger>
              </TabsList>
              
              <TabsContent value="api_token" className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="username">Username/Email</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="your-email@company.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apiToken">API Token</Label>
                  <div className="relative">
                    <Input
                      id="apiToken"
                      type={showApiToken ? "text" : "password"}
                      value={formData.apiToken}
                      onChange={(e) => setFormData({ ...formData, apiToken: e.target.value })}
                      placeholder="Enter your API token"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowApiToken(!showApiToken)}
                    >
                      {showApiToken ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="username_password" className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="username-pwd">Username</Label>
                  <Input
                    id="username-pwd"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="your-username"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Enter your password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add notes about this tool configuration..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {tool ? 'Update Tool' : 'Add Tool'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
