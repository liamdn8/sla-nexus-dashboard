
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { CheckCircle, Circle, AlertCircle, Bug, Shield, Target, Zap, Calendar } from "lucide-react";

const BuildHistory = () => {
  const [selectedVersion, setSelectedVersion] = useState('vocs-4.0');

  const versions = [
    { id: 'vocs-4.0', name: 'vocs-4.0' },
    { id: 'vocs-3.9', name: 'vocs-3.9' },
    { id: 'vocs-3.8', name: 'vocs-3.8' }
  ];

  const insightMetrics = [
    { title: "Total", value: "300", icon: Target, color: "text-purple-600", bgColor: "bg-purple-50" },
    { title: "SAST scanned", value: "253", icon: Shield, color: "text-blue-600", bgColor: "bg-blue-50" },
    { title: "Automation tested", value: "0", icon: Zap, color: "text-indigo-600", bgColor: "bg-indigo-50" },
    { title: "Proposed", value: "0", icon: Circle, color: "text-gray-600", bgColor: "bg-gray-50" },
    { title: "Released", value: "0", icon: CheckCircle, color: "text-green-600", bgColor: "bg-green-50" },
    { title: "Build frequency", value: "1.6/day", icon: Calendar, color: "text-orange-600", bgColor: "bg-orange-50" }
  ];

  const buildData = [
    {
      id: 1,
      application: 'product-catalog',
      buildId: '252',
      branch: '100M',
      version: '4.5.1.1-SNAPSHOT',
      commitId: 'sb7e7e37...',
      potentialBug: 19,
      vulnerability: 4,
      securityHotspots: 9,
      regression: 'NA / NA',
      stage: ['success', 'success'],
      createdDate: '2025/05/29 09:0...'
    },
    {
      id: 2,
      application: 'ocsproduct',
      buildId: '1',
      branch: 'fix_hide_pc_and_...',
      version: '4.5.0',
      commitId: '7e2a9cb3...',
      potentialBug: 63,
      vulnerability: 1,
      securityHotspots: 48,
      regression: 'NA / NA',
      stage: ['success', 'success'],
      createdDate: '2025/05/29 09:0...'
    },
    {
      id: 3,
      application: 'k8s-bigip-f5-ctlr',
      buildId: '67',
      branch: 'cross-vim',
      version: '1.0.9',
      commitId: '93176f9d...',
      potentialBug: 5,
      vulnerability: 4,
      securityHotspots: 1,
      regression: 'NA / NA',
      stage: ['success', 'success', 'success'],
      createdDate: '2025/05/28 19:0...'
    },
    {
      id: 4,
      application: 'k8s-bigip-f5-ctlr',
      buildId: '66',
      branch: 'cross-vim',
      version: '1.0.9',
      commitId: '80746478...',
      potentialBug: 'N/A',
      vulnerability: 'N/A',
      securityHotspots: 'N/A',
      regression: 'NA / NA',
      stage: ['loading'],
      createdDate: '2025/05/28 19:0...'
    },
    {
      id: 5,
      application: 'autotestscanapp',
      buildId: '128',
      branch: '100M',
      version: '4.0.2',
      commitId: '59cbfaad...',
      potentialBug: 48,
      vulnerability: 8,
      securityHotspots: 73,
      regression: 'NA / NA',
      stage: ['success', 'success'],
      createdDate: '2025/05/28 18:5...'
    }
  ];

  const getStageIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'loading': return <Circle className="h-4 w-4 text-orange-500" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Circle className="h-4 w-4 text-gray-400" />;
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
                <h1 className="text-3xl font-bold text-gray-900">Build History</h1>
                <p className="text-gray-600 mt-1">Monitor build status and application insights</p>
              </div>
              <div className="flex items-center space-x-4">
                <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select version" />
                  </SelectTrigger>
                  <SelectContent>
                    {versions.map((version) => (
                      <SelectItem key={version.id} value={version.id}>
                        {version.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Badge variant="outline" className="text-purple-600">
                  Last week
                </Badge>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-8 py-6 space-y-8">
            {/* Insight Metrics */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Insight</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                {insightMetrics.map((metric, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">
                        {metric.title}
                      </CardTitle>
                      <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                        <metric.icon className={`h-4 w-4 ${metric.color}`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900">
                        {metric.value}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Builds Table */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Builds ( 10 of 15564 )
                </h2>
              </div>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>Application</TableHead>
                        <TableHead>Build ID</TableHead>
                        <TableHead>Branch</TableHead>
                        <TableHead>Version</TableHead>
                        <TableHead>Commit ID</TableHead>
                        <TableHead>Potential Bug</TableHead>
                        <TableHead>Vulnerability</TableHead>
                        <TableHead>Security Hotspots</TableHead>
                        <TableHead>Regression (P/F)</TableHead>
                        <TableHead>Stage</TableHead>
                        <TableHead>Created Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {buildData.map((build) => (
                        <TableRow key={build.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{build.id}</TableCell>
                          <TableCell className="text-blue-600 font-medium">{build.application}</TableCell>
                          <TableCell className="text-blue-600">{build.buildId}</TableCell>
                          <TableCell>{build.branch}</TableCell>
                          <TableCell>{build.version}</TableCell>
                          <TableCell className="font-mono text-sm">{build.commitId}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Bug className="h-3 w-3" />
                              <span>{build.potentialBug}</span>
                            </div>
                          </TableCell>
                          <TableCell>{build.vulnerability}</TableCell>
                          <TableCell>{build.securityHotspots}</TableCell>
                          <TableCell>{build.regression}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              {build.stage.map((status, index) => (
                                <div key={index}>
                                  {getStageIcon(status)}
                                </div>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-gray-500">{build.createdDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Pagination */}
              <div className="flex items-center justify-center space-x-2 mt-4">
                <span className="text-sm text-gray-500">←</span>
                <span className="text-sm text-gray-500">‹</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-600">1</Badge>
                <span className="text-sm">2</span>
                <span className="text-sm">3</span>
                <span className="text-sm">4</span>
                <span className="text-sm">5</span>
                <span className="text-sm text-gray-500">...</span>
                <span className="text-sm">1557</span>
                <span className="text-sm text-gray-500">›</span>
                <span className="text-sm text-gray-500">→</span>
              </div>
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default BuildHistory;
