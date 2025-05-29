
import React from 'react';
import { IssueSummaryCards } from "./IssueSummaryCards";
import { IssuesList } from "./IssuesList";
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
  return (
    <div id="issues-management">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Issues Management</h1>
      
      {/* Summary Cards */}
      <IssueSummaryCards allIssues={allIssues} />

      {/* Issues List and Details in parallel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issues List */}
        <IssuesList
          allIssues={allIssues}
          selectedIssue={selectedIssue}
          onIssueSelect={onIssueSelect}
          getStatusColor={getStatusColor}
          getPriorityColor={getPriorityColor}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />

        {/* Issue Details */}
        <IssueDetails 
          selectedIssue={selectedIssue}
          getStatusColor={getStatusColor}
        />
      </div>
    </div>
  );
};
