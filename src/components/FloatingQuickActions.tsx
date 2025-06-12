
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, Rocket, Smartphone, FileText, Users, Settings } from "lucide-react";

export const FloatingQuickActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickActions = [
    {
      title: "Create SLA",
      icon: FileText,
      description: "Start a new SLA",
      action: () => console.log("Create SLA"),
      color: "text-blue-600 hover:text-blue-700"
    },
    {
      title: "New Release",
      icon: Rocket,
      description: "Create a release",
      action: () => console.log("Create Release"),
      color: "text-green-600 hover:text-green-700"
    },
    {
      title: "Add Application",
      icon: Smartphone,
      description: "Register new app",
      action: () => console.log("Create Application"),
      color: "text-purple-600 hover:text-purple-700"
    },
    {
      title: "Manage Users",
      icon: Users,
      description: "User management",
      action: () => console.log("Manage Users"),
      color: "text-orange-600 hover:text-orange-700"
    },
    {
      title: "Settings",
      icon: Settings,
      description: "Project settings",
      action: () => console.log("Settings"),
      color: "text-gray-600 hover:text-gray-700"
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            size="lg" 
            className="rounded-full w-14 h-14 shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className={`h-6 w-6 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`} />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          side="top" 
          align="end" 
          className="w-72 p-3 mb-2"
          sideOffset={8}
        >
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-gray-900 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="h-16 flex flex-col items-center justify-center space-y-1 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    action.action();
                    setIsOpen(false);
                  }}
                >
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                  <div className="text-center">
                    <div className="text-xs font-medium">{action.title}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
