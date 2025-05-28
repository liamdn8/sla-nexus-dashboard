
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
    { id: 'overview', title: 'Progress Checklist', type: 'section' },
    { id: 'sla-overview', title: 'SLA Overview', type: 'section' },
    { id: 'sla-board', title: 'SLA Report Board', type: 'section' },
    { id: 'applications', title: 'Application Status', type: 'section' },
    { id: 'documents', title: 'Document Manager', type: 'section' }
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Bookmark</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <div
              key={item.id}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors ${
                activeSection === item.id ? 'bg-blue-50 border-l-2 border-blue-500' : ''
              } font-medium`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="text-gray-900">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
