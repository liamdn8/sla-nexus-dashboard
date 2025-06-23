
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Folder, File, Upload, Download, Trash2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileItem {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadDate: string;
}

interface FolderData {
  name: string;
  files: FileItem[];
}

const DocumentManager = () => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const { toast } = useToast();

  // Mock data for folders and files
  const [folders, setFolders] = useState<Record<string, FolderData>>({
    'SRS': {
      name: 'SRS',
      files: [
        { id: '1', name: 'System_Requirements_v1.0.pdf', size: '2.4 MB', type: 'PDF', uploadDate: '2024-01-15' },
        { id: '2', name: 'Requirements_Analysis.docx', size: '1.8 MB', type: 'DOCX', uploadDate: '2024-01-10' },
        { id: '3', name: 'Functional_Specs.pdf', size: '3.2 MB', type: 'PDF', uploadDate: '2024-01-08' },
      ]
    },
    'requirements': {
      name: 'Requirements',
      files: [
        { id: '4', name: 'Business_Requirements.pdf', size: '1.5 MB', type: 'PDF', uploadDate: '2024-01-12' },
        { id: '5', name: 'Technical_Requirements.docx', size: '2.1 MB', type: 'DOCX', uploadDate: '2024-01-09' },
      ]
    },
    'others': {
      name: 'Others',
      files: [
        { id: '6', name: 'Meeting_Notes.txt', size: '45 KB', type: 'TXT', uploadDate: '2024-01-14' },
        { id: '7', name: 'Project_Timeline.xlsx', size: '890 KB', type: 'XLSX', uploadDate: '2024-01-11' },
        { id: '8', name: 'Architecture_Diagram.png', size: '1.2 MB', type: 'PNG', uploadDate: '2024-01-07' },
      ]
    }
  });

  const handleFolderClick = (folderName: string) => {
    setSelectedFolder(folderName);
  };

  const handleBackToFolders = () => {
    setSelectedFolder(null);
  };

  const handleUpload = () => {
    if (uploadFile && selectedFolder) {
      const newFile: FileItem = {
        id: Date.now().toString(),
        name: uploadFile.name,
        size: `${(uploadFile.size / 1024 / 1024).toFixed(1)} MB`,
        type: uploadFile.name.split('.').pop()?.toUpperCase() || 'FILE',
        uploadDate: new Date().toISOString().split('T')[0]
      };

      setFolders(prev => ({
        ...prev,
        [selectedFolder]: {
          ...prev[selectedFolder],
          files: [...prev[selectedFolder].files, newFile]
        }
      }));

      setShowUploadDialog(false);
      setUploadFile(null);
      toast({
        title: "File uploaded successfully",
        description: `${uploadFile.name} has been added to ${selectedFolder} folder.`,
      });
    }
  };

  const handleDownload = (file: FileItem) => {
    toast({
      title: "Download started",
      description: `Downloading ${file.name}...`,
    });
  };

  const handleDeleteFile = () => {
    if (fileToDelete && selectedFolder) {
      setFolders(prev => ({
        ...prev,
        [selectedFolder]: {
          ...prev[selectedFolder],
          files: prev[selectedFolder].files.filter(file => file.id !== fileToDelete)
        }
      }));

      setShowDeleteDialog(false);
      setFileToDelete(null);
      toast({
        title: "File deleted",
        description: "File has been successfully deleted.",
      });
    }
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return '📄';
      case 'docx': case 'doc': return '📝';
      case 'xlsx': case 'xls': return '📊';
      case 'png': case 'jpg': case 'jpeg': return '🖼️';
      case 'txt': return '📋';
      default: return '📁';
    }
  };

  if (selectedFolder) {
    const currentFolder = folders[selectedFolder];
    
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleBackToFolders}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Folders
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">{currentFolder.name} Folder</h1>
            </div>
            <Button onClick={() => setShowUploadDialog(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Files in {currentFolder.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {currentFolder.files.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <File className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No files in this folder yet.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {currentFolder.files.map(file => (
                    <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getFileIcon(file.type)}</span>
                        <div>
                          <p className="font-medium text-gray-900">{file.name}</p>
                          <p className="text-sm text-gray-500">{file.size} • {file.type} • {file.uploadDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleDownload(file)}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            setFileToDelete(file.id);
                            setShowDeleteDialog(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Upload Dialog */}
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload File to {currentFolder.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                type="file"
                onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpload} disabled={!uploadFile}>
                Upload
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete File</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this file? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteFile}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Manager</h1>
          <p className="text-gray-600">Manage your project documents organized by folders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(folders).map(([key, folder]) => (
            <Card key={key} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleFolderClick(key)}>
              <CardHeader className="text-center">
                <Folder className="h-16 w-16 mx-auto text-blue-500 mb-4" />
                <CardTitle className="text-xl">{folder.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">{folder.files.length} files</p>
                <p className="text-sm text-gray-500 mt-2">
                  Click to view and manage files
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentManager;
