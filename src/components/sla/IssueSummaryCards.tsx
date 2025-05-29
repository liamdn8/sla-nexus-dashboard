
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Bugs Summary Card */}
      <Card className="border-red-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-red-100 rounded-lg">
                <Bug className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <div className="text-lg font-bold text-red-800">Bugs</div>
                <div className="text-sm text-red-600">Critical Issues</div>
              </div>
            </div>
            <div className="text-3xl font-bold text-red-700">{summary.totalBugs}</div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mb-1" />
              <span className="text-lg font-bold text-green-700">{summary.doneBugs}</span>
              <span className="text-xs text-green-600">Done</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
              <Clock className="h-5 w-5 text-blue-600 mb-1" />
              <span className="text-lg font-bold text-blue-700">{summary.inProgressBugs}</span>
              <span className="text-xs text-blue-600">In Progress</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-orange-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-orange-600 mb-1" />
              <span className="text-lg font-bold text-orange-700">{summary.todoBugs}</span>
              <span className="text-xs text-orange-600">To Do</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compact Other Issues Summary Card */}
      <Card className="border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-lg font-bold text-blue-800">Other Issues</div>
                <div className="text-sm text-blue-600">Stories & Tasks</div>
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-700">{summary.totalOtherIssues}</div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mb-1" />
              <span className="text-lg font-bold text-green-700">{summary.doneOtherIssues}</span>
              <span className="text-xs text-green-600">Done</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
              <Clock className="h-5 w-5 text-blue-600 mb-1" />
              <span className="text-lg font-bold text-blue-700">{summary.inProgressOtherIssues}</span>
              <span className="text-xs text-blue-600">In Progress</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-gray-600 mb-1" />
              <span className="text-lg font-bold text-gray-700">{summary.todoOtherIssues}</span>
              <span className="text-xs text-gray-600">To Do</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
