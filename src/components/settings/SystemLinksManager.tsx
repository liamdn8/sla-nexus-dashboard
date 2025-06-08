
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash, RefreshCw, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SystemLinkDialog } from './SystemLinkDialog';

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

export const SystemLinksManager = () => {
  const { toast } = useToast();
  const [systemLinks, setSystemLinks] = useState<SystemLink[]>([
    {
      id: '1',
      name: 'Production Jira',
      type: 'jira',
      baseUrl: 'https://company.atlassian.net',
      description: 'Primary Jira instance for project management',
      authMethod: 'api_token',
      username: 'admin@company.com',
      isActive: true,
    },
    {
      id: '2',
      name: 'CI/CD Jenkins',
      type: 'jenkins',
      baseUrl: 'https://jenkins.company.com',
      description: 'Main Jenkins instance for builds',
      authMethod: 'username_password',
      username: 'jenkins-admin',
      isActive: false,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<SystemLink | null>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'jira': return '🎯';
      case 'confluence': return '📚';
      case 'jenkins': return '🔧';
      case 'harbor': return '🐳';
      case 'mano': return '⚡';
      default: return '🔗';
    }
  };

  const getTypeBadgeColor = (type: string) => {
    const colorMap: Record<string, string> = {
      jira: 'bg-blue-100 text-blue-800',
      confluence: 'bg-green-100 text-green-800',
      jenkins: 'bg-red-100 text-red-800',
      harbor: 'bg-cyan-100 text-cyan-800',
      mano: 'bg-purple-100 text-purple-800'
    };
    return colorMap[type] || 'bg-gray-100 text-gray-800';
  };

  const handleAddNew = () => {
    setEditingLink(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (link: SystemLink) => {
    setEditingLink(link);
    setIsDialogOpen(true);
  };

  const handleSave = (linkData: Omit<SystemLink, 'id'>) => {
    if (editingLink) {
      setSystemLinks(links => 
        links.map(link => link.id === editingLink.id ? { ...linkData, id: editingLink.id } : link)
      );
      toast({
        title: "Link Updated",
        description: "System link has been updated successfully.",
      });
    } else {
      const newLink = { ...linkData, id: Date.now().toString() };
      setSystemLinks(links => [...links, newLink]);
      toast({
        title: "Link Added",
        description: "New system link has been added successfully.",
      });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    const link = systemLinks.find(l => l.id === id);
    setSystemLinks(links => links.filter(link => link.id !== id));
    toast({
      title: "Link Deleted",
      description: `${link?.name} has been deleted successfully.`,
      variant: "destructive",
    });
  };

  const handleTest = (link: SystemLink) => {
    toast({
      title: "Testing Connection",
      description: `Testing connection to ${link.name}...`,
    });

    // Simulate connection test
    setTimeout(() => {
      const success = Math.random() > 0.3;
      setSystemLinks(links => 
        links.map(l => l.id === link.id ? { ...l, isActive: success } : l)
      );
      toast({
        title: success ? "Connection Successful" : "Connection Failed",
        description: success 
          ? `Successfully connected to ${link.name}.`
          : `Failed to connect to ${link.name}. Please check your credentials.`,
        variant: success ? "default" : "destructive",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Link className="h-5 w-5" />
                <span>System Links Configuration</span>
              </CardTitle>
              <CardDescription>
                Manage connections to third-party applications and services.
              </CardDescription>
            </div>
            <Button onClick={handleAddNew}>
              <Plus className="mr-2 h-4 w-4" />
              Add System Link
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {systemLinks.map((link) => (
              <Card key={link.id} className="border">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{getTypeIcon(link.type)}</span>
                      <div>
                        <CardTitle className="text-lg">{link.name}</CardTitle>
                        <Badge className={getTypeBadgeColor(link.type)}>
                          {link.type.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(link)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(link.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{link.description}</p>
                    <div className="text-sm text-muted-foreground">
                      <strong>URL:</strong> {link.baseUrl}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <strong>Auth:</strong> {link.authMethod.replace('_', ' ')}
                    </div>
                    {link.username && (
                      <div className="text-sm text-muted-foreground">
                        <strong>Username:</strong> {link.username}
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${link.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="text-sm text-muted-foreground">
                          {link.isActive ? 'Connected' : 'Disconnected'}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTest(link)}
                      >
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Test
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {systemLinks.length === 0 && (
            <div className="text-center py-16">
              <Link className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No System Links</h3>
              <p className="text-muted-foreground mb-4">
                Get started by adding your first system link integration.
              </p>
              <Button onClick={handleAddNew}>
                <Plus className="mr-2 h-4 w-4" />
                Add First Link
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <SystemLinkDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        link={editingLink}
        onSave={handleSave}
      />
    </div>
  );
};
