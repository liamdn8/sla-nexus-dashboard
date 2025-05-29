
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Users } from "lucide-react";

interface SLAData {
  id: string;
  title: string;
  project: string;
  priority: string;
  status: string;
  progress: number;
  totalStories: number;
  completedStories: number;
  totalTasks: number;
  completedTasks: number;
  estimatedHours: number;
  actualHours: number;
  deadline: string;
  assignedTeam: string;
}

interface SLAListTableProps {
  slaData: SLAData[];
}

export const SLAListTable = ({ slaData }: SLAListTableProps) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Planning': return 'bg-yellow-100 text-yellow-800';
      case 'To Do': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRowClick = (slaId: string) => {
    navigate(`/sla-detail/${slaId}`);
  };

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>SLA ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Stories</TableHead>
              <TableHead>Tasks</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Hours</TableHead>
              <TableHead>Deadline</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {slaData.map((sla) => (
              <TableRow 
                key={sla.id} 
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleRowClick(sla.id)}
              >
                <TableCell className="font-medium text-blue-600">{sla.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{sla.title}</p>
                    <p className="text-sm text-gray-500">{sla.project}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(sla.priority)}>
                    {sla.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(sla.status)}>
                    {sla.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{sla.progress}%</span>
                    </div>
                    <Progress value={sla.progress} className="h-2" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div className="font-medium">{sla.completedStories}/{sla.totalStories}</div>
                    <div className="text-gray-500">completed</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div className="font-medium">{sla.completedTasks}/{sla.totalTasks}</div>
                    <div className="text-gray-500">completed</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{sla.assignedTeam}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{sla.actualHours}h / {sla.estimatedHours}h</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{new Date(sla.deadline).toLocaleDateString()}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
