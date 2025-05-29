
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface Issue {
  id: string;
  type: string;
  title: string;
  status: string;
  assignee: string;
  estimate: string;
  worklog: string;
  subtasks: number;
  completedSubtasks: number;
  epic: string;
  epicId: string;
  category: string;
  completed: number;
  total: number;
  percentage: number;
  priority: string;
}

interface IssuesListCardProps {
  issues: Issue[];
  selectedIssue: Issue | null;
  onIssueSelect: (issue: Issue) => void;
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalIssues: number;
}

export const IssuesListCard = ({ 
  issues, 
  selectedIssue, 
  onIssueSelect, 
  getStatusColor, 
  getPriorityColor,
  currentPage,
  totalPages,
  onPageChange,
  totalIssues
}: IssuesListCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Issues List</CardTitle>
        <div className="text-sm text-gray-600">
          {totalIssues} total issues
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                selectedIssue?.id === issue.id ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
              }`}
              onClick={() => onIssueSelect(issue)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{issue.type}</Badge>
                  <span className="font-medium">{issue.id}</span>
                  <Badge className={getPriorityColor(issue.priority)}>{issue.priority}</Badge>
                </div>
                <Badge className={getStatusColor(issue.status)}>{issue.status}</Badge>
              </div>
              <div className="text-sm font-medium text-gray-900 mb-2">{issue.title}</div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Assignee: {issue.assignee}</span>
                <span>Subtasks: {issue.completedSubtasks}/{issue.subtasks}</span>
              </div>
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Subtask Progress</span>
                  <span>{Math.round((issue.completedSubtasks / issue.subtasks) * 100)}%</span>
                </div>
                <Progress value={(issue.completedSubtasks / issue.subtasks) * 100} className="h-2" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
