
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface SLAData {
  id: string;
  title: string;
  project: string;
  priority: string;
  status: string;
  startDate: string;
  deadline: string;
  progress: number;
  totalStories: number;
  completedStories: number;
  totalTasks: number;
  completedTasks: number;
  assignedTeam: string;
  estimatedHours: number;
  actualHours: number;
}

interface SLAListTableProps {
  slaData: SLAData[];
}

export const SLAListTable = ({ slaData }: SLAListTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "To Do": return "bg-gray-100 text-gray-800";
      case "Planning": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = (deadline: string, status: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    return deadlineDate < today && status !== 'Done';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">SLA Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SLA ID / Title</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Stories/Tasks</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Hours</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {slaData.map((sla) => (
              <TableRow key={sla.id} className="hover:bg-gray-50">
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900">{sla.id}</div>
                    <div className="text-sm text-gray-500">{sla.title}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium text-gray-700">
                    {sla.project}
                  </span>
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
                  <div className="space-y-1">
                    <Progress value={sla.progress} className="w-20" />
                    <span className="text-xs text-gray-500">{sla.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>Stories: {sla.completedStories}/{sla.totalStories}</div>
                    <div>Tasks: {sla.completedTasks}/{sla.totalTasks}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600">{sla.assignedTeam}</span>
                </TableCell>
                <TableCell>
                  <div className={`text-sm ${isOverdue(sla.deadline, sla.status) ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                    {formatDate(sla.deadline)}
                    {isOverdue(sla.deadline, sla.status) && (
                      <div className="text-xs text-red-500">Overdue</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{sla.actualHours}h / {sla.estimatedHours}h</div>
                    <div className="text-xs text-gray-500">
                      {Math.round((sla.actualHours / sla.estimatedHours) * 100)}% used
                    </div>
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
