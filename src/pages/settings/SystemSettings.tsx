
import React, { useState } from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Save, Plus, Edit, Trash, Users, Group, Shield, Link, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SystemLinksManager } from "@/components/settings/SystemLinksManager";
import { UserRoleManager } from "@/components/settings/UserRoleManager";

const SystemSettings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "System settings have been updated successfully.",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <DashboardHeader />
          <div className="flex-1 space-y-6 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>
                <p className="text-muted-foreground">
                  Configure system integrations, users, roles, and access control.
                </p>
              </div>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </div>

            <Tabs defaultValue="system-links" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="system-links" className="flex items-center space-x-2">
                  <Link className="h-4 w-4" />
                  <span>System Links</span>
                </TabsTrigger>
                <TabsTrigger value="user-management" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>User & Role Management</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="system-links">
                <SystemLinksManager />
              </TabsContent>

              <TabsContent value="user-management">
                <UserRoleManager />
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default SystemSettings;
