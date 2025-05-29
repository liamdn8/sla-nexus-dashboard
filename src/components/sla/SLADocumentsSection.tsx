
import React from 'react';
import { DocumentManager } from "@/components/DocumentManager";

export const SLADocumentsSection = () => {
  return (
    <div id="documents">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Documents</h1>
      <DocumentManager />
    </div>
  );
};
