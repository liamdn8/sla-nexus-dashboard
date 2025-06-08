
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Shield } from "lucide-react";
import { UserManagement } from './UserManagement';
import { RoleManagement } from './RoleManagement';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  groups: string[];
  isActive: boolean;
  lastLogin?: string;
}

interface RoleData {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount?: number;
}

export const UserRoleManager = () => {
  const [users, setUsers] = useState<UserData[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'admin',
      groups: ['developers', 'managers'],
      isActive: true,
      lastLogin: '2024-01-15 10:30 AM',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      role: 'developer',
      groups: ['developers'],
      isActive: true,
      lastLogin: '2024-01-14 2:15 PM',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      role: 'viewer',
      groups: [],
      isActive: false,
      lastLogin: '2024-01-10 9:45 AM',
    },
  ]);

  const [roles, setRoles] = useState<RoleData[]>([
    {
      id: '1',
      name: 'admin',
      description: 'Full system access with all permissions',
      permissions: ['read', 'write', 'delete', 'admin', 'manage_users', 'manage_projects'],
      userCount: 1,
    },
    {
      id: '2',
      name: 'developer',
      description: 'Development access with read and write permissions',
      permissions: ['read', 'write', 'view_reports'],
      userCount: 1,
    },
    {
      id: '3',
      name: 'viewer',
      description: 'Read-only access to system resources',
      permissions: ['read'],
      userCount: 1,
    },
  ]);

  const handleUpdateUsers = (updatedUsers: UserData[]) => {
    setUsers(updatedUsers);
    // Update user counts in roles
    const updatedRoles = roles.map(role => ({
      ...role,
      userCount: updatedUsers.filter(user => user.role === role.name).length
    }));
    setRoles(updatedRoles);
  };

  const handleUpdateRoles = (updatedRoles: RoleData[]) => {
    setRoles(updatedRoles);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Roles</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <UserManagement
            users={users}
            roles={roles}
            onUpdateUsers={handleUpdateUsers}
          />
        </TabsContent>

        <TabsContent value="roles">
          <RoleManagement
            roles={roles}
            onUpdateRoles={handleUpdateRoles}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
