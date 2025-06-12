
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SLAListTable } from "@/components/sla/SLAListTable";
import { SLASummaryCards } from "@/components/sla/SLASummaryCards";
import { Search, Filter, Calendar as CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const SLAList = () => {
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [searchValue, setSearchValue] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deadlineFrom, setDeadlineFrom] = useState<Date | undefined>();
  const [deadlineTo, setDeadlineTo] = useState<Date | undefined>();
  const [showSearchSuggestions, setShowSearchSuggestions] = useState<boolean>(false);

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

  // Search suggestions based on input
  const getSearchSuggestions = () => {
    const suggestions = [];
    
    if (searchValue.toLowerCase().includes('id:') || searchValue.toLowerCase().includes('sla-')) {
      // Show SLA ID suggestions
      slaData.forEach(sla => {
        if (sla.id.toLowerCase().includes(searchValue.toLowerCase().replace('id:', ''))) {
          suggestions.push({ type: 'id', value: sla.id, label: `SLA ID: ${sla.id}` });
        }
      });
    } else if (searchValue.toLowerCase().includes('title:')) {
      // Show title suggestions
      slaData.forEach(sla => {
        if (sla.title.toLowerCase().includes(searchValue.toLowerCase().replace('title:', ''))) {
          suggestions.push({ type: 'title', value: sla.title, label: `Title: ${sla.title}` });
        }
      });
    } else if (searchValue) {
      // Show field suggestions when user starts typing
      suggestions.push(
        { type: 'field', value: `id:${searchValue}`, label: `Search SLA ID for "${searchValue}"` },
        { type: 'field', value: `title:${searchValue}`, label: `Search Title for "${searchValue}"` }
      );
    }
    
    return suggestions.slice(0, 5);
  };

  // Parse search value to extract field and term
  const parseSearchValue = (value: string) => {
    if (value.includes('id:')) {
      return { field: 'id', term: value.replace('id:', '').trim() };
    } else if (value.includes('title:')) {
      return { field: 'title', term: value.replace('title:', '').trim() };
    }
    return { field: 'all', term: value };
  };

  // Filter logic
  const filteredSLAs = slaData.filter(sla => {
    // Project filter
    const matchesProject = selectedProject === 'all' || sla.projectId === selectedProject;
    
    // Search filter
    let matchesSearch = true;
    if (searchValue) {
      const { field, term } = parseSearchValue(searchValue);
      if (field === 'id') {
        matchesSearch = sla.id.toLowerCase().includes(term.toLowerCase());
      } else if (field === 'title') {
        matchesSearch = sla.title.toLowerCase().includes(term.toLowerCase());
      } else {
        matchesSearch = sla.id.toLowerCase().includes(term.toLowerCase()) ||
                      sla.title.toLowerCase().includes(term.toLowerCase());
      }
    }
    
    // Priority filter
    const matchesPriority = priorityFilter === 'all' || sla.priority === priorityFilter;
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || sla.status === statusFilter;
    
    // Deadline filter
    let matchesDeadline = true;
    if (deadlineFrom || deadlineTo) {
      const deadlineDate = new Date(sla.deadline);
      if (deadlineFrom && deadlineDate < deadlineFrom) matchesDeadline = false;
      if (deadlineTo && deadlineDate > deadlineTo) matchesDeadline = false;
    }
    
    return matchesProject && matchesSearch && matchesPriority && matchesStatus && matchesDeadline;
  });

  const selectedProjectName = projects.find(p => p.id === selectedProject)?.name || 'All Projects';

  const clearFilters = () => {
    setSearchValue('');
    setPriorityFilter('all');
    setStatusFilter('all');
    setDeadlineFrom(undefined);
    setDeadlineTo(undefined);
  };

  const hasActiveFilters = searchValue || priorityFilter !== 'all' || statusFilter !== 'all' || deadlineFrom || deadlineTo;

  const handleSearchSuggestionClick = (suggestion: any) => {
    setSearchValue(suggestion.value);
    setShowSearchSuggestions(false);
  };

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
            {/* Search and Filter Bar */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 flex-1">
                    {/* AWS-style Search */}
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search SLAs... (try id: or title:)"
                        value={searchValue}
                        onChange={(e) => {
                          setSearchValue(e.target.value);
                          setShowSearchSuggestions(e.target.value.length > 0);
                        }}
                        onFocus={() => setShowSearchSuggestions(searchValue.length > 0)}
                        onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                        className="pl-10"
                      />
                      
                      {/* Search Suggestions */}
                      {showSearchSuggestions && (
                        <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                          {getSearchSuggestions().map((suggestion, index) => (
                            <div
                              key={index}
                              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                              onClick={() => handleSearchSuggestionClick(suggestion)}
                            >
                              {suggestion.label}
                            </div>
                          ))}
                          {getSearchSuggestions().length === 0 && searchValue && (
                            <div className="px-3 py-2 text-sm text-gray-500">
                              No suggestions found
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Filter Dropdown Button */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          Filters
                          {hasActiveFilters && (
                            <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                              {[priorityFilter !== 'all', statusFilter !== 'all', deadlineFrom || deadlineTo].filter(Boolean).length}
                            </Badge>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        
                        {/* Priority Filter */}
                        <div className="px-2 py-2">
                          <label className="text-sm font-medium mb-2 block">Priority</label>
                          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Priority</SelectItem>
                              <SelectItem value="Critical">Critical</SelectItem>
                              <SelectItem value="High">High</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <DropdownMenuSeparator />
                        
                        {/* Status Filter */}
                        <div className="px-2 py-2">
                          <label className="text-sm font-medium mb-2 block">Status</label>
                          <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Status</SelectItem>
                              <SelectItem value="Done">Done</SelectItem>
                              <SelectItem value="In Progress">In Progress</SelectItem>
                              <SelectItem value="Planning">Planning</SelectItem>
                              <SelectItem value="To Do">To Do</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <DropdownMenuSeparator />
                        
                        {/* Deadline Filter */}
                        <div className="px-2 py-2">
                          <label className="text-sm font-medium mb-2 block">Deadline Range</label>
                          <div className="space-y-2">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !deadlineFrom && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {deadlineFrom ? format(deadlineFrom, "MMM dd, yyyy") : "From date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={deadlineFrom}
                                  onSelect={setDeadlineFrom}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !deadlineTo && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {deadlineTo ? format(deadlineTo, "MMM dd, yyyy") : "To date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={deadlineTo}
                                  onSelect={setDeadlineTo}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  {/* Clear Filters */}
                  {hasActiveFilters && (
                    <Button variant="outline" size="sm" onClick={clearFilters}>
                      <X className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>
                
                {/* Active Filters Display */}
                {hasActiveFilters && (
                  <div className="flex items-center gap-2 flex-wrap">
                    {searchValue && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Search: {searchValue}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchValue('')} />
                      </Badge>
                    )}
                    {priorityFilter !== 'all' && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Priority: {priorityFilter}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => setPriorityFilter('all')} />
                      </Badge>
                    )}
                    {statusFilter !== 'all' && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Status: {statusFilter}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => setStatusFilter('all')} />
                      </Badge>
                    )}
                    {(deadlineFrom || deadlineTo) && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Deadline: {deadlineFrom ? format(deadlineFrom, "MMM dd") : "Start"} - {deadlineTo ? format(deadlineTo, "MMM dd") : "End"}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => { setDeadlineFrom(undefined); setDeadlineTo(undefined); }} />
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

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
