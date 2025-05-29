
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bug, FileText, ListTodo, Filter } from "lucide-react";

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

interface IssuesListProps {
  allIssues: Issue[];
  selectedIssue: Issue | null;
  onIssueSelect: (issue: Issue) => void;
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const IssuesList = ({
  allIssues,
  selectedIssue,
  onIssueSelect,
  getStatusColor,
  getPriorityColor,
  currentPage,
  totalPages,
  onPageChange
}: IssuesListProps) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Filter issues based on selected filters
  const filteredIssues = allIssues.filter(issue => {
    const statusMatch = statusFilter === 'all' || issue.status === statusFilter;
    const typeMatch = typeFilter === 'all' || issue.type === typeFilter;
    return statusMatch && typeMatch;
  });

  const itemsPerPage = 5; // Fixed to 5 issues per page
  const totalFilteredPages = Math.ceil(filteredIssues.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedIssues = filteredIssues.slice(startIndex, startIndex + itemsPerPage);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Bug': return <Bug className="h-4 w-4 text-red-500" />;
      case 'Story': return <FileText className="h-4 w-4 text-blue-500" />;
      case 'Task': return <ListTodo className="h-4 w-4 text-green-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Fixed Header with Filters */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Issues List</h3>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-24 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
                <SelectItem value="In Progress">Active</SelectItem>
                <SelectItem value="To Do">To Do</SelectItem>
                <SelectItem value="Planning">Planning</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-20 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Bug">Bug</SelectItem>
                <SelectItem value="Story">Story</SelectItem>
                <SelectItem value="Task">Task</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="text-xs text-gray-600">
          {filteredIssues.length} issues
        </div>
      </div>
      
      {/* Table Content - Fixed height for 5 rows */}
      <div className="flex-1 min-h-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Type</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead className="w-24">Status</TableHead>
              <TableHead className="w-32">Progress</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedIssues.map((issue) => (
              <TableRow
                key={issue.id}
                className={`cursor-pointer h-16 ${
                  selectedIssue?.id === issue.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => onIssueSelect(issue)}
              >
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(issue.type)}
                    <Badge className={getPriorityColor(issue.priority)} variant="outline">
                      {issue.priority.charAt(0)}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium text-sm">{issue.id}</div>
                    <div className="text-sm text-gray-600 truncate max-w-48">{issue.title}</div>
                    <div className="text-xs text-gray-500">{issue.assignee}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(issue.status)} variant="outline">
                    {issue.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-600">
                      {issue.completedSubtasks}/{issue.subtasks}
                    </div>
                    <Progress value={(issue.completedSubtasks / issue.subtasks) * 100} className="h-1" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {/* Fill empty rows to maintain consistent height */}
            {Array.from({ length: Math.max(0, 5 - paginatedIssues.length) }).map((_, index) => (
              <TableRow key={`empty-${index}`} className="h-16">
                <TableCell colSpan={4}></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Fixed Pagination Footer */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            {currentPage} of {totalFilteredPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(Math.min(totalFilteredPages, currentPage + 1))}
            disabled={currentPage === totalFilteredPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
