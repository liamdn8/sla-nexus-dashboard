
import React from 'react';
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

interface IssuesManagementContainerProps {
  allIssues: Issue[];
  selectedIssue: Issue | null;
  onIssueSelect: (issue: Issue) => void;
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const IssuesManagementContainer = ({
  allIssues,
  selectedIssue,
  onIssueSelect,
  getStatusColor,
  getPriorityColor,
  currentPage,
  totalPages,
  onPageChange
}: IssuesManagementContainerProps) => {
  return (
    <div id="issues-management">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Issues Management</h1>
      
      {/* Issues Table with Two Columns - Fixed Height */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-2 h-[500px]">
          {/* Left Column: Issues List - Fixed for 5 issues */}
          <div className="border-r border-gray-200 flex flex-col">
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
          </div>

          {/* Right Column: Issue Details - Scrollable content */}
          <div className="bg-gray-50 flex flex-col">
            <IssueDetails 
              selectedIssue={selectedIssue}
              getStatusColor={getStatusColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
