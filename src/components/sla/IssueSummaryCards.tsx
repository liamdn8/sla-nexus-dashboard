
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Bug, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface Issue {
  id: string;
  type: string;
  status: string;
}

interface IssueSummaryCardsProps {
  allIssues: Issue[];
}

export const IssueSummaryCards = ({ allIssues }: IssueSummaryCardsProps) => {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Compact Bugs Summary Card */}
      <Card className="border-red-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-red-100 rounded">
                <Bug className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <div className="text-sm font-bold text-red-800">Bugs</div>
              </div>
            </div>
            <div className="text-xl font-bold text-red-700">{summary.totalBugs}</div>
          </div>
          <div className="flex justify-between text-xs space-x-2">
            <div className="flex items-center space-x-1 text-green-600">
              <CheckCircle className="h-3 w-3" />
              <span>{summary.doneBugs}</span>
            </div>
            <div className="flex items-center space-x-1 text-blue-600">
              <Clock className="h-3 w-3" />
              <span>{summary.inProgressBugs}</span>
            </div>
            <div className="flex items-center space-x-1 text-orange-600">
              <AlertCircle className="h-3 w-3" />
              <span>{summary.todoBugs}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compact Other Issues Summary Card */}
      <Card className="border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-blue-100 rounded">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-bold text-blue-800">Other Issues</div>
              </div>
            </div>
            <div className="text-xl font-bold text-blue-700">{summary.totalOtherIssues}</div>
          </div>
          <div className="flex justify-between text-xs space-x-2">
            <div className="flex items-center space-x-1 text-green-600">
              <CheckCircle className="h-3 w-3" />
              <span>{summary.doneOtherIssues}</span>
            </div>
            <div className="flex items-center space-x-1 text-blue-600">
              <Clock className="h-3 w-3" />
              <span>{summary.inProgressOtherIssues}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <AlertCircle className="h-3 w-3" />
              <span>{summary.todoOtherIssues}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
