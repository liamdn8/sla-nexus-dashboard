import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Folder, File, Upload, Download, Trash2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileItem {
  key: string;
  name: string;
  size: string;
  type: string;
  lastModified: string;
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
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);
  const [folders, setFolders] = useState<Record<string, FolderData>>({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const bucketName = 'devops-vsm-2025';
  const region = 'ap-southeast-2';
  const staticFolders = ['SRS', 'requirements', 'others'];

  useEffect(() => {
    // Initialize static folders
    const initialFolders: Record<string, FolderData> = {};
    staticFolders.forEach(folderName => {
      initialFolders[folderName] = {
        name: folderName,
        files: []
      };
    });
    setFolders(initialFolders);
    
    // Load files from S3 for each folder
    loadAllFolderFiles();
  }, []);

  const loadAllFolderFiles = async () => {
    setLoading(true);
    try {
      for (const folderName of staticFolders) {
        await loadFolderFiles(folderName);
      }
    } catch (error) {
      console.error('Error loading folder files:', error);
      toast({
        title: "Error loading files",
        description: "Failed to load files from S3. Check bucket configuration.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadFolderFiles = async (folderName: string) => {
    try {
      // Use the public API to list objects
      const url = `https://${bucketName}.s3.${region}.amazonaws.com/?list-type=2&prefix=${folderName}/&delimiter=/`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      
      const files: FileItem[] = [];
      const contents = xmlDoc.getElementsByTagName('Contents');
      
      for (let i = 0; i < contents.length; i++) {
        const content = contents[i];
        const key = content.getElementsByTagName('Key')[0]?.textContent;
        const size = content.getElementsByTagName('Size')[0]?.textContent;
        const lastModified = content.getElementsByTagName('LastModified')[0]?.textContent;
        
        if (key && key !== `${folderName}/` && size && parseInt(size) > 0) {
          const fileName = key.split('/').pop() || key;
          const fileExtension = fileName.split('.').pop()?.toUpperCase() || 'FILE';
          
          files.push({
            key,
            name: fileName,
            size: formatFileSize(parseInt(size)),
            type: fileExtension,
            lastModified: lastModified?.split('T')[0] || ''
          });
        }
      }

      setFolders(prev => ({
        ...prev,
        [folderName]: {
          ...prev[folderName],
          files
        }
      }));
    } catch (error) {
      console.error(`Error loading files for ${folderName}:`, error);
      toast({
        title: "Error loading files",
        description: `Failed to load files for ${folderName} folder.`,
        variant: "destructive",
      });
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleFolderClick = (folderName: string) => {
    setSelectedFolder(folderName);
    loadFolderFiles(folderName);
  };

  const handleBackToFolders = () => {
    setSelectedFolder(null);
  };

  const handleUpload = async () => {
    if (uploadFiles && selectedFolder && uploadFiles.length > 0) {
      setUploading(true);
      
      try {
        const uploadPromises = Array.from(uploadFiles).map(async (file) => {
          const key = `${selectedFolder}/${file.name}`;
          const url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
          
          const response = await fetch(url, {
            method: 'PUT',
            body: file,
            headers: {
              'Content-Type': file.type || 'application/octet-stream',
            },
          });
          
          if (!response.ok) {
            throw new Error(`Failed to upload ${file.name}: ${response.status}`);
          }
          
          return file.name;
        });
        
        const uploadedFiles = await Promise.all(uploadPromises);
        
        toast({
          title: "Upload successful",
          description: `Successfully uploaded ${uploadedFiles.length} file(s) to ${selectedFolder} folder.`,
        });
        
        setShowUploadDialog(false);
        setUploadFiles(null);
        
        // Refresh folder files after upload
        await loadFolderFiles(selectedFolder);
        
      } catch (error) {
        console.error('Upload error:', error);
        toast({
          title: "Upload failed",
          description: error instanceof Error ? error.message : "Failed to upload files. Please try again.",
          variant: "destructive",
        });
      } finally {
        setUploading(false);
      }
    }
  };

  const handleDownload = async (file: FileItem) => {
    try {
      // For public bucket, we can construct the direct URL
      const url = `https://${bucketName}.s3.${region}.amazonaws.com/${file.key}`;

      // Create a temporary link to download the file
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Download started",
        description: `Downloading ${file.name}...`,
      });
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: "Download failed",
        description: "Failed to download file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteFile = async () => {
    if (fileToDelete && selectedFolder) {
      setLoading(true);
      try {
        const url = `https://${bucketName}.s3.${region}.amazonaws.com/${fileToDelete}`;
        
        const response = await fetch(url, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error(`Failed to delete file: ${response.status}`);
        }
        
        toast({
          title: "Delete successful",
          description: "File has been successfully deleted from S3.",
        });
        
        setShowDeleteDialog(false);
        setFileToDelete(null);
        
        // Refresh folder files after delete
        await loadFolderFiles(selectedFolder);
        
      } catch (error) {
        console.error('Error deleting file:', error);
        toast({
          title: "Delete failed",
          description: error instanceof Error ? error.message : "Failed to delete file. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
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
              <Button variant="outline" onClick={handleBackToFolders} disabled={loading || uploading}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Folders
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">{currentFolder?.name} Folder</h1>
            </div>
            <Button onClick={() => setShowUploadDialog(true)} disabled={loading || uploading}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Files in {currentFolder?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Loading files...</p>
                </div>
              ) : currentFolder?.files.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <File className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No files in this folder yet.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {currentFolder?.files.map(file => (
                    <div key={file.key} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getFileIcon(file.type)}</span>
                        <div>
                          <p className="font-medium text-gray-900">{file.name}</p>
                          <p className="text-sm text-gray-500">{file.size} • {file.type} • {file.lastModified}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleDownload(file)} disabled={loading || uploading}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            setFileToDelete(file.key);
                            setShowDeleteDialog(true);
                          }}
                          disabled={loading || uploading}
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
              <DialogTitle>Upload Files to {currentFolder?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                type="file"
                multiple
                onChange={(e) => setUploadFiles(e.target.files)}
                disabled={uploading}
              />
              {uploadFiles && uploadFiles.length > 0 && (
                <div className="text-sm text-gray-600">
                  Selected {uploadFiles.length} file(s):
                  <ul className="mt-2 space-y-1">
                    {Array.from(uploadFiles).map((file, index) => (
                      <li key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {file.name} ({formatFileSize(file.size)})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowUploadDialog(false)} disabled={uploading}>
                Cancel
              </Button>
              <Button onClick={handleUpload} disabled={!uploadFiles || uploadFiles.length === 0 || uploading}>
                {uploading ? 'Uploading...' : 'Upload Files'}
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
              <AlertDialogCancel disabled={loading || uploading}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteFile} disabled={loading || uploading}>
                {loading ? 'Deleting...' : 'Delete'}
              </AlertDialogAction>
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
          <p className="text-gray-600">Manage your project documents organized by folders (AWS S3 Public)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {staticFolders.map(folderName => (
            <Card key={folderName} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleFolderClick(folderName)}>
              <CardHeader className="text-center">
                <Folder className="h-16 w-16 mx-auto text-blue-500 mb-4" />
                <CardTitle className="text-xl">{folderName}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  {loading ? 'Loading...' : `${folders[folderName]?.files.length || 0} files`}
                </p>
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
