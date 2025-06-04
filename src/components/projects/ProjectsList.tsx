
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Project {
  id: string;
  name: string;
  key: string;
  admin: string;
  description: string;
  status: 'active' | 'inactive' | 'maintenance';
  totalSLAs: number;
  totalApplications: number;
  lastActivity: string;
}

// Mock data for projects
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-Commerce Platform',
    key: 'ECP',
    admin: 'John Smith',
    description: 'Complete e-commerce solution with mobile and web applications',
    status: 'active',
    totalSLAs: 8,
    totalApplications: 12,
    lastActivity: '2 hours ago'
  },
  {
    id: '2',
    name: 'Customer Portal',
    key: 'CTP',
    admin: 'Sarah Johnson',
    description: 'Self-service customer portal for account management',
    status: 'active',
    totalSLAs: 5,
    totalApplications: 7,
    lastActivity: '1 day ago'
  },
  {
    id: '3',
    name: 'Analytics Dashboard',
    key: 'ADB',
    admin: 'Mike Wilson',
    description: 'Real-time analytics and reporting dashboard',
    status: 'maintenance',
    totalSLAs: 3,
    totalApplications: 4,
    lastActivity: '3 hours ago'
  },
  {
    id: '4',
    name: 'Mobile Banking App',
    key: 'MBA',
    admin: 'Lisa Chen',
    description: 'Secure mobile banking application with biometric authentication',
    status: 'active',
    totalSLAs: 12,
    totalApplications: 8,
    lastActivity: '30 minutes ago'
  },
  {
    id: '5',
    name: 'Inventory Management',
    key: 'IMS',
    admin: 'David Brown',
    description: 'Comprehensive inventory tracking and management system',
    status: 'active',
    totalSLAs: 6,
    totalApplications: 9,
    lastActivity: '5 hours ago'
  },
  {
    id: '6',
    name: 'HR Management System',
    key: 'HMS',
    admin: 'Emily Davis',
    description: 'Employee management and HR processes automation',
    status: 'inactive',
    totalSLAs: 4,
    totalApplications: 6,
    lastActivity: '2 days ago'
  }
];

interface ProjectsListProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
}

export const ProjectsList = ({ 
  searchTerm, 
  setSearchTerm, 
  currentPage, 
  setCurrentPage, 
  itemsPerPage 
}: ProjectsListProps) => {
  // Filter projects based on search term
  const filteredProjects = mockProjects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search projects by name or key..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            className="pl-10"
          />
        </div>
        <Button className="ml-4">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Results Info */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>
          Showing {startIndex + 1} to {Math.min(endIndex, filteredProjects.length)} of {filteredProjects.length} projects
        </span>
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* No Results */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  className={currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};
