
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NavigationItem {
  id: string;
  title: string;
  type: 'section';
}

interface BookmarkNavigationProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
}

export const BookmarkNavigation = ({ onNavigate, activeSection }: BookmarkNavigationProps) => {
  const navigationItems: NavigationItem[] = [
    { id: 'overview', title: 'Overview', type: 'section' },
    { id: 'sla-overview', title: 'Code Quality', type: 'section' },
    { id: 'sla-board', title: 'Testing', type: 'section' },
    { id: 'applications', title: 'Dependencies', type: 'section' },
    { id: 'documents', title: 'Delivery Stage', type: 'section' }
  ];

  return (
    <div className="h-full bg-slate-50 p-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Bookmark</h3>
      </div>
      
      <div className="space-y-1">
        {navigationItems.map((item) => (
          <div
            key={item.id}
            className={`px-3 py-2 rounded-md cursor-pointer transition-all duration-200 ${
              activeSection === item.id 
                ? 'bg-indigo-500 text-white shadow-md' 
                : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
            }`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="text-sm font-medium">
              {item.title}
            </span>
          </div>
        ))}
      </div>
      
      {/* Delivery Stage Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-600 mb-3">Delivery Stage</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">DEVELOPMENT</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">DELIVERY VHT TESTING</span>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <button className="w-full px-3 py-2 bg-indigo-500 text-white text-xs rounded-md hover:bg-indigo-600 transition-colors">
            Propose for release
          </button>
          <button className="w-full px-3 py-2 bg-purple-500 text-white text-xs rounded-md hover:bg-purple-600 transition-colors">
            Transfer ephemeral
          </button>
        </div>
      </div>
    </div>
  );
};
