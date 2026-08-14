import React from 'react';
import { AppHeader } from '@/features/app-shell/components/AppHeader';
import { DocumentUploadFlow } from '@/features/services/components/DocumentUploadFlow';

export default function CustomUploadPage() {
  return (
    <>
      <DocumentUploadFlow 
        title="Upload Your Document"
        subtitle="Upload your custom PDF document."
        serviceType="upload_pdf"
        allowedBindings={['spiral']}
        basePrice={10}
      />
    </>
  );
}
