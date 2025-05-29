import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
                <AlertCircle className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Pending</span>
              </div>
              <span className="text-lg font-bold text-gray-700">{summary.todoOtherIssues}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
