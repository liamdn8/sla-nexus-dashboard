
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Save, FileText, Printer, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ApplicationVersion {
  id: string;
  application: string;
  version: string;
  status: string;
  releaseDate: string;
  environment: string;
}

interface BMSizingFormProps {
  isOpen: boolean;
  onClose: () => void;
  slaTitle: string;
  slaId: string;
  applicationVersions: ApplicationVersion[];
}

interface FunctionItem {
  id: string;
  moduleName: string;
  changes: string;
  architectureChange: 'Có' | 'Không';
  userExperienceImpact: 'Có' | 'Không';
  systemImpact: 'Có' | 'Không';
}

const formSchema = z.object({
  requestingUnit: z.string().min(1, "Đơn vị yêu cầu là bắt buộc").max(255, "Tối đa 255 ký tự"),
  handoverPerson: z.string().min(1, "Người bàn giao là bắt buộc").max(255, "Tối đa 255 ký tự"),
  email: z.string().email("Email không hợp lệ").max(255, "Tối đa 255 ký tự"),
  phoneNumber: z.string().min(1, "Số điện thoại là bắt buộc").max(255, "Tối đa 255 ký tự"),
  handoverDate: z.date({
    required_error: "Ngày bàn giao là bắt buộc",
  }),
});

export const BMSizingForm = ({ 
  isOpen, 
  onClose, 
  slaTitle, 
  slaId,
  applicationVersions 
}: BMSizingFormProps) => {
  const { toast } = useToast();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [functionList, setFunctionList] = useState<FunctionItem[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requestingUnit: '',
      handoverPerson: '',
      email: '',
      phoneNumber: '',
      handoverDate: new Date(),
    },
  });

  // Initialize function list from application versions
  useEffect(() => {
    if (applicationVersions.length > 0) {
      const initialFunctions: FunctionItem[] = applicationVersions.map((version, index) => ({
        id: `func-${index}`,
        moduleName: `${version.application} v${version.version}`,
        changes: `Release notes for ${version.application} version ${version.version}`, // This would normally load from actual release notes
        architectureChange: 'Không',
        userExperienceImpact: 'Không',
        systemImpact: 'Không',
      }));
      setFunctionList(initialFunctions);
    }
  }, [applicationVersions]);

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

  const handleFunctionChange = (id: string, field: keyof FunctionItem, value: string) => {
    setFunctionList(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
    setHasUnsavedChanges(true);
  };

  const handleSave = (data: z.infer<typeof formSchema>) => {
    const bmSizingData = {
      ...data,
      slaId,
      slaTitle,
      functionList,
      createdAt: new Date().toISOString(),
    };
    
    console.log('Saving BM Sizing document:', bmSizingData);
    setHasUnsavedChanges(false);
    toast({
      title: "Document Saved",
      description: "BM Sizing document has been saved successfully.",
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
    const formData = form.getValues();
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>BM Sizing - ${slaTitle}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.4; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 20px; }
            .title { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .info-section { margin: 20px 0; }
            .info-row { display: flex; margin: 10px 0; }
            .info-label { width: 200px; font-weight: bold; }
            .info-value { flex: 1; }
            .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .table th, .table td { border: 1px solid #000; padding: 10px; text-align: left; vertical-align: top; }
            .table th { background-color: #f0f0f0; font-weight: bold; }
            .signature-section { margin-top: 40px; display: flex; justify-content: space-between; }
            .signature-box { width: 200px; text-align: center; }
            .signature-line { border-top: 1px solid #000; margin-top: 60px; padding-top: 5px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">BM ĐÁNH GIÁ ẢNH HƯỞNG SIZING</div>
          </div>
          
          <div class="info-section">
            <h3>Thông tin cơ bản</h3>
            <div class="info-row">
              <div class="info-label">Đơn vị yêu cầu:</div>
              <div class="info-value">${formData.requestingUnit}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Mã yêu cầu:</div>
              <div class="info-value">${slaId}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Tên yêu cầu:</div>
              <div class="info-value">${slaTitle}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Người bàn giao:</div>
              <div class="info-value">${formData.handoverPerson}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Email:</div>
              <div class="info-value">${formData.email}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Số điện thoại:</div>
              <div class="info-value">${formData.phoneNumber}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Ngày bàn giao:</div>
              <div class="info-value">${format(formData.handoverDate, "dd/MM/yyyy")}</div>
            </div>
          </div>
          
          <table class="table">
            <thead>
              <tr>
                <th style="width: 20%;">Tên module/chức năng</th>
                <th style="width: 30%;">Thay đổi/ảnh hưởng</th>
                <th style="width: 15%;">Thay đổi mô hình, kiến trúc</th>
                <th style="width: 15%;">Ảnh hưởng trải nghiệm người dùng</th>
                <th style="width: 20%;">Ảnh hưởng hệ thống khác</th>
              </tr>
            </thead>
            <tbody>
              ${functionList.map(item => `
                <tr>
                  <td>${item.moduleName}</td>
                  <td>${item.changes}</td>
                  <td>${item.architectureChange}</td>
                  <td>${item.userExperienceImpact}</td>
                  <td>${item.systemImpact}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="signature-section">
            <div class="signature-box">
              <div class="signature-line">Người lập</div>
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
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>BM Sizing Document - {slaTitle}</span>
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

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
              {/* Basic Information Section */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <h3 className="font-semibold text-lg">Thông tin cơ bản</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="requestingUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Đơn vị yêu cầu *</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            onChange={(e) => {
                              field.onChange(e);
                              handleFormChange();
                            }}
                            placeholder="Nhập đơn vị yêu cầu..."
                            maxLength={255}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <label className="text-sm font-medium">Mã yêu cầu</label>
                    <Input value={slaId} disabled className="bg-gray-100" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Tên yêu cầu</label>
                    <Input value={slaTitle} disabled className="bg-gray-100" />
                  </div>

                  <FormField
                    control={form.control}
                    name="handoverPerson"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Người bàn giao *</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            onChange={(e) => {
                              field.onChange(e);
                              handleFormChange();
                            }}
                            placeholder="Nhập tên người bàn giao..."
                            maxLength={255}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email"
                            onChange={(e) => {
                              field.onChange(e);
                              handleFormChange();
                            }}
                            placeholder="Nhập email..."
                            maxLength={255}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số điện thoại *</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            onChange={(e) => {
                              field.onChange(e);
                              handleFormChange();
                            }}
                            placeholder="Nhập số điện thoại..."
                            maxLength={255}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="handoverDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Ngày bàn giao *</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd/MM/yyyy")
                                ) : (
                                  <span>Chọn ngày</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date);
                                handleFormChange();
                              }}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Function List Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Danh sách chức năng bàn giao</h3>
                
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="w-1/5 px-4 py-3 text-left border-r">Tên module/chức năng</th>
                        <th className="w-2/5 px-4 py-3 text-left border-r">Thay đổi/ảnh hưởng</th>
                        <th className="w-1/8 px-4 py-3 text-left border-r">Thay đổi mô hình, kiến trúc</th>
                        <th className="w-1/8 px-4 py-3 text-left border-r">Ảnh hưởng trải nghiệm người dùng</th>
                        <th className="w-1/8 px-4 py-3 text-left">Ảnh hưởng hệ thống khác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {functionList.map((item, index) => (
                        <tr key={item.id} className="border-t hover:bg-gray-50">
                          <td className="px-4 py-3 border-r">
                            <span className="text-gray-700">{item.moduleName}</span>
                          </td>
                          <td className="px-4 py-3 border-r">
                            <Textarea
                              value={item.changes}
                              onChange={(e) => handleFunctionChange(item.id, 'changes', e.target.value)}
                              placeholder="Nhập thay đổi/ảnh hưởng..."
                              className="min-h-[80px] resize-none"
                              maxLength={1000}
                            />
                          </td>
                          <td className="px-4 py-3 border-r">
                            <Select
                              value={item.architectureChange}
                              onValueChange={(value: 'Có' | 'Không') => 
                                handleFunctionChange(item.id, 'architectureChange', value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Không">Không</SelectItem>
                                <SelectItem value="Có">Có</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="px-4 py-3 border-r">
                            <Select
                              value={item.userExperienceImpact}
                              onValueChange={(value: 'Có' | 'Không') => 
                                handleFunctionChange(item.id, 'userExperienceImpact', value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Không">Không</SelectItem>
                                <SelectItem value="Có">Có</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="px-4 py-3">
                            <Select
                              value={item.systemImpact}
                              onValueChange={(value: 'Có' | 'Không') => 
                                handleFunctionChange(item.id, 'systemImpact', value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Không">Không</SelectItem>
                                <SelectItem value="Có">Có</SelectItem>
                              </SelectContent>
                            </Select>
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
                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    Save Document
                  </Button>
                </div>
              </div>
            </form>
          </Form>
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
                  form.handleSubmit(handleSave)();
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
    </>
  );
};
