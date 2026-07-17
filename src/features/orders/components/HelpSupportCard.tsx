import React from 'react';
import { Phone, MessageCircle, Mail } from 'lucide-react';
import { Button } from '@/design-system/components/buttons/Button/Button';

export const HelpSupportCard = () => {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col gap-4">
      <h3 className="font-bold text-foreground">Need Help?</h3>
      
      <div className="grid grid-cols-3 gap-3">
        <Button className="bg-transparent border border-border text-foreground hover:bg-muted flex flex-col items-center gap-2 h-auto py-3">
          <Phone className="w-5 h-5 text-primary" />
          <span className="text-xs font-medium">Call</span>
        </Button>
        <Button className="bg-transparent border border-border text-foreground hover:bg-muted flex flex-col items-center gap-2 h-auto py-3">
          <MessageCircle className="w-5 h-5 text-green-500" />
          <span className="text-xs font-medium">WhatsApp</span>
        </Button>
        <Button className="bg-transparent border border-border text-foreground hover:bg-muted flex flex-col items-center gap-2 h-auto py-3">
          <Mail className="w-5 h-5 text-blue-500" />
          <span className="text-xs font-medium">Email</span>
        </Button>
      </div>

      <Button className="w-full bg-transparent text-sm mt-2 text-muted-foreground hover:bg-muted hover:text-foreground">
        Report an Issue
      </Button>
    </div>
  );
};
