
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DocumentManager } from "@/components/DocumentManager";
import { ChecklistDocumentForm } from "./ChecklistDocumentForm";
import { Plus, FileText } from "lucide-react";

interface SLADocumentsSectionProps {
  slaTitle?: string;
}

export const SLADocumentsSection = ({ slaTitle = "E-commerce Platform SLA" }: SLADocumentsSectionProps) => {
  const [showChecklistForm, setShowChecklistForm] = useState(false);

  return (
    <div id="documents">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <Button 
          onClick={() => setShowChecklistForm(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <FileText className="h-4 w-4" />
          <span>Create Checklist</span>
        </Button>
      </div>
      
      <DocumentManager />

      <ChecklistDocumentForm 
        isOpen={showChecklistForm}
        onClose={() => setShowChecklistForm(false)}
        slaTitle={slaTitle}
      />
    </div>
  );
};
