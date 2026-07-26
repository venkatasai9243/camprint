'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Phone, Mail, HelpCircle, FileText, Shield, Info } from 'lucide-react';

export default function SupportPage() {
  const router = useRouter();

  const links = [
    { icon: Phone, title: 'Call Support', desc: '+91 9876543210', href: 'tel:+919876543210', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: Mail, title: 'Email Support', desc: 'support@blintzy.com', href: 'mailto:support@blintzy.com', color: 'text-orange-500', bg: 'bg-orange-50' },
    { icon: HelpCircle, title: 'FAQ', desc: 'Common questions', href: '#', color: 'text-purple-500', bg: 'bg-purple-50' },
    { icon: FileText, title: 'Terms & Conditions', desc: 'Legal agreements', href: '#', color: 'text-gray-500', bg: 'bg-gray-100' },
    { icon: Shield, title: 'Privacy Policy', desc: 'How we handle data', href: '#', color: 'text-green-500', bg: 'bg-green-50' },
    { icon: Info, title: 'About BLINTZY', desc: 'Our mission & vision', href: '#', color: 'text-teal-500', bg: 'bg-teal-50' },
  ];

  return (
    <div className="flex flex-col w-full h-full bg-white min-h-[100dvh]">
      <div className="flex items-center p-4 border-b border-gray-100 sticky top-0 bg-white z-10 gap-3">
        <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-black transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-black">Help & Support</h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto pb-32">
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm divide-y divide-gray-100">
          {links.map((link, idx) => (
            <a 
              key={idx} 
              href={link.href} 
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${link.bg}`}>
                  <link.icon className={`w-5 h-5 ${link.color}`} />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-black">{link.title}</span>
                  <span className="text-xs text-gray-500">{link.desc}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </a>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            App Version v1.0.0
          </span>
        </div>
      </div>
    </div>
  );
}
