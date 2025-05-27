
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

export const DocumentManager = () => {
  const documents = [
    {
      title: "Technical Specification",
      type: "Technical",
      status: "Complete",
      lastModified: "2024-05-25",
      filled: true
    },
    {
      title: "API Documentation", 
      type: "API",
      status: "In Progress",
      lastModified: "2024-05-26",
      filled: false
    },
    {
      title: "User Manual",
      type: "User Guide",
      status: "Complete", 
      lastModified: "2024-05-24",
      filled: true
    },
    {
      title: "Deployment Guide",
      type: "Operations",
      status: "Draft",
      lastModified: "2024-05-23",
      filled: false
    },
    {
      title: "Security Assessment",
      type: "Security",
      status: "Complete",
      lastModified: "2024-05-22",
      filled: true
    }
  ];

  const handleExportPDF = (docTitle: string) => {
    // Simulate PDF export
    console.log(`Exporting ${docTitle} to PDF...`);
    // In a real application, this would trigger actual PDF generation
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Document Management</h2>
      
      <div className="grid grid-cols-1 gap-4">
        {documents.map((doc, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline">{doc.type}</Badge>
                      <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                      <Badge variant={doc.filled ? "default" : "secondary"}>
                        {doc.filled ? "Filled" : "Incomplete"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right text-sm text-gray-600">
                    <div>Last modified</div>
                    <div>{doc.lastModified}</div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExportPDF(doc.title)}
                  >
                    Export PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
