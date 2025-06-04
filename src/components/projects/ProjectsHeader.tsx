
import React from 'react';
import { FolderOpen } from "lucide-react";

export const ProjectsHeader = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FolderOpen className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600 mt-1">Manage and overview all your projects</p>
          </div>
        </div>
      </div>
    </div>
  );
};
