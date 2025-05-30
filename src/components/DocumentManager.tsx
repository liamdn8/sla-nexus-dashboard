
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText, ChevronDown, ChevronUp, Download } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export const DocumentManager = () => {
  const [expandedDoc, setExpandedDoc] = useState<number | null>(null);
  const [documents, setDocuments] = useState([
    {
      title: "Technical Specification",
      type: "Technical",
      status: "Complete",
      lastModified: "2024-05-25",
      filled: true,
      content: {
        description: "Complete technical architecture and implementation details",
        author: "John Doe",
        version: "2.1",
        requirements: "React, TypeScript, Node.js"
      }
    },
    {
      title: "API Documentation", 
      type: "API",
      status: "In Progress",
      lastModified: "2024-05-26",
      filled: false,
      content: {
        description: "",
        author: "",
        version: "1.0",
        requirements: ""
      }
    },
    {
      title: "User Manual",
      type: "User Guide",
      status: "Complete", 
      lastModified: "2024-05-24",
      filled: true,
      content: {
        description: "End-user documentation and tutorials",
        author: "Jane Smith",
        version: "1.5",
        requirements: "Web browser, user account"
      }
    },
    {
      title: "Deployment Guide",
      type: "Operations",
      status: "Draft",
      lastModified: "2024-05-23",
      filled: false,
      content: {
        description: "",
        author: "",
        version: "1.0",
        requirements: ""
      }
    },
    {
      title: "Security Assessment",
      type: "Security",
      status: "Complete",
      lastModified: "2024-05-22",
      filled: true,
      content: {
        description: "Security audit and vulnerability assessment",
        author: "Security Team",
        version: "1.2",
        requirements: "Security tools, compliance framework"
      }
    }
  ]);

  const handleExportPDF = (docTitle: string) => {
    console.log(`Exporting ${docTitle} to PDF...`);
  };

  const handleSaveDocument = (index: number, content: any) => {
    const updatedDocs = [...documents];
    updatedDocs[index].content = content;
    updatedDocs[index].filled = Object.values(content).some(value => value !== "");
    updatedDocs[index].lastModified = new Date().toISOString().split('T')[0];
    setDocuments(updatedDocs);
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
    <TooltipProvider>
      <div className="space-y-6">
        {/* <h2 className="text-2xl font-bold text-gray-900">Document Management</h2> */}
        
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
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant={doc.filled ? "default" : "secondary"}>
                              {doc.filled ? "Filled" : "Incomplete"}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{doc.filled ? "Document has required content" : "Document needs to be completed"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right text-sm text-gray-600">
                      <div>Last modified</div>
                      <div>{doc.lastModified}</div>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleExportPDF(doc.title)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Export PDF
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Export document as PDF file</p>
                      </TooltipContent>
                    </Tooltip>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedDoc(expandedDoc === index ? null : index)}
                    >
                      {expandedDoc === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                {expandedDoc === index && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`description-${index}`}>Description</Label>
                        <Textarea
                          id={`description-${index}`}
                          value={doc.content.description}
                          onChange={(e) => {
                            const newContent = { ...doc.content, description: e.target.value };
                            handleSaveDocument(index, newContent);
                          }}
                          placeholder="Enter document description..."
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`author-${index}`}>Author</Label>
                        <Input
                          id={`author-${index}`}
                          value={doc.content.author}
                          onChange={(e) => {
                            const newContent = { ...doc.content, author: e.target.value };
                            handleSaveDocument(index, newContent);
                          }}
                          placeholder="Enter author name..."
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`version-${index}`}>Version</Label>
                        <Input
                          id={`version-${index}`}
                          value={doc.content.version}
                          onChange={(e) => {
                            const newContent = { ...doc.content, version: e.target.value };
                            handleSaveDocument(index, newContent);
                          }}
                          placeholder="Enter version..."
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`requirements-${index}`}>Requirements</Label>
                        <Input
                          id={`requirements-${index}`}
                          value={doc.content.requirements}
                          onChange={(e) => {
                            const newContent = { ...doc.content, requirements: e.target.value };
                            handleSaveDocument(index, newContent);
                          }}
                          placeholder="Enter requirements..."
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};
