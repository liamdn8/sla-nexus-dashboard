
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

interface SearchTag {
  field: string;
  value: string;
  label: string;
}

const SLAList = () => {
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchTags, setSearchTags] = useState<SearchTag[]>([]);
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

  // Get search field suggestions
  const getSearchSuggestions = () => {
    const suggestions = [];
    const inputLower = searchInput.toLowerCase();
    
    if (!searchInput) {
      return [
        { type: 'field', field: 'SLA ID', value: 'SLA ID:', label: 'SLA ID' },
        { type: 'field', field: 'SLA Title', value: 'SLA Title:', label: 'SLA Title' }
      ];
    }

    // Check if user is typing a field name
    if (inputLower.includes(':')) {
      const [fieldPart, valuePart] = searchInput.split(':');
      const field = fieldPart.trim();
      const value = valuePart.trim();
      
      if (field.toLowerCase() === 'sla id' && value) {
        slaData.forEach(sla => {
          if (sla.id.toLowerCase().includes(value.toLowerCase())) {
            suggestions.push({ 
              type: 'value', 
              field: 'SLA ID', 
              value: `SLA ID:${sla.id}`, 
              label: `SLA ID: ${sla.id}`,
              operator: '='
            });
          }
        });
      } else if (field.toLowerCase() === 'sla title' && value) {
        slaData.forEach(sla => {
          if (sla.title.toLowerCase().includes(value.toLowerCase())) {
            suggestions.push({ 
              type: 'value', 
              field: 'SLA Title', 
              value: `SLA Title:${sla.title}`, 
              label: `SLA Title: ${sla.title}`,
              operator: ':'
            });
          }
        });
      }
    } else {
      // Show field suggestions
      if ('sla id'.includes(inputLower) || 'id'.includes(inputLower)) {
        suggestions.push({ type: 'field', field: 'SLA ID', value: 'SLA ID:', label: 'SLA ID' });
      }
      if ('sla title'.includes(inputLower) || 'title'.includes(inputLower)) {
        suggestions.push({ type: 'field', field: 'SLA Title', value: 'SLA Title:', label: 'SLA Title' });
      }
    }
    
    return suggestions.slice(0, 8);
  };

  // Handle search suggestion selection
  const handleSearchSuggestionClick = (suggestion: any) => {
    if (suggestion.type === 'field') {
      setSearchInput(suggestion.value);
    } else if (suggestion.type === 'value') {
      // Create a search tag
      const [field, value] = suggestion.value.split(':');
      const newTag: SearchTag = {
        field: field.trim(),
        value: value.trim(),
        label: `${field.trim()}: ${value.trim()}`
      };
      
      // Check if tag already exists
      const tagExists = searchTags.some(tag => 
        tag.field === newTag.field && tag.value === newTag.value
      );
      
      if (!tagExists) {
        setSearchTags([...searchTags, newTag]);
      }
      
      setSearchInput('');
      setShowSearchSuggestions(false);
    }
  };

  // Remove search tag
  const removeSearchTag = (indexToRemove: number) => {
    setSearchTags(searchTags.filter((_, index) => index !== indexToRemove));
  };

  // Filter logic
  const filteredSLAs = slaData.filter(sla => {
    // Project filter
    const matchesProject = selectedProject === 'all' || sla.projectId === selectedProject;
    
    // Search tags filter
    let matchesSearchTags = true;
    if (searchTags.length > 0) {
      matchesSearchTags = searchTags.every(tag => {
        if (tag.field === 'SLA ID') {
          return sla.id.toLowerCase().includes(tag.value.toLowerCase());
        } else if (tag.field === 'SLA Title') {
          return sla.title.toLowerCase().includes(tag.value.toLowerCase());
        }
        return true;
      });
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
    
    return matchesProject && matchesSearchTags && matchesPriority && matchesStatus && matchesDeadline;
  });

  const selectedProjectName = projects.find(p => p.id === selectedProject)?.name || 'All Projects';

  const clearAllFilters = () => {
    setSearchInput('');
    setSearchTags([]);
    setPriorityFilter('all');
    setStatusFilter('all');
    setDeadlineFrom(undefined);
    setDeadlineTo(undefined);
  };

  const hasActiveFilters = searchTags.length > 0 || priorityFilter !== 'all' || statusFilter !== 'all' || deadlineFrom || deadlineTo;

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchInput.includes(':')) {
      const [field, value] = searchInput.split(':');
      if (field.trim() && value.trim()) {
        const newTag: SearchTag = {
          field: field.trim(),
          value: value.trim(),
          label: `${field.trim()}: ${value.trim()}`
        };
        
        const tagExists = searchTags.some(tag => 
          tag.field === newTag.field && tag.value === newTag.value
        );
        
        if (!tagExists) {
          setSearchTags([...searchTags, newTag]);
        }
        
        setSearchInput('');
        setShowSearchSuggestions(false);
      }
    }
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
                    <div className="relative flex-1 max-w-2xl">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Find SLA by attribute or tag (case-sensitive)"
                        value={searchInput}
                        onChange={(e) => {
                          setSearchInput(e.target.value);
                          setShowSearchSuggestions(e.target.value.length > 0 || e.target.value === '');
                        }}
                        onFocus={() => setShowSearchSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                        onKeyPress={handleKeyPress}
                        className="pl-10 pr-4"
                      />
                      
                      {/* Search Suggestions Dropdown */}
                      {showSearchSuggestions && (
                        <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-80 overflow-y-auto">
                          <div className="p-2">
                            <div className="text-xs text-gray-500 mb-2">Search by</div>
                            {getSearchSuggestions().map((suggestion, index) => (
                              <div
                                key={index}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm rounded"
                                onClick={() => handleSearchSuggestionClick(suggestion)}
                              >
                                <div className="font-medium">{suggestion.label}</div>
                                {suggestion.type === 'value' && (
                                  <div className="text-xs text-gray-500">
                                    {suggestion.field} {suggestion.operator} {suggestion.value.split(':')[1]}
                                  </div>
                                )}
                              </div>
                            ))}
                            {getSearchSuggestions().length === 0 && searchInput && (
                              <div className="px-3 py-2 text-sm text-gray-500">
                                No suggestions found
                              </div>
                            )}
                          </div>
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
                    <Button variant="outline" size="sm" onClick={clearAllFilters}>
                      Clear filters
                    </Button>
                  )}
                </div>
                
                {/* Active Search Tags and Filters Display */}
                {(searchTags.length > 0 || hasActiveFilters) && (
                  <div className="flex items-center gap-2 flex-wrap">
                    {searchTags.map((tag, index) => (
                      <Badge key={index} variant="default" className="flex items-center gap-1 bg-blue-100 text-blue-800 border-blue-200">
                        {tag.label}
                        <X 
                          className="h-3 w-3 cursor-pointer hover:bg-blue-200 rounded" 
                          onClick={() => removeSearchTag(index)} 
                        />
                      </Badge>
                    ))}
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
