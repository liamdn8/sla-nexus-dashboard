import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Save, X, AlertTriangle } from "lucide-react";

interface Feature {
  id: string;
  issueCode: string;
  summary: string;
  type: 'NVJ1-PTM' | 'NVJ2-PTM' | 'NVJ3-PTM' | 'GD_WEB1' | 'GD_WEB2' | 'GD_WEB3';
  assignee: string;
  startDate: string;
  dueDate: string;
  status: 'Planning' | 'In Progress' | 'Testing' | 'Done';
  relatedIssues: string[];
}

interface FeatureManagementProps {
  onFeatureCreate?: (feature: Feature, relatedIssues: any[]) => void;
}

export const FeatureManagement = ({ onFeatureCreate }: FeatureManagementProps) => {
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: 'FEAT-001',
      issueCode: 'OCS-09',
      summary: 'User Authentication System',
      type: 'NVJ1-PTM',
      assignee: 'John Doe',
      startDate: '2024-01-15',
      dueDate: '2024-02-15',
      status: 'In Progress',
      relatedIssues: ['ISS-001', 'ISS-002']
    },
    {
      id: 'FEAT-002',
      issueCode: 'OCS-10',
      summary: 'Payment Integration',
      type: 'GD_WEB3',
      assignee: 'Jane Smith',
      startDate: '2024-02-01',
      dueDate: '2024-01-30',
      status: 'Planning',
      relatedIssues: ['ISS-003']
    },
    {
      id: 'FEAT-003',
      issueCode: 'OCS-11',
      summary: 'Mobile Responsive Design',
      type: 'NVJ1-PTM',
      assignee: 'Bob Johnson',
      startDate: '2024-01-20',
      dueDate: '2024-01-25',
      status: 'Testing',
      relatedIssues: []
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingFeature, setEditingFeature] = useState<Partial<Feature>>({});
  const [isCreating, setIsCreating] = useState(false);

  const isOverdue = (dueDate: string, status: string) => {
    if (status === 'Done') return false;
    return new Date(dueDate) < new Date();
  };

  const handleEdit = (feature: Feature) => {
    setEditingId(feature.id);
    setEditingFeature(feature);
  };

  const handleSave = () => {
    if (isCreating) {
      const newFeature: Feature = {
        id: `FEAT-${String(features.length + 1).padStart(3, '0')}`,
        issueCode: editingFeature.issueCode || `OCS-${String(features.length + 12).padStart(2, '0')}`,
        summary: editingFeature.summary || '',
        type: editingFeature.type || 'Feature',
        assignee: editingFeature.assignee || '',
        startDate: editingFeature.startDate || '',
        dueDate: editingFeature.dueDate || '',
        status: editingFeature.status || 'Planning',
        relatedIssues: []
      };

      setFeatures(prev => [...prev, newFeature]);
      
      // Create related issues when feature is created
      const relatedIssues = [
        {
          id: `ISS-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
          type: 'Task',
          title: `Implement ${newFeature.summary}`,
          status: 'To Do',
          assignee: newFeature.assignee,
          estimate: '8h',
          worklog: '0h',
          subtasks: 3,
          completedSubtasks: 0,
          epic: newFeature.summary,
          epicId: newFeature.id,
          category: 'Development',
          completed: 0,
          total: 3,
          percentage: 0,
          priority: 'Medium',
          issueCode: newFeature.issueCode,
          startDate: newFeature.startDate,
          dueDate: newFeature.dueDate
        }
      ];

      onFeatureCreate?.(newFeature, relatedIssues);
      setIsCreating(false);
    } else if (editingId) {
      setFeatures(prev => 
        prev.map(feature => 
          feature.id === editingId ? { ...feature, ...editingFeature } : feature
        )
      );
      setEditingId(null);
    }
    setEditingFeature({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    setEditingFeature({});
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'done':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'testing':
        return 'bg-purple-100 text-purple-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'epic':
        return 'bg-purple-100 text-purple-800';
      case 'feature':
        return 'bg-blue-100 text-blue-800';
      case 'enhancement':
        return 'bg-green-100 text-green-800';
      case 'bug fix':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="feature-management">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold text-gray-900">Feature Management</CardTitle>
          <Button 
            onClick={() => setIsCreating(true)}
            disabled={isCreating || editingId !== null}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Feature</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">ID</TableHead>
                  <TableHead className="w-32">Issue Code</TableHead>
                  <TableHead className="min-w-[200px]">Summary</TableHead>
                  <TableHead className="w-32">Type</TableHead>
                  <TableHead className="w-40">Assignee</TableHead>
                  <TableHead className="w-32">Start Date</TableHead>
                  <TableHead className="w-32">Due Date</TableHead>
                  <TableHead className="w-32">Status</TableHead>
                  <TableHead className="w-24">Issues</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isCreating && (
                  <TableRow>
                    <TableCell className="text-sm text-gray-500">Auto</TableCell>
                    <TableCell>
                      <Input
                        value={editingFeature.issueCode || ''}
                        onChange={(e) => setEditingFeature(prev => ({ ...prev, issueCode: e.target.value }))}
                        placeholder="OCS-XX"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={editingFeature.summary || ''}
                        onChange={(e) => setEditingFeature(prev => ({ ...prev, summary: e.target.value }))}
                        placeholder="Feature summary"
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={editingFeature.type || 'Feature'}
                        onValueChange={(value: Feature['type']) => setEditingFeature(prev => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Epic">Epic</SelectItem>
                          <SelectItem value="Feature">Feature</SelectItem>
                          <SelectItem value="Enhancement">Enhancement</SelectItem>
                          <SelectItem value="Bug Fix">Bug Fix</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={editingFeature.assignee || ''}
                        onChange={(e) => setEditingFeature(prev => ({ ...prev, assignee: e.target.value }))}
                        placeholder="Assignee name"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        value={editingFeature.startDate || ''}
                        onChange={(e) => setEditingFeature(prev => ({ ...prev, startDate: e.target.value }))}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        value={editingFeature.dueDate || ''}
                        onChange={(e) => setEditingFeature(prev => ({ ...prev, dueDate: e.target.value }))}
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={editingFeature.status || 'Planning'}
                        onValueChange={(value: Feature['status']) => setEditingFeature(prev => ({ ...prev, status: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Planning">Planning</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Testing">Testing</SelectItem>
                          <SelectItem value="Done">Done</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost" onClick={handleSave}>
                          <Save className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={handleCancel}>
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
                {features.map((feature) => (
                  <TableRow key={feature.id} className={isOverdue(feature.dueDate, feature.status) ? 'bg-red-50' : ''}>
                    <TableCell className="font-mono text-sm">{feature.id}</TableCell>
                    <TableCell>
                      {editingId === feature.id ? (
                        <Input
                          value={editingFeature.issueCode || feature.issueCode}
                          onChange={(e) => setEditingFeature(prev => ({ ...prev, issueCode: e.target.value }))}
                        />
                      ) : (
                        <span className="font-mono font-medium">{feature.issueCode}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === feature.id ? (
                        <Input
                          value={editingFeature.summary || feature.summary}
                          onChange={(e) => setEditingFeature(prev => ({ ...prev, summary: e.target.value }))}
                        />
                      ) : (
                        <span className="font-medium">{feature.summary}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === feature.id ? (
                        <Select
                          value={editingFeature.type || feature.type}
                          onValueChange={(value: Feature['type']) => setEditingFeature(prev => ({ ...prev, type: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Epic">Epic</SelectItem>
                            <SelectItem value="Feature">Feature</SelectItem>
                            <SelectItem value="Enhancement">Enhancement</SelectItem>
                            <SelectItem value="Bug Fix">Bug Fix</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Badge className={getTypeColor(feature.type)}>
                          {feature.type}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === feature.id ? (
                        <Input
                          value={editingFeature.assignee || feature.assignee}
                          onChange={(e) => setEditingFeature(prev => ({ ...prev, assignee: e.target.value }))}
                        />
                      ) : (
                        feature.assignee
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === feature.id ? (
                        <Input
                          type="date"
                          value={editingFeature.startDate || feature.startDate}
                          onChange={(e) => setEditingFeature(prev => ({ ...prev, startDate: e.target.value }))}
                        />
                      ) : (
                        <div className="flex items-center space-x-1">
                          <span>{feature.startDate}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === feature.id ? (
                        <Input
                          type="date"
                          value={editingFeature.dueDate || feature.dueDate}
                          onChange={(e) => setEditingFeature(prev => ({ ...prev, dueDate: e.target.value }))}
                        />
                      ) : (
                        <div className="flex items-center space-x-1">
                          <span>{feature.dueDate}</span>
                          {isOverdue(feature.dueDate, feature.status) && (
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === feature.id ? (
                        <Select
                          value={editingFeature.status || feature.status}
                          onValueChange={(value: Feature['status']) => setEditingFeature(prev => ({ ...prev, status: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Planning">Planning</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Testing">Testing</SelectItem>
                            <SelectItem value="Done">Done</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Badge className={getStatusColor(feature.status)}>
                          {feature.status}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {feature.relatedIssues.length}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {editingId === feature.id ? (
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost" onClick={handleSave}>
                            <Save className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={handleCancel}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleEdit(feature)}
                          disabled={isCreating || editingId !== null}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
