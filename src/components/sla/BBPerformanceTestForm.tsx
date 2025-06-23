
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, FileText, Printer, X, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApplicationVersion {
  id: string;
  application: string;
  version: string;
  status: string;
  releaseDate: string;
  environment: string;
}

interface BBPerformanceTestFormProps {
  isOpen: boolean;
  onClose: () => void;
  slaTitle: string;
  slaId: string;
  applicationVersions: ApplicationVersion[];
}

interface CriteriaItem {
  id: string;
  criteria: string;
  details: string;
}

interface ResultCriteriaItem {
  id: string;
  criteria: string;
  details: string;
  evaluationMethod: string;
  result: string;
}

interface ProcessData {
  id: string;
  name: string;
  environmentCriteria: CriteriaItem[];
  performanceCriteria: CriteriaItem[];
  testResults: ResultCriteriaItem[];
}

export const BBPerformanceTestForm = ({ 
  isOpen, 
  onClose, 
  slaTitle, 
  slaId,
  applicationVersions 
}: BBPerformanceTestFormProps) => {
  const { toast } = useToast();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [showCommitmentPopup, setShowCommitmentPopup] = useState(false);
  const [selectedApplications, setSelectedApplications] = useState<ApplicationVersion[]>(applicationVersions);
  const [chairman, setChairman] = useState('');
  const [commitment, setCommitment] = useState('Kết quả test thực hiện trên testbed. VHT cam kết rằng kết quả này tương đương khi chạy trên server hệ thống vOCS với cấu hình tương đương');
  const [processDataList, setProcessDataList] = useState<ProcessData[]>([]);

  const defaultEnvironmentCriteria = [
    { id: 'env-1', criteria: 'Số lượng node ứng dụng', details: '' },
    { id: 'env-2', criteria: 'Số lượng RAM mỗi node', details: '' },
    { id: 'env-3', criteria: 'CPU (Threads)', details: '' },
    { id: 'env-4', criteria: 'Network', details: '' },
  ];

  const defaultPerformanceCriteria = [
    { id: 'perf-1', criteria: 'Số lượng thuê bao test', details: '' },
    { id: 'perf-2', criteria: 'Số lượng tài khoản mỗi thuê bao', details: '' },
    { id: 'perf-3', criteria: 'Tổng dung lượng database', details: '' },
    { id: 'perf-4', criteria: 'TPS', details: '' },
  ];

  useEffect(() => {
    if (selectedApplications.length > 0) {
      const initialProcesses = selectedApplications.map((app, index) => ({
        id: `process-${index}`,
        name: `${app.application} v${app.version}`,
        environmentCriteria: defaultEnvironmentCriteria.map(item => ({ ...item, id: `${app.id}-env-${item.id}` })),
        performanceCriteria: defaultPerformanceCriteria.map(item => ({ ...item, id: `${app.id}-perf-${item.id}` })),
        testResults: [],
      }));
      setProcessDataList(initialProcesses);
    }
  }, [selectedApplications]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleFormChange = () => {
    setHasUnsavedChanges(true);
  };

  const addCriteria = (processId: string, section: 'environment' | 'performance' | 'results') => {
    setProcessDataList(prev => prev.map(process => {
      if (process.id === processId) {
        if (section === 'environment') {
          const newCriteria = { id: `env-${Date.now()}`, criteria: '', details: '' };
          return { ...process, environmentCriteria: [...process.environmentCriteria, newCriteria] };
        } else if (section === 'performance') {
          const newCriteria = { id: `perf-${Date.now()}`, criteria: '', details: '' };
          return { ...process, performanceCriteria: [...process.performanceCriteria, newCriteria] };
        } else {
          const newResult = { id: `result-${Date.now()}`, criteria: '', details: '', evaluationMethod: '', result: '' };
          return { ...process, testResults: [...process.testResults, newResult] };
        }
      }
      return process;
    }));
    handleFormChange();
  };

  const removeCriteria = (processId: string, section: 'environment' | 'performance' | 'results', criteriaId: string) => {
    setProcessDataList(prev => prev.map(process => {
      if (process.id === processId) {
        if (section === 'environment') {
          return { ...process, environmentCriteria: process.environmentCriteria.filter(item => item.id !== criteriaId) };
        } else if (section === 'performance') {
          return { ...process, performanceCriteria: process.performanceCriteria.filter(item => item.id !== criteriaId) };
        } else {
          return { ...process, testResults: process.testResults.filter(item => item.id !== criteriaId) };
        }
      }
      return process;
    }));
    handleFormChange();
  };

  const updateCriteria = (processId: string, section: 'environment' | 'performance' | 'results', criteriaId: string, field: string, value: string) => {
    setProcessDataList(prev => prev.map(process => {
      if (process.id === processId) {
        if (section === 'environment') {
          return {
            ...process,
            environmentCriteria: process.environmentCriteria.map(item =>
              item.id === criteriaId ? { ...item, [field]: value } : item
            )
          };
        } else if (section === 'performance') {
          return {
            ...process,
            performanceCriteria: process.performanceCriteria.map(item =>
              item.id === criteriaId ? { ...item, [field]: value } : item
            )
          };
        } else {
          return {
            ...process,
            testResults: process.testResults.map(item =>
              item.id === criteriaId ? { ...item, [field]: value } : item
            )
          };
        }
      }
      return process;
    }));
    handleFormChange();
  };

  const handleSave = () => {
    const bbTestData = {
      slaId,
      slaTitle,
      chairman,
      commitment,
      processDataList,
      selectedApplications,
      createdAt: new Date().toISOString(),
    };
    
    console.log('Saving BB Performance Test document:', bbTestData);
    setHasUnsavedChanges(false);
    
    if (showCommitmentPopup) {
      setShowCommitmentPopup(true);
    } else {
      toast({
        title: "Document Saved",
        description: "BB Performance Test document has been saved successfully.",
      });
    }
  };

  const handlePrintPreview = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(generatePrintHTML());
      printWindow.document.close();
      printWindow.focus();
    }
  };

  const handleExportPDF = () => {
    toast({
      title: "PDF Export",
      description: "PDF export functionality would be implemented here.",
    });
  };

  const handleClose = () => {
    if (hasUnsavedChanges) {
      setShowExitWarning(true);
    } else {
      onClose();
    }
  };

  const confirmClose = () => {
    setHasUnsavedChanges(false);
    setShowExitWarning(false);
    onClose();
  };

  const generatePrintHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>BB Test Hiệu Năng - ${slaTitle}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.4; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 20px; }
            .title { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .process-section { margin: 30px 0; page-break-inside: avoid; }
            .process-title { font-size: 18px; font-weight: bold; margin-bottom: 15px; }
            .table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            .table th, .table td { border: 1px solid #000; padding: 8px; text-align: left; vertical-align: top; }
            .table th { background-color: #f0f0f0; font-weight: bold; }
            .section-title { font-size: 16px; font-weight: bold; margin: 20px 0 10px 0; }
            .commitment-section { margin-top: 30px; border-top: 1px solid #ccc; padding-top: 20px; }
            .signature-section { margin-top: 40px; display: flex; justify-content: space-between; }
            .signature-box { width: 200px; text-align: center; }
            .signature-line { border-top: 1px solid #000; margin-top: 60px; padding-top: 5px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">BIÊN BẢN TEST HIỆU NĂNG</div>
            <div>SLA: ${slaTitle}</div>
          </div>
          
          ${processDataList.map(process => `
            <div class="process-section">
              <div class="process-title">${process.name}</div>
              
              <div class="section-title">Yêu cầu về môi trường đánh giá:</div>
              <table class="table">
                <thead>
                  <tr><th>Tiêu chí</th><th>Chỉ tiêu chi tiết</th></tr>
                </thead>
                <tbody>
                  ${process.environmentCriteria.map(item => `
                    <tr><td>${item.criteria}</td><td>${item.details}</td></tr>
                  `).join('')}
                </tbody>
              </table>
              
              <div class="section-title">Profile test hiệu năng:</div>
              <table class="table">
                <thead>
                  <tr><th>Tiêu chí</th><th>Chỉ tiêu chi tiết</th></tr>
                </thead>
                <tbody>
                  ${process.performanceCriteria.map(item => `
                    <tr><td>${item.criteria}</td><td>${item.details}</td></tr>
                  `).join('')}
                </tbody>
              </table>
              
              <div class="section-title">Kết quả test:</div>
              <table class="table">
                <thead>
                  <tr><th>Tiêu chí</th><th>Chỉ tiêu chi tiết</th><th>Cách thức thực hiện đánh giá</th><th>Kết quả</th></tr>
                </thead>
                <tbody>
                  ${process.testResults.map(item => `
                    <tr><td>${item.criteria}</td><td>${item.details}</td><td>${item.evaluationMethod}</td><td>${item.result}</td></tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `).join('')}
          
          <div class="commitment-section">
            <div class="section-title">Cam kết:</div>
            <p>${commitment}</p>
          </div>
          
          <div class="signature-section">
            <div class="signature-box">
              <div class="signature-line">Người lập</div>
            </div>
            <div class="signature-box">
              <div class="signature-line">Chủ trì: ${chairman}</div>
            </div>
            <div class="signature-box">
              <div class="signature-line">Người phê duyệt</div>
            </div>
          </div>
        </body>
      </html>
    `;
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>BB Test Hiệu Năng - {slaTitle}</span>
              <div className="flex items-center space-x-2">
                {hasUnsavedChanges && (
                  <Badge variant="outline" className="text-orange-600">
                    Unsaved Changes
                  </Badge>
                )}
                <Button onClick={handleClose} variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cơ bản</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Chủ trì *</label>
                    <Input 
                      value={chairman}
                      onChange={(e) => {
                        setChairman(e.target.value);
                        handleFormChange();
                      }}
                      placeholder="Nhập họ và tên người chủ trì..."
                      maxLength={255}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Mã SLA</label>
                    <Input value={slaId} disabled className="bg-gray-100" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Cam kết</label>
                  <Textarea
                    value={commitment}
                    onChange={(e) => {
                      setCommitment(e.target.value);
                      handleFormChange();
                    }}
                    className="min-h-[100px]"
                    maxLength={1000}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Process Data Tabs */}
            <Card>
              <CardHeader>
                <CardTitle>Danh sách tiến trình test</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={processDataList[0]?.id} className="w-full">
                  <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {processDataList.map((process) => (
                      <TabsTrigger key={process.id} value={process.id}>
                        {process.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {processDataList.map((process) => (
                    <TabsContent key={process.id} value={process.id} className="space-y-6">
                      {/* Environment Requirements */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">Yêu cầu về môi trường đánh giá</h3>
                          <Button
                            onClick={() => addCriteria(process.id, 'environment')}
                            variant="outline"
                            size="sm"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Thêm tiêu chí
                          </Button>
                        </div>
                        
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-1/3">Tiêu chí</TableHead>
                              <TableHead className="w-2/3">Chỉ tiêu chi tiết</TableHead>
                              <TableHead className="w-12"></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {process.environmentCriteria.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell>
                                  <Input
                                    value={item.criteria}
                                    onChange={(e) => updateCriteria(process.id, 'environment', item.id, 'criteria', e.target.value)}
                                    placeholder="Nhập tiêu chí..."
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={item.details}
                                    onChange={(e) => updateCriteria(process.id, 'environment', item.id, 'details', e.target.value)}
                                    placeholder="Nhập chi tiết..."
                                  />
                                </TableCell>
                                <TableCell>
                                  <Button
                                    onClick={() => removeCriteria(process.id, 'environment', item.id)}
                                    variant="ghost"
                                    size="sm"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      {/* Performance Profile */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">Profile test hiệu năng</h3>
                          <Button
                            onClick={() => addCriteria(process.id, 'performance')}
                            variant="outline"
                            size="sm"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Thêm tiêu chí
                          </Button>
                        </div>
                        
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-1/3">Tiêu chí</TableHead>
                              <TableHead className="w-2/3">Chỉ tiêu chi tiết</TableHead>
                              <TableHead className="w-12"></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {process.performanceCriteria.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell>
                                  <Input
                                    value={item.criteria}
                                    onChange={(e) => updateCriteria(process.id, 'performance', item.id, 'criteria', e.target.value)}
                                    placeholder="Nhập tiêu chí..."
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={item.details}
                                    onChange={(e) => updateCriteria(process.id, 'performance', item.id, 'details', e.target.value)}
                                    placeholder="Nhập chi tiết..."
                                  />
                                </TableCell>
                                <TableCell>
                                  <Button
                                    onClick={() => removeCriteria(process.id, 'performance', item.id)}
                                    variant="ghost"
                                    size="sm"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      {/* Test Results */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">Kết quả test</h3>
                          <Button
                            onClick={() => addCriteria(process.id, 'results')}
                            variant="outline"
                            size="sm"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Thêm kết quả
                          </Button>
                        </div>
                        
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-1/4">Tiêu chí</TableHead>
                              <TableHead className="w-1/4">Chỉ tiêu chi tiết</TableHead>
                              <TableHead className="w-1/4">Cách thức thực hiện đánh giá</TableHead>
                              <TableHead className="w-1/4">Kết quả</TableHead>
                              <TableHead className="w-12"></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {process.testResults.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell>
                                  <Input
                                    value={item.criteria}
                                    onChange={(e) => updateCriteria(process.id, 'results', item.id, 'criteria', e.target.value)}
                                    placeholder="Nhập tiêu chí..."
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={item.details}
                                    onChange={(e) => updateCriteria(process.id, 'results', item.id, 'details', e.target.value)}
                                    placeholder="Nhập chi tiết..."
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={item.evaluationMethod}
                                    onChange={(e) => updateCriteria(process.id, 'results', item.id, 'evaluationMethod', e.target.value)}
                                    placeholder="Nhập cách thức đánh giá..."
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={item.result}
                                    onChange={(e) => updateCriteria(process.id, 'results', item.id, 'result', e.target.value)}
                                    placeholder="Nhập kết quả..."
                                  />
                                </TableCell>
                                <TableCell>
                                  <Button
                                    onClick={() => removeCriteria(process.id, 'results', item.id)}
                                    variant="ghost"
                                    size="sm"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-between pt-4 border-t">
              <div className="flex space-x-2">
                <Button type="button" onClick={handlePrintPreview} variant="outline">
                  <Printer className="h-4 w-4 mr-2" />
                  Print Preview
                </Button>
                <Button type="button" onClick={handleExportPDF} variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>
              
              <div className="flex space-x-2">
                <Button type="button" onClick={handleClose} variant="outline">
                  Cancel
                </Button>
                <Button type="button" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Document
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Exit Warning Dialog */}
      <Dialog open={showExitWarning} onOpenChange={setShowExitWarning}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unsaved Changes</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>You have unsaved changes. Do you want to save before closing?</p>
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setShowExitWarning(false)} variant="outline">
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  handleSave();
                  setShowExitWarning(false);
                }}
                className="mr-2"
              >
                <Save className="h-4 w-4 mr-2" />
                Save & Close
              </Button>
              <Button onClick={confirmClose} variant="destructive">
                Exit Without Saving
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Commitment Popup */}
      <Dialog open={showCommitmentPopup} onOpenChange={setShowCommitmentPopup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cam kết</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">{commitment}</p>
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setShowCommitmentPopup(false)}>
                Đồng ý
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
