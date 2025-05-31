
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Clock, XCircle, Play, User, AlertTriangle } from "lucide-react";

interface NavigationItem {
  id: string;
  title: string;
}

interface DeliveryStage {
  name: string;
  status: string;
  date: string;
  triggeredBy?: string;
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
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress': return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-gray-400" />;
      case 'skipped': return <Play className="h-4 w-4 text-blue-400" />;
      case 'not-run': return <div className="h-4 w-4 rounded-full bg-gray-300" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStageColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'in-progress': return 'bg-orange-50 border-orange-200';
      case 'failed': return 'bg-red-50 border-red-200';
      case 'pending': return 'bg-gray-50 border-gray-200';
      case 'skipped': return 'bg-blue-50 border-blue-200';
      case 'not-run': return 'bg-gray-50 border-gray-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getCompletedStages = () => {
    return deliveryStages.filter(stage => stage.status === 'success').length;
  };

  const canProposeRelease = () => {
    const stagingStage = deliveryStages.find(stage => stage.name === 'Staging');
    return stagingStage?.status === 'success';
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
                  variant={stage.status === 'success' ? 'default' : 'outline'}
                  className="text-xs"
                >
                  {stage.status}
                </Badge>
              </div>
              <div className="text-xs text-gray-600 mb-1">
                {stage.date}
              </div>
              {stage.triggeredBy && (
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <User className="h-3 w-3" />
                  <span>by {stage.triggeredBy}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4">
          <div className="text-xs text-gray-500 mb-2">Overall Progress</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${(getCompletedStages() / deliveryStages.length) * 100}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {getCompletedStages()} of {deliveryStages.length} stages completed
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            disabled={!canProposeRelease()}
          >
            Propose for Release
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full flex items-center space-x-2"
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Deliver to Customer</span>
          </Button>
          <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded border border-orange-200">
            ⚠️ Warning: This build is not a stable version. Customer delivery should be used with caution.
          </div>
        </div>
      </div>
    </div>
  );
};
