import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Bug, FileText, ListTodo, Filter, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { IssueDetails } from "./IssueDetails";

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

interface IssuesManagementProps {
  allIssues: Issue[];
  selectedIssue: Issue | null;
  onIssueSelect: (issue: Issue) => void;
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const IssuesManagement = ({
  allIssues,
  selectedIssue,
  onIssueSelect,
  getStatusColor,
  getPriorityColor,
  currentPage,
  totalPages,
  onPageChange
}: IssuesManagementProps) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const bugs = allIssues.filter(issue => issue.type === 'Bug');
  const otherIssues = allIssues.filter(issue => issue.type !== 'Bug');

  const summary = {
    totalBugs: bugs.length,
    doneBugs: bugs.filter(bug => bug.status === 'Done').length,
    inProgressBugs: bugs.filter(bug => bug.status === 'In Progress').length,
    todoBugs: bugs.filter(bug => bug.status === 'To Do').length,
    totalOtherIssues: otherIssues.length,
    doneOtherIssues: otherIssues.filter(issue => issue.status === 'Done').length,
    inProgressOtherIssues: otherIssues.filter(issue => issue.status === 'In Progress').length,
    todoOtherIssues: otherIssues.filter(issue => issue.status === 'To Do').length,
  };

  // Filter issues based on selected filters
  const filteredIssues = allIssues.filter(issue => {
    const statusMatch = statusFilter === 'all' || issue.status === statusFilter;
    const typeMatch = typeFilter === 'all' || issue.type === typeFilter;
    return statusMatch && typeMatch;
  });

  const itemsPerPage = 5;
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
    <div id="issues-management">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Issues Management</h1>
      
      {/* Enhanced Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Bugs Summary Card */}
        <Card className="border-red-200 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 border-b border-red-200">
            <CardTitle className="flex items-center justify-between text-red-800">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-200 rounded-lg">
                  <Bug className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <div className="text-lg font-bold">Bugs</div>
                  <div className="text-sm text-red-600 font-normal">Critical Issues</div>
                </div>
              </div>
              <div className="text-3xl font-bold text-red-700">{summary.totalBugs}</div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Fixed</span>
                </div>
                <span className="text-lg font-bold text-green-700">{summary.doneBugs}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">In Progress</span>
                </div>
                <span className="text-lg font-bold text-blue-700">{summary.inProgressBugs}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-700">Open</span>
                </div>
                <span className="text-lg font-bold text-orange-700">{summary.todoBugs}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Other Issues Summary Card */}
        <Card className="border-blue-200 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
            <CardTitle className="flex items-center justify-between text-blue-800">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-200 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-lg font-bold">Other Issues</div>
                  <div className="text-sm text-blue-600 font-normal">Stories & Tasks</div>
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-700">{summary.totalOtherIssues}</div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Completed</span>
                </div>
                <span className="text-lg font-bold text-green-700">{summary.doneOtherIssues}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">In Progress</span>
                </div>
                <span className="text-lg font-bold text-blue-700">{summary.inProgressOtherIssues}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-2">
                  <ListTodo className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Pending</span>
                </div>
                <span className="text-lg font-bold text-gray-700">{summary.todoOtherIssues}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Issues List and Details in parallel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issues List */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Issues List</CardTitle>
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
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {paginatedIssues.map((issue) => (
                <div
                  key={issue.id}
                  className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedIssue?.id === issue.id ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
                  }`}
                  onClick={() => onIssueSelect(issue)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(issue.type)}
                      <span className="font-medium text-sm">{issue.id}</span>
                      <Badge className={getPriorityColor(issue.priority)} variant="outline">
                        {issue.priority.charAt(0)}
                      </Badge>
                    </div>
                    <Badge className={getStatusColor(issue.status)} variant="outline">
                      {issue.status}
                    </Badge>
                  </div>
                  <div className="text-sm font-medium text-gray-900 mb-2 line-clamp-1">
                    {issue.title}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                    <span>{issue.assignee}</span>
                    <span>{issue.completedSubtasks}/{issue.subtasks}</span>
                  </div>
                  <Progress value={(issue.completedSubtasks / issue.subtasks) * 100} className="h-1" />
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
                Page {currentPage} of {totalFilteredPages}
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
          </CardContent>
        </Card>

        {/* Issue Details */}
        <IssueDetails 
          selectedIssue={selectedIssue}
          getStatusColor={getStatusColor}
        />
      </div>
    </div>
  );
};
