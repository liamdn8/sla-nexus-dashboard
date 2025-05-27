
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export const SLAReportBoard = () => {
  const [selectedIssue, setSelectedIssue] = useState<any>(null);

  const slaEpics = [
    {
      id: "EPIC-001",
      title: "User Authentication System",
      status: "In Progress",
      stories: 8,
      tasks: 6,
      subtasks: 12,
      resolved: 11,
      estimation: "5 days",
      worklog: "32h",
      bugs: 2,
      priority: "High",
      slaDeadline: "2024-06-15",
      issues: [
        { id: "AUTH-101", type: "Story", title: "Login Page Design", status: "Done", assignee: "John Doe", estimate: "4h", worklog: "4h", subtasks: 2 },
        { id: "AUTH-102", type: "Task", title: "OAuth Integration", status: "In Progress", assignee: "Jane Smith", estimate: "8h", worklog: "5h", subtasks: 1 },
        { id: "AUTH-103", type: "Story", title: "Password Reset Flow", status: "To Do", assignee: "Bob Wilson", estimate: "6h", worklog: "0h", subtasks: 3 }
      ]
    },
    {
      id: "EPIC-002", 
      title: "Payment Integration",
      status: "Planning",
      stories: 6,
      tasks: 4,
      subtasks: 8,
      resolved: 0,
      estimation: "8 days",
      worklog: "0h",
      bugs: 0,
      priority: "Medium",
      slaDeadline: "2024-07-01",
      issues: [
        { id: "PAY-201", type: "Story", title: "Stripe Integration", status: "To Do", assignee: "Alice Brown", estimate: "12h", worklog: "0h", subtasks: 2 },
        { id: "PAY-202", type: "Task", title: "Payment Form UI", status: "To Do", assignee: "Charlie Davis", estimate: "6h", worklog: "0h", subtasks: 1 }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "To Do": return "bg-gray-100 text-gray-800";
      case "Planning": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const allIssues = slaEpics.flatMap(epic => 
    epic.issues.map(issue => ({ ...issue, epic: epic.title, epicId: epic.id }))
  );

  const summary = {
    totalIssues: allIssues.length,
    doneIssues: allIssues.filter(i => i.status === "Done").length,
    inProgressIssues: allIssues.filter(i => i.status === "In Progress").length,
    todoIssues: allIssues.filter(i => i.status === "To Do").length,
    totalEstimate: allIssues.reduce((sum, issue) => sum + parseInt(issue.estimate), 0),
    totalWorklog: allIssues.reduce((sum, issue) => sum + parseInt(issue.worklog), 0)
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">SLA Report Board</h2>
          <div className="flex space-x-2">
            <Badge variant="outline">
              {summary.totalIssues} Total Issues
            </Badge>
            <Badge className="bg-green-100 text-green-800">
              {summary.doneIssues} Done
            </Badge>
          </div>
        </div>

        {/* Summary Statistics */}
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

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Issues Table */}
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
                  {allIssues.map((issue) => (
                    <TableRow 
                      key={issue.id} 
                      className={`cursor-pointer hover:bg-gray-50 ${selectedIssue?.id === issue.id ? 'bg-blue-50' : ''}`}
                      onClick={() => setSelectedIssue(issue)}
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

          {/* Right Side - Issue Details */}
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

                  {/* Sub-tasks Section */}
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
        </div>
      </div>
    </TooltipProvider>
  );
};
