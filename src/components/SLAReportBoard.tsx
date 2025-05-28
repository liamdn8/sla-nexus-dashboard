import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SummaryStats } from "./sla/SummaryStats";
import { IssuesTable } from "./sla/IssuesTable";
import { IssueDetails } from "./sla/IssueDetails";
import { BookmarkNavigation } from "./sla/BookmarkNavigation";

export const SLAReportBoard = () => {
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [activeSection, setActiveSection] = useState('overview');

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

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <TooltipProvider>
      <div className="flex space-x-6">
        {/* Left Sidebar - Bookmark Navigation */}
        <div className="w-64 flex-shrink-0">
          <BookmarkNavigation 
            onNavigate={handleNavigate}
            activeSection={activeSection}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
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
          <section id="summary">
            <SummaryStats summary={summary} />
          </section>

          {/* Issues Management */}
          <section id="issues">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <IssuesTable 
                issues={allIssues}
                selectedIssue={selectedIssue}
                onIssueSelect={setSelectedIssue}
                getStatusColor={getStatusColor}
              />
              <IssueDetails 
                selectedIssue={selectedIssue}
                getStatusColor={getStatusColor}
              />
            </div>
          </section>
        </div>
      </div>
    </TooltipProvider>
  );
};
