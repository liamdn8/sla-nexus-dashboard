
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Save, FileText, Printer, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChecklistItem {
  id: string;
  requirement: string;
  result: string;
}

interface ChecklistDocumentFormProps {
  isOpen: boolean;
  onClose: () => void;
  slaTitle: string;
}

// Predefined checklist requirements
const DEFAULT_REQUIREMENTS = [
  "Kiểm tra kết nối cơ sở dữ liệu",
  "Kiểm tra tính năng đăng nhập",
  "Kiểm tra tốc độ phản hồi của hệ thống",
  "Kiểm tra tính bảo mật của API",
  "Kiểm tra khả năng xử lý tải",
  "Kiểm tra backup và recovery",
  "Kiểm tra log và monitoring",
  "Kiểm tra tương thích trình duyệt"
];

export const ChecklistDocumentForm = ({ isOpen, onClose, slaTitle }: ChecklistDocumentFormProps) => {
  const { toast } = useToast();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [formData, setFormData] = useState({
    documentCode: '',
    description1: '',
    description2: '',
    description3: '',
    items: DEFAULT_REQUIREMENTS.map((req, index) => ({
      id: (index + 1).toString(),
      requirement: req,
      result: ''
    })) as ChecklistItem[]
  });

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleResultChange = (id: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === id ? { ...item, result: value } : item
      )
    }));
    setHasUnsavedChanges(true);
  };

  const addCustomItem = () => {
    const newId = (formData.items.length + 1).toString();
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { id: newId, requirement: '', result: '' }]
    }));
    setHasUnsavedChanges(true);
  };

  const removeItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    console.log('Saving checklist document:', formData);
    setHasUnsavedChanges(false);
    toast({
      title: "Document Saved",
      description: "Checklist document has been saved successfully.",
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
          <title>Checklist - ${slaTitle}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.4; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 20px; }
            .title { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .subtitle { font-size: 14px; margin: 8px 0; }
            .form-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .form-table th, .form-table td { border: 1px solid #000; padding: 12px; text-align: left; vertical-align: top; }
            .form-table th { background-color: #f0f0f0; font-weight: bold; text-align: center; }
            .stt { width: 60px; text-align: center; }
            .requirement { width: 45%; }
            .result { width: 45%; min-height: 40px; }
            .signature-section { margin-top: 40px; display: flex; justify-content: space-between; }
            .signature-box { width: 200px; text-align: center; }
            .signature-line { border-top: 1px solid #000; margin-top: 60px; padding-top: 5px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">CHECKLIST</div>
            <div class="subtitle"><strong>${formData.documentCode}</strong></div>
            <div class="subtitle">${formData.description1}</div>
            <div class="subtitle">${formData.description2}</div>
            <div class="subtitle">${formData.description3}</div>
          </div>
          
          <table class="form-table">
            <thead>
              <tr>
                <th class="stt">STT</th>
                <th class="requirement">Các mục cần checklist</th>
                <th class="result">Kết quả checklist</th>
              </tr>
            </thead>
            <tbody>
              ${formData.items.map((item, index) => `
                <tr>
                  <td class="stt">${index + 1}</td>
                  <td class="requirement">${item.requirement}</td>
                  <td class="result">${item.result}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="signature-section">
            <div class="signature-box">
              <div class="signature-line">Người thực hiện</div>
            </div>
            <div class="signature-box">
              <div class="signature-line">Người kiểm tra</div>
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
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Checklist Document - {slaTitle}</span>
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
            {/* Document Header Information */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <h3 className="font-semibold text-lg">Document Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Document Code</label>
                  <Input
                    value={formData.documentCode}
                    onChange={(e) => handleInputChange('documentCode', e.target.value)}
                    placeholder="e.g., R24488_OCS_VTT_AntiSpamCall"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Description Line 1</label>
                  <Input
                    value={formData.description1}
                    onChange={(e) => handleInputChange('description1', e.target.value)}
                    placeholder="e.g., E24119_OCS_VTT_Lỗi ghi nhận sai thông tin duration cuộc gọi khi abnormal"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Description Line 2</label>
                  <Input
                    value={formData.description2}
                    onChange={(e) => handleInputChange('description2', e.target.value)}
                    placeholder="e.g., E24076_OCS_VTNet_SCP thêm reserve cc_time = 1s ở bản tin ACMsg"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Description Line 3</label>
                  <Input
                    value={formData.description3}
                    onChange={(e) => handleInputChange('description3', e.target.value)}
                    placeholder="Additional description (optional)"
                  />
                </div>
              </div>
            </div>

            {/* Checklist Table */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Checklist Items</h3>
                <Button onClick={addCustomItem} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Custom Item
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="w-16 px-4 py-3 text-center border-r">STT</th>
                      <th className="w-2/5 px-4 py-3 text-left border-r">Các mục cần checklist</th>
                      <th className="w-2/5 px-4 py-3 text-left border-r">Kết quả checklist</th>
                      <th className="w-16 px-4 py-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.items.map((item, index) => (
                      <tr key={item.id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-3 text-center border-r font-medium">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3 border-r">
                          {DEFAULT_REQUIREMENTS.includes(item.requirement) ? (
                            <span className="text-gray-700">{item.requirement}</span>
                          ) : (
                            <Input
                              value={item.requirement}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                items: prev.items.map(i => 
                                  i.id === item.id ? { ...i, requirement: e.target.value } : i
                                )
                              }))}
                              placeholder="Enter custom requirement..."
                              className="border-0 p-0 h-auto"
                            />
                          )}
                        </td>
                        <td className="px-4 py-3 border-r">
                          <Textarea
                            value={item.result}
                            onChange={(e) => handleResultChange(item.id, e.target.value)}
                            placeholder="Enter result here..."
                            className="min-h-[60px] resize-none"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          {!DEFAULT_REQUIREMENTS.includes(item.requirement) && (
                            <Button
                              onClick={() => removeItem(item.id)}
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
            <p>You have unsaved changes. Are you sure you want to exit without saving?</p>
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setShowExitWarning(false)} variant="outline">
                Cancel
              </Button>
              <Button onClick={confirmClose} variant="destructive">
                Exit Without Saving
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
