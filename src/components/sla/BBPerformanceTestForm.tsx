
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
        name: `Tiến trình ${app.application} v${app.version}`,
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
    
    toast({
      title: "Document Saved",
      description: "BB Performance Test document has been saved successfully.",
    });
    
    // Show commitment popup after saving
    setShowCommitmentPopup(true);
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
            .process-title { font-size: 18px; font-weight: bold; margin-bottom: 15px; background-color: #f0f0f0; padding: 10px; text-align: center; }
            .table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            .table th, .table td { border: 1px solid #000; padding: 8px; text-align: left; vertical-align: top; }
            .table th { background-color: #e0e0e0; font-weight: bold; text-align: center; }
            .section-header { background-color: #d0d0d0; font-weight: bold; text-align: center; }
            .stt-column { width: 40px; text-align: center; }
            .criteria-column { width: 200px; }
            .details-column { width: 150px; }
            .method-column { width: 150px; }
            .result-column { width: 200px; }
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
          
          ${processDataList.map((process, processIndex) => `
            <div class="process-section">
              <div class="process-title">${process.name}</div>
              
              <table class="table">
                <thead>
                  <tr>
                    <th class="stt-column">STT</th>
                    <th class="criteria-column">Tiêu chí</th>
                    <th class="details-column">Chỉ tiêu chi tiết</th>
                    <th class="method-column">Cách thức thực hiện đánh giá</th>
                    <th class="result-column">Kết quả</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="section-header">
                    <td colspan="5" style="text-align: center; font-weight: bold;">I. Yêu cầu về môi trường đánh giá</td>
                  </tr>
                  ${process.environmentCriteria.map((item, index) => `
                    <tr>
                      <td class="stt-column">${index + 1}</td>
                      <td>${item.criteria}</td>
                      <td>${item.details}</td>
                      <td></td>
                      <td></td>
                    </tr>
                  `).join('')}
                  
                  <tr class="section-header">
                    <td colspan="5" style="text-align: center; font-weight: bold;">II. Profile test hiệu năng</td>
                  </tr>
                  ${process.performanceCriteria.map((item, index) => `
                    <tr>
                      <td class="stt-column">${index + 1}</td>
                      <td>${item.criteria}</td>
                      <td>${item.details}</td>
                      <td></td>
                      <td></td>
                    </tr>
                  `).join('')}
                  
                  <tr class="section-header">
                    <td colspan="5" style="text-align: center; font-weight: bold;">III. Kết quả test</td>
                  </tr>
                  ${process.testResults.map((item, index) => `
                    <tr>
                      <td class="stt-column">${index + 1}</td>
                      <td>${item.criteria}</td>
                      <td>${item.details}</td>
                      <td>${item.evaluationMethod}</td>
                      <td>${item.result}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `).join('')}
          
          <div class="commitment-section">
            <div style="font-weight: bold; margin-bottom: 10px;">Cam kết:</div>
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

  // Excel-like cell component
  const ExcelCell = ({ 
    value, 
    onChange, 
    placeholder = "", 
    className = "",
    multiline = false 
  }: { 
    value: string; 
    onChange: (value: string) => void; 
    placeholder?: string; 
    className?: string;
    multiline?: boolean;
  }) => {
    if (multiline) {
      return (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`min-h-[40px] border-0 bg-transparent resize-none focus:bg-blue-50 focus:ring-1 focus:ring-blue-200 rounded-none ${className}`}
          style={{ 
            border: 'none',
            boxShadow: 'none',
            outline: 'none'
          }}
        />
      );
    }

    return (
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`border-0 bg-transparent focus:bg-blue-50 focus:ring-1 focus:ring-blue-200 rounded-none h-10 ${className}`}
        style={{ 
          border: 'none',
          boxShadow: 'none',
          outline: 'none'
        }}
      />
    );
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
                      {/* Excel-like Table View */}
                      <div className="border rounded-lg overflow-hidden bg-white">
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-2 py-3 text-center font-semibold text-sm w-12">STT</th>
                                <th className="border border-gray-300 px-2 py-3 text-center font-semibold text-sm min-w-[200px]">Tiêu chí</th>
                                <th className="border border-gray-300 px-2 py-3 text-center font-semibold text-sm min-w-[200px]">Chỉ tiêu chi tiết</th>
                                <th className="border border-gray-300 px-2 py-3 text-center font-semibold text-sm min-w-[200px]">Cách thức thực hiện đánh giá</th>
                                <th className="border border-gray-300 px-2 py-3 text-center font-semibold text-sm min-w-[200px]">Kết quả</th>
                                <th className="border border-gray-300 px-2 py-3 text-center font-semibold text-sm w-12"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* Environment Requirements Section */}
                              <tr className="bg-blue-50">
                                <td colSpan={6} className="border border-gray-300 px-4 py-3 text-center font-semibold text-blue-800">
                                  <div className="flex items-center justify-center space-x-2">
                                    <span>I. Yêu cầu về môi trường đánh giá</span>
                                    <Button
                                      onClick={() => addCriteria(process.id, 'environment')}
                                      variant="ghost"
                                      size="sm"
                                      className="ml-2 h-6 w-6 p-0"
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                              {process.environmentCriteria.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                  <td className="border border-gray-300 text-center text-sm py-2">{index + 1}</td>
                                  <td className="border border-gray-300 p-0">
                                    <ExcelCell
                                      value={item.criteria}
                                      onChange={(value) => updateCriteria(process.id, 'environment', item.id, 'criteria', value)}
                                      placeholder="Nhập tiêu chí..."
                                    />
                                  </td>
                                  <td className="border border-gray-300 p-0">
                                    <ExcelCell
                                      value={item.details}
                                      onChange={(value) => updateCriteria(process.id, 'environment', item.id, 'details', value)}
                                      placeholder="Nhập chi tiết..."
                                      multiline
                                    />
                                  </td>
                                  <td className="border border-gray-300 bg-gray-50"></td>
                                  <td className="border border-gray-300 bg-gray-50"></td>
                                  <td className="border border-gray-300 p-1 text-center">
                                    <Button
                                      onClick={() => removeCriteria(process.id, 'environment', item.id)}
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </td>
                                </tr>
                              ))}

                              {/* Performance Profile Section */}
                              <tr className="bg-green-50">
                                <td colSpan={6} className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-800">
                                  <div className="flex items-center justify-center space-x-2">
                                    <span>II. Profile test hiệu năng</span>
                                    <Button
                                      onClick={() => addCriteria(process.id, 'performance')}
                                      variant="ghost"
                                      size="sm"
                                      className="ml-2 h-6 w-6 p-0"
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                              {process.performanceCriteria.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                  <td className="border border-gray-300 text-center text-sm py-2">{index + 1}</td>
                                  <td className="border border-gray-300 p-0">
                                    <ExcelCell
                                      value={item.criteria}
                                      onChange={(value) => updateCriteria(process.id, 'performance', item.id, 'criteria', value)}
                                      placeholder="Nhập tiêu chí..."
                                    />
                                  </td>
                                  <td className="border border-gray-300 p-0">
                                    <ExcelCell
                                      value={item.details}
                                      onChange={(value) => updateCriteria(process.id, 'performance', item.id, 'details', value)}
                                      placeholder="Nhập chi tiết..."
                                      multiline
                                    />
                                  </td>
                                  <td className="border border-gray-300 bg-gray-50"></td>
                                  <td className="border border-gray-300 bg-gray-50"></td>
                                  <td className="border border-gray-300 p-1 text-center">
                                    <Button
                                      onClick={() => removeCriteria(process.id, 'performance', item.id)}
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </td>
                                </tr>
                              ))}

                              {/* Test Results Section */}
                              <tr className="bg-orange-50">
                                <td colSpan={6} className="border border-gray-300 px-4 py-3 text-center font-semibold text-orange-800">
                                  <div className="flex items-center justify-center space-x-2">
                                    <span>III. Kết quả test</span>
                                    <Button
                                      onClick={() => addCriteria(process.id, 'results')}
                                      variant="ghost"
                                      size="sm"
                                      className="ml-2 h-6 w-6 p-0"
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                              {process.testResults.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                  <td className="border border-gray-300 text-center text-sm py-2">{index + 1}</td>
                                  <td className="border border-gray-300 p-0">
                                    <ExcelCell
                                      value={item.criteria}
                                      onChange={(value) => updateCriteria(process.id, 'results', item.id, 'criteria', value)}
                                      placeholder="Nhập tiêu chí..."
                                    />
                                  </td>
                                  <td className="border border-gray-300 p-0">
                                    <ExcelCell
                                      value={item.details}
                                      onChange={(value) => updateCriteria(process.id, 'results', item.id, 'details', value)}
                                      placeholder="Nhập chi tiết..."
                                      multiline
                                    />
                                  </td>
                                  <td className="border border-gray-300 p-0">
                                    <ExcelCell
                                      value={item.evaluationMethod}
                                      onChange={(value) => updateCriteria(process.id, 'results', item.id, 'evaluationMethod', value)}
                                      placeholder="Nhập cách thức đánh giá..."
                                      multiline
                                    />
                                  </td>
                                  <td className="border border-gray-300 p-0">
                                    <ExcelCell
                                      value={item.result}
                                      onChange={(value) => updateCriteria(process.id, 'results', item.id, 'result', value)}
                                      placeholder="Nhập kết quả..."
                                      multiline
                                    />
                                  </td>
                                  <td className="border border-gray-300 p-1 text-center">
                                    <Button
                                      onClick={() => removeCriteria(process.id, 'results', item.id)}
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            {/* Commitment Section - Moved to end */}
            <Card>
              <CardHeader>
                <CardTitle>Cam kết</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={commitment}
                  onChange={(e) => {
                    setCommitment(e.target.value);
                    handleFormChange();
                  }}
                  className="min-h-[100px]"
                  maxLength={1000}
                />
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
