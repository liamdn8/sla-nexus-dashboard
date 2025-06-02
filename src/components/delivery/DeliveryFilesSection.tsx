
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, Download, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const DeliveryFilesSection = () => {
  const { toast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const configMaps = [
    { id: 'cm1', name: 'app-config.yaml', application: 'product-catalog', size: '2.4 KB', lastModified: '2025/05/29' },
    { id: 'cm2', name: 'database-config.yaml', application: 'user-service', size: '1.8 KB', lastModified: '2025/05/28' },
    { id: 'cm3', name: 'redis-config.yaml', application: 'api-gateway', size: '1.2 KB', lastModified: '2025/05/27' }
  ];

  const toscaFiles = [
    { id: 'ts1', name: 'test-suite-v3.xml', application: 'product-catalog', size: '45.2 KB', lastModified: '2025/05/29' },
    { id: 'ts2', name: 'integration-tests.xml', application: 'user-service', size: '32.1 KB', lastModified: '2025/05/28' },
    { id: 'ts3', name: 'performance-tests.xml', application: 'api-gateway', size: '28.5 KB', lastModified: '2025/05/27' }
  ];

  const otherFiles = [
    { id: 'of1', name: 'deployment.yaml', application: 'product-catalog', size: '3.2 KB', lastModified: '2025/05/29' },
    { id: 'of2', name: 'service.yaml', application: 'user-service', size: '1.5 KB', lastModified: '2025/05/28' },
    { id: 'of3', name: 'ingress.yaml', application: 'api-gateway', size: '2.1 KB', lastModified: '2025/05/27' }
  ];

  const handleFileDelivery = (fileType: string) => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No Selection",
        description: "Please select at least one file to deliver.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "File Delivery Initiated",
      description: `Started delivery of ${selectedFiles.length} ${fileType} file(s).`
    });
  };

  const FileTable = ({ files, fileType }: { files: any[], fileType: string }) => (
    <div className="space-y-4">
      {selectedFiles.length > 0 && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <Badge variant="secondary">
            {selectedFiles.filter(id => files.some(f => f.id === id)).length} {fileType} files selected
          </Badge>
          <Button size="sm" onClick={() => handleFileDelivery(fileType)}>
            <Truck className="h-4 w-4 mr-2" />
            Deliver Selected
          </Button>
        </div>
      )}

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  checked={files.every(f => selectedFiles.includes(f.id))}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedFiles(prev => [...new Set([...prev, ...files.map(f => f.id)])]);
                    } else {
                      setSelectedFiles(prev => prev.filter(id => !files.some(f => f.id === id)));
                    }
                  }}
                />
              </TableHead>
              <TableHead>File Name</TableHead>
              <TableHead>Application</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell>
                  <Checkbox 
                    checked={selectedFiles.includes(file.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedFiles(prev => [...prev, file.id]);
                      } else {
                        setSelectedFiles(prev => prev.filter(id => id !== file.id));
                      }
                    }}
                  />
                </TableCell>
                <TableCell className="font-medium">{file.name}</TableCell>
                <TableCell>{file.application}</TableCell>
                <TableCell>{file.size}</TableCell>
                <TableCell>{file.lastModified}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Truck className="h-4 w-4 mr-1" />
                      Deliver
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            File Delivery
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="configmaps" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="configmaps">ConfigMaps</TabsTrigger>
              <TabsTrigger value="tosca">Tosca Files</TabsTrigger>
              <TabsTrigger value="other">Other Files</TabsTrigger>
            </TabsList>

            <TabsContent value="configmaps">
              <FileTable files={configMaps} fileType="ConfigMap" />
            </TabsContent>

            <TabsContent value="tosca">
              <FileTable files={toscaFiles} fileType="Tosca" />
            </TabsContent>

            <TabsContent value="other">
              <FileTable files={otherFiles} fileType="Other" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Upload New Files */}
      <Card>
        <CardHeader>
          <CardTitle>Upload New Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Files</h3>
            <p className="text-gray-600 mb-4">Drag and drop files here, or click to browse</p>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
