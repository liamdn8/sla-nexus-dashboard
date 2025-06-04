
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Key, 
  FileText, 
  Smartphone, 
  Clock, 
  MoreVertical,
  Eye
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Project {
  id: string;
  name: string;
  key: string;
  admin: string;
  description: string;
  status: 'active' | 'inactive' | 'maintenance';
  totalSLAs: number;
  totalApplications: number;
  lastActivity: string;
}

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '●';
      case 'inactive': return '○';
      case 'maintenance': return '⚠';
      default: return '○';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
              {project.name}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Key className="h-4 w-4" />
              <span className="font-mono font-medium">{project.key}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>Edit Project</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <Badge className={getStatusColor(project.status)}>
          <span className="mr-1">{getStatusIcon(project.status)}</span>
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Project Description */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {project.description}
        </p>

        {/* Project Admin */}
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600">Admin:</span>
          <span className="font-medium text-gray-900">{project.admin}</span>
        </div>

        {/* Project Overview Stats */}
        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-1">
              <FileText className="h-3 w-3" />
              SLAs
            </div>
            <div className="text-lg font-semibold text-gray-900">{project.totalSLAs}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-1">
              <Smartphone className="h-3 w-3" />
              Apps
            </div>
            <div className="text-lg font-semibold text-gray-900">{project.totalApplications}</div>
          </div>
        </div>

        {/* Last Activity */}
        <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
          <Clock className="h-3 w-3" />
          <span>Last activity: {project.lastActivity}</span>
        </div>

        {/* Actions */}
        <div className="pt-2">
          <Button variant="outline" size="sm" className="w-full">
            <Eye className="h-4 w-4 mr-2" />
            View Project
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
