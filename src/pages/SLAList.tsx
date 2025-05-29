
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SLAListTable } from "@/components/sla/SLAListTable";
import { SLASummaryCards } from "@/components/sla/SLASummaryCards";

const SLAList = () => {
  const [selectedProject, setSelectedProject] = useState<string>('all');

  const projects = [
    { id: 'all', name: 'All Projects' },
    { id: 'project-1', name: 'E-commerce Platform' },
    { id: 'project-2', name: 'Mobile Banking App' },
    { id: 'project-3', name: 'Healthcare Portal' },
    { id: 'project-4', name: 'Learning Management System' }
  ];

  const slaData = [
    {
      id: 'SLA-001',
      title: 'User Authentication System',
      project: 'E-commerce Platform',
      projectId: 'project-1',
      priority: 'High',
      status: 'In Progress',
      startDate: '2024-01-15',
      deadline: '2024-06-15',
      progress: 78,
      totalStories: 8,
      completedStories: 6,
      totalTasks: 12,
      completedTasks: 9,
      assignedTeam: 'Frontend Team',
      estimatedHours: 120,
      actualHours: 95
    },
    {
      id: 'SLA-002',
      title: 'Payment Integration',
      project: 'E-commerce Platform',
      projectId: 'project-1',
      priority: 'High',
      status: 'Planning',
      startDate: '2024-02-01',
      deadline: '2024-07-01',
      progress: 25,
      totalStories: 6,
      completedStories: 1,
      totalTasks: 8,
      completedTasks: 2,
      assignedTeam: 'Backend Team',
      estimatedHours: 80,
      actualHours: 20
    },
    {
      id: 'SLA-003',
      title: 'Mobile Security Features',
      project: 'Mobile Banking App',
      projectId: 'project-2',
      priority: 'Critical',
      status: 'In Progress',
      startDate: '2024-01-10',
      deadline: '2024-05-30',
      progress: 92,
      totalStories: 10,
      completedStories: 9,
      totalTasks: 15,
      completedTasks: 14,
      assignedTeam: 'Security Team',
      estimatedHours: 200,
      actualHours: 185
    },
    {
      id: 'SLA-004',
      title: 'Patient Portal',
      project: 'Healthcare Portal',
      projectId: 'project-3',
      priority: 'Medium',
      status: 'Done',
      startDate: '2023-11-01',
      deadline: '2024-03-15',
      progress: 100,
      totalStories: 12,
      completedStories: 12,
      totalTasks: 18,
      completedTasks: 18,
      assignedTeam: 'Full Stack Team',
      estimatedHours: 160,
      actualHours: 155
    },
    {
      id: 'SLA-005',
      title: 'Course Management',
      project: 'Learning Management System',
      projectId: 'project-4',
      priority: 'Medium',
      status: 'To Do',
      startDate: '2024-03-01',
      deadline: '2024-08-15',
      progress: 5,
      totalStories: 15,
      completedStories: 0,
      totalTasks: 22,
      completedTasks: 1,
      assignedTeam: 'Education Team',
      estimatedHours: 180,
      actualHours: 8
    }
  ];

  const filteredSLAs = selectedProject === 'all' 
    ? slaData 
    : slaData.filter(sla => sla.projectId === selectedProject);

  const selectedProjectName = projects.find(p => p.id === selectedProject)?.name || 'All Projects';

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-white">
          <div className="bg-white border-b border-gray-200 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">SLA Management</h1>
                <p className="text-gray-600 mt-1">View and manage Service Level Agreements across projects</p>
              </div>
              <div className="flex items-center space-x-4">
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Badge variant="outline" className="text-blue-600">
                  {filteredSLAs.length} SLAs
                </Badge>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-8 py-6 space-y-8">
            {/* Summary Cards */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                SLA Summary - {selectedProjectName}
              </h2>
              <SLASummaryCards slaData={filteredSLAs} />
            </section>

            {/* SLA List Table */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">SLA List</h2>
              <SLAListTable slaData={filteredSLAs} />
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SLAList;
