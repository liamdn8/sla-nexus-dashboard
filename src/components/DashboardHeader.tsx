
import React from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";

export const DashboardHeader = () => {
  return (
    <Card className="rounded-none border-x-0 border-t-0 bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Project SLA Management</h1>
            <p className="text-gray-600">Monitor and track project SLAs, deliverables, and documentation</p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </Card>
  );
};
