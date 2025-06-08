
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash, Shield, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RoleData {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount?: number;
}

interface RoleManagementProps {
  roles: RoleData[];
  onUpdateRoles: (roles: RoleData[]) => void;
}

const availablePermissions = [
  'read', 'write', 'delete', 'admin', 'manage_users', 'manage_projects', 'view_reports'
];

export const RoleManagement = ({ roles, onUpdateRoles }: RoleManagementProps) => {
  const { toast } = useToast();
  const [editingRole, setEditingRole] = useState<RoleData | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddRole = () => {
    setEditingRole({
      id: '',
      name: '',
      description: '',
      permissions: [],
    });
    setShowForm(true);
  };

  const handleEditRole = (role: RoleData) => {
    setEditingRole(role);
    setShowForm(true);
  };

  const handleSaveRole = () => {
    if (!editingRole) return;

    if (editingRole.id) {
      const updatedRoles = roles.map(role => 
        role.id === editingRole.id ? editingRole : role
      );
      onUpdateRoles(updatedRoles);
      toast({ title: "Role Updated", description: "Role has been updated successfully." });
    } else {
      const newRole = { ...editingRole, id: Date.now().toString() };
      onUpdateRoles([...roles, newRole]);
      toast({ title: "Role Added", description: "New role has been added successfully." });
    }

    setShowForm(false);
    setEditingRole(null);
  };

  const handleDeleteRole = (id: string) => {
    const role = roles.find(r => r.id === id);
    onUpdateRoles(roles.filter(role => role.id !== id));
    toast({ 
      title: "Role Deleted", 
      description: `${role?.name} role has been deleted successfully.`,
      variant: "destructive"
    });
  };

  const togglePermission = (permission: string) => {
    if (!editingRole) return;
    
    const updatedPermissions = editingRole.permissions.includes(permission)
      ? editingRole.permissions.filter(p => p !== permission)
      : [...editingRole.permissions, permission];
    
    setEditingRole({ ...editingRole, permissions: updatedPermissions });
  };

  const getPermissionColor = (permission: string) => {
    const colors: Record<string, string> = {
      read: 'bg-blue-100 text-blue-800',
      write: 'bg-green-100 text-green-800',
      delete: 'bg-red-100 text-red-800',
      admin: 'bg-purple-100 text-purple-800',
      manage_users: 'bg-orange-100 text-orange-800',
      manage_projects: 'bg-cyan-100 text-cyan-800',
      view_reports: 'bg-yellow-100 text-yellow-800',
    };
    return colors[permission] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Role Management</span>
              </CardTitle>
              <CardDescription>Define roles and their permissions in the system.</CardDescription>
            </div>
            <Button onClick={handleAddRole}>
              <Plus className="mr-2 h-4 w-4" />
              Add Role
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showForm && editingRole && (
            <Card className="mb-6 border-dashed border-2">
              <CardHeader>
                <CardTitle className="text-lg">
                  {editingRole.id ? 'Edit Role' : 'Add New Role'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role-name">Role Name</Label>
                    <Input
                      id="role-name"
                      value={editingRole.name}
                      onChange={(e) => setEditingRole({...editingRole, name: e.target.value})}
                      placeholder="Enter role name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role-description">Description</Label>
                    <Input
                      id="role-description"
                      value={editingRole.description}
                      onChange={(e) => setEditingRole({...editingRole, description: e.target.value})}
                      placeholder="Enter role description"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {availablePermissions.map(permission => (
                      <div key={permission} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`perm-${permission}`}
                          checked={editingRole.permissions.includes(permission)}
                          onChange={() => togglePermission(permission)}
                        />
                        <Label htmlFor={`perm-${permission}`} className="text-sm">
                          {permission.replace('_', ' ')}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button onClick={handleSaveRole}>
                    {editingRole.id ? 'Update Role' : 'Create Role'}
                  </Button>
                  <Button variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => (
              <Card key={role.id} className="border">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base capitalize">{role.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditRole(role)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRole(role.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Permissions:</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {role.permissions.map(permission => (
                          <Badge
                            key={permission}
                            className={getPermissionColor(permission)}
                          >
                            {permission.replace('_', ' ')}
                          </Badge>
                        ))}
                        {role.permissions.length === 0 && (
                          <span className="text-sm text-muted-foreground">No permissions</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {role.userCount || 0} users assigned
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {roles.length === 0 && (
            <div className="text-center py-16">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Roles</h3>
              <p className="text-muted-foreground mb-4">
                Get started by creating your first role with specific permissions.
              </p>
              <Button onClick={handleAddRole}>
                <Plus className="mr-2 h-4 w-4" />
                Add First Role
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
