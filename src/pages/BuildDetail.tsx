
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BuildBookmarkNavigation } from "@/components/builds/BuildBookmarkNavigation";
import { CheckCircle, AlertCircle, XCircle, Bug, Shield, TestTube, Zap } from "lucide-react";

const BuildDetail = () => {
  const { buildId } = useParams();
  const [activeSection, setActiveSection] = useState('overview');

  // Mock build data
  const buildData = {
    id: buildId || '252',
    application: 'product-catalog',
    source: 'GitHub',
    branch: '100M',
    commitId: 'sb7e7e37c9f2a8b1d4e6f8a2c5b7d9e1f3a5b7c9',
    version: '4.5.1.1-SNAPSHOT',
    image: 'product-catalog:4.5.1.1-SNAPSHOT-252',
    status: 'success',
    createdDate: '2025/05/29 09:00:15',
    duration: '12m 34s'
  };

  const sastResults = {
    potentialBugs: 19,
    vulnerabilities: 4,
    securityHotspots: 9,
    codeSmells: 156,
    coverage: 78.5,
    duplications: 2.3
  };

  const testResults = {
    unit: { passed: 156, failed: 2, skipped: 3, coverage: 85.2 },
    functional: { passed: 89, failed: 1, skipped: 0, coverage: 92.1 },
    regression: { passed: 45, failed: 0, skipped: 2, coverage: 95.8 }
  };

  const dependencies = [
    { name: 'spring-boot-starter', type: 'Community', version: '2.7.0', cves: 0, license: 'Apache-2.0' },
    { name: 'jackson-core', type: 'Community', version: '2.13.3', cves: 1, license: 'Apache-2.0' },
    { name: 'product-common', type: 'Internal', version: '1.2.5', cves: 0, license: 'Proprietary' },
    { name: 'hibernate-core', type: 'Community', version: '5.6.9', cves: 2, license: 'LGPL-2.1' },
    { name: 'log4j-core', type: 'Community', version: '2.17.2', cves: 0, license: 'Apache-2.0' }
  ];

  const deliveryStages = [
    { name: 'Development', status: 'completed', date: '2025/05/29 09:15' },
    { name: 'Delivery Test', status: 'completed', date: '2025/05/29 10:30' },
    { name: 'Staging', status: 'in-progress', date: '2025/05/29 11:45' },
    { name: 'Production', status: 'pending', date: '-' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress': return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <div className="h-4 w-4 rounded-full bg-gray-300" />;
    }
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto bg-white">
          <div className="bg-white border-b border-gray-200 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Build Details</h1>
                <p className="text-gray-600 mt-1">Build #{buildData.id} - {buildData.application}</p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(buildData.status)}
                <Badge variant={buildData.status === 'success' ? 'default' : 'destructive'}>
                  {buildData.status}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="flex-1 container mx-auto px-8 py-6 space-y-8">
              {/* Build Overview */}
              <section id="overview">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div>
                        <p className="text-sm text-gray-600">Application</p>
                        <p className="font-semibold">{buildData.application}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Source</p>
                        <p className="font-semibold">{buildData.source}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Branch</p>
                        <p className="font-semibold">{buildData.branch}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Build ID</p>
                        <p className="font-semibold">{buildData.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Version</p>
                        <p className="font-semibold">{buildData.version}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Commit ID</p>
                        <p className="font-semibold font-mono text-sm">{buildData.commitId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Image</p>
                        <p className="font-semibold text-sm">{buildData.image}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-semibold">{buildData.duration}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* SAST Results */}
              <section id="sast-results">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">SAST Results</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Potential Bugs</CardTitle>
                      <Bug className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{sastResults.potentialBugs}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Vulnerabilities</CardTitle>
                      <Shield className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{sastResults.vulnerabilities}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Security Hotspots</CardTitle>
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{sastResults.securityHotspots}</div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Test Results */}
              <section id="test-results">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Test Results</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TestTube className="h-4 w-4" />
                        <span>Unit Tests</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-green-600">Passed: {testResults.unit.passed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-red-600">Failed: {testResults.unit.failed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Skipped: {testResults.unit.skipped}</span>
                        </div>
                        <div className="pt-2 border-t">
                          <span className="text-sm text-gray-600">Coverage: {testResults.unit.coverage}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Zap className="h-4 w-4" />
                        <span>Functional Tests</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-green-600">Passed: {testResults.functional.passed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-red-600">Failed: {testResults.functional.failed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Skipped: {testResults.functional.skipped}</span>
                        </div>
                        <div className="pt-2 border-t">
                          <span className="text-sm text-gray-600">Coverage: {testResults.functional.coverage}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Regression Tests</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-green-600">Passed: {testResults.regression.passed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-red-600">Failed: {testResults.regression.failed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Skipped: {testResults.regression.skipped}</span>
                        </div>
                        <div className="pt-2 border-t">
                          <span className="text-sm text-gray-600">Coverage: {testResults.regression.coverage}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Dependencies */}
              <section id="dependencies">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Dependencies</h2>
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Dependency</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Version</TableHead>
                          <TableHead>License</TableHead>
                          <TableHead>CVEs</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dependencies.map((dep, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{dep.name}</TableCell>
                            <TableCell>
                              <Badge variant={dep.type === 'Internal' ? 'default' : 'outline'}>
                                {dep.type}
                              </Badge>
                            </TableCell>
                            <TableCell>{dep.version}</TableCell>
                            <TableCell>{dep.license}</TableCell>
                            <TableCell>
                              {dep.cves > 0 ? (
                                <Badge variant="destructive">{dep.cves} CVEs</Badge>
                              ) : (
                                <Badge variant="default">Clean</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </section>
            </div>

            {/* Right Sidebar - Navigation & Delivery Stages */}
            <BuildBookmarkNavigation 
              onNavigate={handleNavigate} 
              activeSection={activeSection}
              deliveryStages={deliveryStages}
            />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default BuildDetail;
