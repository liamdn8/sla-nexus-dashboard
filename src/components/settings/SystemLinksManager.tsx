
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash, RefreshCw, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SystemLink {
  id: string;
  name: string;
  type: 'jira' | 'confluence' | 'jenkins' | 'harbor' | 'mano';
  baseUrl: string;
  description: string;
  isActive: boolean;
}

export const SystemLinksManager = () => {
  const { toast } = useToast();
  const [systemLinks, setSystemLinks] = useState<SystemLink[]>([
    {
      id: '1',
      name: 'Main Jira Instance',
      type: 'jira',
      baseUrl: 'https://company.atlassian.net',
      description: 'Primary Jira instance for project management',
      isActive: true,
    },
    {
      id: '2',
      name: 'CI/CD Jenkins',
      type: 'jenkins',
      baseUrl: 'https://jenkins.company.com',
      description: 'Main Jenkins instance for builds',
      isActive: true,
    },
  ]);

  const [editingLink, setEditingLink] = useState<SystemLink | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddNew = () => {
    setEditingLink({
      id: '',
      name: '',
      type: 'jira',
      baseUrl: '',
      description: '',
      isActive: true,
    });
    setShowForm(true);
  };

  const handleEdit = (link: SystemLink) => {
    setEditingLink(link);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!editingLink) return;

    if (editingLink.id) {
      // Update existing
      setSystemLinks(links => 
        links.map(link => link.id === editingLink.id ? editingLink : link)
      );
      toast({
        title: "Link Updated",
        description: "System link has been updated successfully.",
      });
    } else {
      // Add new
      const newLink = { ...editingLink, id: Date.now().toString() };
      setSystemLinks(links => [...links, newLink]);
      toast({
        title: "Link Added",
        description: "New system link has been added successfully.",
      });
    }

    setShowForm(false);
    setEditingLink(null);
  };

  const handleDelete = (id: string) => {
    setSystemLinks(links => links.filter(link => link.id !== id));
    toast({
      title: "Link Deleted",
      description: "System link has been deleted successfully.",
    });
  };

  const handleTest = (link: SystemLink) => {
    toast({
      title: "Testing Connection",
      description: `Testing connection to ${link.name}...`,
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'jira': return '🎫';
      case 'confluence': return '📚';
      case 'jenkins': return '🔧';
      case 'harbor': return '🐳';
      case 'mano': return '⚡';
      default: return '🔗';
    }
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
              Add New Link
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showForm && editingLink && (
            <Card className="mb-6 border-dashed">
              <CardHeader>
                <CardTitle className="text-lg">
                  {editingLink.id ? 'Edit System Link' : 'Add New System Link'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="link-name">Name</Label>
                    <Input
                      id="link-name"
                      value={editingLink.name}
                      onChange={(e) => setEditingLink({...editingLink, name: e.target.value})}
                      placeholder="Enter link name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="link-type">Type</Label>
                    <select
                      id="link-type"
                      value={editingLink.type}
                      onChange={(e) => setEditingLink({...editingLink, type: e.target.value as any})}
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
                  <Label htmlFor="link-url">Base URL</Label>
                  <Input
                    id="link-url"
                    value={editingLink.baseUrl}
                    onChange={(e) => setEditingLink({...editingLink, baseUrl: e.target.value})}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link-description">Description</Label>
                  <Input
                    id="link-description"
                    value={editingLink.description}
                    onChange={(e) => setEditingLink({...editingLink, description: e.target.value})}
                    placeholder="Enter description"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSave}>Save</Button>
                  <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {systemLinks.map((link) => (
              <Card key={link.id} className="border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{getTypeIcon(link.type)}</div>
                      <div>
                        <h3 className="font-semibold">{link.name}</h3>
                        <p className="text-sm text-muted-foreground">{link.description}</p>
                        <p className="text-xs text-muted-foreground">{link.baseUrl}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTest(link)}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(link)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(link.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
