
import React from 'react';

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
    { id: 'progress-checklist', title: 'Progress Checklist', type: 'section' },
    { id: 'epic-stories', title: 'Epic Stories', type: 'section' },
    { id: 'issues-summary', title: 'Issues Summary', type: 'section' },
    { id: 'issues-management', title: 'Issues Management', type: 'section' },
    { id: 'application-versions', title: 'Application Versions', type: 'section' },
    { id: 'documents', title: 'Documents', type: 'section' }
  ];

  const categoryItems = [
    { name: "Development", completed: 7, total: 9, percentage: 78 },
    { name: "Testing", completed: 5, total: 8, percentage: 63 },
    { name: "Documentation", completed: 6, total: 7, percentage: 86 },
    { name: "Deployment", completed: 4, total: 6, percentage: 67 }
  ];

  return (
    <div className="h-full bg-white p-6 border-l border-gray-200">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h3>
      </div>
      
      <div className="space-y-2">
        {navigationItems.map((item) => (
          <div
            key={item.id}
            className={`px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
              activeSection === item.id 
                ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500' 
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="text-sm font-medium">
              {item.title}
            </span>
          </div>
        ))}
      </div>
      
      {/* Category Breakdown Checklist */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Category Progress</h4>
        <div className="space-y-3">
          {categoryItems.map((category, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  category.percentage >= 80 ? 'bg-green-500' : 
                  category.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <div>
                  <div className="text-xs font-medium text-gray-900">{category.name}</div>
                  <div className="text-xs text-gray-500">{category.completed}/{category.total} tasks</div>
                </div>
              </div>
              <div className="text-xs font-medium text-gray-600">
                {category.percentage}%
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4">
          <div className="text-xs text-gray-500 mb-2">Overall Progress</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: '73%' }}
            ></div>
          </div>
          <div className="text-xs text-gray-600 mt-1">73% Complete</div>
        </div>
      </div>
    </div>
  );
};
