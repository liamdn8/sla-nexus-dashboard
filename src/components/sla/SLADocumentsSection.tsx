
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DocumentManager } from "@/components/DocumentManager";
import { ChecklistDocumentForm } from "./ChecklistDocumentForm";
import { BMChecklistForm } from "./BMChecklistForm";
import { BMSizingForm } from "./BMSizingForm";
import { BBPerformanceTestForm } from "./BBPerformanceTestForm";
import { Plus, FileText, ClipboardList, Settings, BarChart3 } from "lucide-react";

interface ApplicationVersion {
  id: string;
  application: string;
  version: string;
  status: string;
  releaseDate: string;
  environment: string;
}

interface SLADocumentsSectionProps {
  slaTitle?: string;
  slaDescription?: string;
  applicationVersions?: ApplicationVersion[];
}

export const SLADocumentsSection = ({ 
  slaTitle = "E-commerce Platform SLA", 
  slaDescription = "",
  applicationVersions = []
}: SLADocumentsSectionProps) => {
  const [showChecklistForm, setShowChecklistForm] = useState(false);
  const [showBMChecklistForm, setShowBMChecklistForm] = useState(false);
  const [showBMSizingForm, setShowBMSizingForm] = useState(false);
  const [showBBPerformanceTestForm, setShowBBPerformanceTestForm] = useState(false);

  // Extract SLA ID from title or use a default
  const slaId = slaTitle.includes("SLA") ? slaTitle.replace(/\s+/g, "-").toUpperCase() : "SLA-001";

  return (
    <div id="documents">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <div className="flex space-x-2">
          <Button 
            onClick={() => setShowChecklistForm(true)}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <FileText className="h-4 w-4" />
            <span>Create Checklist</span>
          </Button>
          <Button 
            onClick={() => setShowBMChecklistForm(true)}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <ClipboardList className="h-4 w-4" />
            <span>Create BM Checklist</span>
          </Button>
          <Button 
            onClick={() => setShowBMSizingForm(true)}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <Settings className="h-4 w-4" />
            <span>Create BM Sizing</span>
          </Button>
          <Button 
            onClick={() => setShowBBPerformanceTestForm(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <BarChart3 className="h-4 w-4" />
            <span>Create BB Performance Test</span>
          </Button>
        </div>
      </div>
      
      <DocumentManager />

      <ChecklistDocumentForm 
        isOpen={showChecklistForm}
        onClose={() => setShowChecklistForm(false)}
        slaTitle={slaTitle}
      />

      <BMChecklistForm
        isOpen={showBMChecklistForm}
        onClose={() => setShowBMChecklistForm(false)}
        slaTitle={slaTitle}
        slaDescription={slaDescription}
        applicationVersions={applicationVersions}
      />

      <BMSizingForm
        isOpen={showBMSizingForm}
        onClose={() => setShowBMSizingForm(false)}
        slaTitle={slaTitle}
        slaId={slaId}
        applicationVersions={applicationVersions}
      />

      <BBPerformanceTestForm
        isOpen={showBBPerformanceTestForm}
        onClose={() => setShowBBPerformanceTestForm(false)}
        slaTitle={slaTitle}
        slaId={slaId}
        applicationVersions={applicationVersions}
      />
    </div>
  );
};
