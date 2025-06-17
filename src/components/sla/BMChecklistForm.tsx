
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Save, FileText, Printer, X, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface ApplicationVersion {
  id: string;
  application: string;
  version: string;
  status: string;
  releaseDate: string;
  environment: string;
}

interface UpgradeStep {
  id: string;
  description: string;
}

interface BMChecklistData {
  // Checklist 1
  requirementName: string; // Auto-loaded from SLA
  currentStatus: string;
  requirements: string;
  
  // Checklist 2
  solution: string;
  
  // Checklist 3
  scope: string;
  processes: string[]; // Auto-loaded from applications
  
  // Checklist 4
  upgradeSteps: UpgradeStep[];
}

interface BMChecklistFormProps {
  isOpen: boolean;
  onClose: () => void;
  slaTitle: string;
  slaDescription?: string;
  applicationVersions: ApplicationVersion[];
}

export const BMChecklistForm = ({ isOpen, onClose, slaTitle, slaDescription, applicationVersions }: BMChecklistFormProps) => {
  const { toast } = useToast();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  
  const [formData, setFormData] = useState<BMChecklistData>({
    requirementName: slaTitle,
    currentStatus: '',
    requirements: '',
    solution: '',
    scope: '',
    processes: [],
    upgradeSteps: [{ id: '1', description: '' }]
  });

  // Auto-load processes from application versions
  useEffect(() => {
    if (applicationVersions.length > 0) {
      const uniqueApps = [...new Set(applicationVersions.map(app => app.application))];
      setFormData(prev => ({ ...prev, processes: uniqueApps }));
    }
  }, [applicationVersions]);

  // Update requirement name when SLA title changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, requirementName: slaTitle }));
  }, [slaTitle]);

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

  const handleInputChange = (field: keyof BMChecklistData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const addUpgradeStep = () => {
    const newStep: UpgradeStep = {
      id: (formData.upgradeSteps.length + 1).toString(),
      description: ''
    };
    setFormData(prev => ({
      ...prev,
      upgradeSteps: [...prev.upgradeSteps, newStep]
    }));
    setHasUnsavedChanges(true);
  };

  const removeUpgradeStep = (id: string) => {
    if (formData.upgradeSteps.length > 1) {
      setFormData(prev => ({
        ...prev,
        upgradeSteps: prev.upgradeSteps.filter(step => step.id !== id)
      }));
      setHasUnsavedChanges(true);
    }
  };

  const updateUpgradeStep = (id: string, description: string) => {
    setFormData(prev => ({
      ...prev,
      upgradeSteps: prev.upgradeSteps.map(step =>
        step.id === id ? { ...step, description } : step
      )
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    console.log('Saving BM Checklist:', formData);
    setHasUnsavedChanges(false);
    toast({
      title: "BM Checklist Saved",
      description: "BM Checklist has been saved successfully.",
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "PDF Export",
      description: "BM Checklist PDF export functionality would be implemented here.",
    });
  };

  const handlePrintPreview = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(generatePrintHTML());
      printWindow.document.close();
      printWindow.focus();
    }
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

  const handleSaveAndClose = () => {
    handleSave();
    setShowExitWarning(false);
    onClose();
  };

  const generatePrintHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>BM Checklist - ${slaTitle}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 20px; }
            .title { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .section { margin-bottom: 30px; page-break-inside: avoid; }
            .section-title { font-size: 18px; font-weight: bold; margin-bottom: 15px; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
            .field { margin-bottom: 15px; }
            .field-label { font-weight: bold; margin-bottom: 5px; }
            .field-content { border: 1px solid #ddd; padding: 10px; min-height: 50px; background-color: #f9f9f9; }
            .processes-list { list-style-type: disc; margin-left: 20px; }
            .upgrade-steps { counter-reset: step-counter; }
            .upgrade-step { counter-increment: step-counter; margin-bottom: 10px; }
            .upgrade-step::before { content: "Bước " counter(step-counter) ": "; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">BM CHECKLIST</div>
            <div class="subtitle">${slaTitle}</div>
          </div>
          
          <div class="section">
            <div class="section-title">Checklist 1: Yêu cầu là gì? Tại sao cần thực hiện yêu cầu?</div>
            <div class="field">
              <div class="field-label">Tên yêu cầu:</div>
              <div class="field-content">${formData.requirementName}</div>
            </div>
            <div class="field">
              <div class="field-label">Hiện trạng:</div>
              <div class="field-content">${formData.currentStatus}</div>
            </div>
            <div class="field">
              <div class="field-label">Yêu cầu:</div>
              <div class="field-content">${formData.requirements}</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Checklist 2: Giải pháp tổng quát là gì?</div>
            <div class="field">
              <div class="field-label">Giải pháp:</div>
              <div class="field-content">${formData.solution}</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Checklist 3: Phạm vi ảnh hưởng? Sửa trên vOCS3/vOCS4 hay cả 2? Sửa bao nhiêu thư viện,...?</div>
            <div class="field">
              <div class="field-label">Phạm vi:</div>
              <div class="field-content">${formData.scope}</div>
            </div>
            <div class="field">
              <div class="field-label">Tiến trình:</div>
              <div class="field-content">
                <ul class="processes-list">
                  ${formData.processes.map(process => `<li>${process}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Checklist 4: Hướng dẫn nâng cấp sơ bộ, thứ tự các bước nâng cấp:</div>
            <div class="upgrade-steps">
              ${formData.upgradeSteps.map(step => `
                <div class="upgrade-step">
                  <div class="field-content">${step.description}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </body>
      </html>
    `;
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>BM Checklist - {slaTitle}</span>
              <div className="flex items-center space-x-2">
                {hasUnsavedChanges && (
                  <Badge variant="outline" className="text-orange-600">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Unsaved Changes
                  </Badge>
                )}
                <Button onClick={handleClose} variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-8">
            {/* Checklist 1 */}
            <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800">
                Checklist 1: Yêu cầu là gì? Tại sao cần thực hiện yêu cầu?
              </h3>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Tên yêu cầu</label>
                <Input
                  value={formData.requirementName}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Hiện trạng</label>
                <Textarea
                  value={formData.currentStatus}
                  onChange={(e) => handleInputChange('currentStatus', e.target.value)}
                  placeholder="Mô tả hiện trạng hiện tại..."
                  maxLength={1000}
                  className="min-h-[100px]"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {formData.currentStatus.length}/1000 ký tự
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Yêu cầu</label>
                <Textarea
                  value={formData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                  placeholder="Mô tả yêu cầu cần thực hiện..."
                  maxLength={1000}
                  className="min-h-[100px]"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {formData.requirements.length}/1000 ký tự
                </div>
              </div>
            </div>

            {/* Checklist 2 */}
            <div className="space-y-4 p-4 border rounded-lg bg-blue-50">
              <h3 className="text-lg font-semibold text-gray-800">
                Checklist 2: Giải pháp tổng quát là gì?
              </h3>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Giải pháp</label>
                <Textarea
                  value={formData.solution}
                  onChange={(e) => handleInputChange('solution', e.target.value)}
                  placeholder="Mô tả giải pháp tổng quát..."
                  maxLength={1000}
                  className="min-h-[100px]"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {formData.solution.length}/1000 ký tự
                </div>
              </div>
            </div>

            {/* Checklist 3 */}
            <div className="space-y-4 p-4 border rounded-lg bg-green-50">
              <h3 className="text-lg font-semibold text-gray-800">
                Checklist 3: Phạm vi ảnh hưởng? Sửa trên vOCS3/vOCS4 hay cả 2? Sửa bao nhiêu thư viện,...?
              </h3>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Phạm vi</label>
                <Textarea
                  value={formData.scope}
                  onChange={(e) => handleInputChange('scope', e.target.value)}
                  placeholder="Mô tả phạm vi ảnh hưởng..."
                  maxLength={1000}
                  className="min-h-[100px]"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {formData.scope.length}/1000 ký tự
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Tiến trình</label>
                <div className="bg-gray-100 p-3 rounded border">
                  <div className="text-sm text-gray-600 mb-2">
                    Tự động load từ danh sách ứng dụng ({applicationVersions.length} versions):
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.processes.map((process, index) => (
                      <Badge key={index} variant="secondary">
                        {process}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist 4 */}
            <div className="space-y-4 p-4 border rounded-lg bg-yellow-50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Checklist 4: Hướng dẫn nâng cấp sơ bộ, thứ tự các bước nâng cấp
                </h3>
                <Button onClick={addUpgradeStep} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm bước
                </Button>
              </div>

              <div className="space-y-3">
                {formData.upgradeSteps.map((step, index) => (
                  <div key={step.id} className="flex gap-3 items-start">
                    <div className="flex-shrink-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <Textarea
                        value={step.description}
                        onChange={(e) => updateUpgradeStep(step.id, e.target.value)}
                        placeholder={`Mô tả bước ${index + 1}...`}
                        maxLength={1000}
                        className="min-h-[80px]"
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        {step.description.length}/1000 ký tự
                      </div>
                    </div>
                    {formData.upgradeSteps.length > 1 && (
                      <Button
                        onClick={() => removeUpgradeStep(step.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-4 border-t">
              <div className="flex space-x-2">
                <Button onClick={handlePrintPreview} variant="outline">
                  <Printer className="h-4 w-4 mr-2" />
                  Print Preview
                </Button>
                <Button onClick={handleExportPDF} variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>
              
              <div className="flex space-x-2">
                <Button onClick={handleClose} variant="outline">
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Exit Warning Dialog */}
      <AlertDialog open={showExitWarning} onOpenChange={setShowExitWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
              Unsaved Changes
            </AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có thay đổi chưa được lưu. Bạn có muốn lưu trước khi thoát không?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={confirmClose}>
              Thoát không lưu
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleSaveAndClose}>
              Lưu và thoát
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
