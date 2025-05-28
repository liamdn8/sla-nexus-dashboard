
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Issue {
  id: string;
  type: string;
  title: string;
  status: string;
  assignee: string;
  estimate: string;
  worklog: string;
  subtasks: number;
  epic: string;
  epicId: string;
}

interface IssueDetailsProps {
  selectedIssue: Issue | null;
  getStatusColor: (status: string) => string;
}

export const IssueDetails = ({ selectedIssue, getStatusColor }: IssueDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Issue Details</CardTitle>
      </CardHeader>
      <CardContent>
        {selectedIssue ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{selectedIssue.title}</h3>
              <p className="text-sm text-gray-600">{selectedIssue.id} • {selectedIssue.epic}</p>
            </div>

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
                <label className="text-sm font-medium text-gray-700">Assignee</label>
                <p className="mt-1 text-sm">{selectedIssue.assignee}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Sub-tasks</label>
                <p className="mt-1 text-sm">{selectedIssue.subtasks} sub-tasks</p>
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
              <label className="text-sm font-medium text-gray-700">Sub-tasks</label>
              <div className="mt-2 space-y-2">
                {Array.from({ length: selectedIssue.subtasks }, (_, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">Sub-task {i + 1}</span>
                    <Badge variant="outline" className="text-xs">
                      {i < selectedIssue.subtasks - 1 ? "Done" : "In Progress"}
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
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p>Select an issue from the table to view details</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
