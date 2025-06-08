
import React from 'react';
import { User, Bell, Palette, Link } from "lucide-react";

interface NavigationItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
}

interface AccountSettingsNavigationProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
}

export const AccountSettingsNavigation = ({ onNavigate, activeSection }: AccountSettingsNavigationProps) => {
  const navigationItems: NavigationItem[] = [
    { id: 'profile', title: 'Profile Information', icon: User },
    { id: 'system-links', title: 'System Links Credentials', icon: Link },
    { id: 'notifications', title: 'Notification Settings', icon: Bell },
    { id: 'preferences', title: 'Preferences', icon: Palette }
  ];

  return (
    <div className="fixed top-16 right-0 h-screen w-64 bg-white p-4 border-l border-gray-200 overflow-y-auto z-10">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h3>
      </div>
      
      <div className="space-y-2">
        {navigationItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
              activeSection === item.id 
                ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500' 
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
            onClick={() => onNavigate(item.id)}
          >
            <item.icon className="h-4 w-4" />
            <span className="text-sm font-medium">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
