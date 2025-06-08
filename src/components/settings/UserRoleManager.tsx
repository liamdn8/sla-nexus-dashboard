
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash, Users, Group, Shield, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  groups: string[];
  isActive: boolean;
}

interface RoleData {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

interface GroupData {
  id: string;
  name: string;
  description: string;
  members: string[];
}

export const UserRoleManager = () => {
  const { toast } = useToast();
  
  const [users, setUsers] = useState<UserData[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'admin',
      groups: ['developers', 'managers'],
      isActive: true,
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      role: 'developer',
      groups: ['developers'],
      isActive: true,
    },
  ]);

  const [roles, setRoles] = useState<RoleData[]>([
    {
      id: '1',
      name: 'admin',
      description: 'Full system access',
      permissions: ['read', 'write', 'delete', 'admin'],
    },
    {
      id: '2',
      name: 'developer',
      description: 'Development access',
      permissions: ['read', 'write'],
    },
  ]);

  const [groups, setGroups] = useState<GroupData[]>([
    {
      id: '1',
      name: 'developers',
      description: 'Development team',
      members: ['1', '2'],
    },
    {
      id: '2',
      name: 'managers',
      description: 'Management team',
      members: ['1'],
    },
  ]);

  const [showUserForm, setShowUserForm] = useState(false);
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [editingRole, setEditingRole] = useState<RoleData | null>(null);
  const [editingGroup, setEditingGroup] = useState<GroupData | null>(null);

  const handleAddUser = () => {
    setEditingUser({
      id: '',
      name: '',
      email: '',
      role: 'developer',
      groups: [],
      isActive: true,
    });
    setShowUserForm(true);
  };

  const handleSaveUser = () => {
    if (!editingUser) return;

    if (editingUser.id) {
      setUsers(users => users.map(user => user.id === editingUser.id ? editingUser : user));
      toast({ title: "User Updated", description: "User has been updated successfully." });
    } else {
      const newUser = { ...editingUser, id: Date.now().toString() };
      setUsers(users => [...users, newUser]);
      toast({ title: "User Added", description: "New user has been added successfully." });
    }

    setShowUserForm(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users => users.filter(user => user.id !== id));
    toast({ title: "User Deleted", description: "User has been deleted successfully." });
  };

  const handleAddRole = () => {
    setEditingRole({
      id: '',
      name: '',
      description: '',
      permissions: [],
    });
    setShowRoleForm(true);
  };

  const handleSaveRole = () => {
    if (!editingRole) return;

    if (editingRole.id) {
      setRoles(roles => roles.map(role => role.id === editingRole.id ? editingRole : role));
      toast({ title: "Role Updated", description: "Role has been updated successfully." });
    } else {
      const newRole = { ...editingRole, id: Date.now().toString() };
      setRoles(roles => [...roles, newRole]);
      toast({ title: "Role Added", description: "New role has been added successfully." });
    }

    setShowRoleForm(false);
    setEditingRole(null);
  };

  const handleDeleteRole = (id: string) => {
    setRoles(roles => roles.filter(role => role.id !== id));
    toast({ title: "Role Deleted", description: "Role has been deleted successfully." });
  };

  const handleAddGroup = () => {
    setEditingGroup({
      id: '',
      name: '',
      description: '',
      members: [],
    });
    setShowGroupForm(true);
  };

  const handleSaveGroup = () => {
    if (!editingGroup) return;

    if (editingGroup.id) {
      setGroups(groups => groups.map(group => group.id === editingGroup.id ? editingGroup : group));
      toast({ title: "Group Updated", description: "Group has been updated successfully." });
    } else {
      const newGroup = { ...editingGroup, id: Date.now().toString() };
      setGroups(groups => [...groups, newGroup]);
      toast({ title: "Group Added", description: "New group has been added successfully." });
    }

    setShowGroupForm(false);
    setEditingGroup(null);
  };

  const handleDeleteGroup = (id: string) => {
    setGroups(groups => groups.filter(group => group.id !== id));
    toast({ title: "Group Deleted", description: "Group has been deleted successfully." });
  };

  return (
    <Tabs defaultValue="users" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="roles">Roles</TabsTrigger>
        <TabsTrigger value="groups">Groups</TabsTrigger>
      </TabsList>

      <TabsContent value="users">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>User Management</span>
                </CardTitle>
                <CardDescription>Manage system users and their access.</CardDescription>
              </div>
              <Button onClick={handleAddUser}>
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showUserForm && editingUser && (
              <Card className="mb-6 border-dashed">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {editingUser.id ? 'Edit User' : 'Add New User'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="user-name">Name</Label>
                      <Input
                        id="user-name"
                        value={editingUser.name}
                        onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                        placeholder="Enter user name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="user-email">Email</Label>
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
                  <div className="flex space-x-2">
                    <Button onClick={handleSaveUser}>Save</Button>
                    <Button variant="outline" onClick={() => setShowUserForm(false)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {users.map((user) => (
                <Card key={user.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <User className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <h3 className="font-semibold">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <p className="text-xs text-muted-foreground">Role: {user.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingUser(user);
                            setShowUserForm(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
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
      </TabsContent>

      <TabsContent value="roles">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Role Management</span>
                </CardTitle>
                <CardDescription>Define roles and permissions.</CardDescription>
              </div>
              <Button onClick={handleAddRole}>
                <Plus className="mr-2 h-4 w-4" />
                Add Role
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showRoleForm && editingRole && (
              <Card className="mb-6 border-dashed">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {editingRole.id ? 'Edit Role' : 'Add New Role'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                  <div className="flex space-x-2">
                    <Button onClick={handleSaveRole}>Save</Button>
                    <Button variant="outline" onClick={() => setShowRoleForm(false)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {roles.map((role) => (
                <Card key={role.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Shield className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <h3 className="font-semibold">{role.name}</h3>
                          <p className="text-sm text-muted-foreground">{role.description}</p>
                          <p className="text-xs text-muted-foreground">
                            Permissions: {role.permissions.join(', ')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingRole(role);
                            setShowRoleForm(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteRole(role.id)}
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
      </TabsContent>

      <TabsContent value="groups">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Group className="h-5 w-5" />
                  <span>Group Management</span>
                </CardTitle>
                <CardDescription>Manage user groups and teams.</CardDescription>
              </div>
              <Button onClick={handleAddGroup}>
                <Plus className="mr-2 h-4 w-4" />
                Add Group
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showGroupForm && editingGroup && (
              <Card className="mb-6 border-dashed">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {editingGroup.id ? 'Edit Group' : 'Add New Group'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="group-name">Group Name</Label>
                    <Input
                      id="group-name"
                      value={editingGroup.name}
                      onChange={(e) => setEditingGroup({...editingGroup, name: e.target.value})}
                      placeholder="Enter group name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="group-description">Description</Label>
                    <Input
                      id="group-description"
                      value={editingGroup.description}
                      onChange={(e) => setEditingGroup({...editingGroup, description: e.target.value})}
                      placeholder="Enter group description"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleSaveGroup}>Save</Button>
                    <Button variant="outline" onClick={() => setShowGroupForm(false)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {groups.map((group) => (
                <Card key={group.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Group className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <h3 className="font-semibold">{group.name}</h3>
                          <p className="text-sm text-muted-foreground">{group.description}</p>
                          <p className="text-xs text-muted-foreground">
                            Members: {group.members.length}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingGroup(group);
                            setShowGroupForm(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteGroup(group.id)}
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
      </TabsContent>
    </Tabs>
  );
};
