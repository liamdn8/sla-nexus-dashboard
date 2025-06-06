
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Key, 
  Clock, 
  MoreVertical,
  Eye,
  TrendingUp
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
  // Simplified SLA data
  const completionRate = Math.floor(Math.random() * 40) + 30; // 30-70% range
  const activeSLAs = Math.floor(project.totalSLAs * 0.7);
  
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active': 
        return { 
          color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500'
        };
      case 'inactive': 
        return { 
          color: 'bg-gray-100 text-gray-600 border-gray-200',
          dot: 'bg-gray-400'
        };
      case 'maintenance': 
        return { 
          color: 'bg-amber-100 text-amber-700 border-amber-200',
          dot: 'bg-amber-500'
        };
      default: 
        return { 
          color: 'bg-gray-100 text-gray-600 border-gray-200',
          dot: 'bg-gray-400'
        };
    }
  };

  const statusConfig = getStatusConfig(project.status);

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-sm bg-gradient-to-br from-white to-gray-50/50">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {project.name}
              </CardTitle>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-medium ${statusConfig.color}`}>
                <div className={`w-2 h-2 rounded-full ${statusConfig.dot}`}></div>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Key className="h-3.5 w-3.5" />
              <span className="font-mono font-semibold text-gray-700">{project.key}</span>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
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
      </CardHeader>

      <CardContent className="space-y-5">
        {/* SLA Progress Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="font-semibold text-blue-900">SLA Progress</span>
            </div>
            <span className="text-xs text-blue-600 font-medium">{completionRate}% Complete</span>
          </div>
          
          <Progress value={completionRate} className="h-2.5 mb-3 bg-blue-100" />
          
          <div className="flex justify-between text-sm">
            <div className="text-center">
              <div className="font-bold text-lg text-blue-900">{project.totalSLAs}</div>
              <div className="text-xs text-blue-600">Total SLAs</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-emerald-600">{activeSLAs}</div>
              <div className="text-xs text-blue-600">Active</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-purple-600">{project.totalApplications}</div>
              <div className="text-xs text-blue-600">Apps</div>
            </div>
          </div>
        </div>

        {/* Project Admin */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {project.admin.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">{project.admin}</div>
              <div className="text-xs text-gray-500">Project Admin</div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>{project.lastActivity}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button variant="outline" size="sm" className="w-full group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-700 transition-colors">
          <Eye className="h-4 w-4 mr-2" />
          View Project Details
        </Button>
      </CardContent>
    </Card>
  );
};
