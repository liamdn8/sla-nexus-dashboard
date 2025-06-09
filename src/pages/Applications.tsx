
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ApplicationStatus } from "@/components/ApplicationStatus";
import { ApplicationSummary } from "@/components/ApplicationSummary";
import { ApplicationDialog } from "@/components/ApplicationDialog";
import { QuickNavigation } from "@/components/QuickNavigation";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";

const Applications = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);

  const handleCreateApplication = (applicationData: any) => {
    console.log('Creating application:', applicationData);
    // Handle application creation logic here
  };

  const handleEditApplication = (application: any) => {
    setEditingApplication(application);
    setIsEditDialogOpen(true);
  };

  const handleUpdateApplication = (applicationData: any) => {
    console.log('Updating application:', applicationData);
    // Handle application update logic here
    setEditingApplication(null);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-white">
          <div className="bg-white border-b border-gray-200 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
                <p className="text-gray-600 mt-1">Manage and monitor application status and deployments</p>
              </div>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Application
              </Button>
            </div>
          </div>

          <div className="flex">
            <div className="flex-1 container mx-auto px-8 py-6 space-y-6">
              <ApplicationSummary />
              <ApplicationStatus />
            </div>
            
            <div className="w-80 border-l border-gray-200 p-6">
              <QuickNavigation />
            </div>
          </div>
        </main>

        <ApplicationDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onSave={handleCreateApplication}
        />

        <ApplicationDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          application={editingApplication}
          onSave={handleUpdateApplication}
        />
      </div>
    </SidebarProvider>
  );
};

export default Applications;
