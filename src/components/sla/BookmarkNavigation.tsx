
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NavigationItem {
  id: string;
  title: string;
  type: 'section' | 'item';
  status?: string;
  isActive?: boolean;
}

interface BookmarkNavigationProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
}

export const BookmarkNavigation = ({ onNavigate, activeSection }: BookmarkNavigationProps) => {
  const navigationItems: NavigationItem[] = [
    { id: 'overview', title: 'Overview', type: 'section' },
    { id: 'summary', title: 'Summary Statistics', type: 'section' },
    { id: 'issues', title: 'Issues Management', type: 'section' },
    { id: 'development-progress', title: 'Development Progress', type: 'item', status: 'active' },
    { id: 'code-quality', title: 'Code Quality', type: 'item', status: 'review' },
    { id: 'testing', title: 'Testing', type: 'item', status: 'review' },
    { id: 'dependencies', title: 'Dependencies', type: 'item' },
    { id: 'delivery-stage', title: 'Delivery Stage', type: 'section' }
  ];

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'review': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return '';
    }
  };

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
                activeSection === item.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
              } ${item.type === 'section' ? 'font-medium' : 'pl-6 text-sm'}`}
              onClick={() => onNavigate(item.id)}
            >
              <div className="flex items-center justify-between">
                <span className={item.type === 'section' ? 'text-gray-900' : 'text-gray-600'}>
                  {item.title}
                </span>
                {item.status && (
                  <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                    {item.status}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
