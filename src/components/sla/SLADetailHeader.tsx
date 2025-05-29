
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

interface SLA {
  id: string;
  title: string;
  customer: string;
  status: string;
  priority: string;
  startDate: string;
  endDate: string;
  progress: number;
  description: string;
  requirements: string[];
  metrics: {
    uptime: number;
    responseTime: number;
    issuesResolved: number;
    totalIssues: number;
  };
}

interface SLADetailHeaderProps {
  sla: SLA;
}

export const SLADetailHeader = ({ sla }: SLADetailHeaderProps) => {
  const navigate = useNavigate();

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
            <h1 className="text-3xl font-bold text-gray-900">{sla.title}</h1>
            <p className="text-gray-600 mt-1">{sla.customer}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={getPriorityColor(sla.priority)}>
            {sla.priority}
          </Badge>
          <Badge className={getStatusColor(sla.status)}>
            {sla.status}
          </Badge>
        </div>
      </div>
    </div>
  );
};
