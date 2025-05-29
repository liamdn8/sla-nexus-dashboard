
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

interface SLADetailHeaderProps {
  slaDetail: {
    title: string;
    project: string;
    priority: string;
    status: string;
  };
  getPriorityColor: (priority: string) => string;
  getStatusColor: (status: string) => string;
}

export const SLADetailHeader = ({ slaDetail, getPriorityColor, getStatusColor }: SLADetailHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/sla-list')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to SLA List</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{slaDetail.title}</h1>
            <p className="text-gray-600 mt-1">{slaDetail.project}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={getPriorityColor(slaDetail.priority)}>
            {slaDetail.priority}
          </Badge>
          <Badge className={getStatusColor(slaDetail.status)}>
            {slaDetail.status}
          </Badge>
        </div>
      </div>
    </div>
  );
};
