
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

interface IssuesTableProps {
  issues: Issue[];
  selectedIssue: Issue | null;
  onIssueSelect: (issue: Issue) => void;
  getStatusColor: (status: string) => string;
}

export const IssuesTable = ({ issues, selectedIssue, onIssueSelect, getStatusColor }: IssuesTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Issues List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Issue</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assignee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issues.map((issue) => (
              <TableRow 
                key={issue.id} 
                className={`cursor-pointer hover:bg-gray-50 ${selectedIssue?.id === issue.id ? 'bg-blue-50' : ''}`}
                onClick={() => onIssueSelect(issue)}
              >
                <TableCell>
                  <div>
                    <div className="font-medium">{issue.id}</div>
                    <div className="text-sm text-gray-600">{issue.title}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{issue.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(issue.status)}>
                    {issue.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{issue.assignee}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
