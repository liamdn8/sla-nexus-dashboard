
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Filter } from "lucide-react";

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
  priority: string;
}

interface IssueDetailsProps {
  selectedIssue: Issue | null;
  getStatusColor: (status: string) => string;
}

export const IssueDetails = ({ selectedIssue, getStatusColor }: IssueDetailsProps) => {
  if (!selectedIssue) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <p>Select an issue to view details</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">{selectedIssue.title}</h3>
        </div>
        
        <div className="text-xs text-gray-600">
          {selectedIssue.id} • {selectedIssue.epic}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Type</label>
              <div className="mt-1">
                <Badge variant="outline">{selectedIssue.type}</Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <div className="mt-1">
                <Badge className={getStatusColor(selectedIssue.status)}>
                  {selectedIssue.status}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Priority</label>
              <div className="mt-1">
                <Badge variant="outline">{selectedIssue.priority}</Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Assignee</label>
              <p className="mt-1 text-sm">{selectedIssue.assignee}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Original Estimate</label>
              <p className="mt-1 text-sm">{selectedIssue.estimate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Time Logged</label>
              <p className="mt-1 text-sm">{selectedIssue.worklog}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Sub-tasks Progress</label>
            <div className="mt-2">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                <span>{selectedIssue.completedSubtasks} of {selectedIssue.subtasks} completed</span>
                <span>{Math.round((selectedIssue.completedSubtasks / selectedIssue.subtasks) * 100)}%</span>
              </div>
              <Progress value={(selectedIssue.completedSubtasks / selectedIssue.subtasks) * 100} className="h-2" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Sub-tasks</label>
            <div className="mt-2 space-y-2">
              {Array.from({ length: selectedIssue.subtasks }, (_, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-white border rounded">
                  <span className="text-sm">Sub-task {i + 1}</span>
                  <Badge variant="outline" className="text-xs">
                    {i < selectedIssue.completedSubtasks ? "Done" : "In Progress"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t">
            <label className="text-sm font-medium text-gray-700">Epic</label>
            <p className="mt-1 text-sm text-blue-600">{selectedIssue.epicId} - {selectedIssue.epic}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
