
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Clock, XCircle } from "lucide-react";

interface NavigationItem {
  id: string;
  title: string;
}

interface DeliveryStage {
  name: string;
  status: string;
  date: string;
}

interface BuildBookmarkNavigationProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
  deliveryStages: DeliveryStage[];
}

export const BuildBookmarkNavigation = ({ 
  onNavigate, 
  activeSection, 
  deliveryStages 
}: BuildBookmarkNavigationProps) => {
  const navigationItems: NavigationItem[] = [
    { id: 'overview', title: 'Overview' },
    { id: 'sast-results', title: 'SAST Results' },
    { id: 'test-results', title: 'Test Results' },
    { id: 'dependencies', title: 'Dependencies' }
  ];

  const getStageIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress': return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStageColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-50 border-green-200';
      case 'in-progress': return 'bg-orange-50 border-orange-200';
      case 'failed': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="fixed top-0 right-0 h-screen w-80 bg-white p-6 border-l border-gray-200 overflow-y-auto z-10">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h3>
      </div>
      
      <div className="space-y-2 mb-8">
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
      
      {/* Delivery Stages */}
      <div className="pt-6 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Delivery Stages</h4>
        <div className="space-y-3">
          {deliveryStages.map((stage, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg border ${getStageColor(stage.status)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getStageIcon(stage.status)}
                  <span className="text-sm font-medium text-gray-900">
                    {stage.name}
                  </span>
                </div>
                <Badge 
                  variant={stage.status === 'completed' ? 'default' : 'outline'}
                  className="text-xs"
                >
                  {stage.status}
                </Badge>
              </div>
              <div className="text-xs text-gray-600">
                {stage.date}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4">
          <div className="text-xs text-gray-500 mb-2">Overall Progress</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: '50%' }}
            ></div>
          </div>
          <div className="text-xs text-gray-600 mt-1">2 of 4 stages completed</div>
        </div>
      </div>
    </div>
  );
};
