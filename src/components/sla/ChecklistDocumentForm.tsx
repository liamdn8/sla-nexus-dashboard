
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

export const ChecklistDocumentForm = ({ isOpen, onClose, slaTitle }: ChecklistDocumentFormProps) => {
  const { toast } = useToast();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [formData, setFormData] = useState({
    documentCode: '',
    description1: '',
    description2: '',
    description3: '',
    items: [
      { id: '1', requirement: '', result: '' }
    ] as ChecklistItem[]
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

  const handleItemChange = (id: string, field: 'requirement' | 'result', value: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
    setHasUnsavedChanges(true);
  };

  const addItem = () => {
    const newId = (formData.items.length + 1).toString();
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { id: newId, requirement: '', result: '' }]
    }));
    setHasUnsavedChanges(true);
  };

  const removeItem = (id: string) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== id)
      }));
      setHasUnsavedChanges(true);
    }
  };

  const handleSave = () => {
    // Simulate save operation
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
    // In a real implementation, you would use a library like jsPDF or react-pdf
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
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .title { font-size: 18px; font-weight: bold; }
            .subtitle { font-size: 14px; margin: 5px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
            th { background-color: #f0f0f0; font-weight: bold; }
            .stt { width: 50px; text-align: center; }
            .requirement { width: 40%; }
            .result { width: 60%; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">Checklist</div>
            <div class="subtitle">${formData.documentCode}</div>
            <div class="subtitle">${formData.description1}</div>
            <div class="subtitle">${formData.description2}</div>
            <div class="subtitle">${formData.description3}</div>
          </div>
          <table>
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
                  <td>${item.requirement}</td>
                  <td>${item.result}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
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
              <span>Create Checklist Document - {slaTitle}</span>
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
            <div className="space-y-4">
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

            {/* Checklist Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Checklist Items</h3>
                <Button onClick={addItem} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>

              <div className="space-y-3">
                {formData.items.map((item, index) => (
                  <div key={item.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Item {index + 1}</span>
                      {formData.items.length > 1 && (
                        <Button
                          onClick={() => removeItem(item.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Requirement</label>
                      <Textarea
                        value={item.requirement}
                        onChange={(e) => handleItemChange(item.id, 'requirement', e.target.value)}
                        placeholder="Enter checklist requirement..."
                        className="min-h-[80px]"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Result</label>
                      <Textarea
                        value={item.result}
                        onChange={(e) => handleItemChange(item.id, 'result', e.target.value)}
                        placeholder="Enter checklist result..."
                        className="min-h-[100px]"
                      />
                    </div>
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
