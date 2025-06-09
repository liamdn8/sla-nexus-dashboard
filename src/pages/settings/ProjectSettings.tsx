
import React, { useState } from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FolderOpen, Save, Link, Plus, Trash, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SystemLink {
  id: string;
  name: string;
  type: 'jira' | 'confluence' | 'jenkins' | 'harbor' | 'mano';
  baseUrl: string;
  description: string;
}

interface ProjectLink {
  id: string;
  systemLinkId: string;
  systemLinkName: string;
  linkType: 'jira' | 'confluence' | 'jenkins' | 'harbor' | 'mano';
  projectKey: string;
  projectMappingName: string;
  baseUrl: string;
  createdAt: string;
  lastSync: string;
}

const ProjectSettings = () => {
  const { toast } = useToast();
  const [isAddLinkOpen, setIsAddLinkOpen] = useState(false);
  const [isEditLinkOpen, setIsEditLinkOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<ProjectLink | null>(null);
  
  const [projectInfo, setProjectInfo] = useState({
    name: 'E-Commerce Platform',
    key: 'ECP',
    description: 'Complete e-commerce solution with mobile and web applications',
    admin: 'John Smith',
    status: 'active',
  });

  // Mock system links available for selection
  const [availableSystemLinks] = useState<SystemLink[]>([
    {
      id: '1',
      name: 'Production Jira',
      type: 'jira',
      baseUrl: 'https://company.atlassian.net',
      description: 'Primary Jira instance'
    },
    {
      id: '2',
      name: 'Main Harbor Registry',
      type: 'harbor',
      baseUrl: 'https://harbor.company.com',
      description: 'Container registry'
    },
    {
      id: '3',
      name: 'Team Confluence',
      type: 'confluence',
      baseUrl: 'https://company.atlassian.net/wiki',
      description: 'Documentation wiki'
    }
  ]);

  const [projectLinks, setProjectLinks] = useState<ProjectLink[]>([
    {
      id: '1',
      systemLinkId: '1',
      systemLinkName: 'Production Jira',
      linkType: 'jira',
      projectKey: 'ECP',
      projectMappingName: 'E-Commerce Platform',
      baseUrl: 'https://company.atlassian.net',
      createdAt: '2024-01-15',
      lastSync: '2024-06-09 10:30',
    },
    {
      id: '2',
      systemLinkId: '2',
      systemLinkName: 'Main Harbor Registry',
      linkType: 'harbor',
      projectKey: 'ecommerce-platform',
      projectMappingName: 'ecommerce-platform',
      baseUrl: 'https://harbor.company.com',
      createdAt: '2024-02-01',
      lastSync: '2024-06-09 09:45',
    }
  ]);

  const [newLink, setNewLink] = useState({
    systemLinkId: '',
    projectKey: '',
  });

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

  const handleSave = () => {
    toast({
      title: "Project Settings Saved",
      description: "Project settings have been updated successfully.",
    });
  };

  const handleAddLink = () => {
    if (!newLink.systemLinkId || !newLink.projectKey) {
      toast({
        title: "Error",
        description: "Please select a system link and enter a project key.",
        variant: "destructive",
      });
      return;
    }

    const selectedSystemLink = availableSystemLinks.find(sl => sl.id === newLink.systemLinkId);
    if (!selectedSystemLink) return;

    const projectLink: ProjectLink = {
      id: Date.now().toString(),
      systemLinkId: newLink.systemLinkId,
      systemLinkName: selectedSystemLink.name,
      linkType: selectedSystemLink.type,
      projectKey: newLink.projectKey,
      projectMappingName: newLink.projectKey,
      baseUrl: selectedSystemLink.baseUrl,
      createdAt: new Date().toISOString().split('T')[0],
      lastSync: 'Never',
    };

    setProjectLinks([...projectLinks, projectLink]);
    setNewLink({ systemLinkId: '', projectKey: '' });
    setIsAddLinkOpen(false);

    toast({
      title: "Project Link Added",
      description: `Successfully linked to ${selectedSystemLink.name}.`,
    });
  };

  const handleEditLink = (link: ProjectLink) => {
    setEditingLink(link);
    setIsEditLinkOpen(true);
  };

  const handleUpdateLink = () => {
    if (!editingLink) return;

    setProjectLinks(links =>
      links.map(link =>
        link.id === editingLink.id ? editingLink : link
      )
    );
    
    setIsEditLinkOpen(false);
    setEditingLink(null);
    
    toast({
      title: "Project Link Updated",
      description: "Project link has been updated successfully.",
    });
  };

  const handleRemoveLink = (linkId: string) => {
    const link = projectLinks.find(l => l.id === linkId);
    setProjectLinks(projectLinks.filter(l => l.id !== linkId));
    toast({
      title: "Project Link Removed",
      description: `Removed link to ${link?.systemLinkName}.`,
      variant: "destructive",
    });
  };

  const selectedSystemLink = availableSystemLinks.find(sl => sl.id === newLink.systemLinkId);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <DashboardHeader />
          <div className="flex-1 space-y-6 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Project Settings</h2>
                <p className="text-muted-foreground">
                  Configure project information and external system links.
                </p>
              </div>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </div>

            {/* General Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FolderOpen className="h-5 w-5" />
                  <span>General Project Information</span>
                </CardTitle>
                <CardDescription>
                  Basic project configuration and metadata.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-name">Project Name</Label>
                    <Input
                      id="project-name"
                      value={projectInfo.name}
                      onChange={(e) => setProjectInfo({
                        ...projectInfo,
                        name: e.target.value
                      })}
                      placeholder="Enter project name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-key">Project Key</Label>
                    <Input
                      id="project-key"
                      value={projectInfo.key}
                      onChange={(e) => setProjectInfo({
                        ...projectInfo,
                        key: e.target.value.toUpperCase()
                      })}
                      placeholder="ECP"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="project-description">Description</Label>
                  <Textarea
                    id="project-description"
                    value={projectInfo.description}
                    onChange={(e) => setProjectInfo({
                      ...projectInfo,
                      description: e.target.value
                    })}
                    placeholder="Enter project description"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-admin">Project Admin</Label>
                    <Input
                      id="project-admin"
                      value={projectInfo.admin}
                      onChange={(e) => setProjectInfo({
                        ...projectInfo,
                        admin: e.target.value
                      })}
                      placeholder="Enter admin name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-status">Status</Label>
                    <Select
                      value={projectInfo.status}
                      onValueChange={(value) => setProjectInfo({
                        ...projectInfo,
                        status: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Links */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Link className="h-5 w-5" />
                      <span>Project Links</span>
                    </CardTitle>
                    <CardDescription>
                      Connect this project to external systems and tools.
                    </CardDescription>
                  </div>
                  <Dialog open={isAddLinkOpen} onOpenChange={setIsAddLinkOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Link
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Project Link</DialogTitle>
                        <DialogDescription>
                          Connect this project to an external system.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="system-link">System Link</Label>
                          <Select
                            value={newLink.systemLinkId}
                            onValueChange={(value) => setNewLink({ ...newLink, systemLinkId: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a system link" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableSystemLinks.map((systemLink) => (
                                <SelectItem key={systemLink.id} value={systemLink.id}>
                                  <div className="flex items-center space-x-2">
                                    <span>{getTypeIcon(systemLink.type)}</span>
                                    <span>{systemLink.name}</span>
                                    <Badge className={getTypeBadgeColor(systemLink.type)}>
                                      {systemLink.type.toUpperCase()}
                                    </Badge>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {selectedSystemLink && (
                            <p className="text-sm text-muted-foreground">
                              {selectedSystemLink.description} - {selectedSystemLink.baseUrl}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="project-key-input">
                            {selectedSystemLink?.type === 'jira' ? 'Jira Project Key' :
                             selectedSystemLink?.type === 'harbor' ? 'Harbor Project Name' :
                             selectedSystemLink?.type === 'confluence' ? 'Space Key' :
                             'Project Key'}
                          </Label>
                          <Input
                            id="project-key-input"
                            value={newLink.projectKey}
                            onChange={(e) => setNewLink({ ...newLink, projectKey: e.target.value })}
                            placeholder={
                              selectedSystemLink?.type === 'jira' ? 'e.g., ECP' :
                              selectedSystemLink?.type === 'harbor' ? 'e.g., ecommerce-platform' :
                              selectedSystemLink?.type === 'confluence' ? 'e.g., ECP' :
                              'Enter project identifier'
                            }
                          />
                        </div>

                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsAddLinkOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddLink}>
                            Add Link
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {projectLinks.length > 0 ? (
                  <div className="space-y-3">
                    {projectLinks.map((link) => (
                      <Card key={link.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <span className="text-xl mt-1">{getTypeIcon(link.linkType)}</span>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h4 className="font-semibold">{link.systemLinkName}</h4>
                                  <Badge className={getTypeBadgeColor(link.linkType)}>
                                    {link.linkType.toUpperCase()}
                                  </Badge>
                                </div>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                  <p>
                                    <span className="font-medium">Project Key:</span> {link.projectKey}
                                  </p>
                                  <p>
                                    <span className="font-medium">Mapping Name:</span> {link.projectMappingName}
                                  </p>
                                  <p>
                                    <span className="font-medium">Base URL:</span> {link.baseUrl}
                                  </p>
                                  <div className="flex space-x-4">
                                    <span>
                                      <span className="font-medium">Created:</span> {link.createdAt}
                                    </span>
                                    <span>
                                      <span className="font-medium">Last Sync:</span> {link.lastSync}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditLink(link)}
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleRemoveLink(link.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Link className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Project Links</h3>
                    <p className="text-muted-foreground mb-4">
                      Connect this project to external systems to enable integrations.
                    </p>
                    <Button onClick={() => setIsAddLinkOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add First Link
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Edit Link Dialog */}
            <Dialog open={isEditLinkOpen} onOpenChange={setIsEditLinkOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Project Link</DialogTitle>
                  <DialogDescription>
                    Update the project link configuration.
                  </DialogDescription>
                </DialogHeader>
                {editingLink && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-project-key">
                        {editingLink.linkType === 'jira' ? 'Jira Project Key' :
                         editingLink.linkType === 'harbor' ? 'Harbor Project Name' :
                         editingLink.linkType === 'confluence' ? 'Space Key' :
                         'Project Key'}
                      </Label>
                      <Input
                        id="edit-project-key"
                        value={editingLink.projectKey}
                        onChange={(e) => setEditingLink({
                          ...editingLink,
                          projectKey: e.target.value
                        })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-mapping-name">Project Mapping Name</Label>
                      <Input
                        id="edit-mapping-name"
                        value={editingLink.projectMappingName}
                        onChange={(e) => setEditingLink({
                          ...editingLink,
                          projectMappingName: e.target.value
                        })}
                      />
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsEditLinkOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleUpdateLink}>
                        Update Link
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ProjectSettings;
