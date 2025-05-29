
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Plus, Truck, Play, Pause, Download, Upload } from "lucide-react";

interface ApplicationVersion {
  id: string;
  version: string;
  status: string;
  releaseDate: string;
  environment: string;
}

interface SLAApplicationVersionsProps {
  allApplicationVersions: ApplicationVersion[];
  applicationVersions: ApplicationVersion[];
  appStatusSummary: {
    released: number;
    delivered: number;
    pendingRelease: number;
    inProgress: number;
  };
  selectedApps: string[];
  currentAppPage: number;
  totalAppPages: number;
  getStatusColor: (status: string) => string;
  onAppSelection: (appId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onBulkAction: (action: string) => void;
  onAppAction: (appId: string, action: string) => void;
  onPageChange: (page: number) => void;
}

export const SLAApplicationVersions = ({
  allApplicationVersions,
  applicationVersions,
  appStatusSummary,
  selectedApps,
  currentAppPage,
  totalAppPages,
  getStatusColor,
  onAppSelection,
  onSelectAll,
  onBulkAction,
  onAppAction,
  onPageChange
}: SLAApplicationVersionsProps) => {
  return (
    <TooltipProvider>
      <div id="application-versions">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Application Versions</h1>
          <div className="flex items-center space-x-2">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
            <Button size="sm" variant="outline">
              <Truck className="h-4 w-4 mr-1" />
              Delivery
            </Button>
          </div>
        </div>
        
        {/* App Status Summary */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="text-sm text-green-600 font-medium">Released</div>
            <div className="text-xl font-bold text-green-700">{appStatusSummary.released}</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="text-sm text-blue-600 font-medium">Delivered</div>
            <div className="text-xl font-bold text-blue-700">{appStatusSummary.delivered}</div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="text-sm text-yellow-600 font-medium">Pending Release</div>
            <div className="text-xl font-bold text-yellow-700">{appStatusSummary.pendingRelease}</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <div className="text-sm text-gray-600 font-medium">In Progress</div>
            <div className="text-xl font-bold text-gray-700">{appStatusSummary.inProgress}</div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedApps.length > 0 && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-700">
                {selectedApps.length} application(s) selected
              </span>
              <div className="flex space-x-2">
                <Button size="sm" onClick={() => onBulkAction('deploy')}>
                  <Play className="h-4 w-4 mr-1" />
                  Deploy
                </Button>
                <Button size="sm" variant="outline" onClick={() => onBulkAction('pause')}>
                  <Pause className="h-4 w-4 mr-1" />
                  Pause
                </Button>
                <Button size="sm" variant="outline" onClick={() => onBulkAction('export')}>
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Version History & Development Status</CardTitle>
            <div className="text-sm text-gray-600">
              Page {currentAppPage} of {totalAppPages} ({allApplicationVersions.length} total apps)
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">
                      <Checkbox 
                        checked={selectedApps.length === applicationVersions.length}
                        onCheckedChange={(checked) => onSelectAll(!!checked)}
                      />
                    </th>
                    <th className="text-left p-4">Version</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Release Date</th>
                    <th className="text-left p-4">Environment</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applicationVersions.map((version, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <Checkbox 
                          checked={selectedApps.includes(version.id)}
                          onCheckedChange={(checked) => onAppSelection(version.id, !!checked)}
                        />
                      </td>
                      <td className="p-4 font-medium">{version.version}</td>
                      <td className="p-4">
                        <Badge className={getStatusColor(version.status)}>
                          {version.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{version.releaseDate}</td>
                      <td className="p-4 text-sm text-gray-600">{version.environment}</td>
                      <td className="p-4">
                        <div className="flex space-x-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => onAppAction(version.id, 'propose-release')}
                              >
                                <Upload className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Propose Release</p>
                            </TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => onAppAction(version.id, 'release')}
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Release</p>
                            </TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => onAppAction(version.id, 'delivery')}
                              >
                                <Truck className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delivery</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(Math.max(1, currentAppPage - 1))}
                disabled={currentAppPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentAppPage} of {totalAppPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(Math.min(totalAppPages, currentAppPage + 1))}
                disabled={currentAppPage === totalAppPages}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};
