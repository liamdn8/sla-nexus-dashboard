
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface SummaryStatsProps {
  summary: {
    totalIssues: number;
    doneIssues: number;
    inProgressIssues: number;
    todoIssues: number;
    totalWorklog: number;
  };
}

export const SummaryStats = ({ summary }: SummaryStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-blue-600">{summary.totalIssues}</div>
          <p className="text-sm text-gray-600">Total Issues</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-green-600">{summary.doneIssues}</div>
          <p className="text-sm text-gray-600">Completed</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-orange-600">{summary.inProgressIssues}</div>
          <p className="text-sm text-gray-600">In Progress</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-gray-600">{summary.todoIssues}</div>
          <p className="text-sm text-gray-600">To Do</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-purple-600">{summary.totalWorklog}h</div>
          <p className="text-sm text-gray-600">Total Worklog</p>
        </CardContent>
      </Card>
    </div>
  );
};
