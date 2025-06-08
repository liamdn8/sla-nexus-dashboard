
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash, User, Mail, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  groups: string[];
  isActive: boolean;
  lastLogin?: string;
}

interface UserManagementProps {
  users: UserData[];
  roles: { id: string; name: string }[];
  onUpdateUsers: (users: UserData[]) => void;
}

export const UserManagement = ({ users, roles, onUpdateUsers }: UserManagementProps) => {
  const { toast } = useToast();
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddUser = () => {
    setEditingUser({
      id: '',
      name: '',
      email: '',
      role: roles[0]?.name || 'developer',
      groups: [],
      isActive: true,
    });
    setShowForm(true);
  };

  const handleEditUser = (user: UserData) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleSaveUser = () => {
    if (!editingUser) return;

    if (editingUser.id) {
      const updatedUsers = users.map(user => 
        user.id === editingUser.id ? editingUser : user
      );
      onUpdateUsers(updatedUsers);
      toast({ title: "User Updated", description: "User has been updated successfully." });
    } else {
      const newUser = { ...editingUser, id: Date.now().toString() };
      onUpdateUsers([...users, newUser]);
      toast({ title: "User Added", description: "New user has been added successfully." });
    }

    setShowForm(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (id: string) => {
    const user = users.find(u => u.id === id);
    onUpdateUsers(users.filter(user => user.id !== id));
    toast({ 
      title: "User Deleted", 
      description: `${user?.name} has been deleted successfully.`,
      variant: "destructive"
    });
  };

  const toggleUserStatus = (id: string) => {
    const updatedUsers = users.map(user => 
      user.id === id ? { ...user, isActive: !user.isActive } : user
    );
    onUpdateUsers(updatedUsers);
    toast({ title: "User Status Updated", description: "User status has been changed." });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>User Management</span>
              </CardTitle>
              <CardDescription>Manage system users and their access permissions.</CardDescription>
            </div>
            <Button onClick={handleAddUser}>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showForm && editingUser && (
            <Card className="mb-6 border-dashed border-2">
              <CardHeader>
                <CardTitle className="text-lg">
                  {editingUser.id ? 'Edit User' : 'Add New User'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-name">Full Name</Label>
                    <Input
                      id="user-name"
                      value={editingUser.name}
                      onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-email">Email Address</Label>
                    <Input
                      id="user-email"
                      type="email"
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-role">Role</Label>
                  <select
                    id="user-role"
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {roles.map(role => (
                      <option key={role.id} value={role.name}>{role.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="user-active"
                    checked={editingUser.isActive}
                    onChange={(e) => setEditingUser({...editingUser, isActive: e.target.checked})}
                  />
                  <Label htmlFor="user-active">Active User</Label>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSaveUser}>
                    {editingUser.id ? 'Update User' : 'Create User'}
                  </Button>
                  <Button variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <Card key={user.id} className={`border ${!user.isActive ? 'opacity-60' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{user.name}</CardTitle>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditUser(user)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <Badge variant="outline">{user.role}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="text-sm text-muted-foreground">
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleUserStatus(user.id)}
                      >
                        {user.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>
                    {user.lastLogin && (
                      <p className="text-xs text-muted-foreground">
                        Last login: {user.lastLogin}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {users.length === 0 && (
            <div className="text-center py-16">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Users</h3>
              <p className="text-muted-foreground mb-4">
                Get started by adding your first user to the system.
              </p>
              <Button onClick={handleAddUser}>
                <Plus className="mr-2 h-4 w-4" />
                Add First User
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
