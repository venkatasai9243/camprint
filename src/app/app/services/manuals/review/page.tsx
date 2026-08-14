"use client";
import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReviewCard } from '@/features/manuals/components/ReviewCard';
import { PrintConfig } from '@/features/manuals/types';
import { MOCK_MANUALS } from '@/features/manuals/mock/manualsData';
import { mapManual } from '@/features/manuals/mappers';
import { calculateManualPrice, getEstimatedDelivery } from '@/features/manuals/utils/priceEngine';
import { APP_ROUTES } from '@/constants/routes';
import { useCart } from '@/features/cart/providers/CartProvider';
import { CartItem } from '@/features/cart/types';

function ReviewSelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const manualId = searchParams.get('manualId') || '';
  const { addItem } = useCart();

  const [isAdding, setIsAdding] = useState(false);

  const config: PrintConfig = {
    copies: parseInt(searchParams.get('copies') || '1', 10),
    singleSided: searchParams.get('singleSided') === 'true',
    color: searchParams.get('color') === 'true',
    bindingType: (searchParams.get('bindingType') as PrintConfig['bindingType']) || 'spiral',
    paperSize: (searchParams.get('paperSize') as PrintConfig['paperSize']) || 'a4',
  };

  const manualDTO = MOCK_MANUALS.find(m => m.id === manualId);
  if (!manualDTO) return <div className="p-8 text-center">Manual not found</div>;

  const manual = mapManual(manualDTO);
  const priceBreakdown = calculateManualPrice(manual.basePrice, manual.pages, config);
  const estimatedDelivery = getEstimatedDelivery();

  const handleAddToCart = () => {
    setIsAdding(true);
    
    const cartItem: CartItem = {
      id: `ci_${Date.now()}`,
      serviceType: 'manual',
      title: manual.name,
      subtitle: `${manual.subjectId} • ${config.copies} Copies`,
      quantity: 1, // Quantity is 1 because copies are handled in config
      printOptions: {
        copies: config.copies,
        singleSided: config.singleSided,
        color: config.color,
        bindingType: config.bindingType || 'spiral',
        paperSize: config.paperSize || 'a4',
      },
      priceBreakdown: {
        base: priceBreakdown.basePrice,
        printing: priceBreakdown.printingCost,
        binding: priceBreakdown.bindingCost,
        color: config.color ? 4 * config.copies : 0, // Approx color portion
        total: priceBreakdown.total
      },
      status: 'in_cart',
      editable: true,
      removable: true
    };
    
    addItem(cartItem);

    // Simulate network delay
    setTimeout(() => {
      router.push(APP_ROUTES.CART);
    }, 800);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-safe">
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-6 pb-2">
          <h1 className="text-2xl font-bold text-foreground">Review Order</h1>
          <p className="text-sm text-muted-foreground mt-1">Please confirm your print settings</p>
        </div>
        <ReviewCard 
          manual={manual} 
          config={config} 
          priceBreakdown={priceBreakdown} 
          estimatedDelivery={estimatedDelivery}
          onAddToCart={handleAddToCart}
          isAddingToCart={isAdding}
        />
      </div>
    </div>
  );
}

export default function ReviewSelectionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ReviewSelectionContent />
    </Suspense>
  );
}
