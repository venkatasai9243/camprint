"use client";
import React from 'react';
import { CurrentOrder } from '../types';
import { Button } from '@/design-system/components/buttons/Button/Button';
import { motion } from 'framer-motion';
import { FileText, Ticket, BookOpen, ChevronRight, Truck, CheckCircle2 } from 'lucide-react';

interface RecentOrdersProps {
  orders: CurrentOrder[];
}

// TEMP: MOCK ORDERS FOR UI TESTING
const USE_MOCK_ORDERS = true;

const MOCK_ORDERS = [
  {
    id: "BLZ-25-42-001",
    documentName: "Data Structures Lab Manual",
    status: "Printing",
    details: "1 Copy • Double Sided B&W • Spiral",
    total: "₹242",
    eta: "Tomorrow • 10:00 AM",
    type: "manual"
  },
  {
    id: "BLZ-25-42-002",
    documentName: "Hall Ticket",
    status: "Ready",
    details: "1 Copy • 2 Pages • Single Sided B&W",
    total: "₹6",
    eta: "Today",
    type: "hall_ticket"
  },
  {
    id: "BLZ-25-42-003",
    documentName: "Custom Document",
    status: "Order Placed",
    details: "2 Copies • 10 Pages • Double Sided Color",
    total: "₹120",
    eta: "Tomorrow",
    type: "custom"
  }
];

export const RecentOrders = ({ orders }: RecentOrdersProps) => {
  const displayOrders = USE_MOCK_ORDERS ? MOCK_ORDERS : orders;

  if (!displayOrders || displayOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.05)] text-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-3 overflow-hidden">
          <span className="text-[52px] block translate-y-1">🖨️</span>
        </div>
        <h4 className="font-bold text-gray-900 text-[18px] mb-1">You're all caught up 🎉</h4>
        <p className="text-[13px] text-gray-500 max-w-[220px] leading-tight mb-5">Your completed print orders will appear here.</p>
        
        <hr className="w-full border-gray-100 mb-5" />
        
        <div className="flex flex-col gap-2.5 w-full">
          <button 
            className="w-full h-[52px] bg-[#FF6B00] text-white rounded-[18px] font-bold text-sm hover:scale-[0.98] transition-transform flex items-center justify-center gap-2 shadow-md shadow-orange-500/20" 
            onClick={() => window.location.href = '/app/services'}
          >
            Start Printing <span className="text-lg">→</span>
          </button>
          <button 
            className="w-full h-[52px] bg-white border border-gray-200 text-gray-900 rounded-[18px] font-bold text-sm hover:scale-[0.98] hover:bg-gray-50 transition-all flex items-center justify-center gap-2" 
            onClick={() => window.location.href = '/app/services/manuals'}
          >
            Browse Manuals <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {displayOrders.slice(0, 3).map((order: any, i) => {
        
        // Determine status dot color
        let statusColor = "bg-gray-400";
        if (order.status === 'Order Placed') statusColor = "bg-[#FF6B00]";
        else if (order.status === 'Printing') statusColor = "bg-blue-500";
        else if (order.status === 'Ready' || order.status === 'Delivered') statusColor = "bg-green-500";

        // Determine icon styling
        let iconBg = "bg-gray-50 text-gray-500";
        let icon = <FileText className="w-5 h-5" />;
        if (order.type === 'manual') {
          iconBg = "bg-blue-50 text-blue-500";
          icon = <BookOpen className="w-5 h-5" />;
        } else if (order.type === 'hall_ticket') {
          iconBg = "bg-green-50 text-green-500";
          icon = <Ticket className="w-5 h-5" />;
        } else if (order.type === 'custom') {
          iconBg = "bg-orange-50 text-orange-500";
          icon = <FileText className="w-5 h-5" />;
        }

        const isReady = order.status === 'Ready' || order.status === 'Delivered';

        return (
          <motion.div 
            key={order.id} 
            whileTap={{ scale: 0.985 }}
            onClick={() => window.location.href = `/app/orders/${order.id}`}
            className="flex items-start p-4 bg-white border border-gray-100 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] cursor-pointer group transition-colors hover:border-gray-200"
          >
            <div className={`w-11 h-11 rounded-full flex flex-shrink-0 items-center justify-center mr-3.5 ${iconBg}`}>
              {icon}
            </div>
            
            <div className="flex flex-col flex-1 min-w-0 pr-2">
              <span className="font-bold text-[15px] text-gray-900 leading-tight mb-1 line-clamp-2">
                {order.documentName}
              </span>
              <span className="text-[12px] font-mono font-bold text-gray-400 mb-1.5 truncate">
                {order.id}
              </span>
              <span className="text-[13px] text-gray-500 font-medium truncate mb-2">
                {order.details}
              </span>
              
              <div className="flex items-center gap-1.5 mt-auto">
                {isReady ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                  <Truck className="w-4 h-4 text-gray-400" />
                )}
                <span className={`text-[12px] font-bold truncate ${isReady ? 'text-green-600' : 'text-gray-700'}`}>
                  {isReady ? `Ready • Available Today` : `Delivers ${order.eta}`}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end justify-between self-stretch ml-2 flex-shrink-0">
              <span className="font-black text-[16px] text-orange-600">{order.total}</span>
              
              <div className="flex items-center gap-1.5 mt-2">
                <span className={`w-2 h-2 rounded-full ${statusColor}`}></span>
                <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">{order.status}</span>
              </div>

              <ChevronRight className="w-5 h-5 text-gray-300 mt-auto group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
            </div>
          </motion.div>
        );
      })}
      
      {displayOrders.length > 3 && (
        <button 
          onClick={() => window.location.href = '/app/orders'}
          className="w-full mt-1 py-3 text-[13px] font-bold text-[#FF6B00] hover:text-orange-600 transition-colors flex items-center justify-center gap-1.5 group bg-orange-50 rounded-xl"
        >
          View All Orders <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      )}
    </div>
  );
};


